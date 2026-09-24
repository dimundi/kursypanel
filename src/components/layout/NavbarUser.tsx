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

    function showBasket() {
        return (
            <>
                {props.basketCnt !== undefined && props.basketCnt > 0 && (
                    <Link to="/koszyk" reloadDocument title="koszyk">
                        <a className="button px-2 py-1">
                            <FontAwesomeIcon icon={faCartShopping} />
                            &nbsp;{props.basketCnt}
                        </a>
                    </Link>
                )}
            </>
        );
    }
    return (
        <>
            {isLogged === true ? (
                <>
                    {showBasket()}
                    <a className="ml-1 " href="/szkolenia/kursy">
                        <a className="button px-2 py-1">Moje kursy</a>
                    </a>
                    {/* <Link to="/kursy" reloadDocument className="ml-1">
                        <a className="button px-2 py-1">Moje kursy</a>
                    </Link> */}
                    {/* <Link to="/kursy" reloadDocument className="ml-1">
                        <a className="button px-2 py-1">Bieg Belfrów</a>
                    </Link> */}
                    <a className="ml-1 " href="/bb/panel">
                        <a className="button px-2 py-1 is-warning">Bieg Belfrów</a>
                    </a>
                    <Link to="/konto" reloadDocument className="ml-1">
                        <a className="button px-2 py-1">Konto</a>
                    </Link>

                    <a className="ml-1" onClick={handleLogoutBtn} title="Wyloguj">
                        <a className="button px-2 py-2">
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </a>
                    </a>
                </>
            ) : (
                <>
                    <div className="buttons">
                        {showBasket()}
                        {props.system === SYSTEM_CHOICES.SYSTEM_BB ? (
                            <></>
                        ) : (
                            // <Link to="/zapisy" reloadDocument>
                            //     <div className="button is-warning">Zapisz się</div>
                            // </Link>
                            <Link to="/rejestracja" reloadDocument>
                                <div className="button is-primary">Zarejestruj</div>
                            </Link>
                        )}
                        <Link to="/login" reloadDocument>
                            <div className="button is-light">Zaloguj</div>
                        </Link>
                    </div>
                </>
            )}
        </>
    );
};
