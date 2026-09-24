import { RefCallBack, useForm } from "react-hook-form";
import { IBBParticipant } from "../../interfaces/IBB";
import { ACTIVITY_STATUS_CHOICES } from "./BBEnum";
import { BBInputForm } from "./BBInputForms";
import { useState } from "react";
import RequestClass from "../../classes/RequestClass";
import { IPakietType } from "../../classes/BBHelperClass";
import { Signal } from "@preact/signals-react";
import { IirbSignal } from "./BBUserPanel";

interface IBBRegisterEditUser {
    participant: IBBParticipant;
    // activityType: IPakietType;
    refresh_calback: RefCallBack | null; // return kiedy odświeżamy interfejs
    toPay: number;
    irbSignal: Signal<IirbSignal>;
}

export const BBRegisterEditUser = (props: IBBRegisterEditUser) => {
    const [notification, setNotification] = useState<JSX.Element | String>();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    /* -----
     * aktualizacja danych uczestnika
     * ----- */
    /* wysłanie formularza */
    function onSubmit(data: any, deleteButt: Boolean) {
        const err_callback = (result: any) => {
            if (setNotification) setNotification(RequestClass.errorAlert(result));
            setIsSubmitted(false);
        };

        const succ_callback = (result: any) => {
            if (!(props.refresh_calback === undefined || props.refresh_calback === null)) props.refresh_calback(undefined);
            setIsSubmitted(false);
            setNotification(<></>);
        };

        let dataToSend = {};
        if (deleteButt === true) {
            dataToSend = {
                participant: {
                    pk: props.participant.pk,
                    remove: true,
                },
            };
        } else {
            dataToSend = {
                participant: {
                    pk: props.participant.pk,
                    name: data.name,
                    rankConsent: data.rankConsent,
                    groupName: data.groupName,
                    nick: data.nick,
                },
            };
        }

        var requestOptions = {
            method: "POST",
            body: JSON.stringify(dataToSend),
        };
        RequestClass.makeRequest("bb/participant", requestOptions, succ_callback, err_callback);
        setIsSubmitted(true);
        setNotification(<></>);
    }

    return (
        <>
            <div className="content pt-2">
                <blockquote>
                    <div className="pt-2 slim">
                        <div>
                            <BBInputForm
                                type={"name"}
                                register={register}
                                errors={errors}
                                defaultValue={props.participant.name}
                                labelClassName={"is-size-7"}
                            />
                        </div>
                        <div>
                            <BBInputForm
                                type={"rankConsent"}
                                register={register}
                                errors={errors}
                                defaultValue={props.participant.rankConsent}
                            />
                            <BBInputForm
                                type={"nick"}
                                register={register}
                                errors={errors}
                                defaultValue={props.participant.nick}
                                labelClassName={"is-size-7"}
                            />

                            <BBInputForm
                                type={"groupName"}
                                register={register}
                                errors={errors}
                                defaultValue={props.participant.groupName}
                                labelClassName={"is-size-7"}
                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="buttons is-right">
                            {/* {activityType.status}, {toPay} */}
                            {props.irbSignal.value.pakiet.status === ACTIVITY_STATUS_CHOICES.SELECTED && props.toPay > 0 && (
                                <button
                                    className="button is-danger is-small"
                                    name={"removeButton"}
                                    onClick={handleSubmit((data) => {
                                        if (window.confirm("Czy usunąć uczestnika: " + props.participant.name + "?")) {
                                            onSubmit(data, true);
                                        }
                                    })}
                                >
                                    Usuń uczestnika
                                </button>
                            )}
                            <button
                                className={"button " + (isSubmitted ? "is-loading" : "")}
                                onClick={handleSubmit((data) => onSubmit(data, false))}
                            >
                                Zapisz
                            </button>
                            <button
                                className="button"
                                onClick={() => (props.irbSignal.value = { ...props.irbSignal.value, panel: "none" })}
                            >
                                Anuluj
                            </button>
                        </div>
                    </div>
                </blockquote>
            </div>
        </>
    );
};
