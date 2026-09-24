import { useEffect, useState } from "react";
import UsrMsgTempl, { IUsrMsgTempl } from "./UserMsgTempl";
import { useParams } from "react-router-dom";
import { IUrlUserActivation } from "../../interfaces/IUrl";
import RequestClass from "../../classes/RequestClass";
import { Input } from "../../components/forms/Input";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { Notification } from "../../components/Notification";
import IReqOptions from "../../interfaces/IReqOptions";
import Wait from "../../components/elements/Wait";
import SubmitButton from "../../components/forms/SubmitButton";
import { Link } from "react-router-dom";

/*  props.activation === true => formularz aktywacji konta
    props.activation === false => formularz zmiany hasła
    */

export interface IActivation extends IUsrMsgTempl {
    activation: boolean;
}

export default function Activation(props: IActivation) {
    const urlParams = useParams<IUrlUserActivation>();
    const [step, setStep] = useState(1);
    /* informowanie o błędach API */
    const [notification, setNotification] = useState<JSX.Element | String>();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");

    let redirectVal = "";
    if (urlParams.redirect) {
        redirectVal = urlParams.redirect;
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const err_callback = (result: any) => {
        setNotification(RequestClass.errorAlert(result));
        setStep(0);
        setIsSubmitted(false);
    };

    useEffect(() => {
        if (step === 1) {
            /* wysyłam zapytanie o potwierdzenie klucza = weryfikacja emaila*/
            const succ_callback = (result: any) => {
                setLogin(result.login);
                setStep(2);
                setIsSubmitted(false);
            };

            var requestOptions: IReqOptions = {
                method: "GET",
                skipAuth: true,
            };

            RequestClass.makeRequest("usr/activation/?key=" + urlParams.key, requestOptions, succ_callback, err_callback);
        }
    }, [step]);

    // useEffect(() => {
    //     const el = document.getElementById('haslo');
    //     console.log("aaa")
    //     console.log(inputRef);
    //   }, []);

    /* ----------------------------------------------------------------------*/
    function submitActivation(data: any) {
        const succ_callback = (result: any) => {
            //setLogin(result.login)
            //setNotification(RequestClass.succAlert("Sukces!", "Hasło zostało zmienione."));
            setStep(4);
        };

        var requestOptions: IReqOptions = {
            method: "POST",
            body: JSON.stringify({
                key: urlParams.key,
                password: data.haslo,
                first_name: data.first_name,
                last_name: data.last_name,
            }),
            skipAuth: true,
        };

        RequestClass.makeRequest("usr/passwd/", requestOptions, succ_callback, err_callback);
        setIsSubmitted(true);
    }

    /* ----------------------------------------------------------------------*/
    function getReturnUrl() {
        let redirect = "/login";
        if (urlParams.redirect) {
            redirect += "/" + urlParams.redirect;
        }
        return redirect;
    }
    /* ----------------------------------------------------------------------*/
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.id === "haslo") setPass(e.target.value);
    }

    /* ----------------------------------------------------------------------*/
    return (
        <>
            <UsrMsgTempl
                title={props.activation ? "Aktywacja konta" : "Zmiana hasła"}
                system={props.system}
                noImage={props.noImage}
                className={props.className}
                subtitle={props.subtitle}
            >
                {step === 0 && (
                    <>
                        {/* <div>
                        <button className="button is-primary" onClick={()=>{setNotification("");setStep(2)}}>Spróbuj ponownie</button>
                    </div> */}
                    </>
                )}
                {step === 1 && <Wait text="Sprawdzam klucz aktywacyjny" />}
                {step === 2 && (
                    <>
                        {props.activation && (
                            <>
                                <div>
                                    <FontAwesomeIcon className="has-text-success-dark pr-3" icon={faFaceSmile} />
                                    Twój adres email został poprawnie zweryfikowany.
                                </div>
                            </>
                        )}

                        <div className="has-text-left">
                            <Input
                                id={"login"}
                                name="login"
                                label="Twój login"
                                placeholder="Login"
                                register={register}
                                //onChange={handleChange}
                                value={login}
                                errors={errors}
                                className="mt-2"
                                disabled={true}
                                required={false}
                                // validateType="email"
                            ></Input>

                            <div className="mt-4 mb-2">Utwórz hasło (min. 8 znaków):</div>
                            <div>
                                <Input
                                    type="password"
                                    id={"haslo"}
                                    name="haslo"
                                    label={props.activation ? "Hasło" : "Nowe hasło"}
                                    placeholder="hasło"
                                    register={register}
                                    onChange={handleChange}
                                    //defaultValue={props.data.email}
                                    errors={errors}
                                    className="mt-2"
                                    validateType="password"
                                ></Input>
                            </div>
                            <div className="mt-2">
                                <Input
                                    refValue={pass}
                                    type="password"
                                    id={"powtorz_haslo"}
                                    name="powtorz_haslo"
                                    label="Powtórz hasło"
                                    placeholder="powtórz hasło"
                                    register={register}
                                    errors={errors}
                                    className="mt-2"
                                    validateType="confirmPass"
                                ></Input>
                            </div>
                            {props.activation && (
                                <>
                                    <hr></hr>
                                    <Input
                                        type="text"
                                        id={"first_name"}
                                        name="first_name"
                                        label="Imię"
                                        placeholder="imię"
                                        register={register}
                                        onChange={handleChange}
                                        required={false}
                                        className="mt-2"
                                    ></Input>

                                    <Input
                                        type="text"
                                        id={"last_name"}
                                        name="last_name"
                                        label="Nazwisko"
                                        placeholder="nazwisko"
                                        register={register}
                                        onChange={handleChange}
                                        required={false}
                                        className="mt-2"
                                    ></Input>
                                    <hr></hr>
                                </>
                            )}

                            <div className="mt-5">
                                <SubmitButton handleSubmit={handleSubmit} recaptcha={true} routine={submitActivation} isSubmitted={isSubmitted}>
                                    {props.activation ? "Aktywuj konto" : "Zmiań hasło"}
                                </SubmitButton>
                            </div>
                            {/* <button className="button is-primary" onClick={handleSubmit(submitActivation)}>{props.activation ? "Aktywuj konto" : "Zmiań hasło"}</button> */}
                        </div>
                    </>
                )}
                {step === 4 && (
                    <>
                        <Notification type="success" lead="Sukces!">
                            {props.activation
                                ? "Konto zostało utworzone i aktywowane. Możesz teraz zalogować się do panelu."
                                : "Hasło zostało zmienione."}
                        </Notification>
                        <Link to={getReturnUrl()} className="button is-primary">
                            Zaloguj się
                        </Link>
                    </>
                )}

                {notification}
            </UsrMsgTempl>
        </>
    );
}
