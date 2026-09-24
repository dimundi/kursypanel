/* formatowanie terminu kursu */

import { useState } from "react";
import { BB_PAKIET_CHOICES } from "../bb/BBEnum";
import { NoOrphans } from "../../components/elements/NoOrphans";
// import { IBBActivity } from "../../interfaces/IBB";
import BBHelperClass, { ActivityMatrix } from "../../classes/BBHelperClass";
import { IProduct } from "../../interfaces/IProducts";
import { Link } from "react-router-dom";

export interface IBBActivityComp {
    activityType: BB_PAKIET_CHOICES;
    hideImage?: boolean;
    hideTabs?: boolean;
    hideRegister?: boolean;
    // hr?: boolean; // czy rysować linię po wyświetleniu teminu
    // breakLine?: boolean; // czy łamać linię po wyświetleniu teminu
    // showIcon?: boolean; // czy wyświetlać ikonę
    // showLabel?: boolean; // pokażnapis "termin:"
    // size?: componentSize;
}
export interface IActivityDesc {
    detail: string;
    how2do: JSX.Element;
    how2start: JSX.Element;
    pakiet: JSX.Element;
}

/* -------------------------------------------------
 *
 * ------------------------------------------------- */
function how2doDesc(activityType: BB_PAKIET_CHOICES) {
    if (activityType === BB_PAKIET_CHOICES.IRON) {
        return (
            <ul>
                <li>
                    Aby zdobyć tytuł Iron Teachera wykonaj w październiku wszystkie trzy aktywności:{" "}
                    <b>
                        {ActivityMatrix[BB_PAKIET_CHOICES.WALK].form1} min. {ActivityMatrix[BB_PAKIET_CHOICES.IRON].distanceWalk}{" "}
                        km, {ActivityMatrix[BB_PAKIET_CHOICES.RUN].form1} min.{" "}
                        {ActivityMatrix[BB_PAKIET_CHOICES.IRON].distanceRun} km, {ActivityMatrix[BB_PAKIET_CHOICES.RIDE].form1}{" "}
                        min. {ActivityMatrix[BB_PAKIET_CHOICES.IRON].distanceRide} km,
                    </b>{" "}
                    i zarejestruj swoją aktywność w dowolnej aplikacji.
                    <br />
                    <small>
                        Dystans pokonaj w wybranym przez siebie miejscu – jednorazowo lub podziel na mniejsze odległości.{" "}
                        <b>
                            Pamiętaj również, że możesz pokonać większe niż wymagane liczby kilometrów i zarejestrować wiele
                            aktywności.
                        </b>
                    </small>
                </li>
                <li>
                    Jeśli planujesz zrealizować większy dystans (jednorazowo lub podczas kilku{" "}
                    {ActivityMatrix[activityType].form3} w miesiącu) i chcesz, żeby Twój wynik pojawił się w&nbsp; ogólnopolskim
                    rankingu Biegu Belfrów:
                    <br />
                    <small>
                        <ul>
                            <li>Wyraź zgodę na publikację swojego nicku w tabeli rankingowej.</li>
                            <li>
                                Po każdej aktywności wpisz liczbę kilometrów, którą pokonałaś/eś. Lista jest aktualizowana na
                                bieżąco.
                            </li>
                            <li>Po zrealizowaniu aktywności prześlij zrzuty ekranu na bieg@odnrewers.pl</li>
                        </ul>
                    </small>
                </li>
            </ul>
        );
    }
    return (
        <>
            <ul>
                <li>
                    Aby zasłużyć na medal Biegu Belfrów {ActivityMatrix[activityType].form1} w październiku{" "}
                    <b>minimum {ActivityMatrix[activityType].distance} km</b> i zarejestruj swoją aktywność w dowolnej aplikacji.
                    <br />
                    <small>
                        Dystans pokonaj w wybranym przez siebie miejscu – jednorazowo lub podziel na mniejsze odległości.{" "}
                        <b>
                            Pamiętaj również, że możesz {ActivityMatrix[activityType].form2} więcej niż{" "}
                            {ActivityMatrix[activityType].distance} km i zarejestrować wiele aktywności.
                        </b>
                    </small>
                </li>
                <li>
                    Jeśli planujesz zrealizować większy dystans (jednorazowo lub podczas kilku{" "}
                    {ActivityMatrix[activityType].form3} w miesiącu) i chcesz, żeby Twój wynik pojawił się w&nbsp; ogólnopolskim
                    rankingu Biegu Belfrów:
                    <br />
                    <small>
                        <ul>
                            <li>Wyraź zgodę na publikację swojego nicku w tabeli rankingowej.</li>
                            <li>
                                Po każdej aktywności wpisz liczbę kilometrów, którą pokonałaś/eś. Lista jest aktualizowana na
                                bieżąco.
                            </li>
                            <li>
                                Pamiętaj o każdorazowym rejestrowaniu swojej aktywności w dowolnej aplikacji. Możemy prosić Cię o
                                udokumentowanie pokonanego dystansu w postaci np. zrzuty ekranu z programu.
                            </li>
                        </ul>
                    </small>
                </li>
            </ul>
        </>
    );
}

/* -------------------------------------------------
 *
 * ------------------------------------------------- */
function how2startDesc(activityType: BB_PAKIET_CHOICES) {
    return (
        <>
            <ul>
                <li>
                    <Link to="/zapisy" reloadDocument>
                        Zaloguj się
                    </Link>{" "}
                    i zapisz na Bieg Belfrów.
                    <br />
                    <small>Możesz zapisać się indywidualnie, utworzyć grupę lub dołączyć do już istniejącej.</small>
                </li>
                <li>
                    Wybierz pakiet <b>{ActivityMatrix[activityType].packageName.toUpperCase()}</b> i - opcjonalnie - koszulkę{" "}
                    <br />
                    <small>Możesz wybrać więcej kategorii.</small>
                </li>
                <li>Ureguluj opłatę startową.</li>
                <li>
                    Po zaksięgowaniu płatności, na wskazany adres, wyślemy pakiet startowy
                    {activityType === BB_PAKIET_CHOICES.IRON && (
                        <>, a po udokumentowaniu przez Ciebie zrealizowanych dystansów – statuetkę Iron Teachera</>
                    )}
                    .
                </li>
            </ul>
        </>
    );
}

/* -------------------------------------------------
 *
 * ------------------------------------------------- */
function pakietDesc(activityType: BB_PAKIET_CHOICES) {
    return (
        <>
            Pakiet startowy kosztuje {ActivityMatrix[activityType].price} zł (+koszt wysyłki) i&nbsp;zawiera:
            <ul>
                <li>medal</li>
                {activityType === BB_PAKIET_CHOICES.IRON && <li>statuetka Iron Teachera</li>}
                <li>pamiątkowy gadżet</li>
                <li>numer startowy do pobrania w PDF</li>
            </ul>
            <small>Opcjonalnie, podczas zapisu, możesz dokupić koszulkę Biegu Belfrów.</small>
        </>
    );
}

/* -------------------------------------------------
 *
 * ------------------------------------------------- */
export const ActivityDesc: { [key in BB_PAKIET_CHOICES]: IActivityDesc } = {
    0: {
        detail: "- ? -",
        pakiet: <></>,
        how2do: <></>,
        how2start: <></>,
    },
    /* ACTIVITY_WALK = 1, */
    1: {
        detail: "Ubierz wygodne buty, włącz aplikację i wybierz się na minimum 6&nbsp;km spacer – samodzielnie lub z innymi Belferkami i Belframi. Tu nie liczy się tempo, ale pomaganie, zdrowie i endorfiny!",
        pakiet: pakietDesc(BB_PAKIET_CHOICES.WALK),
        how2do: how2doDesc(BB_PAKIET_CHOICES.WALK),
        how2start: how2startDesc(BB_PAKIET_CHOICES.WALK),
    },
    /*ACTIVITY_RUN = 2, */
    2: {
        detail: "Koniecznie zrób rozgrzewkę i przebiegnij minimum 6&nbsp;km. Możesz pokusić się o pobicie rekordu życiowego lub po prostu zaplanować spokojny trucht. ",
        pakiet: pakietDesc(BB_PAKIET_CHOICES.RUN),
        how2start: how2startDesc(BB_PAKIET_CHOICES.RUN),
        how2do: how2doDesc(BB_PAKIET_CHOICES.RUN),
    },
    /* ACTIVITY_RIDE = 3, */
    3: {
        detail: "Przygotuj rower, włóż kask i ruszaj przed siebie. Gdy licznik pokaże 12&nbsp;km, możesz skończyć przejażdżkę lub dać się ponieść rowerowej przygodzie!",
        pakiet: pakietDesc(BB_PAKIET_CHOICES.RIDE),
        how2start: how2startDesc(BB_PAKIET_CHOICES.RIDE),
        how2do: how2doDesc(BB_PAKIET_CHOICES.RIDE),
    },
    /*ACTIVITY_IRON = 4,*/
    4: {
        detail: "To zadanie nie tylko dla matematyków: dodaj do siebie wszystkie dyscypliny i pomnóż kilometry! Zrealizuj wyzwanie, a otrzymasz specjalną statuetkę Iron Teachera!",
        pakiet: pakietDesc(BB_PAKIET_CHOICES.IRON),
        how2start: how2startDesc(BB_PAKIET_CHOICES.IRON),
        how2do: how2doDesc(BB_PAKIET_CHOICES.IRON),
    },
};

// const IconDown = () => {
//     return (
//         <span className="icon">
//             <i className="fas fa-angle-down" aria-hidden="true"></i>
//         </span>
//     );
// };

// const IconUp = () => {
//     return (
//         <span className="icon">
//             <i className="fas fa-angle-up" aria-hidden="true"></i>
//         </span>
//     );
// };

type infoBox = "none" | "how2start" | "pakiet" | "how2do";

/* -------------------------------------------------
 * baner w sklepie
 * bbActivities -> charakterystyka aktywności odczytana z API, jezeli undefined to zastosuj jakieś wartości domyślne
 * ------------------------------------------------- */
export const BBActivityShop = (props: { activityType: BB_PAKIET_CHOICES; bbActivity?: IProduct }) => {
    if (props.bbActivity == undefined || props.bbActivity.inStore == undefined || props.bbActivity.inStore.length == 0) {
        return <></>;
    }

    let productObj = props.bbActivity.inStore[0];

    return (
        <>
            <div className="media">
                <div className="media-left">
                    <figure className="image is-48x48">
                        <img
                            src={ActivityMatrix[props.activityType].icon.toString()}
                            alt={ActivityMatrix[props.activityType].title}
                        />
                    </figure>
                </div>
                <div className="media-content">
                    <div className="title is-4">{productObj.vName}</div>
                    <div className="subtitle is-6">
                        minimum {ActivityMatrix[props.activityType].distance}
                        {ActivityMatrix[props.activityType].distanceWalk}
                        {ActivityMatrix[props.activityType].distanceWalk && " + "}
                        {ActivityMatrix[props.activityType].distanceRun}
                        {ActivityMatrix[props.activityType].distanceRun && " + "}
                        {ActivityMatrix[props.activityType].distanceRide}
                        &nbsp;km
                        <div>
                            <strong>{productObj.price} </strong>
                            <small>zł</small>
                        </div>
                        {/* <div>
                            <a href="">więcej informacji</a>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};
/* -------------------------------------------------
 * mały baner aktywności
 * ------------------------------------------------- */
export const BBActivityBanner = (props: { activityType: BB_PAKIET_CHOICES }) => {
    return (
        <>
            <div className="media">
                <div className="media-left">
                    <figure className="image is-48x48">
                        <img
                            src={ActivityMatrix[props.activityType].icon.toString()}
                            alt={ActivityMatrix[props.activityType].title}
                        />
                    </figure>
                </div>
                <div className="media-content">
                    <div className="title is-4">{ActivityMatrix[props.activityType].title}</div>
                    <div className="subtitle is-6">
                        minimum {ActivityMatrix[props.activityType].distance}
                        {ActivityMatrix[props.activityType].distanceWalk}
                        {ActivityMatrix[props.activityType].distanceWalk && " + "}
                        {ActivityMatrix[props.activityType].distanceRun}
                        {ActivityMatrix[props.activityType].distanceRun && " + "}
                        {ActivityMatrix[props.activityType].distanceRide}
                        &nbsp;km
                    </div>
                </div>
            </div>
        </>
    );
};
/* -------------------------------------------------
 * baner na stronie
 * ------------------------------------------------- */
const BBActivityComp = (props: IBBActivityComp) => {
    const [showMore, setShowMore] = useState("none" as infoBox);
    return (
        <>
            <div className="card">
                {!(props.hideImage === true) && (
                    <div className="card-image">
                        <figure className="image">
                            <img
                                src={ActivityMatrix[props.activityType].img.toString()}
                                alt={ActivityMatrix[props.activityType].title}
                            />
                        </figure>
                    </div>
                )}
                <div className="card-content">
                    <BBActivityBanner activityType={props.activityType} />

                    {/* <div className="content"> */}
                    <NoOrphans className="content">{ActivityDesc[props.activityType].detail}</NoOrphans>

                    {/* {showMore === "how2" && <div className="pt-3"> {ActivityDesc[props.activityType].how2} </div>}
                        {showMore === "pakiet" && <div className="pt-3"> {ActivityDesc[props.activityType].pakiet} </div>} */}
                    {/* </div> */}
                    {!(props.hideTabs === true) && (
                        <footer className="card-footer">
                            <button
                                className={"card-footer-item button is-ghost " + (showMore === "how2start" && " is-underlined")}
                                onClick={() => setShowMore(showMore === "how2start" ? "none" : "how2start")}
                            >
                                Jak zacząć
                            </button>

                            <button
                                className={"card-footer-item button is-ghost " + (showMore === "how2do" && " is-underlined")}
                                onClick={() => setShowMore(showMore === "how2do" ? "none" : "how2do")}
                            >
                                Realizacja
                            </button>

                            <button
                                className={"card-footer-item button is-ghost " + (showMore === "pakiet" && " is-underlined")}
                                onClick={() => setShowMore(showMore === "pakiet" ? "none" : "pakiet")}
                            >
                                Pakiet startowy
                            </button>
                        </footer>
                    )}
                    <div className="content">
                        {showMore === "how2start" && <div className="pt-3"> {ActivityDesc[props.activityType].how2start} </div>}
                        {showMore === "how2do" && <div className="pt-3"> {ActivityDesc[props.activityType].how2do} </div>}
                        {showMore === "pakiet" && <div className="pt-3"> {ActivityDesc[props.activityType].pakiet} </div>}
                        {/* {showMore !== "none" && props.hideRegister !== true && (
                            <div className="pt-4">
                                <Link to="/zapisy" reloadDocument>
                                    <div className="button is-warning">Zapisz się teraz</div>
                                </Link>
                            </div>
                        )} */}
                    </div>
                    {/* <footer className="card-footer" onClick={() => setShowMore(!showMore)}>
                        <p className="card-header-title">{!showMore ? "Pokaż więcej" : "Pokaż mniej"}</p>
                        <button className="card-header-icon" aria-label="more options">
                            {!showMore ? <IconDown /> : <IconUp />}
                        </button>
                    </footer> */}
                </div>
            </div>
        </>
    );
};

export default BBActivityComp;
