import { useState } from "react";
import { RefCallBack } from "react-hook-form";
import BBHelperClass from "../../classes/BBHelperClass";
import HelperClass from "../../classes/HelperClass";
import RequestClass from "../../classes/RequestClass";
import { PROD_VARIANT_CHOICES } from "../../components/Enumerators";
import { IBBParticipant } from "../../interfaces/IBB";
import { ACTIVITY_STATUS_CHOICES, BB_ACTIVITY_CHOICES } from "./BBEnum";
import { BBMyActivity } from "./BBMyActivity";
import { isMobile } from "react-device-detect";
import BBCart from "./BBCart";
import { IProduct } from "../../interfaces/IProducts";
import { requestState } from "../../components/types/custom";
import { BBRankButtons } from "../bbrank/BBRankButtons";
import { BBRegisterEditUser } from "./BBRegisterEditUser";
import { Signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { IirbSignal } from "./BBUserPanel";

/* *******************************************************************************************************
 *
 * ******************************************************************************************************* */
export interface IBBUserPanelEl {
    refresh_calback: RefCallBack | null; // return kiedy odświeżamy interfejs
    participant: IBBParticipant;
    products?: IProduct[];
    irbSignal: Signal<IirbSignal>;
}

export const BBUserPanelEl = (props: IBBUserPanelEl) => {
    // const [editMode, setEditMode] = useState(false);
    const [notification, setNotification] = useState<JSX.Element | String>();
    const [isSubmittedStartNo, setIsSubmittedStartNo] = useState("Idle" as requestState);
    let toPay = HelperClass.calcBasket(props.participant.basket);
    let paymentPanding = HelperClass.isPaymentPanding(props.participant.products);
    // let pakietType = BBHelperClass.getParticipantActivityType(props.participant);
    //const [showMore, setShowMore] = useState("none" as bbUserPanelType);

    /* sygnał do komponentow zależnych */

    /* *************************************************************************************************** */
    function showTshirts() {
        let tshirts = BBHelperClass.getParticipantTShirtObjs(props.participant);
        return (
            <>
                {tshirts.map((basketProduct) => (
                    <span className="tag mr-2 mt-1">
                        <i className="fa-solid fa-shirt mr-2"></i>
                        {basketProduct.prodDef?.variantType === PROD_VARIANT_CHOICES.TSHIRT_M ? "męska " : "damska "}
                        {basketProduct.inStore?.vName}
                        {basketProduct.cnt !== undefined && basketProduct.cnt > 1 && " x " + basketProduct.cnt}
                    </span>
                ))}
            </>
        );
    }

    /* *************************************************************************************************** */
    function showActivityType() {
        return (
            <>
                <span
                    className={
                        "tag is-light mr-2 is-size-6 " +
                        (props.irbSignal.value.pakiet.status === ACTIVITY_STATUS_CHOICES.SELECTED && " has-text-grey-light")
                    }
                >
                    {BBHelperClass.getActivityName(props.irbSignal.value.pakiet.type)}
                </span>
            </>
        );
    }

    /* *************************************************************************************************** */
    function getStartNo() {
        const succ_callback = (result: any) => {
            setIsSubmittedStartNo("Idle");
        };
        const err_callback = (result: any) => {
            setIsSubmittedStartNo("Error");
        };
        RequestClass.makeRequest("bb/participant/" + props.participant.pk + "/startno", null, succ_callback, err_callback);
    }

    /* *************************************************************************************************** */
    function showStartNumber() {
        return (
            <>
                <div className="pb-2 is-flex is-flex-wrap-wrap is-align-items-baseline">
                    <span className="mr-2">numer startowy:</span>
                    {props.participant?.startNo !== undefined && props.participant?.startNo > 0 && (
                        <>
                            <span className="is-size-5 is-family-code mr-2">{props.participant.startNo}</span>
                        </>
                    )}

                    {paymentPanding > 0 && (
                        <div className="tag is-link has-background-warning-light">
                            oczekiwanie na płatność nr {paymentPanding}
                        </div>
                    )}
                    {/* <span>Do zapłaty</span> */}
                    {toPay > 0 && <div className="tag has-background-danger-light mr-2">do zapłaty: {toPay} zł</div>}
                </div>
                <div
                    className="is-size-7 is-clickable has-text-link mr-2 mb-2 "
                    onClick={() => {
                        if (isSubmittedStartNo !== "Progress") {
                            setIsSubmittedStartNo("Progress");
                            getStartNo();
                        }
                    }}
                >
                    {props.participant?.startNo !== undefined && props.participant?.startNo > 0 && (
                        <>
                            <i className="fa-solid fa-file-pdf mr-2"></i>
                            {isSubmittedStartNo === "Progress" ? (
                                <>generowanie numeru startowego</>
                            ) : isSubmittedStartNo === "Error" ? (
                                <span className="tag has-background-danger">błąd podczas generowania numeru startowego</span>
                            ) : (
                                <>pobierz numer startowy do druku</>
                            )}
                        </>
                    )}
                </div>
            </>
        );
    }
    /* *************************************************************************************************** */
    function showParticipantName() {
        return (
            <span>
                <span className=" is-size-4">
                    <strong>{props.participant.name}</strong>
                </span>
                {props.participant.nick && <span className=" ml-2">( {props.participant.nick} )</span>}
                {props.participant.groupName && <span className=" ml-2">- {props.participant.groupName}</span>}
            </span>
        );
    }

    /* *************************************************************************************************** */
    useSignals();
    return (
        <>
            {/* <div>BBUserPanelEl: {props.irbSignal.value.panel}</div> */}

            <div className="card">
                <div className="card-content">
                    <div className="is-flex is-flex-direction-row is-justify-content-space-between is-flex-wrap-wrap ">
                        <div>
                            <div className="is-flex is-flex-wrap-wrap is-align-items-baseline">
                                {showActivityType()}
                                {showParticipantName()}
                                {showTshirts()}
                            </div>
                            <div>{showStartNumber()}</div>
                        </div>
                        {/* <div className="is-justify-content-right"> */}
                        {props.participant.rankConsent && (
                            <div>
                                <BBRankButtons
                                    participant={props.participant}
                                    // activityType={pakietType}
                                    irbSignal={props.irbSignal}
                                    // setShowMore={setShowMore}
                                    // showMore={showMore}
                                />
                            </div>
                        )}
                        {/* </div> */}
                    </div>
                </div>

                <footer className="card-footer">
                    {/* {props.participant.basket?.basketId !== undefined && ( */}
                    <button
                        className={
                            "card-footer-item button is-ghost " + (props.irbSignal.value.panel === "cart" && " is-underlined")
                        }
                        onClick={() => {
                            // console.log(props.irbSignal.value.panel);
                            props.irbSignal.value = {
                                ...props.irbSignal.value,
                                panel: props.irbSignal.value.panel === "cart" ? "none" : "cart",
                                activity: BB_ACTIVITY_CHOICES.NONE,
                            };
                            // console.log(props.irbSignal.value.panel);
                        }}
                    >
                        {!isMobile && "Koszyk"}
                        <i className="fa-solid fa-cart-shopping ml-2"></i>
                    </button>
                    {/* )} */}
                    <button
                        className={
                            "card-footer-item button is-ghost " + (props.irbSignal.value.panel === "edit" && " is-underlined")
                        }
                        onClick={() =>
                            (props.irbSignal.value = {
                                ...props.irbSignal.value,
                                panel: props.irbSignal.value.panel === "edit" ? "none" : "edit",
                                activity: BB_ACTIVITY_CHOICES.NONE,
                            })
                        }
                    >
                        {!isMobile && "Edytuj"} <i className="fa-solid fa-pen-to-square ml-2"></i>
                    </button>

                    <button
                        className={
                            "card-footer-item button is-ghost " + (props.irbSignal.value.panel === "irb" && " is-underlined")
                        }
                        onClick={() =>
                            (props.irbSignal.value = {
                                ...props.irbSignal.value,
                                panel: props.irbSignal.value.panel === "irb" ? "none" : "irb",
                                activity: BB_ACTIVITY_CHOICES.NONE,
                            })
                        }
                    >
                        {props.participant.rankConsent === true ? "Ranking Belfrów" : "Twoja aktywność"}
                    </button>
                </footer>
                <div className="content">
                    {props.irbSignal.value.panel === "cart" && (
                        <div className="m-3 ">
                            <BBCart
                                participant={props.participant}
                                products={props.products}
                                refresh_calback={props.refresh_calback}
                            />
                        </div>
                    )}
                    {props.irbSignal.value.panel === "edit" && (
                        <div className="m-3 ">
                            <BBRegisterEditUser
                                participant={props.participant}
                                refresh_calback={props.refresh_calback}
                                toPay={toPay}
                                irbSignal={props.irbSignal}
                            />
                        </div>
                    )}
                    {props.irbSignal.value.panel === "irb" && (
                        <div className={"py-3 " + (isMobile ? "px-4" : "px-6")}>
                            <BBMyActivity
                                irbSignal={props.irbSignal}
                                rankConsent={props.participant.rankConsent}
                                participant={props.participant}
                            />
                        </div>
                    )}
                </div>
            </div>
            {notification}
        </>
    );
};
