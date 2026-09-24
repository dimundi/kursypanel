import RequestClass from "./RequestClass";
import React from "react";
import { BASKET_TYPE_CHOICES, BASKET_UNKNOWN, PROD_TYPES_CHOICES, SHIPMENT_REQ_TYPES_CHOICES } from "../components/Enumerators";
import { RefCallBack } from "react-hook-form";
import { IBasket, IBasketEl, IBasketProduct } from "../interfaces/IBasket";
// import { log } from "../components/elements/Debug";

export default class CartClass extends React.Component {
    // --------------
    // ustawianie id koszyka
    // --------------
    public static set_basketId(basketType: BASKET_TYPE_CHOICES, basketId?: string) {
        // log("USTAWIAM NA " + basketId);
        if (basketId) {
            if (basketType === BASKET_TYPE_CHOICES.BASKET_ORDER) sessionStorage.setItem("order_basket_id", basketId);
            else if (basketType === BASKET_TYPE_CHOICES.BASKET_BB) sessionStorage.setItem("bb_basket_id", basketId);
            else sessionStorage.setItem("inquiry_basket_id", basketId);
        }
    }
    public static del_basketId(basketType: BASKET_TYPE_CHOICES) {
        // log("USTAWIAM NA " + basketId);

        if (basketType === BASKET_TYPE_CHOICES.BASKET_ORDER) sessionStorage.setItem("order_basket_id", BASKET_UNKNOWN);
        else if (basketType === BASKET_TYPE_CHOICES.BASKET_BB) sessionStorage.setItem("bb_basket_id", BASKET_UNKNOWN);
        else sessionStorage.setItem("inquiry_basket_id", BASKET_UNKNOWN);
    }

    // --------------
    // sprawdzenie i pobranie z pamięcie aktualnego basketId
    // --------------
    public static get_basketId(basketType: BASKET_TYPE_CHOICES) {
        var basketId: string | null | undefined;
        if (basketType === BASKET_TYPE_CHOICES.BASKET_ORDER) {
            basketId = sessionStorage.getItem("order_basket_id");
        } else if (basketType === BASKET_TYPE_CHOICES.BASKET_BB) {
            basketId = sessionStorage.getItem("bb_basket_id");
        } else {
            basketId = sessionStorage.getItem("inquiry_basket_id");
        }
        if (basketId === null || basketId === undefined) {
            basketId = BASKET_UNKNOWN;
        }

        return basketId;
    }

    // --------------
    // sprawdzenie i pobranie tyu koszyka na podstawie jego ID
    // --------------
    public static get_basketType(basketId: string | undefined) {
        if (basketId === undefined) return BASKET_TYPE_CHOICES.BASKET_UNDEFINED;
        if (sessionStorage.getItem("order_basket_id") === basketId) {
            return BASKET_TYPE_CHOICES.BASKET_ORDER;
        } else if (sessionStorage.getItem("inquiry_basket_id") === basketId) {
            return BASKET_TYPE_CHOICES.BASKET_INQUIRY;
        } else if (sessionStorage.getItem("bb_basket_id") === basketId) {
            return BASKET_TYPE_CHOICES.BASKET_BB;
        }
        return BASKET_TYPE_CHOICES.BASKET_UNDEFINED;
    }

    // --------------
    // pobranie listy produktów z koszyka, to może być troche tricky bo koszyk może zawierać inne koszyki :)
    // --------------
    public static get_basketProducts(basket: IBasket) {
        let products = [] as IBasketProduct[];

        if (basket.products != undefined) {
            basket.products.forEach((basketProduct: IBasketProduct) => {
                if (basketProduct.prodDef?.prodType !== PROD_TYPES_CHOICES.PROD_TYPE_SHIPMENT) products.push(basketProduct);
            });
        }
        if (basket.baskets !== undefined) {
            basket.baskets.forEach((basket: IBasketEl) => {
                if (basket.products != undefined) {
                    basket.products.forEach((basketProduct: IBasketProduct) => {
                        if (basketProduct.prodDef?.prodType !== PROD_TYPES_CHOICES.PROD_TYPE_SHIPMENT) products.push(basketProduct);
                    });
                }
            });
        }
        return CartClass.basketProductsMerge(products);
    }

    // --------------
    // scalanie produktów z tablicy IBasketProduct[];
    // to znaczy sumowania tych samych pozycji
    // --------------
    public static basketProductsMerge(basketProducts: IBasketProduct[]) {
        let products = [] as IBasketProduct[];

        basketProducts.forEach((basketProd: IBasketProduct) => {
            let idx = products.findIndex((bProd) => bProd.inStore?.productId === basketProd.inStore?.productId);
            if (idx < 0) {
                products.push(basketProd);
            } else {
                if (basketProd.cnt !== undefined) {
                    let a = products[idx].cnt;
                    if (a !== undefined) products[idx].cnt = a + basketProd.cnt;
                }
            }
        });
        return products;
    }

    // --------------
    // jaki jest wymagany sposób wysyłki według produktów w koszyku
    // --------------
    public static getShipmentRequiredType(basketProducts?: IBasketProduct[]) {
        if (basketProducts === undefined) return SHIPMENT_REQ_TYPES_CHOICES.SHIPMENT_REQ_NONE;
        let prod = basketProducts.find((bProd) => bProd.prodDef?.shipmentReq !== undefined && bProd.prodDef?.shipmentReq > 0);
        if (prod === null || prod === undefined) {
            return SHIPMENT_REQ_TYPES_CHOICES.SHIPMENT_REQ_NONE;
        }
        return prod.prodDef?.shipmentReq;
    }
    // --------------
    // czy w koszyku są produkty wymagający wysyłki
    // --------------
    public static isShipmentRequired(basketProducts?: IBasketProduct[]) {
        return CartClass.getShipmentRequiredType(basketProducts) === SHIPMENT_REQ_TYPES_CHOICES.SHIPMENT_REQ_NONE ? false : true;
    }
    // --------------
    // aktualzacja pozycji w koszyku
    // --------------
    public static put(
        productId: number,
        quantity: number,
        basketType: BASKET_TYPE_CHOICES,
        custom_success_callback: RefCallBack,
        custom_error_callback: RefCallBack
    ) {
        //sprawdź czy mamy już koszyk
        let basketId = this.get_basketId(basketType);

        var reqOptions = {
            method: "PUT",
            body: JSON.stringify({
                basketId: basketId,
                productId: productId,
                type: basketType,
                cnt: quantity,
            }),
        };

        RequestClass.makeRequest("basket/", reqOptions, custom_success_callback, custom_error_callback);
    }

    // --------------
    // pobieranie koszyka
    // --------------
    public static get(
        props: {
            basketId?: string;
            basketType?: BASKET_TYPE_CHOICES;
            success_callback: RefCallBack;
            error_callback: RefCallBack;
        }
        // offerBasketId?: string // wtedy kiedy basketType == BASKET_OFFER
    ) {
        if (props.basketType === undefined) {
            return props.error_callback("Brak definicji typu koszyka");
        }
        let basketId = props.basketId;

        if (basketId === undefined) this.get_basketId(props.basketType);
        // basketType == BASKET_TYPE_CHOICES.BASKET_OFFER

        //     ? offerBasketId
        //     : this.get_basketId(basketType);
        if (basketId === "" || basketId === BASKET_UNKNOWN || basketId === undefined) {
            /* nie ma informacji o numerze koszyka - nie robię zapytania */
            // console.log("Koszyk jest pusty");
            props.success_callback(null);
            return;
        }

        var reqOptions = {
            method: "GET",
        };

        function succ_callback_custom(result: any) {
            if (props.basketType) CartClass.set_basketId(props.basketType, result.basketId);
            props.success_callback(result);
        }

        RequestClass.makeRequest("basket/" + basketId + "/", reqOptions, succ_callback_custom, props.error_callback);
    }

    // --------------
    // dodawanie produktu do koszyka
    // --------------
    public static add(props: {
        productId: number;
        quantity?: number;
        basketType: BASKET_TYPE_CHOICES;
        custom_success_callback: RefCallBack;
        custom_error_callback: RefCallBack;
        basketId?: string;
        bbParticipanId?: number; // id uczestnika BB, to ma zastosowanie jeżeli dodajemy produkt do nieistniejącego koszyka, wówczas ten koszuk jest tworzony i przypisany do BBeditionUser o tym ID
    }) {
        //sprawdź czy mamy już koszyk
        let basketId = props.basketId;
        if (basketId !== undefined) basketId = this.get_basketId(props.basketType);

        var reqOptions = {
            method: "POST",
            body: JSON.stringify({
                basketId: basketId,
                productId: props.productId,
                type: props.basketType,
                cnt: props.quantity === undefined ? 1 : props.quantity,
                bbEditionUserId: props.bbParticipanId,
            }),
        };

        const success_callback = (result: any) => {
            CartClass.set_basketId(props.basketType, result.basketId);
            props.custom_success_callback(result);
        };

        const error_callback = (result: any) => {
            props.custom_error_callback(result);
        };

        RequestClass.makeRequest("basket/", reqOptions, success_callback, error_callback);
    }

    // --------------
    // dodawanie/nadpisanie wysyłki do koszyka
    // --------------
    public static addShipment(props: {
        shipmentId: number;
        basketType: BASKET_TYPE_CHOICES;
        custom_success_callback: RefCallBack;
        custom_error_callback: RefCallBack;
    }) {
        //sprawdź czy mamy już koszyk
        let basketId = this.get_basketId(props.basketType);

        var reqOptions = {
            method: "POST",
            body: JSON.stringify({
                basketId: basketId,
                shipmentId: props.shipmentId,
                type: props.basketType,
            }),
        };

        const success_callback = (result: any) => {
            CartClass.set_basketId(props.basketType, result.basketId);
            props.custom_success_callback(result);
        };

        const error_callback = (result: any) => {
            props.custom_error_callback(result);
        };

        RequestClass.makeRequest("basket/", reqOptions, success_callback, error_callback);
    }
}
