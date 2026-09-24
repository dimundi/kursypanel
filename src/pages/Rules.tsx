import CustomLinks from "../components/elements/CustomLinks";
import { CUSTOM_LINK_TYPE } from "../components/Enumerators";
import bblogo from "../static/BB_logo.png";

const Rules = () => {
    return (
        <>
            <section className="hero is-small is-primary is-bold">
                <div className="hero-body">
                    <div className="container header-container">
                        <div className="mx-2">
                            <nav className="breadcrumb mb-1 is-size-7-mobile is-size-3" aria-label="breadcrumbs">
                                <ul>
                                    {/* <li><a href="#">Twoje konto</a></li> */}
                                    <li className="is-active ">Pliki do pobrania</li>
                                </ul>
                            </nav>
                            {/* <div>W tym miejscu zarządzasz ustawieniami swojego konta</div> */}
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container mt-6">
                    <div className="mx-2">
                        <div>
                            <CustomLinks linkType={CUSTOM_LINK_TYPE.REWERS_COURSE_OFFER} className="is-size-5" />
                        </div>
                        <div className="mt-3">
                            <CustomLinks linkType={CUSTOM_LINK_TYPE.REWERS_AKREDYTACJA} className="is-size-5" />
                        </div>
                        <div className="mt-3">
                            <CustomLinks linkType={CUSTOM_LINK_TYPE.WPIS_DO_EWIDENCJI} className="is-size-5" />
                        </div>
                        <hr />
                        <div>
                            <CustomLinks linkType={CUSTOM_LINK_TYPE.REWERS_SHOP_RULES} className="is-size-5" />
                        </div>
                        <hr />
                        <img src={bblogo} alt="Bieg Belfrów" width="10%" />
                        <div>
                            <CustomLinks linkType={CUSTOM_LINK_TYPE.BB_CURRENT_RULES} className="is-size-5" />
                        </div>
                        <div className="mt-3">
                            <CustomLinks linkType={CUSTOM_LINK_TYPE.BB_PHOTO_RULES} className="is-size-5" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Rules;
