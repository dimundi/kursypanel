import { UserContext } from "../../context/UserContext";
import { useContext, useState } from "react";
import RequestClass from "../../classes/RequestClass";
import { genderFormOptions, Input } from "../../components/forms/Input";
import { useForm } from "react-hook-form";
import UserDataContainer from "./UserDataContainer";
import { useUserAccountContext } from "../../context/UserAccountContext";
import IReqOptions from "../../interfaces/IReqOptions";
import SubmitButton from "../../components/forms/SubmitButton";
import { isMobile } from "react-device-detect";
import { useNavigate, useSearchParams } from "react-router-dom";

const UserData = () => {
    const { user, setUser } = useContext(UserContext);
    const { userData, setNotification, setIsUserDataRead } = useUserAccountContext();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const returnTo = searchParams.get("returnTo");

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
            setUser({ ...user, first_name: data.first_name, last_name: data.last_name });
            if (setNotification) setNotification(RequestClass.succAlert("Sukces!", <div>Dane zostały zmienione.</div>));

            if (setIsUserDataRead) {
                setIsUserDataRead(false);
            }
            setIsSubmitted(false);
            if (returnTo && returnTo.startsWith("/") && !returnTo.startsWith("//")) {
                navigate(returnTo);
            }
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
                <form className="account-form-card">
                    <div className="account-form-intro">
                        <h2>Dane osobowe</h2>
                        <p>Te dane wykorzystujemy między innymi przy generowaniu certyfikatów.</p>
                    </div>
                    <div className="account-form-grid">
                        <div className="account-form-field is-short">
                            <div className="account-field-note">Forma grzecznościowa</div>
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
                        </div>
                        <div className="account-form-field">
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
                        </div>
                        <div className="account-form-field">
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
                        </div>
                        <div className="account-form-field">
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
                        </div>
                    </div>
                    <div className="account-form-actions">
                        <SubmitButton handleSubmit={handleSubmit} routine={saveDefault} isSubmitted={isSubmitted} />
                    </div>
                </form>
            </UserDataContainer>
        </>
    );
};

export default UserData;
