import { Dispatch, SetStateAction, useState } from "react";
import BBHelperClass, { ActivityMatrix } from "../../classes/BBHelperClass";
import { BB_ACTIVITY_CHOICES, BB_PAKIET_CHOICES } from "./BBEnum";
import { BBRankInputs } from "../bbrank/BBRankInputs";
import { Signal } from "@preact/signals-react";
import { IirbSignal } from "./BBUserPanel";
import { IBBParticipant } from "../../interfaces/IBB";

export interface IBBMyActivity {
    // activityType: IPakietType;
    // setShowMore: Dispatch<SetStateAction<bbUserPanelType>>;
    rankConsent?: boolean;
    irbSignal: Signal<IirbSignal>;
    participant: IBBParticipant;
}
export const BBMyActivity = (props: IBBMyActivity) => {
    const [showDetail, setShowDetail] = useState(false);
    return (
        <>
            <div className="mb-4">
                {props.rankConsent === true && (
                    <>
                        <BBRankInputs irbSignal={props.irbSignal} participant={props.participant} />
                    </>
                )}
            </div>
            <blockquote>
                <div className=" ">
                    Twoja aktywność to:{" "}
                    <span className="is-size-4">{BBHelperClass.getActivityName(props.irbSignal.value.pakiet.type)}</span>
                    <span className="ml-4 has-text-link" onClick={() => setShowDetail(!showDetail)}>
                        <i className="fa-solid fa-circle-info"></i>
                    </span>
                </div>
                {showDetail && (
                    <div className="mt-3">
                        {props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.IRON ? (
                            <div>
                                Aby zdobyć tytuł Iron Teachera wykonaj w październiku wszystkie trzy aktywności: przejdź min.{" "}
                                {ActivityMatrix[BB_PAKIET_CHOICES.IRON].distanceWalk} km, przebiegnij min.{" "}
                                {ActivityMatrix[BB_PAKIET_CHOICES.IRON].distanceRun} km, przejedź min.{" "}
                                {ActivityMatrix[BB_PAKIET_CHOICES.IRON].distanceRide} km, i zarejestruj swoją aktywność w
                                dowolnej aplikacji. Po zrealizowaniu aktywności prześlij zrzuty ekranu na bieg@odnrewers.pl
                                podając swój numer startowy. Po weryfikacji wyślemy Tobie <strong>puchar</strong>.
                            </div>
                        ) : (
                            <div>
                                Aby zasłużyć na medal Biegu Belfrów{" "}
                                {ActivityMatrix[props.irbSignal.value.pakiet.type as BB_PAKIET_CHOICES].form1} w październiku{" "}
                                <b>
                                    minimum {ActivityMatrix[props.irbSignal.value.pakiet.type as BB_PAKIET_CHOICES].distance} km
                                </b>{" "}
                                i zarejestruj swoją aktywność w dowolnej aplikacji.
                            </div>
                        )}
                    </div>
                )}
            </blockquote>

            <div className="mb-4">
                {(props.rankConsent === undefined || props.rankConsent === false) && (
                    <>
                        Nie bierzesz udziału w rywalizacji w ramach <strong>Indywidualnego Rankingu Belfrów</strong>.{" "}
                        <div>
                            Jeżeli chcesz brać udział w tej zabawie wyraź na to zgodę{" "}
                            <span
                                className="is-clickable has-text-link"
                                onClick={() => (props.irbSignal.value = { ...props.irbSignal.value, panel: "edit" })}
                            >
                                tutaj
                            </span>
                            .
                        </div>
                    </>
                )}
            </div>
            <div className="buttons is-right">
                <button
                    className="button"
                    onClick={() =>
                        (props.irbSignal.value = { ...props.irbSignal.value, panel: "none", activity: BB_ACTIVITY_CHOICES.NONE })
                    }
                >
                    Anuluj
                </button>
            </div>
        </>
    );
};
