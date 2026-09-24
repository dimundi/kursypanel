import { RefCallBack } from "react-hook-form";
import { IBBParticipant } from "../../interfaces/IBB";
import { IProduct } from "../../interfaces/IProducts";
import { BBUserPanelEl } from "./BBUserPanelEl";
import { signal } from "@preact/signals-react";
import { BB_ACTIVITY_CHOICES } from "./BBEnum";
import BBHelperClass, { IPakietType } from "../../classes/BBHelperClass";

export type bbUserPanelType = "none" | "edit" | "cart" | "irb";
export interface IirbSignal {
    activity: BB_ACTIVITY_CHOICES; // wybrana (kliknięta przez użtkownika aktywność)
    panel: bbUserPanelType; // wybrany panel
    pakiet: IPakietType; // wybrany pakiet
    distanceRun: number;
    distanceWalk: number;
    distanceRide: number;
    posRun: number;
    posWalk: number;
    posRide: number;
}

export interface IBBUserPanel {
    refresh_calback: RefCallBack | null; // return kiedy odświeżamy interfejs
    participant: IBBParticipant;
    products?: IProduct[];
}

/* ******************************************************************************************************* */
export const BBUserPanel = (props: IBBUserPanel) => {
    let pakietType = BBHelperClass.getParticipantActivityType(props.participant);
    const irbSignal = signal({
        activity: BB_ACTIVITY_CHOICES.NONE,
        panel: "none",
        pakiet: pakietType,
        distanceRun: props.participant.total_run,
        distanceWalk: props.participant.total_walk,
        distanceRide: props.participant.total_ride,
    } as IirbSignal);
    // console.log("Render BBUserPanel");
    return (
        <>
            {/* <div>BBUserPanel: {irbSignal.value.panel}</div> */}
            <BBUserPanelEl
                participant={props.participant}
                products={props.products}
                refresh_calback={props.refresh_calback}
                irbSignal={irbSignal}
                key={"USEL" + props.participant.pk}
            />
        </>
    );
};
