import { useState } from "react";
import { useForm } from "react-hook-form";

import { Notification } from "../../components/Notification";
import { Input } from "../../components/forms/Input";
import RequestClass from "../../classes/RequestClass";
import UsrMsgTempl, { IUsrMsgTempl } from "./UserMsgTempl";
import IReqOptions from "../../interfaces/IReqOptions";
import { useParams } from "react-router-dom";
import SubmitButton from "../../components/forms/SubmitButton";
import { IUrlLogin } from "../../interfaces/IUrl";
import { SYSTEM_CHOICES } from "../../components/Enumerators";

export interface IRegister extends IUsrMsgTempl {}
export default function Register(props: IRegister) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // const [rulesAccepted, setRulesAccepted] = useState(true);
    /* informowanie o błędach API */
    const [notification, setNotification] = useState<JSX.Element | String>();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const urlParams = useParams<IUrlLogin>();
    let redirectVal = "";
    if (urlParams.redirect) {
        redirectVal = urlParams.redirect;
    }
    /* wyślij zapytanie o dane użytkownika do API */
    const succ_callback = (result: any) => {
        //console.log(result)
        setNotification(
            <Notification type="success">
                <>
                    Weryfikujemy Twój adres email. Sprawdź swoją skrzynkę odbiorczą, aby dokończyć proces rejestracji. Tytuł wiadomości email to{" "}
                    <strong>Aktywacja konta</strong> nadany przez <strong>formularz@odnrewers.pl</strong>. Sprawdź także folder SPAM.
                </>
            </Notification>
        );
        setIsSubmitted(false);
    };

    const err_callback = (result: any) => {
        setNotification(RequestClass.errorAlert(result));
        setIsSubmitted(false);
    };

    function submitRegister(data: any) {
        var requestOptions: IReqOptions = {
            method: "PUT",
            body: JSON.stringify({
                username: data.email,
                email: data.email,
                redirect: redirectVal,
                // system: HelperClass.redirectToSystemEnum(redirectVal),
                system: props.system,
            }),
            skipAuth: true,
        };

        RequestClass.makeRequest("usr/create/", requestOptions, succ_callback, err_callback);
        setIsSubmitted(true);
    }

    const formJSC = (
        <form>
            {/* onSubmit={handleSubmit(onRegisterSubmit, onRegisterErrors)}>     */}
            <Input
                id={"email"}
                name="email"
                label="Wprowadź adres email"
                placeholder="email"
                register={register}
                //  onChange={handleChange}
                //  defaultValue={props.data.email}
                errors={errors}
                className="mt-2"
                validateType="email"
            ></Input>
            <div>
                <Input
                    type="checkbox"
                    id={"rulesAccepted"}
                    // onChange={(data: any)=>console.log(setRulesAccepted(!data.target.checked))}
                    defaultChecked={false}
                    className="mt-5"
                    required={true}
                    register={register}
                    errors={errors}
                    labelClassName="is-size-7 ml-2"
                    label={
                        <>
                            Zapoznałem się i akceptuję{" "}
                            <a href="https://odnrewers.pl/polityka-prywatnosci/" target="_blank" rel="noopener noreferrer">
                                regulamin i politykę prywatności
                            </a>{" "}
                            serwisu.
                        </>
                    }
                ></Input>
            </div>
            <SubmitButton handleSubmit={handleSubmit} recaptcha={true} routine={submitRegister} isSubmitted={isSubmitted}>
                Załóż konto
            </SubmitButton>
            {/* <input className="button is-primary  mt-4" disabled={rulesAccepted} type="submit" value="Zarejestruj się" onClick={handleSubmit(submitRegister)}/> */}
            {notification}
        </form>
    );

    return (
        <UsrMsgTempl
            title={
                props.title != undefined
                    ? props.title
                    : props.system == SYSTEM_CHOICES.SYSTEM_KURSY
                    ? "Formularz rejestracji konta"
                    : "Formularz rejestracji konta"
            }
            system={props.system}
            noImage={props.noImage}
            className={props.className}
            subtitle={
                props.subtitle ||
                "Na podany adres e-mail wyślemy link, który pozwoli kontynuować proces rejestracji."
            }
        >
            {formJSC}
        </UsrMsgTempl>
    );
}
