import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InvoiceFormInputs } from "../../components/forms/InvoiceFormInputs";
import { IOrder } from "../../interfaces/IOrder";
import UserDataContainer from "./UserDataContainer";
import { useUserAccountContext } from "../../context/UserAccountContext";
import RequestClass from "../../classes/RequestClass";
import IReqOptions from "../../interfaces/IReqOptions";
import SubmitButton from "../../components/forms/SubmitButton";
import { isMobile } from "react-device-detect";

const UserData = () => {
    const { userData, setNotification } = useUserAccountContext();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [order, setOrder] = useState<IOrder>({});

    /* wysyłam zapytanie */
    useEffect(() => {
        if (userData?.default) setOrder(userData.default);
    }, [userData]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function saveDefault(data: any) {
        const err_callback = (result: any) => {
            if (setNotification) setNotification(RequestClass.errorAlert(result));
            setIsSubmitted(false);
        };

        const succ_callback = (result: any) => {
            if (setNotification) setNotification(RequestClass.succAlert("Sukces!", <div>Dane zostały zmienione.</div>));
            setIsSubmitted(false);
        };

        var requestOptions: IReqOptions = {
            method: "POST",
            body: JSON.stringify({ default: order }),
        };
        //console.log(JSON.stringify({"default": order}))
        RequestClass.makeRequest("usr/", requestOptions, succ_callback, err_callback);
        setIsSubmitted(true);
    }

    return (
        <>
            <UserDataContainer apiUserRequired={true} waitMsg="Pobieram dane użytkownika">
                {isMobile && <div className="mb-3 has-text-weight-bold">Twoje dane roliczeniowe</div>}
                <form>
                    <InvoiceFormInputs order={order} setOrder={setOrder} register={register} errors={errors} forceRequired={false} />
                    <SubmitButton handleSubmit={handleSubmit} routine={saveDefault} isSubmitted={isSubmitted} />
                    {/* <button className={`button is-primary `+ (isSubmitted?"is-loading":"")}  type="submit" value="Zapisz" onClick={handleSubmit(saveDefault)}>Zapisz</button> */}
                </form>
            </UserDataContainer>
        </>
    );
};

export default UserData;
