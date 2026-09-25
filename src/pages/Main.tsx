import { TRAINING_OFFER_URL } from "../components/elements/TrainingOfferRedirect";
import { Link } from "react-router-dom";
import { CATEGORY_CHOICES } from "../components/Enumerators";
import { BrowserView, MobileView } from "react-device-detect";
import { NoOrphans } from "../components/elements/NoOrphans";

const Main = () => {
    return (
        <>
            <section
                className="hero is-medium is-primary is-bold"
                // style={{
                //     background: `url('${process.env.PUBLIC_URL}/images/szkolenia-bg.jpg')`,

                // }}
            >
                <div
                    className="hero-body hero_main_image"
                    // style={{
                    //     background: `url('${process.env.PUBLIC_URL}/images/szkolenia-bg.jpg')`,
                    //     backgroundSize: "cover",
                    // }}
                >
                    <div className="has-text-white container px-3">
                        <BrowserView>
                            <h1 className="title has-text-white is-size-3 is-size-4-mobile mt-6">Szkolenia dla nauczycieli</h1>
                            <NoOrphans className="my-3 is-size-5 is-size-6-mobile">
                                Jako akredytowany ODN prowadzimy wysoko oceniane szkolenia dla nauczycieli: szkoleniowe rady pedagogiczne i szkolenia
                                online (webinaria). Nasza propozycja skierowana jest zarówno do indywidualnych odbiorców, jak i rad pedagogicznych.
                                Specjalizujemy się również w organizacji na terenie całego kraju wyjazdów szkoleniowo-integracyjnych dla nauczycieli.
                            </NoOrphans>
                            <NoOrphans className="my-3">
                                Skorzystaj z naszej wyszukiwarki szkoleń i wybierz formę doskonalenia odpowiednią dla ciebie lub twojego zespołu.
                            </NoOrphans>
                            <div className="mt-6"></div>
                        </BrowserView>
                        <MobileView>
                            <h1 className="title has-text-white is-size-3 is-size-4-mobile mt-4">Szkolenia dla nauczycieli</h1>
                            <NoOrphans className="my-2 is-size-6 ">
                                Jako akredytowany ODN prowadzimy wysoko oceniane szkolenia dla nauczycieli.
                            </NoOrphans>
                            <div className="mt-4"></div>
                        </MobileView>

                        <div className="is-flex is-flex-wrap-wrap is-justify-content-space-around">
                            <div className="">
                                <Link to={TRAINING_OFFER_URL} className="box main-action-box">
                                    <div>
                                        <NoOrphans className="is-size-3 is-size-5-mobile mb-3 has-text-weight-semibold has-text-white">
                                            Oferta dla indywidualnych odbiorców
                                        </NoOrphans>
                                        <NoOrphans className="has-text-white">Webinary i szkolenia dla wszystkich.</NoOrphans>
                                    </div>
                                </Link>
                            </div>
                            <div className="">
                                <Link to={TRAINING_OFFER_URL} className="box main-action-box">
                                    <div>
                                        <NoOrphans className="is-size-3 is-size-5-mobile mb-3 has-text-weight-semibold has-text-white">
                                            Oferta dla rad pedagogicznych
                                        </NoOrphans>
                                        <NoOrphans className="has-text-white">
                                            Webinary, szkolenia stacjonarne, wyjazdy szkoleniowo-integracyjne.
                                        </NoOrphans>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/*           
          <Link to={'/list/3'} className="box main-action-box">
          <div>
            <img src={szkolenia_ekursy} />
          </div>
          <div>
            <h2 className="title">eKursy</h2>
            <div>Interaktywne kursy do samodzielnej nauki.</div>
          </div>
          </Link> */}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Main;
