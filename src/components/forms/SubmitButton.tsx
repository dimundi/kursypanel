import { ReactNode, useState } from "react";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

const SubmitButton = (props: {
    handleSubmit: UseFormHandleSubmit<FieldValues>;
    className?: string;
    routine: (data: any) => void;
    isSubmitted: boolean;
    children?: ReactNode; // nazwa buttona
    // captchaRef?:any,
    recaptcha?: boolean;
}) => {
    // const [disableButton, setDisableButton] = useState(props.recaptcha ? true : false);

    const [disableButton, setDisableButton] = useState(false);

    return (
        <>
            {/* {props.recaptcha && (
                <div className="center-recaptcha mt-3">
                    <ReCAPTCHA
                        badge="inline"
                        sitekey={process.env.REACT_APP_ReCAPTCHA_SITE_KEY}
                        onChange={() => {
                            setDisableButton(false);
                        }}
                        onExpired={() => {
                            setDisableButton(true);
                        }}
                        onErrored={() => {
                            setDisableButton(true);
                        }}
                    />
                </div>
            )} */}

            <button
                disabled={disableButton}
                className={props.className + ` mt-2 button is-primary ` + (props.isSubmitted ? "is-loading" : "")}
                type="submit"
                onClick={props.handleSubmit(props.routine)}
            >
                {props.children ? props.children : "Zapisz"}
            </button>
        </>
    );
};
export default SubmitButton;
