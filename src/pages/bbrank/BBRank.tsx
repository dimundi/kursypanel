/* *************************************************************************************************** *
 * tabela ogólna
 * *************************************************************************************************** */
import { useEffect, useState } from "react";
import { requestState } from "../../components/types/custom";
import { IBBRank, IBBRankParticipant } from "../../interfaces/IBB";
import RequestClass from "../../classes/RequestClass";
import IReqOptions from "../../interfaces/IReqOptions";
import { BB_PAKIET_CHOICES } from "../bb/BBEnum";
import BBHelperClass from "../../classes/BBHelperClass";

/* *************************************************************************************************** */
const BBRankEl = (props: { obj: IBBRankParticipant; participantPK?: number }) => {
    return (
        <>
            <tr className={"p-0 m-0" + (props.participantPK === props.obj.pk ? " is-selected" : "")}>
                <td className="is-vcentered pr-1">
                    {props.obj.position == 1 ? <i className="fa-solid fa-trophy"></i> : props.obj.position}
                </td>
                <td className="has-text-left is-vcentered">
                    <span className="is-size-6 is-family-code mr-2 tag">{props.obj.startNo}</span>
                    {props.obj.nick}
                    {props.obj.groupName && <small>&nbsp;({props.obj.groupName})</small>}
                </td>

                <td className="has-text-right is-vcentered px-0">
                    <span>{BBHelperClass.distanceM2KM(props.obj.distance === undefined ? 0 : props.obj.distance)}</span>
                </td>
                <td className="has-text-left is-vcentered pl-1 pr-2">km</td>
            </tr>
        </>
    );
};
/* *******************************************************************************************************
 *
 * ******************************************************************************************************* */
interface IBBRankProps {
    hideLoginMsg?: boolean;
    hideMoreButton?: boolean;
    participantPK?: number; // id uczestnika, któego wynik ma być podświetlony
    forceRequest?: number; // wymuszenie ponownego pobrania danych->zapytanie zostanie wysłane, jeżeli ta wartość się zmieni
}
const BBRank = (props: IBBRankProps) => {
    const [apiRankRequest, setApiRankRequest] = useState((props.participantPK !== undefined ? "Idle" : "Start") as requestState);
    const [notification, setNotification] = useState<JSX.Element | String>();
    const [rank, setRank] = useState([] as IBBRank[]);
    const [maxPos, setMaxPos] = useState(0); // maksymalna pozycja zarejestreowana w rankingu
    const [activityType, setActivityType] = useState(BB_PAKIET_CHOICES.WALK);
    const SHOW_POSITIONS_1 = 3;
    const SHOW_POSITIONS_2 = 10;
    const SHOW_POSITIONS_3 = 500;
    const [showPositions, setShowPositions] = useState(props.hideLoginMsg === true ? SHOW_POSITIONS_3 : SHOW_POSITIONS_1);
    // if (apiRankRequest === "OK") apiApiRankRequest("Start");

    /* *************************************************************************************************** */
    useEffect(() => {
        const err_callback = (result: any) => {
            setNotification(RequestClass.errorAlert(result));
            setApiRankRequest("Error");
        };
        const succ_callback = (result: any) => {
            // if (props.order_calback) props.order_calback(result.basketId);
            setRank(result.rankTable);
            setApiRankRequest("OK");
        };
        if (apiRankRequest === "Start") {
            /* wysyłam zapytanie do API */
            setApiRankRequest("Progress");
            let requestOptions: IReqOptions = {
                method: "GET",
                skipAuth: true,
            };
            RequestClass.makeRequest("bb/rank/1/", requestOptions, succ_callback, err_callback);
        }
    }, [apiRankRequest]);

    useEffect(() => {
        if (props.forceRequest !== 0)
            if (!(apiRankRequest === "Start" || apiRankRequest === "Progress")) {
                setApiRankRequest("Start");
            }
    }, [props.forceRequest]);

    useEffect(() => {
        /* wyliczam maksymalną pozycję w rankingu */
        let bbrankObj = rank.find((bbrank) => bbrank.activityType === activityType);

        if (bbrankObj !== undefined) {
            let maXpos = 0;
            bbrankObj.table?.forEach((element) => {
                if (element.position !== undefined && element.position > maXpos) {
                    maXpos = element.position;
                }
            });
            setMaxPos(maXpos);
        }
    }, [rank, activityType]);

    /* *******************************************************************************************************
     *
     * ******************************************************************************************************* */
    return (
        <>
            <div className="card mt-3 is-info medium-wrap px-2 py-2">
                <div className="is-size-4">
                    Indywidualny Ranking Belfrów
                    <div className="is-size-7">aktualna lista rankingowa</div>
                </div>

                <div className="tabs is-left">
                    <ul>
                        <li className={activityType == BB_PAKIET_CHOICES.WALK ? "is-active" : ""}>
                            <a onClick={() => setActivityType(BB_PAKIET_CHOICES.WALK)}>Spacer</a>
                        </li>
                        <li className={activityType == BB_PAKIET_CHOICES.RUN ? "is-active" : ""}>
                            <a onClick={() => setActivityType(BB_PAKIET_CHOICES.RUN)}>Bieg</a>
                        </li>
                        <li className={activityType == BB_PAKIET_CHOICES.RIDE ? "is-active" : ""}>
                            <a onClick={() => setActivityType(BB_PAKIET_CHOICES.RIDE)}>Rower</a>
                        </li>
                    </ul>
                </div>
                <div className="table-container">
                    <table className="table  is-hoverable is-fullwidth">
                        <tbody>
                            {apiRankRequest === "Progress" || apiRankRequest === "Start" ? (
                                <div>... ładuję wyniki rankingu</div>
                            ) : (
                                <>
                                    {maxPos == 0 ? (
                                        <div>
                                            {!(props.hideLoginMsg === true) && (
                                                <>
                                                    <div>Nasz ranking właśnie wystartował.</div>
                                                    <div>Zaloguj się i wprowadź dystans, który pokonałeś.</div>
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        rank
                                            ?.filter((rankObj) => rankObj.activityType == activityType)
                                            .map((rankObj, index) =>
                                                rankObj?.table
                                                    ?.filter((rankTable) => {
                                                        if (
                                                            rankTable.position !== undefined &&
                                                            rankTable.position <= showPositions
                                                        )
                                                            return true;
                                                    })
                                                    .map((rankTable, index) => (
                                                        <BBRankEl
                                                            obj={rankTable}
                                                            key={index}
                                                            participantPK={props.participantPK}
                                                        />
                                                    ))
                                            )
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
                {!(props.hideMoreButton === true) && apiRankRequest === "OK" && maxPos > 3 && (
                    <button
                        className="button is-link is-outlined is-fullwidth"
                        onClick={() => setShowPositions(showPositions == SHOW_POSITIONS_1 ? SHOW_POSITIONS_2 : SHOW_POSITIONS_1)}
                    >
                        {showPositions == SHOW_POSITIONS_1
                            ? maxPos > 9
                                ? "Pokaż pierwszą dziesiątkę"
                                : "Pokaż więcej"
                            : "Pokaż podium"}
                    </button>
                )}
                {/* <button className="button mt-2 is-primary is-outlined is-fullwidth">Pokaż mój wynik</button> */}
                {!(props.hideLoginMsg === true) && (
                    <div className="is-size-7">
                        <i>zaloguj się, aby zobaczyć swój wynik</i>
                    </div>
                )}
            </div>
        </>
    );
};
export default BBRank;
