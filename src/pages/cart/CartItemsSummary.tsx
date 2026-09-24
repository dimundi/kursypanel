import React, { useContext, useEffect, useState } from "react";
import { useCartContext } from "../../context/CartContext";
import RequestClass from "../../classes/RequestClass";
import { UserContext } from "../../context/UserContext";
import { IBasketProduct } from "../../interfaces/IBasket";
import CartClass from "../../classes/CartClass";
import CartItems from "./CartItems";
import HelperClass from "../../classes/HelperClass";
import { BASKET_TYPE_CHOICES } from "../../components/Enumerators";
import { RefCallBack } from "react-hook-form";

export interface ICartItemsSummary {
    can_product_edit?: boolean;
    can_shipment_edit?: boolean;
    show_shipment?: boolean;
    disableNextButton?: boolean;
    success_callback?: RefCallBack; // sukces modyfikacji
    get_success_callback?: RefCallBack; // sukces odcztania
    doNotUpdateBacketCnt?: boolean;
}

const CartItemsSummary = (props: ICartItemsSummary) => {
    const { setActiveStepId, basketId, basketType, order, setOrder, setShipments } = useCartContext();
    const [isLoaded, setIsLoaded] = useState(false);
    const [notification, setNotification] = useState<JSX.Element | String>();
    const { setBasketCnt } = useContext(UserContext);

    /* logika 
        can_product_edit?: boolean;
        can_shipment_edit?: boolean;

        1. najpierw z props
        2. potem zależnie od systemu 
        */
    let can_product_edit = props.can_product_edit;
    let can_shipment_edit = props.can_shipment_edit;
    let show_shipment = props.show_shipment;

    if (can_shipment_edit === undefined) can_shipment_edit = true;
    if (can_product_edit === undefined) can_product_edit = basketType === BASKET_TYPE_CHOICES.BASKET_BB ? false : true;
    if (can_shipment_edit === true && show_shipment === undefined) show_shipment = true;
    if (show_shipment === undefined) show_shipment = false;

    let enableNextButton = props.disableNextButton == true ? false : true;

    // console.log(isLoaded);
    /* -----
     *  wysłanie zapytania o koszyk -> przy zmianie basketId
     * ----- */
    useEffect(() => {
        function succ_callback(result: any) {
            // console.log(result);
            if (result !== null) {
                var prodCnt = 0;
                if (order !== undefined) {
                    if (setOrder && result.products !== undefined) {
                        setOrder({
                            ...order,
                            products: CartClass.get_basketProducts(result),
                            shipment: HelperClass.findShipment(result.shipmentId, result.shipments),
                        });
                        prodCnt = result.products.length;
                    }
                }
                if (setShipments) setShipments(result.shipments);

                /* aktualizacja UserContext powoduje render całego interfejsu :( */
                /* zmienić na sygnał ?? */
                if (!(props.doNotUpdateBacketCnt === true)) setBasketCnt(prodCnt);
            }
            setIsLoaded(true);
            setNotification(<></>);
            if (props.get_success_callback) {
                props.get_success_callback(undefined);
            }
        }

        function err_callback(result: any) {
            setNotification(RequestClass.errorAlert(result));
        }

        // wysłanie zapytanie do serwera
        CartClass.get({
            basketId: basketId,
            basketType: basketType,
            success_callback: succ_callback,
            error_callback: err_callback,
        });
    }, [basketId]);

    /* -----
     *  przeliczenie sumy zamówienia
     * ----- */
    useEffect(() => {
        let suma = 0;
        if (order?.shipment !== undefined) {
            if (order?.shipment.inStore?.price) suma = order?.shipment.inStore?.price;
        }
        if (order?.products) {
            //console.log(order.products)
            Object.values(order.products).forEach((element: IBasketProduct) => {
                if (element.inStore?.price !== undefined && element.cnt !== undefined)
                    suma += element.cnt * element.inStore.price;
            });
            if (setOrder) setOrder({ ...order, summary: suma });
            //setSummary(suma)
        }
    }, [order?.products, order?.shipment]);

    /* -----
     *  przejdź Dalej
     * ----- */
    function onSubmitNext() {
        /* tu jest miejsce na dodatkowa logikę, jeżeli będzie potrzebna */

        if (setActiveStepId) setActiveStepId(2);
    }

    if (!isLoaded) {
        return (
            <div>
                Pobieranie zawartości koszyka...
                {notification}
            </div>
        );
    } else {
        return (
            <>
                {notification}
                <div id="cart-summary" className={"tab cart-step active"}>
                    <div id="cart" className="block">
                        <CartItems
                            can_product_edit={can_product_edit}
                            can_shipment_edit={can_shipment_edit}
                            show_shipment={show_shipment}
                            success_callback={props.success_callback}
                        />
                    </div>
                    {enableNextButton && (
                        <div className="has-text-centered">
                            <div className="button is-primary next-step" data-step="2" onClick={onSubmitNext}>
                                Przejdź dalej <i className="ml-2 fas fa-chevron-right"></i>
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }
};

export default CartItemsSummary;
