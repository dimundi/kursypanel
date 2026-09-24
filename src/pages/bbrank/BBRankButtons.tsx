import { BBRankButton } from "./BBRankButton";
import { BB_ACTIVITY_CHOICES, BB_PAKIET_CHOICES } from "../bb/BBEnum";
import { Signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { IirbSignal } from "../bb/BBUserPanel";
import { useState } from "react";
import BBRank from "./BBRank";
import { IBBParticipant } from "../../interfaces/IBB";
import { isMobile } from "react-device-detect";

export interface IRankButtons {
    participant: IBBParticipant;
    irbSignal: Signal<IirbSignal>;
}
export const BBRankButtons = (props: IRankButtons) => {
    const [showRankTable, setShowRankTable] = useState("");
    const [refreshRankTable, setRefreshRankTable] = useState(0);
    useSignals();
    return (
        <>
            {/* {props.irbSignal.value.activity}
            <div>IRankButtons: {props.irbSignal.value.panel}</div> */}
            <div className={"is-flex flex-wrap " + (isMobile ? " is-justify-content-left" : " is-justify-content-right")}>
                <div
                    onClick={() => {
                        props.irbSignal.value = { ...props.irbSignal.value, activity: BB_ACTIVITY_CHOICES.WALK, panel: "irb" };
                    }}
                >
                    {(props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.WALK ||
                        props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.IRON) && (
                        <BBRankButton
                            activityType={BB_PAKIET_CHOICES.WALK}
                            selected={props.irbSignal.value.activity == BB_ACTIVITY_CHOICES.WALK}
                            distance={props.irbSignal.value.distanceWalk}
                        />
                    )}
                </div>
                <div
                    onClick={() => {
                        props.irbSignal.value = { ...props.irbSignal.value, activity: BB_ACTIVITY_CHOICES.RUN, panel: "irb" };
                    }}
                >
                    {(props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.RUN ||
                        props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.IRON) && (
                        <BBRankButton
                            activityType={BB_PAKIET_CHOICES.RUN}
                            selected={props.irbSignal.value.activity === BB_ACTIVITY_CHOICES.RUN}
                            distance={props.irbSignal.value.distanceRun}
                        />
                    )}
                </div>
                <div
                    onClick={() => {
                        props.irbSignal.value = { ...props.irbSignal.value, activity: BB_ACTIVITY_CHOICES.RIDE, panel: "irb" };
                    }}
                >
                    {(props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.RIDE ||
                        props.irbSignal.value.pakiet.type === BB_PAKIET_CHOICES.IRON) && (
                        <BBRankButton
                            activityType={BB_PAKIET_CHOICES.RIDE}
                            selected={props.irbSignal.value.activity === BB_ACTIVITY_CHOICES.RIDE}
                            distance={props.irbSignal.value.distanceRide}
                        />
                    )}
                </div>
            </div>
            <div
                className="is-size-6 is-clickable has-text-link mt-2 mx-2 has-text-right "
                onClick={() => {
                    setShowRankTable("is-active");
                    setRefreshRankTable(refreshRankTable + 1);
                }}
            >
                pokaż tabelę rankingową
            </div>

            <div className={"modal " + showRankTable}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <BBRank
                        hideLoginMsg={true}
                        hideMoreButton={true}
                        participantPK={props.participant.pk}
                        forceRequest={refreshRankTable}
                    />
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={() => setShowRankTable("")}></button>
            </div>
        </>
    );
};
