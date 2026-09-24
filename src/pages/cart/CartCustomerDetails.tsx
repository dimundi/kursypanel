import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCartContext } from "../../context/CartContext";
import RequestClass from "../../classes/RequestClass";
import { CheckIfUserIsLogged } from "../../classes/LoginHelper";
import { InvoiceFormInputs } from "../../components/forms/InvoiceFormInputs";
import { ADDR_TYPE_CHOICES, BASKET_UNKNOWN, SHIPMENT_REQ_TYPES_CHOICES } from "../../components/Enumerators";
import CartClass from "../../classes/CartClass";
import { ShipmentFormInputs } from "../../components/forms/ShipmentFormInputs";

const CartCustomerDetails = () => {
    const { setActiveStepId, basketId, order, setOrder, isUserInfoRead, setIsUserInfoRead, shipments, getInvoiceData } = useCartContext();

    let nextDisabled = false;

    if (basketId === BASKET_UNKNOWN) {
        CheckIfUserIsLogged("koszyk");
    } else {
        CheckIfUserIsLogged("koszyk_" + basketId);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    /* wyślij zapytanie o dane użytkownika do API */
    const succ_callback = (result: any) => {
        /* przypisuję dane domyślne */
        let aName = result.first_name + " " + result.last_name;
        if (setOrder) {
            // setOrders(result.orders)
            setOrder({
                ...order,
                addrContact: {
                    ...order?.addrContact,
                    aName: aName,
                    email: result.email,
                    tel: result.tel,
                },
                addrPayer: {
                    ...result.default.addrPayer,
                    addrType: ADDR_TYPE_CHOICES.ADDR_TYPE_PAYER_BY_USER,
                },
                addrRecipient: {
                    ...result.default.addrRecipient,
                    addrType: ADDR_TYPE_CHOICES.ADDR_TYPE_RECIPIENT_BY_USER,
                },
                addrShipment: {
                    ...result.default.addrShipment,
                    addrType: ADDR_TYPE_CHOICES.ADDR_TYPE_SHIPMENT_BY_USER,
                    email: result.default.email === undefined ? result.email : result.default.email,
                    aName: result.default.aName === undefined ? aName : result.default.aName,
                },
                invoice: result.default.invoice,
                recipent: result.default.recipient,
            });
        }
        if (setIsUserInfoRead) setIsUserInfoRead(true);

        /* to jest konieczne, aby skoasować informację o błędzie, jeżeli była tam chwilę wcześniej */
        // if (notification)
        //   setNotification("");
    };

    const err_callback = (result: any) => {
        //setNotification(RequestClass.errorAlert(result));
        if (setIsUserInfoRead) setIsUserInfoRead(true);
    };

    useEffect(() => {
        if (isUserInfoRead === false) RequestClass.makeRequest("usr/", null, succ_callback, err_callback);
    }, [isUserInfoRead]);

    function onSubmitNext(data: any) {
        if (setActiveStepId) setActiveStepId(3);
    }

    function onSubmitPrev(data: any) {
        if (setActiveStepId) setActiveStepId(1);
    }
    if (!isUserInfoRead) {
        return <>Proszę czekać pobieranie danych użytkownika.</>;
    }

    let isShipmentRequired = CartClass.getShipmentRequiredType(order?.products) === SHIPMENT_REQ_TYPES_CHOICES.SHIPMENT_REQ_NONE ? false : true;
    // let showShipmentData = CartClass.getShipmentRequiredType(order?.products) === SHIPMENT_REQ_TYPES_CHOICES.SHIPMENT_REQ_NONE ? false : true;
    /* tutaj używamy shipment wybrnay wcześniej order.shipment */
    if (isShipmentRequired == true && order?.shipment?.prodDef?.deliveryType == undefined) nextDisabled = true;
    return (
        <>
            <form>
                <div className="columns">
                    {isShipmentRequired && (
                        <div className="column">
                            <ShipmentFormInputs
                                classNames="center-with-margin"
                                order={order}
                                setOrder={setOrder}
                                register={register}
                                errors={errors}
                                changeMethod_callback={onSubmitPrev}
                            />
                        </div>
                    )}
                    {getInvoiceData && (
                        <div className="column">
                            <InvoiceFormInputs
                                classNames="center-with-margin"
                                order={order}
                                setOrder={setOrder}
                                register={register}
                                errors={errors}
                            />
                        </div>
                    )}
                </div>
            </form>
            <div className="mt-5 has-text-centered">
                <div className="mr-2 button is-primary" onClick={onSubmitPrev}>
                    <i className="mr-2 fas fa-chevron-left"></i> Wstecz
                </div>
                <button className="button is-primary " disabled={nextDisabled} onClick={handleSubmit(onSubmitNext)}>
                    Przejdź dalej <i className="ml-2 fas fa-chevron-right"></i>
                </button>
            </div>
        </>
    );
};

export default CartCustomerDetails;
