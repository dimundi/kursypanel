/* pytanie do ankiety - ocena w skali 1-6 */

import { UseFormRegister, FieldValues } from "react-hook-form";

export default function TestASurvey(props: { id: string; register: UseFormRegister<FieldValues> }) {
    return (
        <div className="custom-radios">
            <TestASurveyEl id={props.id} no="1" register={props.register} />

            <TestASurveyEl id={props.id} no="2" register={props.register} />

            <TestASurveyEl id={props.id} no="3" register={props.register} />

            <TestASurveyEl id={props.id} no="4" register={props.register} />

            <TestASurveyEl id={props.id} no="5" register={props.register} />
        </div>
    );
}

function TestASurveyEl(props: { id: string; no: string; register: UseFormRegister<FieldValues> }) {
    return (
        <>
            <div className="mr-3">
                <input type="radio" value={props.no} className={"color-" + props.no} id={props.id + "-" + props.no} {...props.register(props.id)} />
                {/* <input type="radio" id={props.id + "-" + props.no} name={props.id} value={props.no} className={"color-" + props.no} /> */}

                <label htmlFor={props.id + "-" + props.no}>
                    <span className={"colorTxt-" + props.no}>{props.no}</span>
                </label>
            </div>
        </>
    );
}
