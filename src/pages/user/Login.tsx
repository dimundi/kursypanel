import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./PasswordToggle.scss";
import { useForm } from "react-hook-form";
import { Input } from "../../components/forms/Input";
import UsrMsgTempl, { IUsrMsgTempl } from "./UserMsgTempl";
import RequestClass from "../../classes/RequestClass";
import { useContext, useState } from "react";
import IReqOptions from "../../interfaces/IReqOptions";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Notification } from "../../components/Notification";
import { IUrlLogin } from "../../interfaces/IUrl";
import SubmitButton from "../../components/forms/SubmitButton";
import { SYSTEM_CHOICES } from "../../components/Enumerators";

export interface ILogin extends IUsrMsgTempl {
    hideRegisterLink?: boolean;
}

export default function Login(props: ILogin) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const urlParams = useParams<IUrlLogin>();
    const [notification, setNotification] = useState<JSX.Element | String>();
    const { setIsLogged, setUserName, setUser } = useContext(UserContext);
    const navigation = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isCouponRedirect = urlParams.redirect?.startsWith("kupon_");
    // const captchaRef = useRef<ReCAPTCHA>(null)

    /* ----------------------------------------------------------------------*/
    const err_callback = (result: any) => {
        setNotification(RequestClass.errorAlert(result));
        setIsSubmitted(false);
    };
    /* ----------------------------------------------------------------------*/
    function submitLogin(data: any) {
        const succ_callback = (result: any) => {
            if (result.hasOwnProperty("access_token")) {
                sessionStorage.setItem("access_token", result.access_token);
                setIsLogged(true);

                setUser(result.user);
                // console.log(result.user);
                if (result.user.first_name) {
                    setUserName(result.user.first_name);
                } else setUserName("Twoje imię");

                /* teraz fajne przekierowanie */
                if (urlParams.redirect) navigation("/" + urlParams.redirect.replaceAll("_", "/"));
                else {
                    if (props.system === SYSTEM_CHOICES.SYSTEM_BB) navigation("/panel");
                    else navigation("/kursy");
                }
            } else {
                //Nie powiodło się
                setNotification(<Notification type="danger">Brak tokena autoryzacji.</Notification>);
            }
            setIsSubmitted(false);
        };
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("password", data.haslo);
        urlencoded.append("username", data.login);
        if (process.env.REACT_APP_CLIENT_ID) urlencoded.append("client_id", process.env.REACT_APP_CLIENT_ID);
        if (process.env.REACT_APP_CLIENT_SECRET) urlencoded.append("client_secret", process.env.REACT_APP_CLIENT_SECRET);
        urlencoded.append("grant_type", "password");

        var requestOptions: IReqOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            skipAuth: true,
            // server: 'auth'
        };
        setNotification(<></>);
        RequestClass.makeRequest("login/", requestOptions, succ_callback, err_callback);
        setIsSubmitted(true);
    }

    /* ----------------------------------------------------------------------*/
    return (
        <UsrMsgTempl
            title="Zaloguj się"
            system={props.system}
            noImage={props.noImage}
            className={props.className}
            subtitle={props.subtitle}
            introContent={
                isCouponRedirect ? (
                    <>
                        <h1 className="panel-coupon-heading">
                            <FontAwesomeIcon icon={faCertificate} aria-hidden="true" />
                            <span>
                                Aktywacja
                                <br />
                                kuponu
                            </span>
                        </h1>
                        <p>
                            Kliknąłeś link aktywujący kupon, który uruchomi szkolenie na Twoim koncie. Aby to zrobić, musisz
                            być zalogowany.
                            <br />
                            Jeśli nie masz jeszcze konta,{" "}
                            <Link to={"/rejestracja/" + urlParams.redirect}>załóż je</Link>
                            {" "}i kontynuuj rejestrację. Jeśli w trakcie zakładania konta zgubisz kod kuponu, użyj ponownie
                            linku aktywacyjnego z wiadomości.
                        </p>
                    </>
                ) : props.introContent
            }
        >
            <div className="has-text-left">
                <form>
                    <Input
                        id={"login"}
                        name="login"
                        placeholder="Login" label="Login"
                        register={register}
                        errors={errors}
                        className="mt-2"
                    ></Input>

                    <label htmlFor="haslo">Hasło</label>
                    <div className="login-password-control">
                        <Input
                            type={showPassword ? "text" : "password"}
                            id="haslo"
                            name="haslo"
                            placeholder="Hasło"
                            register={register}
                            errors={errors}
                            className="mt-2"
                        />
                        <button
                            type="button"
                            className="login-password-toggle"
                            aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                            aria-pressed={showPassword}
                            aria-controls="haslo"
                            onClick={() => setShowPassword((visible) => !visible)}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>

                    <SubmitButton handleSubmit={handleSubmit} recaptcha={false} routine={submitLogin} isSubmitted={isSubmitted}>
                        Zaloguj
                    </SubmitButton>
                </form>
                <div className="mt-2 is-size-6">
                    {urlParams.redirect ? (
                        <Link to={"/passwdreminder/" + urlParams.redirect}>Nie pamiętam hasła</Link>
                    ) : (
                        <Link to="/passwdreminder">Nie pamiętam hasła</Link>
                    )}
                </div>

                {!(props.hideRegisterLink == true) && (
                    <div className="mt-5 is-size-6">
                        {urlParams.redirect ? (
                            <Link to={"/rejestracja/" + urlParams.redirect}>Chcę założyć konto</Link>
                        ) : (
                            <Link to="/rejestracja">Chcę założyć konto</Link>
                        )}
                    </div>
                )}
                {notification}
            </div>
        </UsrMsgTempl>
    );
}
