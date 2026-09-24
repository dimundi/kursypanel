import { useForm } from "react-hook-form";
import HelperClass from "../../classes/HelperClass";
import { Input } from "../../components/forms/Input";
import { IBBDistanceCell } from "./BBRankCells";
import { Dispatch, SetStateAction, useState } from "react";
import RequestClass from "../../classes/RequestClass";
import { requestState } from "../../components/types/custom";
import IReqOptions from "../../interfaces/IReqOptions";
import { IBBParticipant, IBBUserDistances } from "../../interfaces/IBB";
import BBHelperClass from "../../classes/BBHelperClass";
import { Signal } from "@preact/signals-react";
import { IirbSignal } from "../bb/BBUserPanel";
import { BB_ACTIVITY_CHOICES } from "../bb/BBEnum";

interface IBBRankCell {
    rankCell: IBBDistanceCell;
    // activityType: BB_ACTIVITY_CHOICES;
    participant: IBBParticipant;
    irbSignal: Signal<IirbSignal>;
    setUserDistanceTable: Dispatch<SetStateAction<IBBUserDistances[]>>;
}

/* *************************************************************************************************** */
export const BBRankCell = (props: IBBRankCell) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [apiRankRequest, setApiRankRequest] = useState("Idle" as requestState);
    const [notification, setNotification] = useState<JSX.Element | String>();
    const [distance, setDistance] = useState(props.rankCell.distance);
    // const [activityType] = useState(props.activityType);

    let today = new Date();
    let DOW = props.rankCell.date.getDay();
    let rankCellStyle = "has-background-light has-text-light-invert";
    if (DOW === 0) {
        rankCellStyle = "has-background-success-light has-text-success-invert";
    }
    let isButtonVisible = false;
    let isInputVisible = false;
    if (today.getMonth() == 9) {
        isButtonVisible = true;
        isInputVisible = true;
        /* deaktywacja 3 dni wstecz */
        if (props.rankCell.date.getDate() < today.getDate() - 2) {
            // rankCellStyle = "has-background-white-bis has-text-grey-lighter";
            isButtonVisible = false;
            isInputVisible = false;
        }
        /* deaktywacja 1 dni po */
        if (props.rankCell.date.getDate() > today.getDate()) {
            rankCellStyle = "has-background-white-bis has-text-grey-lighter";
            isButtonVisible = false;
        }
    }

    /* *************************************************************************************************** */
    const err_callback = (result: any) => {
        setNotification(
            <>
                <div className="notification is-danger is-light p-1 is-size-7 mt-1 mb-0">Błąd: {result.errCode}</div>
            </>
        );
        setApiRankRequest("Error");
    };
    const succ_callback = (result: any) => {
        // if (props.order_calback) props.order_calback(result.basketId);
        // setRank(result.rankTable);
        // console.log(result);
        props.setUserDistanceTable(result.userDistanceTable);
        /* przeliczam sumę kilometrów */

        props.irbSignal.value = {
            ...props.irbSignal.value,
            distanceWalk: BBHelperClass.calculateTotalDistance(result.userDistanceTable, BB_ACTIVITY_CHOICES.WALK),
            distanceRun: BBHelperClass.calculateTotalDistance(result.userDistanceTable, BB_ACTIVITY_CHOICES.RUN),
            distanceRide: BBHelperClass.calculateTotalDistance(result.userDistanceTable, BB_ACTIVITY_CHOICES.RIDE),
        };

        setNotification(
            <span className="mr-2  has-text-success">
                <i className="fa-solid fa-check"></i>
            </span>
        );
        setApiRankRequest("OK");
    };

    function onSubmit(data: any) {
        if (apiRankRequest !== "Progress") {
            setApiRankRequest("Start");
            /* wysyłamy dystans w metrach */
            let distance = parseFloat(data.distance.replace(",", ".")) * 1000;

            let requestOptions: IReqOptions = {
                method: "POST",
                body: JSON.stringify({
                    distance: distance,
                    day: props.rankCell.day,
                    activityType: props.irbSignal.value.activity,
                }),
            };
            // console.log(requestOptions.body);
            RequestClass.makeRequest(
                "bb/participant/" + props.participant.pk + "/rank",
                requestOptions,
                succ_callback,
                err_callback
            );
            setNotification(<></>);
        }
    }

    /* *************************************************************************************************** */
    // console.log("Render CEll");
    // console.log(activityType);

    return (
        <>
            <div className={"cell py-3 px-4 has-radius-normal " + rankCellStyle}>
                <div className="is-size-7 ">
                    {props.rankCell.date.getDate()}. {HelperClass.getDOW(DOW)}
                </div>
                <div>
                    {isInputVisible ? (
                        <>
                            {/* <div className="has-text-centered is-flex is-flex-wrap-nowrap is-align-items-baseline"> */}
                            <Input
                                id={"distance"}
                                name="distance"
                                // label="* Imię i nazwisko"
                                placeholder="km"
                                register={register}
                                // labelClassName={props.labelClassName}
                                defaultValue={BBHelperClass.distanceM2KM(distance)}
                                errors={errors}
                                required={true}
                                validateType="distance"
                                disabled={!isButtonVisible}
                            ></Input>
                            <div className="ml-1">km</div>
                            {/* </div> */}
                        </>
                    ) : (
                        <span className="has-text-grey">{BBHelperClass.distanceM2KM(distance)} km</span>
                    )}
                    {isButtonVisible && (
                        <>
                            {notification}
                            <button
                                className={
                                    "mt-2 button is-small is-primary " +
                                    (apiRankRequest == "Progress" || apiRankRequest == "Start" ? "is-loading" : "")
                                }
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                            >
                                zapisz
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
