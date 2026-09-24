import React, { useContext } from "react";
// import { UserContext } from "../../context/UserContext";
import logo from "../../static/Rewers.png";
import bblogo from "../../static/BB_logo.png";
import { useLocation, useNavigate } from "react-router-dom";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavbarUser } from "../../components/layout/NavbarUser";
import { SYSTEM_CHOICES } from "../../components/Enumerators";

const Navigation = () => {
    const [isHamburgerActive, setIsHamburgerActive] = React.useState(false);
    // const { isLogged, userName } = useContext(UserContext);
    const navigation = useNavigate();
    const location = useLocation();

    let categoryId = "";
    if (location.pathname.includes("/list/")) {
        categoryId = location.pathname.substring(location.pathname.length - 1);
    }

    return (
        <section>
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
                    {/* <div className="navbar-start">
                        <Link to="/kontakt" reloadDocument className="navbar-item">
                            Kontakt
                        </Link>
                    </div> */}

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <NavbarUser system={SYSTEM_CHOICES.SYSTEM_BB} />
                            {/* <div className="buttons">
                                
                                <Link to="/zapisy" reloadDocument>
                                    <a className="button is-primary">Zapisz się</a>
                                </Link>
                                <Link to="/login" reloadDocument>
                                    <a className="button is-light">Zaloguj</a>
                                </Link>
                            </div> */}
                        </div>
                    </div>
                    {/* <div className="navbar-end">
                              {isHamburgerActive ? (
                            <>
                                <hr className="my-0" />
                                <NavbarUser />
                            </>
                        ) : (
                            <div className="navbar-item has-dropdown is-hoverable">
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <a className="navbar-link">
                                        {isLogged === true ? (
                                            <span>{userName ? userName : <FontAwesomeIcon icon={faUser} />}</span>
                                        ) : (
                                            <span>Moje konto</span>
                                        )}
                                    </a>

                                    <div className="navbar-dropdown">
                                        {" "}
                                        <NavbarUser />{" "}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div> */}
                </div>
            </nav>
            <hr style={{ padding: 0, margin: 0 }} />
        </section>
    );
};

export default Navigation;
