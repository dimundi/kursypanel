import { Dispatch, SetStateAction } from "react";
import { IBBParticipant, IBBUserDistances } from "../../interfaces/IBB";
import { BBRankCell } from "./BBRankCell";
import { IirbSignal } from "../bb/BBUserPanel";
import { Signal } from "@preact/signals-react";

interface IBBRankCells {
    distanceTable: IBBUserDistances;
    participant: IBBParticipant;
    irbSignal: Signal<IirbSignal>;
    setUserDistanceTable: Dispatch<SetStateAction<IBBUserDistances[]>>;
}
export interface IBBDistanceCell {
    day: number; // numer dnia
    date: Date; // data
    distance: number; // dystans w metrach
}

/* *************************************************************************************************** */
export const BBRankCells = (props: IBBRankCells) => {
    /* *************************************************************************************************** */
    function buildRankCells() {
        let rankCells = new Array<IBBDistanceCell>();

        for (let i = 1; i <= 31; i++) {
            let distanceTableObj = props.distanceTable.table?.find((userDistance) => userDistance.day === i);
            let distance = 0;
            if (distanceTableObj?.distance !== undefined) {
                distance = distanceTableObj.distance;
            }
            rankCells.push({ day: i, date: new Date("October " + i.toString() + ", 2024 4:00:00"), distance: distance });
        }
        return rankCells;
    }
    // console.log("Render CElls");
    // console.log(props.irbSignal.value.activity);
    return (
        <>
            {props.participant.activity > 0 ? (
                <div className="grid ">
                    {buildRankCells().map((rankCell, index) => (
                        <BBRankCell
                            rankCell={rankCell}
                            irbSignal={props.irbSignal}
                            key={index}
                            participant={props.participant}
                            // activityType={props.irbSignal.value.activity}
                            setUserDistanceTable={props.setUserDistanceTable}
                        />
                    ))}
                </div>
            ) : (
                <div className="mx-1 my-4">
                    Nie jesteś jeszcze zapisany na aktywność. Prawdopodobnie nie zaksięgowaliśmy jeszcze Twojej wpłaty.
                </div>
            )}
        </>
    );
};
