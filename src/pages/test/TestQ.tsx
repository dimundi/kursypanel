/* blok pytań - kontener podstawowy */

import { DeepMap, FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import HTMLCode from "../../components/elements/HTMLCode";
import { ITestA, ITestQ } from "../../interfaces/ITest";
import { TEST_Q_TYPE_CHOICES } from "../../components/Enumerators";
import { Input } from "../../components/forms/Input";
import HelperClass from "../../classes/HelperClass";
import "./TestQ.scss";
import TestASurvey from "./TestASurvey";
import TestAText from "./TestAText";

export default function TestQ(props: {
    testq?: ITestQ;
    index: number;
    register: UseFormRegister<FieldValues>;
    error: DeepMap<FieldValues, FieldError>;
}) {
    /* ----------------------------------------------
     * wyświetlanie odpowiedzu
     * ----------------------------------------------  */

    function disp_answer(a: ITestA, index: number) {
        let label_text = HelperClass.cleanMainParagraph(a.txt);
        if (props.testq?.qType === TEST_Q_TYPE_CHOICES.TEST_Q_TYPE_RADIO) {
            return (
                <Input
                    id={"q_" + props.testq.testQId}
                    type="radio"
                    value={a.testAId}
                    label={label_text}
                    register={props.register}
                    errors={props.error}
                    required={false}
                ></Input>
            );
        }
        // else if (props.testq?.qType === TEST_Q_TYPE_CHOICES.TEST_Q_TYPE_SURVEY) {
        //     return <TestASurvey id={"q_" + props.testq.testQId} />;

        //     // return (
        //     //     <div className="buttons has-addons">
        //     //         <button className="button is-success is selected"></button>
        //     //         <button className="button"></button>
        //     //         <button className="button"></button>
        //     //         <button className="button"></button>
        //     //         <button className="button"></button>
        //     //         <button className="button is-danger"></button>
        //     //     </div>
        //     // );
        //     return <div className="abc">pytanie ankietowe</div>;
        // }
        //  else if (props.testq?.qType === TEST_Q_TYPE_CHOICES.TEST_Q_TYPE_MULTI) {
        //     return (
        //         <Input
        //             id={"a" + a.testAId}
        //             type="checkbox"
        //             name={"a" + a.testAId}
        //             label={label_text}
        //             register={props.register}
        //             errors={props.error}
        //             required={false}
        //         ></Input>
        //     );
        // }
        // return <TestA key={index} testa={a} register={register} />;
        return <></>;
    }

    let q = <></>;
    if (props.testq?.qType === TEST_Q_TYPE_CHOICES.TEST_Q_TYPE_SURVEY) {
        q = <TestASurvey id={"q_" + props.testq.testQId} register={props.register} />;
    } else if (props.testq?.qType === TEST_Q_TYPE_CHOICES.TEST_Q_TYPE_TEXT255) {
        q = <TestAText id={"q_" + props.testq.testQId} register={props.register} />;
    } else {
        q = <> {props.testq?.a?.map((a, index) => disp_answer(a, index))} </>;
    }

    return (
        <>
            <HTMLCode className="mb-0 mb-4">
                {HelperClass.addUndefined(props.index, 1) + ". " + HelperClass.cleanMainParagraph(props.testq?.txt)}
            </HTMLCode>
            <div className="mb-5">{q}</div>
        </>
    );
}
