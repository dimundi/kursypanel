import { CONTACT_URL } from "../elements/ContactRedirect";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import logo from "../../static/rewers-logo.svg";
import { useLocation } from "react-router-dom";
import { TRAINING_OFFER_URL } from "../elements/TrainingOfferRedirect";
import { NavbarUser } from "./NavbarUser";
import AnimationSideButton from "../elements/AnimationSideButton";

const Navigation = () => {
    const [isHamburgerActive, setIsHamburgerActive] = React.useState(false);
    const { basketCnt, inquiryCnt } = useContext(UserContext);
    const location = useLocation();
    const categoryId = "";
    useEffect(() => { setIsHamburgerActive(false); }, [location.pathname]);
    return (
        <>
            {inquiryCnt > 0 && !location.pathname.includes("zapytanie") && !location.pathname.includes("kontakt") && (
                <AnimationSideButton to={"/zapytanie/" + categoryId} />
            )}
            <nav className="navbar panel-navbar" aria-label="Nawigacja panelu szkoleń">
                <div className="navbar-brand">
                    <a className="navbar-item panel-brand" href="/szkolenia" aria-label="Rewers — platforma szkoleniowa">
                        <img src={logo} alt="Rewers — Ośrodek Doskonalenia Nauczycieli" width="200" height="42" />
                    </a>
                    <button type="button" onClick={() => setIsHamburgerActive(!isHamburgerActive)}
                        className={`navbar-burger burger ${isHamburgerActive ? "is-active" : ""}`}
                        aria-label={isHamburgerActive ? "Zamknij menu" : "Otwórz menu"}
                        aria-expanded={isHamburgerActive} aria-controls="navbarMainMenu">
                        <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
                    </button>
                </div>
                <div id="navbarMainMenu" className={`navbar-menu ${isHamburgerActive ? "is-active" : ""}`}>
                    <div className="navbar-start">
                        <a href={TRAINING_OFFER_URL} className="navbar-item">Oferta szkoleń</a>
                        <a href={CONTACT_URL} className="navbar-item">Kontakt</a>
                    </div>
                    <div className="navbar-end panel-account-nav"><NavbarUser basketCnt={basketCnt} /></div>
                </div>
            </nav>
        </>
    );
};
export default Navigation;
