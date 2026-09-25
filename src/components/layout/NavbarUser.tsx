import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import RequestClass from "../../classes/RequestClass";
import { SYSTEM_CHOICES } from "../Enumerators";
import { faCartShopping, faUser, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface INavbarUser {
    system?: SYSTEM_CHOICES;
    basketCnt?: number;
}

export const NavbarUser = (props: INavbarUser) => {
    const { isLogged, setIsLogged, user, setUser } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const container = useRef<HTMLDivElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);
    const location = useLocation();
    const initials = [user.first_name, user.last_name].map(name => name?.trim().charAt(0) || "").join("").toLocaleUpperCase("pl");
    useEffect(() => { setOpen(false); }, [location.pathname, isLogged]);
    useEffect(() => {
        if (!isLogged) return;
        let active = true;
        RequestClass.makeRequest("usr/", null, (result: any) => {
            if (active) setUser(result);
        }, () => {});
        return () => { active = false; };
    }, [isLogged, setUser]);
    useEffect(() => {
        if (!open) return;
        const outside = (event: PointerEvent) => {
            if (!container.current?.contains(event.target as Node)) setOpen(false);
        };
        const escape = (event: KeyboardEvent) => {
            if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
        };
        document.addEventListener("pointerdown", outside);
        document.addEventListener("keydown", escape);
        return () => {
            document.removeEventListener("pointerdown", outside);
            document.removeEventListener("keydown", escape);
        };
    }, [open]);

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
            <div className="panel-user-menu" ref={container} onBlur={event => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
            }}>
                <button ref={trigger} type="button" className="panel-user-trigger"
                    aria-label="Menu użytkownika" aria-expanded={open} aria-controls="panel-user-options"
                    onClick={() => setOpen(value => !value)}>
                    <span className="panel-user-avatar" aria-hidden="true">
                        {initials || <FontAwesomeIcon icon={faUser} />}
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} aria-hidden="true" />
                </button>
                {open && <nav id="panel-user-options" className="panel-user-options" aria-label="Ustawienia konta">
                    <Link to="/konto/osobowe">Dane osobowe</Link>
                    <Link to="/konto/rozliczeniowe">Dane rozliczeniowe</Link>
                    <Link to="/konto/zamowienia">Zamówienia</Link>
                    <Link to="/konto/kupony">Kupony</Link>
                    <button type="button" onClick={handleLogoutBtn}>Wyloguj się</button>
                </nav>}
            </div>
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
