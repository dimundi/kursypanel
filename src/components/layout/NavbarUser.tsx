import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import RequestClass from "../../classes/RequestClass";
import { SYSTEM_CHOICES } from "../Enumerators";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface INavbarUser {
    system?: SYSTEM_CHOICES;
    basketCnt?: number;
}

export const NavbarUser = (props: INavbarUser) => {
    const { isLogged, setIsLogged } = useContext(UserContext);

    const handleLogoutBtn = () => {
        const succ_callback = () => {
            sessionStorage.setItem("access_token", "");
            setIsLogged(false);
        };

        const err_callback = () => {
            sessionStorage.setItem("access_token", "");
            setIsLogged(false);
            //setNotification(RequestClass.errorAlert(result));
            // if (setIsUserInfoRead)
            //     setIsUserInfoRead(true)
        };

        RequestClass.makeRequest("logout/", null, succ_callback, err_callback);
    };

    const basket = props.basketCnt !== undefined && props.basketCnt > 0 ? (
        <Link to="/koszyk" reloadDocument title="Koszyk" className="button px-2 py-1">
            <FontAwesomeIcon icon={faCartShopping} />&nbsp;{props.basketCnt}
        </Link>
    ) : null;

    return isLogged ? (
        <>
            {basket}
            <a href="/szkolenia/kursy" className="button">Moje kursy</a>
            <a href="/bb/panel" className="button is-warning">Bieg Belfrów</a>
            <Link to="/konto" className="button">Konto</Link>
            <button type="button" className="button" onClick={handleLogoutBtn} title="Wyloguj" aria-label="Wyloguj się">
                <i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
            </button>
        </>
    ) : (
        <div className="buttons">
            {basket}
            {props.system !== SYSTEM_CHOICES.SYSTEM_BB && (
                <Link to="/rejestracja" className="button is-primary">Zarejestruj się</Link>
            )}
            <Link to="/login" className="button is-light">Zaloguj się</Link>
        </div>
    );
};
