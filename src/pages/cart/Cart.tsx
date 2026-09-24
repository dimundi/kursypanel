import React, { useState } from "react";
import { CartContext } from "../../context/CartContext";
import { NavLink, useParams } from "react-router-dom";
import CartItemsSummary from "./CartItemsSummary";
import CartCustomerDetails from "./CartCustomerDetails";
import { BASKET_TYPE_CHOICES, ADDR_TYPE_CHOICES, SYSTEM_CHOICES } from "../../components/Enumerators";
import CartClass from "../../classes/CartClass";
import { IOrder } from "../../interfaces/IOrder";
import CartPayment from "./CartPayment";
import { CartStepBar } from "./CartStepBar";
import { IUrlCart } from "../../interfaces/IUrl";
import { IBasketProduct } from "../../interfaces/IBasket";
import { IShipment } from "../../interfaces/IProducts";

export interface ICart {
    system?: SYSTEM_CHOICES; // np. BB - Bieg Belfra
}

const Cart = (props: ICart) => {
    // const [basketId] = useState(CartClass.get_basketId(BASKET_TYPE_CHOICES.BASKET_ORDER));
    const [isUserInfoRead, setIsUserInfoRead] = useState(false);
    const urlParams = useParams<IUrlCart>();
    const [basketId] = useState(getInitBasketId());

    // wszystkie dane związane z zamówieniem -> inicjalizuję wartości domyślne
    const [order, setOrder] = useState<IOrder>({
        products: [] as IBasketProduct[],
        addrContact: { addrType: ADDR_TYPE_CHOICES.ADDR_TYPE_CONTACT_BY_USER, aName: "" },
        addrPayer: { addrType: ADDR_TYPE_CHOICES.ADDR_TYPE_PAYER_BY_USER, aName: "" },
        addrRecipient: { addrType: ADDR_TYPE_CHOICES.ADDR_TYPE_RECIPIENT_BY_USER, aName: "" },
        addrShipment: { addrType: ADDR_TYPE_CHOICES.ADDR_TYPE_SHIPMENT_BY_USER, aName: "" },
        summary: 0,
        invoice: false,
        recipent: true,
    });

    // dostępne metody wysyłki
    const [shipments, setShipments] = useState([] as IShipment[]);

    /* konfigurowanie formularza zamówień */
    // let cartConfig = { initialStepId: 2 } as ICartUIConfig;

    /* Wyświetl informacje o błędzie API*/
    const [notification, setNotification] = useState<String | undefined | JSX.Element>();
    const [activeStepId, setActiveStepId] = useState(props.system == SYSTEM_CHOICES.SYSTEM_BB ? 1 : 1);

    function getInitBasketId() {
        let basketType = props.system == SYSTEM_CHOICES.SYSTEM_BB ? BASKET_TYPE_CHOICES.BASKET_BB : BASKET_TYPE_CHOICES.BASKET_ORDER;
        if (urlParams.basketId) {
            CartClass.set_basketId(basketType, urlParams.basketId);
            return urlParams.basketId;
        }
        return CartClass.get_basketId(basketType);
    }

    //===============================================
    //output
    // if (isLoaded) {
    //     return (<div>Ładowanie...
    //             {notification}</div>
    //     )
    //   } else {

    return (
        <section>
            <div className="container px-5 mt-5">
                {/* <div > */}
                <div>
                    <h1 className="is-size-4-mobile is-size-3 has-text-weight-bold">
                        {"Twoje zamówienie" + (props.system === SYSTEM_CHOICES.SYSTEM_BB ? " - Bieg Belfrów" : "")}
                    </h1>
                    {props.system === SYSTEM_CHOICES.SYSTEM_BB ? (
                        <NavLink to={"/panel"}>
                            <i className="fas fa-chevron-left mr-3"></i> Wróć do panelu
                        </NavLink>
                    ) : (
                        <NavLink to={"/"}>
                            <i className="fas fa-chevron-left mr-3"></i> Wróć do sklepu
                        </NavLink>
                    )}
                    {notification}
                    <CartStepBar activeStepId={activeStepId} />
                    <CartContext.Provider
                        value={{
                            // config: cartConfig,
                            setActiveStepId: setActiveStepId,
                            basketId: basketId,
                            basketType: props.system == SYSTEM_CHOICES.SYSTEM_BB ? BASKET_TYPE_CHOICES.BASKET_BB : BASKET_TYPE_CHOICES.BASKET_ORDER,
                            order: order,
                            getInvoiceData: props.system == SYSTEM_CHOICES.SYSTEM_BB ? false : true,
                            setOrder: setOrder,
                            isUserInfoRead: isUserInfoRead,
                            setIsUserInfoRead: setIsUserInfoRead,
                            setNotification: setNotification,
                            shipments: shipments,
                            setShipments: setShipments,
                            system: props.system == undefined ? SYSTEM_CHOICES.SYSTEM_KURSY : props.system,
                        }}
                    >
                        {activeStepId === 1 && (
                            <>
                                <CartItemsSummary />
                            </>
                        )}
                        {activeStepId === 2 && (
                            <>
                                <CartCustomerDetails />
                            </>
                        )}

                        {activeStepId === 3 && (
                            <>
                                <CartPayment />
                            </>
                        )}
                    </CartContext.Provider>
                    <p className="webinar-adnotation webinar-muted has-text-centered mt-6">
                        W razie pytań,{" "}
                        <NavLink key="contact-us" to={"/kontakt"}>
                            {" "}
                            skontaktuj się z nami.
                        </NavLink>
                    </p>
                    {/* </>
                  }
                  {products.length === 0 && <Notification lead="" type="info" msg="Nie masz żadnych produktów w koszyku."></Notification> } */}
                </div>
                {/* </div> */}
            </div>
        </section>
    );
};

// }

export default Cart;
