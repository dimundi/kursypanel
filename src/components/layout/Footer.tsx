import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";
import CustomLinks from "../elements/CustomLinks";
import { ADRES_1_BIURO, ADRES_2_BIURO, CUSTOM_LINK_TYPE, EMAIL_BIURO, TELEFON_BIURO } from "../Enumerators";
import { Debug } from "../elements/Debug";
import { isMobile } from "react-device-detect";
import fblogo from "../../static/facebook.png";

const Footer = () => {
    return (
        <>
            <CookieConsent buttonText="Rozumiem i kontynuuję przeglądanie strony.">
                Ta strona wykorzystuje pliki cookies. Zapoznaj się z naszą{" "}
                <CustomLinks linkType={CUSTOM_LINK_TYPE.REWERS_SHOP_RULES} showIcon={false} label={<>polityką prywatności</>} />.{" "}
            </CookieConsent>

            {/* <div className="my-3"></div> */}
            <div className="has-text-centered is-flex-align-items-flex-end mt-auto ">
                <div className="content has-text-centered has-background-white-ter py-6">
                    <Debug>
                        <div>Renderuję na: {isMobile ? "TELEFONIE" : "KOMPUTERZE"}</div>
                        <div className="is-size-5">{process.env.REACT_APP_API_URL}</div>
                    </Debug>

                    <nav className="level">
                        <div className="level-item">
                            <div>
                                <strong>Biuro Obsługi Klienta</strong>
                                <br /> {ADRES_1_BIURO}, {ADRES_2_BIURO}
                                <br />
                                tel. {TELEFON_BIURO} {EMAIL_BIURO}
                                <div className="mt-4">
                                    <a href="https://www.facebook.com/osrodekrewers" target="_blank">
                                        <img src={fblogo} alt="Nasza strona na fecebook" width="5%" />
                                        <span className="ml-2">https://www.facebook.com/osrodekrewers</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="level-item ">
                            <div>
                                <Link to="/pliki">Pliki do pobrania</Link>
                                <br />
                                <CustomLinks
                                    linkType={CUSTOM_LINK_TYPE.REWERS_SHOP_RULES}
                                    className="is-size-6"
                                    showIcon={false}
                                />
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};
export default Footer;
