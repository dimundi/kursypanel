import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import logo from "../../static/ODNRewers_sm.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bblogo from "../../static/BB_logo.png";
// import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavbarOferta } from "./NavbarOferta";
import { NavbarUser } from "./NavbarUser";
import AnimationSideButton from "../elements/AnimationSideButton";

const Navigation = () => {
    const [isHamburgerActive, setIsHamburgerActive] = React.useState(false);
    const { basketCnt, inquiryCnt } = useContext(UserContext);
    const navigation = useNavigate();
    const location = useLocation();

    let categoryId = "";
    if (location.pathname.includes("/list/")) {
        categoryId = location.pathname.substring(location.pathname.length - 1);
    }

    return (
        <>
            {inquiryCnt > 0 &&
                location.pathname.includes("zapytanie") === false &&
                location.pathname.includes("kontakt") === false && (
                    <AnimationSideButton to={"/zapytanie/" + categoryId} />
                    // <div className="fix-bottom-button">
                    //     <Link to={"/zapytanie/" + categoryId} className="has-text-white">
                    //         Twoje zapytanie
                    //     </Link>
                    // </div>
                )}

            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <div className="navbar-item is-clickable" onClick={() => navigation("/")}>
                        <a href="https://odnrewers.pl">
                            <img src={logo} alt="ODN Rewers" />
                        </a>
                    </div>
                    <div className="navbar-item is-clickable" onClick={() => navigation("/")}>
                        <a href="https://biegbelfrow.pl/bb/">
                            <img src={bblogo} alt="Bieg Belfrów" />
                        </a>
                    </div>

                    {/* <Link to="/koszyk" reloadDocument className="navbar-item navbar-burger burger">
                <FontAwesomeIcon icon={faCartShopping} />{basketCnt}
                </Link> */}

                    <div
                        onClick={() => {
                            setIsHamburgerActive(!isHamburgerActive);
                        }}
                        role="button"
                        className={`navbar-burger burger ${isHamburgerActive ? "is-active" : ""}`}
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarMainMenu"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </div>
                </div>

                <div id="navbarMainMenu" className={`navbar-menu ${isHamburgerActive ? " is-active" : ""}`}>
                    <div className="navbar-start">
                        {isHamburgerActive ? (
                            <NavbarOferta />
                        ) : (
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a
                                    className="navbar-link"
                                    onClick={() => {
                                        if (isHamburgerActive) setIsHamburgerActive(!isHamburgerActive);
                                    }}
                                >
                                    Oferta szkoleń
                                </a>

                                <div className="navbar-dropdown is-active">
                                    <NavbarOferta />
                                </div>
                            </div>
                        )}

                        <Link to="/kontakt" reloadDocument className="navbar-item">
                            Kontakt
                        </Link>
                    </div>

                    <div className="navbar-end">
                        <NavbarUser basketCnt={basketCnt} />
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;
