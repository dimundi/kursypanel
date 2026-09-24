import { useState } from "react";
import { BASKET_TYPE_CHOICES, EMAIL_BIURO, SYSTEM_CHOICES, TELEFON_BIURO } from "../../components/Enumerators";
import { CartContext } from "../../context/CartContext";
import { IBasket } from "../../interfaces/IBasket";
import CartItemsSummary from "../cart/CartItemsSummary";
import { IOrder } from "../../interfaces/IOrder";
import BBTshirts from "./BBTshirt";
import { IProduct } from "../../interfaces/IProducts";
import ToCartButton from "../cart/ToCartButton";
import { RefCallBack } from "react-hook-form";
import { IBBParticipant } from "../../interfaces/IBB";

export interface IBBCart {
    participant?: IBBParticipant;
    products?: IProduct[];
    refresh_calback: RefCallBack | null; // return kiedy odświeżamy interfejs
}
/* modyfikacja koszyka zamówienia BB */
export default function BBCart(props: IBBCart) {
    /* kiedy wyśiwetlać opcję dodania koszulki:
      1. jeżeli jest basket -> to po odczytaniu basket
      2. jeżeli basket == null to od razu
      */
    const [shotTshirt, setShowTshirt] = useState(props.participant?.basket?.basketId === undefined ? true : false);
    const [tshirtId, setShirtId] = useState(0); // jako productId!
    const [order, setOrder] = useState<IOrder>({
        // products: [] as IBasketProduct[],
        // addrContact: { addrType: ADDR_TYPE_CHOICES.ADDR_TYPE_CONTACT_BY_USER, aName: "" },
        // addrPayer: { addrType: ADDR_TYPE_CHOICES.ADDR_TYPE_PAYER_BY_USER, aName: "" },
        // addrRecipient: { addrType: ADDR_TYPE_CHOICES.ADDR_TYPE_RECIPIENT_BY_USER, aName: "" },
        // addrShipment: { addrType: ADDR_TYPE_CHOICES.ADDR_TYPE_SHIPMENT_BY_USER, aName: "" },
        // summary: 0,
        // invoice: false,
        // recipent: true,
    });
    // if (props.basket?.basketId === undefined) return <></>;

    function basket_change_success_callback(data: any) {
        if (props.refresh_calback) props.refresh_calback(undefined);
    }

    return (
        <>
            <div>
                <CartContext.Provider
                    value={{
                        // config: cartConfig,
                        //setActiveStepId: setActiveStepId,
                        basketId: props.participant?.basket?.basketId,
                        basketType: BASKET_TYPE_CHOICES.BASKET_BB,
                        order: order,
                        getInvoiceData: false,
                        setOrder: setOrder,
                        //isUserInfoRead: isUserInfoRead,
                        //setIsUserInfoRead: setIsUserInfoRead,
                        //setNotification: setNotification,
                        //shipments: shipments,
                        //setShipments: setShipments,
                        system: SYSTEM_CHOICES.SYSTEM_BB,
                    }}
                >
                    {props.participant?.basket?.basketId !== undefined && (
                        <CartItemsSummary
                            can_shipment_edit={false}
                            can_product_edit={true}
                            disableNextButton={true}
                            show_shipment={false}
                            success_callback={basket_change_success_callback}
                            get_success_callback={() => setShowTshirt(true)}
                            doNotUpdateBacketCnt={true}
                        />
                    )}
                    <div className="">
                        {/* <div>Przed finalizacją zamówienia możesz jeszcze modyfikować koszyk.</div>
                    <div>Na tym etapie nie możesz jednak zmienić typu aktywności.</div>
                    <div>
                        Jeżeli chcesz to zrobić, usuń uczetnika (zakładka Edytuj) i utwórz ponownie lub skontaktuj się z nami: {EMAIL_BIURO} lub{" "}
                        {TELEFON_BIURO}.
                    </div> */}

                        <div className="is-size-7">Uwaga! Każda zmiana w koszyku spowoduje odświeżenie strony.</div>
                    </div>
                    {shotTshirt == true && (
                        <div className="pt-1 pb-4 is-size-5">
                            <div className="py-3 is-size-5">Jeżeli chcesz dodać koszulkę - wybierz jej rozmiar.</div>
                            <BBTshirts tshirtId={tshirtId} setShirtId={setShirtId} products={props.products} />
                            {tshirtId > 0 && (
                                <div className="my-4">
                                    <ToCartButton
                                        productId={tshirtId}
                                        label={"Dodaj koszulkę do koszyka"}
                                        bbParticipanId={props.participant?.pk}
                                        basketId={props.participant?.basket?.basketId}
                                        basketType={BASKET_TYPE_CHOICES.BASKET_BB}
                                        success_callback={basket_change_success_callback}
                                    />
                                    {/* <div className="button is-primary">Dodaj koszulkę do koszyka</div> */}
                                </div>
                            )}
                        </div>
                    )}
                </CartContext.Provider>
            </div>
        </>
    );
}
