/*  wypełnienie ankiety */

import { useEffect, useState } from "react";
import BodyContainer from "../../components/layout/BodyContainer";
import Survey from "./Survey";
import RequestClass from "../../classes/RequestClass";
import { useParams } from "react-router-dom";
import { IUrlSurveyCert } from "../../interfaces/IUrl";
import HelperClass from "../../classes/HelperClass";
import { DATE_FORMAT_CHOICES } from "../../components/Enumerators";
import { genderFormOptions, Input } from "../../components/forms/Input";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/forms/SubmitButton";

import { ISurveyCert } from "../../interfaces/ITest";
import Wait from "../../components/elements/Wait";
import IReqOptions from "../../interfaces/IReqOptions";
export interface ISurveyProps {
    testId?: number; // id testu = ankiety
    productId?: number; // id produktu, do którego realizowana jest ankieta
}

//type surveyCertTabType = "potwierdzenie_email" | "ankieta" | "certyfikat" | "done";

/* typy testów  pytań do testów */
enum SURVEY_CERT_STEP_CHOICES {
    SURVEY_CERT_STEP_CODE_VERYFICATION = 0, // weryfikuję kod
    SURVEY_CERT_STEP_ENTER_EMAIL = 1, // wprowadź email
    SURVEY_CERT_STEP_CONFIRM_NAME = 2, // potwierdź imię
    SURVEY_CERT_SURVEY = 3, // wypełnianie ankiety
}

export default function SurveyCert() {
    const [step, setStep] = useState<SURVEY_CERT_STEP_CHOICES>(SURVEY_CERT_STEP_CHOICES.SURVEY_CERT_STEP_CODE_VERYFICATION);
    const [notification, setNotification] = useState<JSX.Element | String>();
    const [surveyCert, setSurveyCert] = useState<ISurveyCert>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const urlParams = useParams<IUrlSurveyCert>();

    const err_callback = (result: any) => {
        if (setNotification) setNotification(RequestClass.errorAlert(result));
        setIsSubmitted(false);
    };

    useEffect(() => {
        if (step === SURVEY_CERT_STEP_CHOICES.SURVEY_CERT_STEP_CODE_VERYFICATION) {
            const succ_callback = (result: any) => {
                setSurveyCert(result);
                setStep(SURVEY_CERT_STEP_CHOICES.SURVEY_CERT_STEP_ENTER_EMAIL);
            };

            /* weryfikacja kodu*/
            let dataToSend = {
                step: step,
                code: urlParams.kod,
            };
            let requestOptions: IReqOptions = {
                method: "POST",
                body: JSON.stringify(dataToSend),
                skipAuth: true,
            };
            RequestClass.makeRequest("access/", requestOptions, succ_callback, err_callback);
            setNotification(<></>);
        }
    }, [step]);
    /* ----------------------------------- */
    function submitVerifyEmail(data: any) {
        const succ_callback = (result: any) => {
            setSurveyCert(result);
            RequestClass.setTempToken(result.access_token);
            setStep(SURVEY_CERT_STEP_CHOICES.SURVEY_CERT_STEP_CONFIRM_NAME);
            //setStep(SURVEY_CERT_STEP_CHOICES.SURVEY_CERT_SURVEY);
            setIsSubmitted(false);
        };

        /* weryfikacja kodu*/
        let dataToSend = {
            step: SURVEY_CERT_STEP_CHOICES.SURVEY_CERT_STEP_ENTER_EMAIL,
            code: urlParams.kod,
            email: data.email,
        };
        let requestOptions: IReqOptions = {
            method: "POST",
            body: JSON.stringify(dataToSend),
            skipAuth: true,
        };
        /* weryfikacja maila */
        RequestClass.makeRequest("access/", requestOptions, succ_callback, err_callback);
        setNotification(<></>);

        setIsSubmitted(true);
    }
    /* ----------------------------------- */
    function submitConfirmName(data: any) {
        //console.log(data);
        // console.log(data.fname);
        surveyCert.fname = data.fname;
        surveyCert.lname = data.lname;
        surveyCert.gender = parseInt(data.gender);
        setSurveyCert(surveyCert);
        // console.log(surveyCert);

        setStep(SURVEY_CERT_STEP_CHOICES.SURVEY_CERT_SURVEY);
    }
    // let formOptions: IFormOption[] = [
    //     { label: "-", value: GENDER_USER_CHOICES.GENDER_NOT_SET.toString() },
    //     { label: "Pani", value: GENDER_USER_CHOICES.GENDER_FEMALE.toString() },
    //     { label: "Pan", value: GENDER_USER_CHOICES.GENDER_MALE.toString() },
    // ];
    /* ----------------------------------- */
    return (
        <>
            <BodyContainer noPadding={true} className="mb-2 mt-5 has-text-centered">
                {notification}
                {step === SURVEY_CERT_STEP_CHOICES.SURVEY_CERT_STEP_CODE_VERYFICATION && (
                    <>{!notification && <Wait text="Proszę czekać, weryfikuję link." />}</>
                )}
                {step === SURVEY_CERT_STEP_CHOICES.SURVEY_CERT_STEP_ENTER_EMAIL && (
                    <>
                        <div>Generator certyfikatu ukończenia szkolenia:</div>
                        <div className="is-size-4 has-text-weight-bold mt-4">{surveyCert.inStore?.pName},</div>
                        <div>
                            które odbyło się: <b>{HelperClass.formatDate(surveyCert.inStore?.start, DATE_FORMAT_CHOICES.DATE_FORMAT_DATE)}</b>
                        </div>
                        <div className="mt-5">Certyfikat ukończenia szkolenia zostanie wysłany po wypełnieniu ankiety na adres:</div>

                        <div className="mt-5">
                            <b>{surveyCert.masked_email}</b>
                        </div>
                        <form>
                            <div className="mt-5">W celu weryfikacji wprowadź powyższy adres email w całości</div>
                            <div className="mt-3" style={{ width: "50%", margin: "auto" }}>
                                <Input
                                    id={"email"}
                                    name="email"
                                    placeholder="Email"
                                    register={register}
                                    validateType="email"
                                    errors={errors}
                                    // className='mt-2'
                                ></Input>
                            </div>
                            <SubmitButton handleSubmit={handleSubmit} routine={submitVerifyEmail} isSubmitted={isSubmitted}>
                                Kontynuuj
                            </SubmitButton>
                        </form>
                    </>
                )}
                {step === SURVEY_CERT_STEP_CHOICES.SURVEY_CERT_STEP_CONFIRM_NAME && (
                    <>
                        <div className="is-size-5">Świetnie!</div>
                        <div>Twój adres email został poprawnie zweryfikowany.</div>

                        <div className="mt-1">
                            Poniższe dane znajdą się na certyfikacie ukończenia szkolenia.<br></br> Proszę sprawdź je i ewentualnie popraw.
                        </div>
                        <div className="is-size-7">Jeżeli chcesz dodać przedrostek typu "dr", "mgr.", "ks.", dodaj go przed imieniem.</div>
                        <form>
                            <div className="mt-3" style={{ width: "50%", margin: "auto" }}>
                                <Input
                                    id={"gender"}
                                    name="gender"
                                    label={
                                        <>
                                            forma grzecznościowa: <br />
                                        </>
                                    }
                                    register={register}
                                    errors={errors}
                                    type="select"
                                    options={genderFormOptions}
                                    validateType="noFirstOption"
                                ></Input>
                            </div>
                            <div className="mt-3" style={{ width: "50%", margin: "auto" }}>
                                <Input
                                    id={"fname"}
                                    name="imie"
                                    label="imię:"
                                    placeholder="Imię"
                                    defaultValue={surveyCert.fname}
                                    register={register}
                                    errors={errors}
                                    className="has-text-centered"
                                ></Input>
                            </div>
                            <div className="mt-3" style={{ width: "50%", margin: "auto" }}>
                                <Input
                                    id={"lname"}
                                    name="nazwisko"
                                    label="nazwisko:"
                                    placeholder="Nazwisko"
                                    defaultValue={surveyCert.lname}
                                    register={register}
                                    errors={errors}
                                    className="has-text-centered"
                                ></Input>
                            </div>
                            <SubmitButton handleSubmit={handleSubmit} routine={submitConfirmName} isSubmitted={isSubmitted}>
                                Kontynuuj
                            </SubmitButton>
                            <div className="mt-5 is-size-6">
                                W kolejnym kroku zostaniesz przekierowany do ankiety, <br></br>po jej wypełnieniu wyślemy certyfikat na zweryfikowany
                                adres email.
                            </div>
                        </form>
                    </>
                )}
                {step === SURVEY_CERT_STEP_CHOICES.SURVEY_CERT_SURVEY && (
                    <>
                        <Survey surveyCert={surveyCert} />
                        {/* testId={surveyCert.test?.testId} productId={surveyCert.inStore?.productId} surveyType="offline" /> */}
                    </>
                )}
            </BodyContainer>
        </>
    );
}
