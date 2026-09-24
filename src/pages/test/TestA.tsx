/* blok pytań - kontener podstawowy  - w przyszłości do WYWALENIA*/

import { Input } from "../../components/forms/Input";
import { ITestA } from "../../interfaces/ITest";

interface ITestAFormInputs {
    testa?: ITestA; // dodawany do nazwy pól
    register?: any;
    testQId?: number; // id pytania, do którego jest ta odpowieź
}
export default function TestA(props: ITestAFormInputs) {
    return <>{props.testa?.txt}</>;
}
