import UserDataContainer from "./UserDataContainer";
import { useUserAccountContext } from "../../context/UserAccountContext";
import { Input } from "../../components/forms/Input";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/forms/SubmitButton";
import { useContext, useState } from "react";
import RequestClass from "../../classes/RequestClass";
import { IInStore } from "../../interfaces/IProducts";
import { Notification } from "../../components/Notification";
import IReqOptions from "../../interfaces/IReqOptions";
import { Link, useParams } from "react-router-dom";
import { IUrlCoupon } from "../../interfaces/IUrl";
import { isMobile } from "react-device-detect";
import { UserContext } from "../../context/UserContext";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ICuponProducts {
    products: IInStore[];
}

const UserCouponList = () => {
    const { setNotification, setIsUserDataRead } = useUserAccountContext();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const urlParams = useParams<IUrlCoupon>();
    const { setIsLogged } = useContext(UserContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    let infoMsg = (
        <div className="m-2">
            Swoimi kursami możesz zarządzać tutaj
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
        </div>
    );

    function saveDefault(data: any) {
        const couponAlreadyUsedHint = (
            <Notification type="warning" lead="Kupon mógł zostać już zrealizowany.">
                Jeśli korzystałeś już z tego linku, szkolenie może znajdować się w Twojej bibliotece.
                <br />
                Przejdź do <Link to="/kursy">Moje kursy</Link> i sprawdź dostępne szkolenia.
            </Notification>
        );
        const err_callback = (result: any) => {
            if (RequestClass.logoutOnError(result)) {
                setIsLogged(false);
            }
            if (setNotification) {
                if (result?.errCode === "coupon_m010") {
                    setNotification(
                        <>
                            {RequestClass.errorAlert(result)}
                            {couponAlreadyUsedHint}
                        </>
                    );
                } else {
                    setNotification(RequestClass.errorAlert(result));
                }
            }
            setIsSubmitted(false);
        };
        const warning_callback = (result: any) => {
            if (setNotification) {
                if (result?.errCode === "coupon_a090") {
                    setNotification(
                        <>
                            {RequestClass.errorAlert(result, true)}
                            {couponAlreadyUsedHint}
                            {infoMsg}
                        </>
                    );
                } else {
                    setNotification(
                        <>
                            {RequestClass.errorAlert(result, true)}
                            {infoMsg}
                        </>
                    );
                }
            }
            setIsSubmitted(false);
        };
        const succ_callback = (result: ICuponProducts) => {
            if (setNotification) {
                if (result.products === undefined) {
                    setNotification(
                        <Notification type="warning">
                            Kod jest poprawny, ale wygląda na to, że nie przypisano do niego produktów.
                            <br />
                            Przepraszamy za problem, proszę skontaktuj się nami w celu wyjaśnienia sprawy.
                        </Notification>
                    );
                } else {
                    // if (setIsCoursesRead)
                    //     setIsCoursesRead(false);
                    setNotification(
                        <>
                            <Notification type="success" lead="Gratulacje!">
                                Aktywowałeś następujące kursy:
                                {result.products?.map((product: IInStore, index) => (
                                    <div key={"szk_" + index} className="mt-2">
                                        {index + 1}. {product.pName}
                                    </div>
                                ))}
                                <div className="mt-2">
                                    Przejdź do zakładki <Link to="/kursy">Moje kursy</Link>, aby zarządzać swoimi kursami.
                                </div>
                            </Notification>

                            {infoMsg}
                        </>
                    );
                }
            }

            if (setIsUserDataRead) {
                setIsUserDataRead(false);
            }
            setIsSubmitted(false);
        };

        var requestOptions: IReqOptions = {
            method: "PUT",
            // body: JSON.stringify({"email": data.email}),
            // skipAuth: true
        };

        RequestClass.makeRequest(
            "coupon/activate/" + data.KUPON_1 + "/",
            requestOptions,
            succ_callback,
            err_callback,
            warning_callback
        );
        setIsSubmitted(true);
    }

    return (
        <>
            {/* <UserDataContainer apiCertRequired={true} waitMsg="Pobieram listę certyfikatów" >           */}
            <UserDataContainer>
                <>
                    {" "}
                    {isMobile && <div className="mb-3 has-text-weight-bold">Kupony</div>}
                    <div className="slim">
                        <Input
                            id="KUPON_1"
                            name="KUPON_1"
                            label="wprowadź kod kuponu"
                            placeholder="kupon"
                            register={register}
                            //onChange={handleChange}
                            defaultValue={urlParams.kupon}
                            errors={errors}
                            // required={forceRequired}
                        ></Input>
                        <SubmitButton
                            className="mt-4"
                            handleSubmit={handleSubmit}
                            routine={saveDefault}
                            isSubmitted={isSubmitted}
                        >
                            Aktywuj kupon
                        </SubmitButton>
                    </div>
                    {/* Twoje kupony:
                <div>Nie masz jeszcze kuponów.</div> */}
                </>
            </UserDataContainer>
        </>
    );
};

export default UserCouponList;
