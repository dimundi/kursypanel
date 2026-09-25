/* blok testu - kontener podstawowy */

import { useForm } from "react-hook-form";
import HTMLCode from "../../components/elements/HTMLCode";
import SubmitButton from "../../components/forms/SubmitButton";
import ITest, { ISurveyCert } from "../../interfaces/ITest";
import TestQ from "./TestQ";
import { useEffect, useState } from "react";
import RequestClass from "../../classes/RequestClass";

import { Notification } from "../../components/Notification";
import { TEST_PROGRESS_CHOICES, TEST_Q_TYPE_CHOICES, TEST_TYPE_CHOICES } from "../../components/Enumerators";
import { useUserCourseContext } from "../../context/UserCourseContext";
import TestShowResult from "./TestShowResult";
import IReqOptions from "../../interfaces/IReqOptions";
import { useParams } from "react-router-dom";
import { IUrlSurveyCert } from "../../interfaces/IUrl";
import Wait from "../../components/elements/Wait";
//import { faDungeon } from "@fortawesome/free-solid-svg-icons";

type postprocType = "cert" | "only_cert";
/* cert -> po wypełnieniu ankiety wygeneruj certyfikat
   only_cert -> tylko certyfikat, bez ogarniania ankiety */

/*
    surveyCert -> te dane są przesyłane, gdy jest to ankieta, lub ankieta zakończona certyfikatem
 */
export default function TestBlock(props: { test?: ITest; successNotification?: JSX.Element; surveyCert?: ISurveyCert }) {
    // const navigate = useNavigate();

    const { setActiveTab, setIsUserCourseRead } = useUserCourseContext();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [currTestId, setCurrTestId] = useState(0);

    const [showQ, setShowQ] = useState(false);
    const [returnToContent, setReturnToContent] = useState(false); // przycisk Zakończ -> powrót do szkolenia (po wypełnieniu testu/ankiety)
    const [showStartInvitation, setShowStartInvitation] = useState(false);

    const [showSubmitCertSend, setShowSubmitCertSend] = useState(true); // pokaż przycisk wysłania certyfikatu (pojawia sie prze ankietach offline i powinien zniknąc po wciśnięci tego przycisku)

    const urlParams = useParams<IUrlSurveyCert>();

    useEffect(() => {
        if (props.test?.testId !== currTestId) {
            if (props.test?.testId) setCurrTestId(props.test?.testId);

            /* ustawiam wartości domyślne */
            setShowQ(() => {
                if (props.test?.status === TEST_PROGRESS_CHOICES.TEST_FINISHED) {
                    return false;
                }
                if (props.test?.type === TEST_TYPE_CHOICES.TEST_TYPE_TEST) {
                    return false;
                } else {
                    return true;
                }
            });

            setShowStartInvitation(() => {
                if (props.test?.type !== TEST_TYPE_CHOICES.TEST_TYPE_TEST) {
                    return false;
                }
                if (showQ === false) {
                    return true;
                }
                return true;
            });

            setReturnToContent(false);
            setTestNotification(<></>);
        }
    }, [props.test?.testId]);

    const [testNotification, setTestNotification] = useState(<></>);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const err_callback = (result: any) => {
        setTestNotification(RequestClass.errorAlert(result));
        // setStep(0);
        setIsSubmitted(false);
    };

    interface IAnswer {
        testQId?: number;
        value?: number;
        testAId?: number;
    }

    /* ----------------------------------------------------------------------*/
    function submitTest(data: any) {
        // console.log(props.test?.q);
        // console.log(data);
        // console.log(props.test?.testId);
        // console.log(props.test?.productId);

        /* sprawdzam czy odpowiedziano na wszystkie pytania i jednocześnie wypełniam tablicę answer */

        let answers: IAnswer[] = [];
        let warning = "";
        props.test?.q?.forEach((q, index) => {
            if (data["q_" + q.testQId] === null || data["q_" + q.testQId] === undefined) {
                warning += " " + (index + 1);
            } else {
                if (q.qType === TEST_Q_TYPE_CHOICES.TEST_Q_TYPE_SURVEY || q.qType === TEST_Q_TYPE_CHOICES.TEST_Q_TYPE_TEXT255) {
                    /* odpowiedź jako liczba - ankieta */
                    answers.push({ testQId: q.testQId, value: data["q_" + q.testQId] });
                } else {
                    /* odpowiedź w której podaję jej id RADIO */
                    answers.push({ testQId: q.testQId, testAId: Number(data["q_" + q.testQId]) });
                }
            }
        });
        if (warning.length > 0) {
            setTestNotification(<div className="has-text-danger-dark my-3 is-size-6">Nie udzieliłeś(aś) odpowiedzi na pytania: {warning}</div>);
            return;
        } else {
            setTestNotification(<></>);
        }

        submitAPI(answers, "cert");
    }
    /* ----------------------------------------------------------------------
     * wygeneruj certyfika i wyślij mailem
     *  -> procedura odpalana podczas wypełniania ankiety online w przypadku,
     *     gdy ankieta została już wypełniona i oczekujemy jedynie wysłania powtórnie
     *     certyfikatu
     *
     * ---------------------------------------------------------------------- */
    function submitCertSend() {
        setTestNotification(
            <div className="section">
                <Wait text="Proszę czekać. Wysyłam certyfikat ukończenia szkolenia na wskazany adres email ."></Wait>
            </div>
        );
        submitAPI([], "only_cert");
        setShowSubmitCertSend(false);
    }
    /* ----------------------------------------------------------------------*/
    function submitAPI(answers: IAnswer[], postproc: postprocType) {
        /* wysyłam wynik na serwer */
        const succ_callback = (result: any) => {
            if (props.test?.type === TEST_TYPE_CHOICES.TEST_TYPE_TEST) {
                if (props.successNotification) {
                    setTestNotification(props.successNotification);
                } else
                    setTestNotification(
                        <Notification type="success">
                            {/* <div>Dziękuję za rozwiązanie testu.</div> */}
                            <TestShowResult aOK={result.aOK} qCnt={result.qCnt} />
                        </Notification>
                    );
            } else {
                setReturnToContent(true);
                if (props.successNotification) {
                    setTestNotification(props.successNotification);
                } else setTestNotification(<Notification type="success">Dziękujemy za wypełnienie ankiety.</Notification>);
            }
            setIsSubmitted(false);
        };
        interface IReqDataToSend {
            testId?: number;
            productId?: number;
            a?: IAnswer[];
            code?: string;
            postproc?: postprocType;
            fname?: string;
            lname?: string;
            gender?: number;
        }
        let dataToSend: IReqDataToSend = {
            testId: props.test?.testId,
            productId: props.test?.productId,
            a: answers,
        };

        if (urlParams.kod) {
            dataToSend.code = urlParams.kod;
            dataToSend.postproc = postproc; // wygeneruj certyfikat na zakończenie i wyślij do mailem!
        }

        if (props.surveyCert) {
            /* czy zdefiniowano alternatywne imiona i nazwiska na certyfikacie */
            if (props.surveyCert.fname && props.surveyCert.fname.length > 0) {
                dataToSend.fname = props.surveyCert.fname;
            }
            if (props.surveyCert.lname && props.surveyCert.lname.length > 0) {
                dataToSend.lname = props.surveyCert.lname;
            }
            if (props.surveyCert.gender) dataToSend.gender = props.surveyCert.gender;
        }

        let requestOptions: IReqOptions = {
            method: "POST",
            body: JSON.stringify(dataToSend),
        };
        if (urlParams.kod) {
            requestOptions.tempAuth = true;
        }
        //console.log("Wysyłam zapytanie");

        RequestClass.makeRequest("test/q/", requestOptions, succ_callback, err_callback);
        setIsSubmitted(true);
    }

    /* ----------------------------------------------------------------------
     *
     * ---------------------------------------------------------------------- */
    function isSurvey() {
        if (props.test?.type === TEST_TYPE_CHOICES.TEST_TYPE_TEST) {
            return false;
        }
        return true;
    }

    // /* ---------------------------------------------------------------------- */
    // function submitError(data: any) {
    //     console.log(data);
    // }

    /* ---------------------------------------------------------------------- */
    if (props.test?.status === TEST_PROGRESS_CHOICES.TEST_FINISHED) {
        if (props.test.type === TEST_TYPE_CHOICES.TEST_TYPE_TEST) {
            return <Notification type="warning">Ten test jest już rozwiązany.</Notification>;
        } else {
            if (urlParams.kod) {
                /* to jest ankieta wypełniana online -> jeżeli została już wypełniona, to od razu generuję certyfikat */

                /* trigeruję wysłanie prośby o odesłanie mailem certyfikatu API */

                return (
                    <>
                        <Notification type="success">
                            Dziękujemy!
                            <br />
                            Ankieta została już wypełniona. {isSubmitted}
                            <div>
                                {showSubmitCertSend && (
                                    <button
                                        className={"mt-2 px-2 is-size-6 button is-primary " + (isSubmitted ? "is-loading" : "")}
                                        onClick={() => submitCertSend()}
                                    >
                                        Wyślij certyfikat mailem
                                    </button>
                                )}
                                {testNotification}
                            </div>
                        </Notification>
                    </>
                );
            } else
                return (
                    <>
                        <Notification type="warning">Ta ankieta jest już wypełniona.</Notification>
                        {setActiveTab && (
                            <button className="mt-2 px-2 is-size-6 button is-primary" onClick={() => setActiveTab("spis_tresci")}>
                                Wróć
                            </button>
                        )}
                    </>
                );
        }
    } else if (!Array.isArray(props.test?.q)) {
        return <Notification type="danger">Przepraszam, ale wygląda na to, że nie mam żadnych pytań do wyświetlenia.</Notification>;
    }

    /* ----------------------------------------------------------------------
     * step 1: wyświetla pytania i przycisk Zakończ
     * step 2: wyśiwetla komunikat, że udało się zapisać i przycisk zakończ
     * ----------------------------------------------------------------------*/
    return (
        <div className={isSurvey() ? "panel-survey mb-6" : "mb-6"}>
            <h2 className="survey-title is-size-4 mt-4">{isSurvey() ? <>Ankieta</> : <>{props.test?.name}</>}</h2>

            {showQ && (
                <>
                    <div className="survey-intro"><HTMLCode>{props.test?.txt}</HTMLCode></div>
                    {props.test?.q?.map((q, index) => (
                        <TestQ key={index} testq={q} index={index} register={register} error={errors} />
                    ))}

                    {returnToContent === false && (
                        <SubmitButton handleSubmit={handleSubmit} recaptcha={false} routine={submitTest} isSubmitted={isSubmitted}>
                            {isSurvey() ? <>Zakończ</> : <>Sprawdź</>}
                        </SubmitButton>
                    )}
                </>
            )}

            {showStartInvitation && (
                <>
                    <div>Czy chcesz teraz rozwiązać test?</div>
                    <button
                        className="mt-2 px-2 is-size-7 button is-secondary"
                        onClick={() => {
                            setShowQ(true);
                            setShowStartInvitation(false);
                        }}
                    >
                        Pokaż pytania
                    </button>
                </>
            )}
            {testNotification}
            {returnToContent && (
                <>
                    {setActiveTab && (
                        <>
                            {/* <div className="m-2">
                                
                                <FontAwesomeIcon className="mx-2" icon={faArrowRight} />
                                <Link to="/kursy" className="has-text-weight-bold">
                                    Moje kursy
                                </Link>
                                .<br></br>
                                Zawsze możesz wyświetlić swoje kursy rozwijając menu w prawym górnym rogu ekranu i klikając{" "}
                                <Link to="/kursy" className="has-text-weight-bold">
                                    Moje kursy
                                </Link>
                                .
                            </div> */}
                            <button
                                className="m-2 px-2 is-size-6 button is-primary"
                                onClick={() => {
                                    if (setIsUserCourseRead) setIsUserCourseRead(false);
                                    setActiveTab("spis_tresci");
                                }}
                            >
                                Zakończ
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
