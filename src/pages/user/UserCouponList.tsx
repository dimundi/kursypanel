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
import { faBookOpen, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
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
                        </>
                    );
                } else {
                    setNotification(RequestClass.errorAlert(result, true));
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
                    setNotification(
                        <div className="coupon-success-card">
                            <div className="coupon-success-icon" aria-hidden="true">
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </div>
                            <div className="coupon-success-content">
                                <p className="coupon-success-eyebrow">Kupon aktywowany</p>
                                <h3>Dodaliśmy kursy do Twojej biblioteki</h3>
                                <p>Aktywowane szkolenia:</p>
                                <ol className="coupon-success-list">
                                    {result.products?.map((product: IInStore, index) => (
                                        <li key={product.productId || "szk_" + index}>{product.pName}</li>
                                    ))}
                                </ol>
                                <Link to="/kursy" className="button is-primary coupon-success-action">
                                    <FontAwesomeIcon icon={faBookOpen} />
                                    Moje kursy
                                </Link>
                            </div>
                        </div>
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
                    {isMobile && <div className="mb-3 has-text-weight-bold">Kupony</div>}
                    <div className="coupon-activation-card">
                        <div className="coupon-activation-header">
                            <p className="coupon-activation-eyebrow">Kod dostępu</p>
                            <h3>Aktywuj kupon</h3>
                            <p>Wpisz kod z wiadomości, aby dodać przypisane szkolenia do swojego konta.</p>
                        </div>
                        <div className="coupon-activation-form">
                            <Input
                                id="KUPON_1"
                                name="KUPON_1"
                                label="Kod kuponu"
                                placeholder="np. ABC123"
                                register={register}
                                defaultValue={urlParams.kupon}
                                errors={errors}
                            ></Input>
                            <SubmitButton
                                className="coupon-activation-submit"
                                handleSubmit={handleSubmit}
                                routine={saveDefault}
                                isSubmitted={isSubmitted}
                            >
                                Aktywuj kupon
                            </SubmitButton>
                        </div>
                    </div>
                </>
            </UserDataContainer>
        </>
    );
};

export default UserCouponList;
