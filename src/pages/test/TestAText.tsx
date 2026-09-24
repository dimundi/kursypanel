/* pytanie do ankiety - ocena w skali 1-6 */

import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

export default function TestAText(props: { id: string; register: UseFormRegister<FieldValues> }) {
    const maxLength = 255;
    const [textAreaCount, settextAreaCount] = React.useState(maxLength);

    const recalculate = (e: any) => {
        settextAreaCount(maxLength - e.target.value.length);
    };
    return (
        <>
            <div className="is-size-7">pozostało {textAreaCount} znaków</div>
            <div className="mr-3">
                <textarea className="textarea is-small" maxLength={maxLength} {...props.register(props.id)} onChange={recalculate} />
                {/* <input type="radio" id={props.id + "-" + props.no} name={props.id} value={props.no} className={"color-" + props.no} /> */}
            </div>
        </>
    );
}
