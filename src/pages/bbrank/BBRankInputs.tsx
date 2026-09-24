import { useEffect, useState } from "react";
import HelperClass from "../../classes/HelperClass";
import { Input } from "../../components/forms/Input";
import { useForm } from "react-hook-form";
import { BB_ACTIVITY_CHOICES, BB_PAKIET_CHOICES } from "../bb/BBEnum";
import { batch, effect, Signal } from "@preact/signals-react";

import { useSignals } from "@preact/signals-react/runtime";
import { IirbSignal } from "../bb/BBUserPanel";
import RequestClass from "../../classes/RequestClass";
import { requestState } from "../../components/types/custom";
import { IBBParticipant, IBBUserDistances } from "../../interfaces/IBB";
import { BBRankCells } from "./BBRankCells";
import { isMobile } from "react-device-detect";

interface IBBRankInputs {
    irbSignal: Signal<IirbSignal>;
    participant: IBBParticipant;
}
/* *************************************************************************************************** */
export const BBRankInputs = (props: IBBRankInputs) => {
    /* *************************************************************************************************** */
    const [apiReadState, setApiReadState] = useState("Start" as requestState);
    const [userDistanceTable, setUserDistanceTable] = useState([] as IBBUserDistances[]);
    const [notification, setNotification] = useState<JSX.Element | String>();
    const [showDetail, setShowDetail] = useState(false);

    useEffect(() => {
        const err_callback = (result: any) => {
            setNotification(RequestClass.errorAlert(result));
            setApiReadState("Error");
        };
        const succ_callback = (result: any) => {
            // console.log(result);
            // console.log(result.userDistanceTable);
            setUserDistanceTable(result.userDistanceTable);

            setApiReadState("OK");
            // if (result.participants.length === 0) setTab("ADD");
            // setNotification(<></>);
        };
        if (apiReadState === "Start") {
            /* wysyłam zapytanie do API */
            setApiReadState("Progress");
            RequestClass.makeRequest("bb/participant/" + props.participant.pk + "/rank", null, succ_callback, err_callback);
            setNotification(<></>);
        }
    }, [apiReadState]);

    /* *************************************************************************************************** */

    function getDistanceTable(activity: BB_ACTIVITY_CHOICES) {
        if (userDistanceTable !== undefined)
            for (var i = 0; i < userDistanceTable.length; i++) {
                if (userDistanceTable[i].activityType === activity) {
                    return userDistanceTable[i];
                }
            }
        return { activityType: activity, table: [] } as IBBUserDistances;
    }

    /* *************************************************************************************************** */
    useSignals();

    if (props.irbSignal.value.activity == BB_ACTIVITY_CHOICES.NONE) {
        /* ustawiam domyślny */
        if (props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.IRON) {
            props.irbSignal.value = { ...props.irbSignal.value, activity: BB_ACTIVITY_CHOICES.WALK };
        } else if (props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.WALK) {
            props.irbSignal.value = { ...props.irbSignal.value, activity: BB_ACTIVITY_CHOICES.WALK };
        } else if (props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.RUN) {
            props.irbSignal.value = { ...props.irbSignal.value, activity: BB_ACTIVITY_CHOICES.RUN };
        } else if (props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.RIDE) {
            props.irbSignal.value = { ...props.irbSignal.value, activity: BB_ACTIVITY_CHOICES.RIDE };
        }
    }
    return (
        <>
            <blockquote className="mb-0">
                <div className={"mt-3" + (isMobile ? " is-size-5" : " is-size-4")}>
                    Indywidualny Ranking Belfrów
                    <span className="ml-2 has-text-link is-size-6" onClick={() => setShowDetail(!showDetail)}>
                        <i className="fa-solid fa-circle-info"></i>
                    </span>
                    {showDetail && (
                        <>
                            <div className="is-size-7 mb-4">Twoje dzienne pokonane dystanse</div>
                            <div className="is-size-5">Najczęściej zadawane pytania</div>
                            <div className="is-size-6 mt-2">
                                Jak wprowadzać dane?
                                <div className="is-size-7">
                                    W komórce oznaczonej na właściwy dzień wpisz łączny dystans kilometrów pokonanych danego
                                    dnia. <br></br>Dystans wprowadź w kilometrach z dokładnością do jednego miejsca po przecinku.
                                    <br></br> Na przykład dystans 1.47 km wprowadź jako 1.4 km
                                </div>
                            </div>
                            <div className="is-size-6 mt-2">
                                Dlaczego nie mogę wprowadzić dystansów z poprzednich dni?
                                <div className="is-size-7">
                                    Pokonane dystanse możesz wprowadzać tylko do dwóch dni wstecz. <br></br>Jest to podstawowa
                                    zasada regulaminu, od której nie ma odstępstw.
                                </div>
                            </div>
                            <div className="is-size-6 mt-2">
                                W jaki sposób będą weryfikowane pokonane dystanse?
                                <div className="is-size-7">
                                    Każdą aktywność zarejestruj w dowolnej aplikacji. <br></br>Liczymy na Twoją uczciwość we
                                    wprowadzaniu danych, jednakże zgodnie z zasadami regulaminu, możemy w każdym momencie prosić
                                    Ciebie o udokumentowanie pokonanego dystansu i przesłanie nam na przykład zrzutu ekranu z
                                    aplikacji, która zarejestrowała wybraną aktywność.
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </blockquote>
            <blockquote className="mt-0 has-background-white">
                <>
                    <div className="tabs is-left">
                        <ul>
                            {(props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.IRON ||
                                props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.WALK) && (
                                <li className={props.irbSignal.value.activity == BB_ACTIVITY_CHOICES.WALK ? "is-active" : ""}>
                                    <a
                                        onClick={() =>
                                            (props.irbSignal.value = {
                                                ...props.irbSignal.value,
                                                activity: BB_ACTIVITY_CHOICES.WALK,
                                            })
                                        }
                                    >
                                        Spacer
                                    </a>
                                </li>
                            )}
                            {(props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.IRON ||
                                props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.RUN) && (
                                <li className={props.irbSignal.value.activity == BB_ACTIVITY_CHOICES.RUN ? "is-active" : ""}>
                                    <a
                                        onClick={() =>
                                            (props.irbSignal.value = {
                                                ...props.irbSignal.value,
                                                activity: BB_ACTIVITY_CHOICES.RUN,
                                            })
                                        }
                                    >
                                        Bieg
                                    </a>
                                </li>
                            )}
                            {(props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.IRON ||
                                props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.RIDE) && (
                                <li className={props.irbSignal.value.activity == BB_ACTIVITY_CHOICES.RIDE ? "is-active" : ""}>
                                    <a
                                        onClick={() =>
                                            (props.irbSignal.value = {
                                                ...props.irbSignal.value,
                                                activity: BB_ACTIVITY_CHOICES.RIDE,
                                            })
                                        }
                                    >
                                        Rower
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                    {apiReadState === "Progress" && <progress className="progress is-small is-primary" max="100"></progress>}
                    {apiReadState === "Error" && { notification }}
                    {(apiReadState === "OK" || apiReadState == "Idle") && (
                        <>
                            {props.irbSignal.value.activity == BB_ACTIVITY_CHOICES.WALK && (
                                <BBRankCells
                                    distanceTable={getDistanceTable(BB_ACTIVITY_CHOICES.WALK)}
                                    irbSignal={props.irbSignal}
                                    participant={props.participant}
                                    setUserDistanceTable={setUserDistanceTable}
                                />
                            )}
                            {props.irbSignal.value.activity == BB_ACTIVITY_CHOICES.RUN && (
                                <BBRankCells
                                    distanceTable={getDistanceTable(BB_ACTIVITY_CHOICES.RUN)}
                                    irbSignal={props.irbSignal}
                                    participant={props.participant}
                                    setUserDistanceTable={setUserDistanceTable}
                                />
                            )}
                            {props.irbSignal.value.activity == BB_ACTIVITY_CHOICES.RIDE && (
                                <BBRankCells
                                    distanceTable={getDistanceTable(BB_ACTIVITY_CHOICES.RIDE)}
                                    irbSignal={props.irbSignal}
                                    participant={props.participant}
                                    setUserDistanceTable={setUserDistanceTable}
                                />
                            )}
                        </>
                    )}
                </>
            </blockquote>
        </>
    );
};
