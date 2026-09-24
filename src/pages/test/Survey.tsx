/*  wypełnienie ankiety */

import { useEffect, useState } from "react";
import RequestClass from "../../classes/RequestClass";
import Wait from "../../components/elements/Wait";
import ITest from "../../interfaces/ITest";
import TestBlock from "./TestBlock";
import { Debug } from "../../components/elements/Debug";
import { ISurveyCert } from "../../interfaces/ITest";
import { Notification } from "../../components/Notification";
import IReqOptions from "../../interfaces/IReqOptions";
import { useParams } from "react-router-dom";
import { IUrlSurveyCert } from "../../interfaces/IUrl";
import EmergencyContact from "../../components/elements/EmergencyContact";

/* 
 online - ankieta wykonywana do kursu, który był realizowany online
 offline - ankieta wykonywana na podstawie linku /ankieta -> zwykle dla kursów offline i kończy się wygenerowaniem i wysłaniem mailem certyfikatu
 */
// export type surveyType = "online" | "offline";

// export interface ISurveyProps {
//     testId?: number; // id testu = ankiety
//     productId?: number; // id produktu, do którego realizowana jest ankieta
//     surveyType: surveyType;
// }

export default function Survey(props: { surveyCert: ISurveyCert }) {
    //const { userCourse, setNotification, isSurveyRead, setIsSurveyRead } = useUserCourseContext();

    // paramtr kod w URLu
    const urlParams = useParams<IUrlSurveyCert>();

    const [step, setStep] = useState(1);
    const [isSurveyRead, setIsSurveyRead] = useState(false);
    const [notification, setNotification] = useState<JSX.Element | String>();
    const [survey, setSurvey] = useState<ITest>({} as ITest);

    const err_callback = (result: any) => {
        if (setNotification) setNotification(RequestClass.errorAlert(result));
    };

    const succ_callback = (result: any) => {
        if (setIsSurveyRead) {
            setIsSurveyRead(true);
        }

        setSurvey(result.test);
        setStep(2);
        if (setNotification) setNotification(<></>);
    };

    useEffect(() => {
        if (isSurveyRead === false) {
            /* wysyłam zapytanie o ankietę */
            if (props.surveyCert.test?.testId === undefined || props.surveyCert.test?.testId === undefined) {
                setStep(2);
            } else {
                interface IReqDataToSend {
                    testId: number;
                    productId?: number;
                    code?: string;
                }
                let dataToSend: IReqDataToSend = {
                    testId: props.surveyCert.test?.testId,
                    productId: props.surveyCert.inStore?.productId,
                };
                if (urlParams.kod) {
                    dataToSend.code = urlParams.kod;
                }

                let requestOptions: IReqOptions = {
                    method: "POST",
                    body: JSON.stringify(dataToSend),
                };
                if (urlParams.kod) {
                    requestOptions.tempAuth = true;
                }
                RequestClass.makeRequest("test/", requestOptions, succ_callback, err_callback);
            }
        } else setStep(2);
    }, [step]);

    /* to co ma się wyświetlać jako notification, jeżeli ankieta zostanie zakończona sukcesem */
    function surveySuccess(): JSX.Element {
        if (urlParams.kod) {
            return (
                <Notification type="success">
                    Dziękujemy za wypełnienie ankiety. <br></br>Certyfikat został wysłany mailem i w ciągu 5 minut powinien pojawić się w Twojej
                    skrzynce. <br></br> Sprawdź folder SPAM, czy przypadkiem nie przekierowano tam wiadomości z certyfikatem.
                    <EmergencyContact />
                </Notification>
            );
        }
        return (
            <Notification type="success">
                Dziękujemy za wypełnienie ankiety. <br></br>Sprawdź w zakładce Spis Treści, czy możesz już wygenerować certyfikat.
            </Notification>
        );
    }

    return (
        <>
            {notification}
            {step === 1 ? (
                <Wait text="pobieram ankietę" />
            ) : (
                <>
                    <TestBlock test={survey} successNotification={surveySuccess()} surveyCert={props.surveyCert} />
                </>
            )}
            <Debug>
                <div className="is-size-7">id produktu: {props.surveyCert.inStore?.productId}</div>
                <div className="is-size-7">id test: {props.surveyCert.test?.testId}</div>
            </Debug>
        </>
    );
}
