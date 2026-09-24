import { useState } from "react";
import RequestClass from "../../classes/RequestClass";
import { genderFormOptions, Input } from "../../components/forms/Input";
import { useForm } from "react-hook-form";
import UserDataContainer from "./UserDataContainer";
import { useUserAccountContext } from "../../context/UserAccountContext";
import IReqOptions from "../../interfaces/IReqOptions";
import SubmitButton from "../../components/forms/SubmitButton";
import { isMobile } from "react-device-detect";

const UserData = () => {
    const { userData, setNotification, setIsUserDataRead } = useUserAccountContext();
    const [isSubmitted, setIsSubmitted] = useState(false);

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

            if (setIsUserDataRead) {
                setIsUserDataRead(false);
            }
            setIsSubmitted(false);
        };
        var requestOptions: IReqOptions = {
            method: "POST",
            body: JSON.stringify({
                first_name: data.first_name,
                last_name: data.last_name,
                gender: data.gender,
            }),
        };

        RequestClass.makeRequest("usr/", requestOptions, succ_callback, err_callback);
        setIsSubmitted(true);
    }

    return (
        <>
            <UserDataContainer apiUserRequired={true} waitMsg="Pobieram dane użytkownika">
                {isMobile && <div className="mb-3 has-text-weight-bold">Twoje dane osobowe</div>}
                <form>
                    <div className={"columns slim " + (isMobile ? " " : " m-2")}>
                        <div className="column ">
                            <p className="py-2">
                                forma grzecznościowa oraz rodzajowa, którą będziemy używać podczas formatowania tekstu, np. na certyfikatach:
                                <Input
                                    id={"gender"}
                                    name="gender"
                                    register={register}
                                    errors={errors}
                                    type="select"
                                    required={false}
                                    options={genderFormOptions}
                                    defaultValue={userData?.gender}
                                ></Input>
                            </p>
                            <p className="py-2">
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    label="imię"
                                    placeholder="imię"
                                    register={register}
                                    defaultValue={userData?.first_name}
                                    //errors={props.errors}
                                    required={false}
                                ></Input>
                            </p>
                            <p className="py-2">
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    label="nazwisko"
                                    placeholder="nazwisko"
                                    register={register}
                                    defaultValue={userData?.last_name}
                                    //errors={props.errors}
                                    required={false}
                                ></Input>
                            </p>
                            <p className="py-2">
                                <Input
                                    id="email"
                                    name="email"
                                    label="email"
                                    placeholder="email"
                                    register={register}
                                    disabled={true}
                                    defaultValue={userData?.email}
                                    //errors={props.errors}
                                    required={false}
                                ></Input>
                            </p>

                            <SubmitButton handleSubmit={handleSubmit} routine={saveDefault} isSubmitted={isSubmitted} />
                            {/* <input className="button is-primary"  type="submit" value="Zapisz zmiany" onClick={handleSubmit(saveDefault)}/> */}
                        </div>
                    </div>
                </form>
            </UserDataContainer>
        </>
    );
};

export default UserData;
