import React from "react";

export default function TestShowResult(props: { aOK: number; qCnt: number }) {
    /* wynik w procentach */
    let result = 0;
    if (props.qCnt > 0) result = 100 * (props.aOK / props.qCnt);

    //console.log(result);
    let ocenaSlowna = "";
    if (result > 90) {
        ocenaSlowna = "Świetnie!";
    } else if (result > 80) {
        ocenaSlowna = "Bardzo dobrze!";
    } else if (result > 65) {
        ocenaSlowna = "Dobrze!";
    } else if (result > 55) {
        ocenaSlowna = "Nie jest źle";
    } else if (result > 45) {
        ocenaSlowna = "Rzutem na taśme, ale się udało!";
    }

    return (
        <>
            <div className="has-text-weight-bold">{ocenaSlowna}</div>
            <div>
                Odpowiedzi prawidłowych {props.aOK} z {props.qCnt}
            </div>
        </>
    );
}
