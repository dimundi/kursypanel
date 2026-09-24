import { useForm } from "react-hook-form";
import { AddrFormInputs } from "./AddrFormInputs";
import { Input } from "./Input";
import { IOrder } from "../../interfaces/IOrder";
import { Dispatch, useState } from "react";
import { ADDR_TYPE_CHOICES, CUSTOM_LINK_TYPE } from "../Enumerators";
import RequestClass from "../../classes/RequestClass";
import SubmitButton from "./SubmitButton";
import { useLocation } from "react-router-dom";
import CustomLinks from "../elements/CustomLinks";

/* -----------------------------------------------
 * infoLabel - alternatywny label dla pola dodatkowe informacje
 * setIsSent - hook, że formularz został poprawnie wysłany
 * ----------------------------------------------- */

export const ContactForm = (props: { order?: IOrder; title?: string; infoLabel?: string; setIsSent?: Dispatch<boolean> }) => {
    const [notification, setNotification] = useState<JSX.Element | String>();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const location = useLocation();
    // const captchaRef = useRef<ReCAPTCHA>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    /* wysłanie formularza */
    function onSubmit(data: any) {
        // console.log("props.order?.addrContact: ")
        // console.log(props.order?.addrContact)
        // console.log("props.order?.products: ")
        // console.log(props.order?.products)
        // console.log("addrContact: ")
        // console.log(addrContact)
        // console.log("data: ")
        // console.log(data)

        const err_callback = (result: any) => {
            if (setNotification) setNotification(RequestClass.errorAlert(result));
            setIsSubmitted(false);
        };

        const succ_callback = (result: any) => {
            if (setNotification) setNotification(RequestClass.succAlert("Dziękujemy!", <div>Wiadomość zostało wysłana.</div>));
            if (props.setIsSent) props.setIsSent(true);

            setIsSubmitted(false);
        };

        var locURL = location.pathname;

        let dataToSend = {
            contact: props.order?.addrContact,
            products: props.order?.products,
            message: {
                note: data.note,
                aggrements: data.acceptReg,
                WGSClient: data.WGSClient,
            },
            url: locURL,
        };

        var requestOptions = {
            method: "PUT",
            body: JSON.stringify(dataToSend),
        };
        RequestClass.makeRequest("contact/form/", requestOptions, succ_callback, err_callback);
        setIsSubmitted(true);
    }

    const [addrContact, setAddrContact] = useState(
        props.order ? props.order.addrContact : { addrType: ADDR_TYPE_CHOICES.ADDR_TYPE_CONTACT_BY_USER, aName: "" }
    );

    var infoLabel = "dodatkowe informacje";
    if (props.infoLabel) infoLabel = props.infoLabel;

    return (
        <>
            <form>
                <div className="center-with-margin slim">
                    <div className="mb-3 is-size-5">{props.title ? props.title : "Formularz kontaktowy:"}</div>

                    <AddrFormInputs
                        addrType={"contact_offer"}
                        register={register}
                        errors={errors}
                        data={addrContact}
                        setData={setAddrContact}
                        prefixName="contact_"
                    />

                    <Input type="textarea" id="note" register={register} errors={errors} required={false} label={infoLabel} />
                    <div>
                        <Input
                            type="checkbox"
                            id="WGSClient"
                            register={register}
                            errors={errors}
                            defaultChecked={false}
                            required={false}
                            label={"Moja placówka posiada Wirtualną Gazetkę Szkolną."}
                            labelClassName="is-size-7 ml-2"
                        />
                    </div>
                    <div>
                        <Input
                            type="checkbox"
                            id="acceptReg"
                            register={register}
                            errors={errors}
                            defaultChecked={false}
                            label={
                                <>
                                    Zapoznałem się i akceptuję{" "}
                                    <CustomLinks linkType={CUSTOM_LINK_TYPE.REWERS_SHOP_RULES} showIcon={false} label={<>regulamin</>} /> oraz
                                    zgadzam się na przetwarzanie moich danych osobowych na potrzeby tego zapytania ofertowego.
                                </>
                            }
                            labelClassName="is-size-7 ml-2"
                        />
                    </div>
                </div>
                <div className="mt-5 has-text-centered">
                    <SubmitButton handleSubmit={handleSubmit} recaptcha={true} routine={onSubmit} isSubmitted={isSubmitted}>
                        Wyślij zapytanie
                    </SubmitButton>
                    {/* <div className="mr-2 button is-primary" onClick={handleSubmit(onSubmit)}>
                    Wyślij zapytanie
                </div>       */}
                </div>
            </form>
            {notification}
        </>
    );
};
