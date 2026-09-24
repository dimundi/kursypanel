import { RefCallBack, useForm } from "react-hook-form";
import { Input } from "../../components/forms/Input";
import { useContext, useEffect, useState } from "react";
import { IBBApi, IBBParticipant } from "../../interfaces/IBB";
import BBTshirts from "./BBTshirt";
import BBActivities from "./BBActivities";
import HelperClass from "../../classes/HelperClass";
import RequestClass from "../../classes/RequestClass";
import { CUSTOM_LINK_TYPE } from "../../components/Enumerators";
import CustomLinks from "../../components/elements/CustomLinks";
import { BBInputForm } from "./BBInputForms";
import { UserContext } from "../../context/UserContext";
import BBHelpMsg from "./BBHelpMsg";

export interface IBBRegister {
    userAdd_calback: RefCallBack; // return kiedy doadamy uczestnika
    back_calback: RefCallBack; // cofnięcie
    bbApi?: IBBApi;
}

/* *********************************************************************************** */
const BBRegister = (props: IBBRegister) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [bbBasketValue, setbbBasketValue] = useState(0);
    const [activityId, setActivityId] = useState(0); // jako productId!
    const [tshirtId, setShirtId] = useState(0); // jako productId!
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showShipmentDetails, setShowShipmentDetails] = useState(false);
    const [notification, setNotification] = useState<JSX.Element | String>();
    const { user } = useContext(UserContext);

    /* ----------------------------------------------------- */
    /* wysłanie formularza */
    function onSubmit(data: any) {
        if (activityId == 0) {
            setNotification(
                <div>
                    <span className=" tag is-danger">Wybierz pakiet startowy</span>
                </div>
            );
            return;
        }
        const err_callback = (result: any) => {
            if (setNotification) setNotification(RequestClass.errorAlert(result));
            setIsSubmitted(false);
        };

        const succ_callback = (result: any) => {
            //if (setNotification) setNotification(RequestClass.succAlert("Dziękujemy!", <div>Wiadomość zostało wysłana.</div>));
            // if (props.setIsSent) props.setIsSent(true);
            if (props.userAdd_calback != undefined) props.userAdd_calback(undefined);
            setIsSubmitted(false);
        };

        let products = [];
        if (activityId > 0) {
            products.push({ productId: activityId, cnt: 1 });
        }
        if (tshirtId > 0) {
            products.push({ productId: tshirtId, cnt: 1 });
        }
        let dataToSend = {
            participant: {
                name: data.name,
                rankConsent: data.rankConsent,
                groupName: data.groupName,
                nick: data.nick,
            },
            products: products,
        };

        var requestOptions = {
            method: "POST",
            body: JSON.stringify(dataToSend),
        };
        RequestClass.makeRequest("bb/participant", requestOptions, succ_callback, err_callback);
        setIsSubmitted(true);
    }
    /* ----------------------------------------------------- */
    function countParticipants() {
        if (props.bbApi === undefined) return 0;
        return props.bbApi?.participants.length;
    }

    /* ----------------------------------------------------- */
    useEffect(() => {
        /* obliczanie sumy zamówienia */
        let suma = 0;
        let pInStore = HelperClass.getProductInProduct(tshirtId, props.bbApi?.products);
        if (pInStore?.price !== undefined) suma += pInStore.price;
        pInStore = HelperClass.getProductInProduct(activityId, props.bbApi?.products);
        if (pInStore?.price !== undefined) suma += pInStore.price;

        setbbBasketValue(suma);
        setNotification(<></>);
    }, [tshirtId, activityId]);

    /* ----------------------------------------------------- */
    function getDefaultGroupName(groupName?: string) {
        if (groupName !== undefined && groupName.length > 0) return groupName;
        let pObj = props.bbApi?.participants.find(
            (participant: IBBParticipant) => participant.groupName !== undefined && participant.groupName?.length > 0
        );
        if (pObj !== undefined) {
            return pObj.groupName;
        }
        return "";
    }

    function getDefaultName() {
        if (props.bbApi?.participants !== undefined && props.bbApi?.participants.length > 0) {
            /* to nie jest pierwszy uczestnik */
            return "";
        }
        let name = "";
        if (user.first_name != undefined) name = user.first_name + " ";
        if (user.last_name != undefined) name = name + user.last_name;
        return name;
    }
    /* ----------------------------------------------------- */
    // return (
    //     <>
    //         <div className="pb-0 is-size-4">
    //             {countParticipants() > 0 && (
    //                 <>
    //                     <small
    //                         className="button is-small"
    //                         onClick={() => {
    //                             if (props.back_calback) props.back_calback(undefined);
    //                         }}
    //                     >
    //                         <i className="fa-solid fa-arrow-left"></i>
    //                     </small>
    //                     <br />
    //                 </>
    //             )}
    //             5 edycja Biegu Belfrów jest już historią
    //             <br></br>Zapraszamy w maju 2025 roku na kolejną edycję!
    //         </div>
    //     </>
    // );
    return (
        <>
            <div className="pb-0 is-size-4">
                {countParticipants() > 0 && (
                    <>
                        <small
                            className="button is-small"
                            onClick={() => {
                                if (props.back_calback) props.back_calback(undefined);
                            }}
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                        </small>
                        <br />
                    </>
                )}
                Rejestracja uczestnika na 5 edycję Biegu Belfrów
            </div>
            <div className="pb-2">Więcej uczestników możesz dodać w kolejnych krokach.</div>
            <div className="pb-2 is-size-7">Pola oznaczone * gwiazdką są obowiązkowe</div>

            {/* <div className="mb-3 is-size-5">{props.title ? props.title : "Formularz kontaktowy:"}</div> */}
            {/* 
                    <Input
                        id={"imie"}
                        name="aName"
                        label="email *"
                        placeholder="email"
                        register={register}
                        // onChange={handleChange}
                        // defaultValue={props.data.aName}
                        // errors={props.errors}
                        // required={forceRequired}
                    ></Input>
                 */}
            <div className="pt-1 slim">
                <BBInputForm type={"name"} register={register} errors={errors} defaultValue={getDefaultName()} />
            </div>

            <div className="py-3 is-size-5">*Wybierz pakiet startowy:</div>
            <div className="container">
                <BBActivities activityId={activityId} setActivityId={setActivityId} products={props.bbApi?.products} />
            </div>
            <div className="py-3 is-size-5">Wybierz koszulkę:</div>
            <BBTshirts tshirtId={tshirtId} setShirtId={setShirtId} products={props.bbApi?.products} />

            <div className="content mt-4">
                <blockquote>
                    <div>Nowość !</div>
                    <BBInputForm type={"rankConsent"} register={register} errors={errors} defaultValue={getDefaultGroupName(undefined)} />
                    <div>
                        Dane podane niżej są opcjonalne, ale po ich wprowadzeniu staną się publiczne. Będą one wyświetlane w tabeli rankingowej.
                    </div>
                    <div> Jeżeli nie podasz tych danych, obok twojego wyniku pojawi się tylko numer startowy.</div>
                    <div className="pt-1 slim">
                        <BBInputForm type={"nick"} register={register} errors={errors} labelClassName="is-size-7" />
                    </div>
                    <div className="pt-2 slim">
                        <BBInputForm
                            type={"groupName"}
                            register={register}
                            errors={errors}
                            defaultValue={getDefaultGroupName(undefined)}
                            labelClassName="is-size-7"
                        />
                    </div>
                </blockquote>
            </div>
            <hr className="m-0"></hr>
            <div className="pt-4">
                Suma do zapłaty: <span className="is-size-4">{bbBasketValue} zł</span>
            </div>
            <div className="pb-3">
                + koszty wysyłki{" "}
                <a onClick={() => setShowShipmentDetails(!showShipmentDetails)}>
                    {showShipmentDetails ? "(ukryj koszty wysyłki)" : "(poznaj koszty wysyłki)"}
                </a>
            </div>
            {showShipmentDetails && (
                <div>
                    <div className="py-2">Koszty wysyłki:</div>
                    <div className="pl-3">{HelperClass.getShipmentsMethod(props.bbApi?.shipment)}</div>
                    <div className="py-2">
                        Za wysyłkę płacisz raz na zamówienie - niezależnie ilu uczestników zostanie zarejestrowanych.
                        <br></br>Sposób wysyłki wybierasz w podsumowaniu zamówienia.
                    </div>
                </div>
            )}
            <div className="pt-1">
                <Input
                    id={"bbConsent"}
                    label={
                        <>
                            *Zapoznałem się i akceptuję
                            <CustomLinks linkType={CUSTOM_LINK_TYPE.BB_CURRENT_RULES} className="is-size-7 ml-2" showIcon={false} />
                        </>
                    }
                    register={register}
                    type="checkbox"
                    errors={errors}
                    defaultChecked={false}
                ></Input>
            </div>
            <button className={` mt-2 button is-primary ` + (isSubmitted ? "is-loading" : "")} type="submit" onClick={handleSubmit(onSubmit)}>
                Zarejestruj uczestnika na 5 Bieg Belfrów
            </button>
            <BBHelpMsg />
            {notification}
        </>
    );
};

export default BBRegister;
