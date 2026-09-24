import React, { Dispatch, useContext, useState } from "react";
import { BASKET_TYPE_CHOICES, BOOKING_TYPES_CHOICES } from "../../components/Enumerators";
import { Notification } from "../../components/Notification";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CartClass from "../../classes/CartClass";
import RequestClass from "../../classes/RequestClass";
import { IInStore } from "../../interfaces/IProducts";
import { RefCallBack } from "react-hook-form";

/*
  przycisk dodawania do koszyka albo zapytanie
*/
interface IToCartButton {
    inStore?: IInStore;
    productId?: number; // productId produktu, który dodajemy do koszyka -> używamy jeżeli inStore === undefined
    className?: string;
    setIsClicked?: Dispatch<boolean>; // setIsClicked - event  informujący, że został wciśnięty przycisk
    label?: string; // label przycisku, jeżeli nie podano to go tworzę
    basketId?: string; // wymuszamy id koszyka
    basketType?: BASKET_TYPE_CHOICES; // wymuszamy typ koszyka
    success_callback?: RefCallBack;
    bbParticipanId?: number; // id uczestnika BB, to ma zastosowanie jeżeli dodajemy produkt do nieistniejącego koszyka, wówczas ten koszuk jest tworzony i przypisany do BBeditionUser o tym ID
}

const ToCartButton = (props: IToCartButton) => {
    const [msg, setMsg] = useState<JSX.Element>();
    const { setBasketCnt, setInquiryCnt } = useContext(UserContext);
    const [isSubmitted, setIsSubmitted] = useState(false);

    /* bt - booking type */
    let label = props.label;
    if (label === undefined) label = props.inStore?.bookingType === BOOKING_TYPES_CHOICES.BOOKING_TYPE_ONLINE ? "Do koszyka" : "Wyślij zapytanie";

    let productId = props.inStore?.productId;
    if (productId === undefined) productId = props.productId;

    let bookingType = props.inStore?.bookingType;
    if (bookingType === undefined) bookingType = BOOKING_TYPES_CHOICES.BOOKING_TYPE_ONLINE;

    let basketType = BASKET_TYPE_CHOICES.BASKET_INQUIRY;
    if (bookingType === BOOKING_TYPES_CHOICES.BOOKING_TYPE_ONLINE) basketType = BASKET_TYPE_CHOICES.BASKET_ORDER;
    if (props.basketType !== undefined) basketType = props.basketType;

    function basket_order_callback(result: any) {
        if (props.setIsClicked) {
            props.setIsClicked(true);
        }

        try {
            setBasketCnt(result.products.length);
        } catch (e) {
            console.log(e);
        }

        setIsSubmitted(false);
        if (props.success_callback) {
            props.success_callback(undefined);
        } else
            setMsg(
                <Notification>
                    Dodano do koszyka!
                    <NavLink to="/koszyk">
                        <br />
                        Zobacz koszyk
                    </NavLink>{" "}
                </Notification>
            );
    }
    // const location = useLocation();

    function basket_inquiry_callback(result: any) {
        setMsg(
            <Notification>
                Zobacz <Link to="/zapytanie">formularz zapytania</Link> lub kontynuuj i dodaj kolejne szkolenia.
            </Notification>
        );
        if (props.setIsClicked) {
            props.setIsClicked(true);
        }

        try {
            setInquiryCnt(result.products.length);
        } catch (e) {
            console.log(e);
        }

        // if(location.pathname.includes("/list/")) {
        //   // console.log(location.pathname.substring(location.pathname.length - 1))
        //   navigate("/inquiry/"+location.pathname.substring(location.pathname.length - 1));
        // } else {
        //   navigate("/inquiry");
        // }
        // setMsg(<Notification msg={<>Utworzono zapytanie<NavLink to="/zapytanie"><br/>Zobacz zapytanie</NavLink></>} lead="" />);
    }

    function basket_error_callback(result: any) {
        setIsSubmitted(false);
        setMsg(RequestClass.errorAlert(result));
    }
    function action() {
        if (productId !== undefined) {
            setIsSubmitted(true);
            return CartClass.add({
                productId: productId,
                basketId: props.basketId,
                basketType: basketType,
                custom_success_callback:
                    props.inStore?.bookingType === BOOKING_TYPES_CHOICES.BOOKING_TYPE_ONLINE ? basket_order_callback : basket_inquiry_callback,
                custom_error_callback: basket_error_callback,
                bbParticipanId: props.bbParticipanId,
            });
        }
    }

    return (
        <>
            {msg !== undefined ? (
                msg
            ) : (
                <>
                    {productId && (
                        <button className={"p-2 button is-primary " + props.className + (isSubmitted ? " is-loading" : "")} onClick={() => action()}>
                            {label}
                        </button>
                    )}
                </>
            )}
        </>
    );
};

export default ToCartButton;
