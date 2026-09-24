import { useForm } from "react-hook-form";
import { Input } from "../../components/forms/Input";
import UsrMsgTempl from "./UserMsgTempl";
import RequestClass from "../../classes/RequestClass";
import { useState } from "react";
import IReqOptions from "../../interfaces/IReqOptions";
import { Notification } from "../../components/Notification";
import { useParams } from "react-router-dom";
import { IUrlLogin } from "../../interfaces/IUrl";
import SubmitButton from "../../components/forms/SubmitButton";
import { SYSTEM_CHOICES } from "../../components/Enumerators";

export interface IPasswdReminder {
    system?: SYSTEM_CHOICES; // BB - Bieg Belfra
}
export default function PasswdReminder(props: IPasswdReminder) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [notification, setNotification] = useState<JSX.Element | String>();
    const urlParams = useParams<IUrlLogin>();
    const [isSubmitted, setIsSubmitted] = useState(false);
    /* ----------------------------------------------------------------------*/
    const err_callback = (result: any) => {
        setNotification(RequestClass.errorAlert(result));
        setIsSubmitted(false);
    };
    /* ----------------------------------------------------------------------*/
    function submitLogin(data: any) {
        const succ_callback = (result: any) => {
            setNotification(
                <Notification type="success">
                    Wysłaliśmy wiadomość z linkiem do zmiany hasła. Sprawdź swoją skrzynkę mailową i postępuj zgodnie z otrzymaną
                    instrukcją.
                </Notification>
            );
            setIsSubmitted(false);
        };

        let redirect = "";
        if (urlParams.redirect) {
            redirect = urlParams.redirect;
        }
        var requestOptions: IReqOptions = {
            method: "POST",
            body: JSON.stringify({ email: data.email, redirect: redirect, system: props.system }),
            skipAuth: true,
        };

        RequestClass.makeRequest("usr/passwdreset/", requestOptions, succ_callback, err_callback);
        setIsSubmitted(true);
    }

    /* ----------------------------------------------------------------------*/
    return (
        <>
            <UsrMsgTempl title="Resetowanie hasła" system={props.system}>
                <div className="has-text-left">
                    <Input
                        id={"email"}
                        name="email"
                        label="Wpisz adres email powiązany z Twoim kontem:"
                        placeholder="Email"
                        register={register}
                        validateType="email"
                        errors={errors}
                        // className='mt-2'
                    ></Input>

                    <SubmitButton handleSubmit={handleSubmit} recaptcha={true} routine={submitLogin} isSubmitted={isSubmitted}>
                        Resetuj hasło
                    </SubmitButton>

                    {/* <button className="button is-primary  mt-4" onClick={handleSubmit(submitLogin)}>
                        Resetuj hasło
                    </button> */}

                    {notification}
                </div>
            </UsrMsgTempl>
        </>
    );
}
