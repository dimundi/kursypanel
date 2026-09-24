import p24 from "../../static/przelewy24.png";
import { useCartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { CheckIfUserIsLogged } from "../../classes/LoginHelper";
import AddrView from "../../components/elements/AddrView";
import { Input } from "../../components/forms/Input";
import { useForm } from "react-hook-form";
import RequestClass from "../../classes/RequestClass";
import {
    CUSTOM_LINK_TYPE,
    INVOICE_CHOICES,
    PAYMENT_SYS_CHOICES,
    SHIPMENT_REQ_TYPES_CHOICES,
    SHOP_CHOICES,
    SYSTEM_CHOICES,
} from "../../components/Enumerators";
import { isMobile } from "react-device-detect";
import CustomLinks from "../../components/elements/CustomLinks";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import CartClass from "../../classes/CartClass";
import CartItems from "./CartItems";

const CartPayment = () => {
    CheckIfUserIsLogged();

    // const PRZELEWY24_ID = "przelewy24";
    // const BANK_TRANSFER_ID = "przelewbankowy";
    const navigation = useNavigate();
    const { setBasketCnt } = useContext(UserContext);
    const { order, setActiveStepId, basketId, setNotification, getInvoiceData, system } = useCartContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function onSubmitPrev(data: any) {
        if (setActiveStepId) setActiveStepId(2);
    }

    function onSubmit_P24() {
        onSubmit(PAYMENT_SYS_CHOICES.PAYMENT_SYS_PRZELEWY24);
    }
    function onSubmit_BankTransfer() {
        onSubmit(PAYMENT_SYS_CHOICES.PAYMENT_SYS_BANK_TRANSFER);
    }

    function onSubmit(paymentSystem: PAYMENT_SYS_CHOICES) {
        /* kończymy -> wysyłamy zamówienie */
        const err_callback = (result: any) => {
            if (setNotification) setNotification(RequestClass.errorAlert(result));
        };

        const P24_callback = (result: any) => {
            setBasketCnt(0);
            if (result.orderId) {
                /*  jest sukces -> zamówienie zostało zarejestrowane w systemie
                    przechodzę do okna płatności */
                const goToPaymentPage = (result: any) => {
                    window.location = result.url;
                };

                return RequestClass.makeRequest("order/" + result.orderId + "/payment/", null, goToPaymentPage, err_callback);
            }
        };
        const banktransfer_callback = (result: any) => {
            setBasketCnt(0);
            if (result.orderId) {
                let path = "/zamowienie/przelew/" + result.orderId;
                navigation(path);
            }
        };
        let addrs = [];
        let invoiceType = INVOICE_CHOICES.INVOICE_NONE;
        if (system == SYSTEM_CHOICES.SYSTEM_BB) {
            addrs = [order?.addrShipment];
        } else {
            addrs = [order?.addrContact, order?.addrPayer];
            invoiceType = INVOICE_CHOICES.INVOICE_PRIV;
            if (order?.invoice === true) {
                if (order?.recipent === true) {
                    invoiceType = INVOICE_CHOICES.INVOICE_PAYER;
                } else {
                    invoiceType = INVOICE_CHOICES.INVOICE_PAYER_AND_RECIPENT;
                    addrs.push(order?.addrRecipient);
                }
            }
        }

        let dataToSend = {
            basketId: basketId,
            invoiceType: invoiceType,
            addrs: addrs,
            paymentSys: paymentSystem,
            suma: order?.summary,
            shopId: system == SYSTEM_CHOICES.SYSTEM_BB ? SHOP_CHOICES.SHOP_BB : SHOP_CHOICES.SHOP_KURSY,
        };

        var requestOptions = {
            method: "PUT",
            body: JSON.stringify(dataToSend),
        };
        RequestClass.makeRequest(
            "order/",
            requestOptions,
            paymentSystem === PAYMENT_SYS_CHOICES.PAYMENT_SYS_PRZELEWY24 ? P24_callback : banktransfer_callback,
            err_callback
        );
    }

    // const regulaminPath = process.env.PUBLIC_URL + '/Regulamin-2021.pdf'
    // console.log(regulaminPath)
    // console.log(order)
    let showShipmentData = CartClass.getShipmentRequiredType(order?.products) === SHIPMENT_REQ_TYPES_CHOICES.SHIPMENT_REQ_NONE ? false : true;
    return (
        <>
            {!isMobile && <> PODSUMOWANIE ZAMÓWIENIA </>}
            <CartItems
                can_product_edit={system === SYSTEM_CHOICES.SYSTEM_BB ? false : true}
                can_shipment_edit={false}
                show_shipment={system === SYSTEM_CHOICES.SYSTEM_BB ? true : false}
            />

            {getInvoiceData && (
                <>
                    <div className="columns">
                        <div className="column">
                            <AddrView addr={order?.addrContact} />
                        </div>

                        {order?.invoice === false ? (
                            <div className="column">
                                <AddrView addr={order?.addrPayer} title="Faktura imienna na dane:" />
                            </div>
                        ) : (
                            <>
                                <div className="column">
                                    <AddrView addr={order?.addrPayer} title="Dane płatnika:" />
                                </div>
                                {(order?.recipent === undefined || order?.recipent === false) && (
                                    <div className="column">
                                        <AddrView addr={order?.addrRecipient} title="Dane odbiorcy:" />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </>
            )}

            {showShipmentData && <AddrView addr={order?.addrShipment} title="Dane do wysyłki:" />}

            <form>
                <div className="has-text-left mt-4">
                    <Input
                        type="checkbox"
                        id="confirm_reg"
                        register={register}
                        errors={errors}
                        defaultValue={"inny"}
                        labelClassName="is-size-7 ml-2"
                        label={
                            <>
                                Zapoznałem się i akceptuję
                                <CustomLinks linkType={CUSTOM_LINK_TYPE.REWERS_SHOP_RULES} className="is-size-7 ml-2" showIcon={false} />{" "}
                            </>
                        }
                    ></Input>
                </div>
                <div>
                    <Input
                        type="checkbox"
                        id="confirm_reg2"
                        register={register}
                        errors={errors}
                        defaultValue={"inny"}
                        labelClassName="is-size-7 ml-2"
                        label="Wyrażam zgodę na udostępnianie moich danych osobowych zawartych w formularzu rejestracji zamówienia Firmom kurierskim i Systemom Płatności w celu i zakresie niezbędnym do realizacji zamówienia."
                    ></Input>
                    {/* <div className="mt-2">
                        Podanie danych w formularzu jest dobrowolne ale niezbędne do realizacji zamówienia. Posiada Pani/Pan prawo dostępu do treści
                        swoich danych i ich sprostowania, usunięcia, ograniczenia przetwarzania, prawo do przenoszenia danych, prawo do cofnięcia
                        zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania. Szczegóły dotyczące przetwarzania danych osobowych
                        przez Sprzedawcę określone są na stronie Polityki prywatności.
                    </div> */}
                </div>
                <div className="block has-text-centered mt-2">
                    <button className="button mr-4 py-2" onClick={handleSubmit(onSubmit_P24)}>
                        Zapłać z <img alt="Przelewy24" className="ml-2" src={p24} />
                    </button>
                    <button className="button py-4" onClick={handleSubmit(onSubmit_BankTransfer)}>
                        Zapłać przelewem tradycyjnym
                    </button>
                </div>

                {/* <div className="block has-text-centered is-flex is-flex-direction-column mt-2">
                    
                    <button
                        id={PAYMENT_SYS_CHOICES.PAYMENT_SYS_PRZELEWY24.toString()}
                        onClick={handleSubmit(onSubmit_P24)}
                        className="button is-primary"
                    >
                        Zapłać z <img alt="Przelewy24" className="ml-2" src={p24} />
                    </button>
                    
                    <button
                        id={PAYMENT_SYS_CHOICES.PAYMENT_SYS_BANK_TRANSFER.toString()}
                        onClick={handleSubmit(onSubmit_BankTransfer)}
                        className="button is-primary"
                    >
                        Zapłać przelewem tradycyjnym
                    </button>
                </div> */}
                <div className="has-text-centered">
                    <div className="button is-primary next-step" onClick={onSubmitPrev}>
                        <i className="mr-2 fas fa-chevron-left"></i> Wstecz
                    </div>
                </div>
            </form>
        </>
    );
};

export default CartPayment;
