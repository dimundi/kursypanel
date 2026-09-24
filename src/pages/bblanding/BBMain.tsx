import BBActivityComp from "./BBActivityComp";
import { BB_PAKIET_CHOICES } from "../bb/BBEnum";
import BBUserGallery from "./BBUserGallery";
import { NoOrphans } from "../../components/elements/NoOrphans";
import BBRank from "../bbrank/BBRank";
import { Link } from "react-router-dom";
import { BBPomagamy } from "./BBPomagamy";
import { BBUlotka } from "./BBUlotka";
import { isMobile } from "react-device-detect";

const BBMain = () => {
    const logoBB = require("../../static/images/BB5_logo.png");
    const edycjaBB = require("../../static/images/BB5_edycja.png");

    const d = new Date();
    let showRankTable = d.getMonth() >= 9 ? true : false;
    return (
        <>
            <section
                className="hero is-medium is-primary is-bold"
                // style={{
                //     background: `url('${process.env.PUBLIC_URL}/images/szkolenia-bg.jpg')`,

                // }}
            >
                <div className="hero-body hero_bbmain_image">
                    {/* <div className="column has-text-centered "> */}
                    {/* <h1 className="title has-text-white is-size-3 is-size-4-mobile mt-6">Bieg Belfrów</h1> */}
                    {/* <div className="card" style={{ backgroundColor: "hsla(0, 0%, 30%, 0.6)" }}>
                        <div className="card-content "> */}
                    <nav className="level" style={{ backgroundColor: "rgba(3, 30, 55, 0.3)" }}>
                        <div className="level-item"></div>
                        <div className="level-item has-text-centered ">
                            <div>
                                <figure className="image">
                                    <img src={logoBB} />
                                </figure>
                                {/* <Link to="/zapisy" reloadDocument>
                                    <div className="button is-warning">Zapisz się</div>
                                </Link> */}

                                <figure>
                                    <img src={edycjaBB} />
                                </figure>
                            </div>
                        </div>
                        <div className="level-item"></div>
                    </nav>
                    {/* </div> */}
                    {/* </div> */}
                    {/* </div> */}
                </div>
            </section>
            {/* <BodyContainer noPadding={true} className="mb-2"> */}
            <section className="container  has-text-centered py-4 px-5">
                <div className="is-size-2 py-6">5. edycja Biegu Belfrów staje się historią</div>
                {/* <nav className="level">
                    <div className="level-left">
                        <div className="level-item"> */}
                <div className="is-size-5">
                    Dziękujemy wszystkim za emocje i uczestnictwo. <br></br>Przygotowujemy podsumowanie, które wkrótce
                    opublikujemy.<br></br> Już teraz zapraszamy Was na kolejną edycję, którą planujemy w maju 2025.
                </div>
            </section>
            <section className="container  has-text-centered py-4 px-5">
                <div className="is-size-2 py-6">Aktywni belfrowie – pomagają i inspirują</div>
                {/* <nav className="level">
                    <div className="level-left">
                        <div className="level-item"> */}
                <div className="is-size-5">
                    <NoOrphans>
                        Ogólnopolski Bieg Belfrów już od 2021 r. zrzesza pracowników oświaty, którzy poprzez aktywność (spacer,
                        bieg lub jazdę na rowerze) pomagają potrzebującym dzieciom. Aktywni Belfrowie starują indywidualnie lub w
                        grupach. Jest to doskonała okazja do integracji zespołu nauczycielskiego czy też całej społeczności
                        szkolnej. Bieg Belfrów to dobrze spędzony czas, endorfiny, satysfakcja zarówno z realizacji aktywności
                        sportowej, jak&nbsp;i&nbsp;z&nbsp;faktu pomagania innym. Ponadto jest to inspiracja dla uczniów – aktywni
                        Belfrowie pokazują swoim podopiecznym, że aktywność fizyczna jest ważna i wartościowa. Jeśli jesteś
                        pracownikiem placówki systemu oświaty i/lub posiadasz wykształcenie pedagogiczne/ nauczycielskie, weź
                        udział w V edycji charytatywnego Biegu Belfrów.
                    </NoOrphans>
                </div>
                <div className={"mt-4 is-flex" + (isMobile ? " is-flex-wrap-wrap" : "")}>
                    {/* <a href="https://forms.gle/efifNCMHYZcgS6Lz9">
                        <figure className="image m-1">
                            <img src="https://odnrewers.pl/media/bb/BB5_slide_szkolenie_mozg.png" />
                        </figure>
                        Zapisz się na bezpłatny webinar
                    </a> */}

                    <a href="https://www.facebook.com/osrodekrewers">
                        <figure className="image m-1">
                            <img src="https://odnrewers.pl/media/bb/BB5_slide_konkurs_foto.png" />
                        </figure>
                    </a>
                    <figure className="image m-1">
                        <img src="https://odnrewers.pl/media/bb/BB5_slide_koszulka.png" />
                    </figure>
                </div>
                {/* <div className={"mt-4 is-flex" + (isMobile ? " is-flex-wrap-wrap" : "")}>
                    <a href="https://www.facebook.com/osrodekrewers/posts/pfbid02RkThB1u8bHvgqs1Y1TEhLmhRd5puengNmaRNKWNyLJc7xc79B9KKrbkYveGdPi2ul">
                        <figure className="image m-1">
                            <img src="https://odnrewers.pl/media/bb/BB5_slide_ustawka.png" />
                        </figure>
                    </a>
                    <figure className="image m-1">
                        <img src="https://odnrewers.pl/media/bb/BB5_slide_koszulka.png" />
                    </figure>
                </div> */}
                {showRankTable && (
                    <>
                        <div className="mt-5 is-flex is-flex-direction-row">
                            {!isMobile && (
                                <figure className="image pr-2">
                                    <img src={require("../../static/images/BB_on.png")} />
                                </figure>
                            )}

                            <div style={{ flex: 2 }}>
                                <BBRank />
                            </div>
                            {!isMobile && (
                                <figure className="image pl-2">
                                    <img src={require("../../static/images/BB_ona.png")} />
                                </figure>
                            )}
                        </div>
                    </>
                )}

                <div className="is-size-5 mt-4">
                    {/* <hr /> */}
                    <div>
                        Organizatorem Biegu Belfrów jest{" "}
                        <a href="https://odnrewers.pl" target="_blank">
                            Ośrodek Doskonalenia Nauczycieli Rewers
                        </a>
                        .
                    </div>
                    <div>
                        Jesteśmy twórcami{" "}
                        <a href="https://wgs.edu.pl" target="_blank">
                            Wirtualnej Gazetki Szkolnej
                        </a>
                        .
                    </div>
                </div>
                <div className="is-flex is-justify-content-center py-5">
                    <div className="mx-4">
                        <figure className="image">
                            <img src="https://odnrewers.pl/media/ODN_logo_sm.png" />
                        </figure>
                    </div>
                    <div className="mx-4">
                        <figure className="image">
                            <img src="https://odnrewers.pl/media/WGS_logo_sm.png" />
                        </figure>
                    </div>
                </div>
            </section>
            {/* </BodyContainer> */}
            <BBUserGallery />
            {/* <section className="container has-text-centered py-4 px-5">
                <div className="is-size-4 py-4">Uwaga! Konkurs! </div>
                <div>Zrób zdjęcie podczas realizacji wybranej konkurencji i zamieść je w komentarzu pod naszym postem.</div>
                <div>
                    Kliknij <a href="">TUTAJ</a> i poznaj szczegóły konkursu oraz sprawdź, co możesz wygrać.
                </div>
            </section> */}

            {/* <section className="container has-text-centered py-4 px-5">
                <div className="is-size-4 py-4">Jak to działa</div>
            </section> */}

            <section className="container has-text-centered pt-6 pb-4 px-5">
                <nav className="level">
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="title">Gdzie?</p>
                            <p className="heading">
                                Ty decydujesz.
                                <br />
                                To ogólnopolskie
                                <br />
                                wydarzenie wirtualne.
                                <br />
                                <br />
                            </p>
                            {/* <div className="button">
                                <span className="icon">
                                    <i className="fa-solid fa-arrow-down"></i>
                                </span>
                            </div> */}
                            {/* <div>Startujesz w wybranym przez Ciebie miejscu. </div> */}
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="title">Kiedy?</p>
                            <p className="heading">
                                W dowolnym dniu <br />
                                między 1 a 31 października.
                                <br />
                                <br />
                                <br />
                            </p>
                            {/* <div className="button">
                                <span className="icon">
                                    <i className="fa-solid fa-arrow-down"></i>
                                </span>
                            </div> */}
                            {/* <div>Startujesz w wybranym przez Ciebie miejscu. </div> */}
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="title">Jak?</p>
                            <p className="heading">
                                {/* <Link to="/zapisy" reloadDocument> */}
                                Zapisz się
                                {/* </Link> */}
                                , <br />
                                wykonaj i zarejestruj
                                <br />
                                wybraną aktywność
                                <br />w dowolnej aplikacji.
                            </p>
                            {/* <div className="button">
                                <span className="icon">
                                    <i className="fa-solid fa-arrow-down"></i>
                                </span>
                            </div> */}
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="title">Z kim?</p>
                            <p className="heading">
                                Indywidualnie
                                <br />
                                lub dołącz do grupy.
                                <br />
                                <br />
                                <br />
                            </p>
                            {/* <div className="button">
                                <span className="icon">
                                    <i className="fa-solid fa-arrow-down"></i>
                                </span>
                            </div> */}
                        </div>
                    </div>
                </nav>
            </section>

            <section className="container py-4">
                <section className="container has-text-centered py-4 px-5 ">
                    <div className="is-size-3 py-4">Wybierz jedną z dyscyplin:</div>
                </section>

                <div className="columns ">
                    <div className="column">
                        <BBActivityComp activityType={BB_PAKIET_CHOICES.WALK} />
                    </div>
                    <div className="column">
                        <BBActivityComp activityType={BB_PAKIET_CHOICES.RUN} />
                    </div>
                    <div className="column">
                        <BBActivityComp activityType={BB_PAKIET_CHOICES.RIDE} />
                    </div>
                </div>

                <section className="container has-text-centered py-4 px-5">
                    <div className="is-size-3 py-4">…a może chcesz zdobyć tytuł Iron Teachera?</div>
                </section>

                <div className="columns">
                    <div className="column"></div>
                    <div className="column">
                        <BBActivityComp activityType={BB_PAKIET_CHOICES.IRON} />
                    </div>
                    <div className="column"></div>
                </div>
            </section>

            <section className="container py-6">
                <BBPomagamy />
                {/* <BBUlotka /> */}
            </section>
            {/* </BodyContainer> */}
        </>
    );
};

export default BBMain;
