import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCheckCircle, faUniversity } from "@fortawesome/free-solid-svg-icons";
import { ADRES_0_BIURO, ADRES_1_BIURO, ADRES_2_BIURO, BANK_ACCOUNT, SYSTEM_CHOICES } from "../components/Enumerators";
import { IUrlOrderPayment } from "../interfaces/IUrl";

export type orderConfirmationType = "przelew" | "p24";
export interface IThankyou {
    type: orderConfirmationType;
    system?: SYSTEM_CHOICES; // np. BB - Bieg Belfra
}

const Thankyou = (props: IThankyou) => {
    const urlParams = useParams<IUrlOrderPayment>();
    const isP24 = props.type === "p24";

    return (
        <section className="order-confirmation">
            <div className="order-confirmation-card">
                <div className="order-confirmation-icon" aria-hidden="true">
                    <FontAwesomeIcon icon={isP24 ? faCheckCircle : faUniversity} />
                </div>
                <div className="order-confirmation-content">
                    <p className="order-confirmation-eyebrow">Zamówienie przyjęte</p>
                    <h1>Dziękujemy za złożenie zamówienia</h1>
                    {urlParams.orderId && (
                        <p className="order-confirmation-order">
                            Numer zamówienia: <strong>{urlParams.orderId}</strong>
                        </p>
                    )}

                    {isP24 ? (
                        <p className="order-confirmation-message">
                            Twoja płatność została zaksięgowana. Jeśli zamówienie obejmuje kursy online, znajdziesz je w zakładce Moje kursy.
                        </p>
                    ) : (
                        <div className="order-confirmation-message">
                            <p>Wybrałeś płatność przelewem. Zamówienie zostanie zrealizowane po zaksięgowaniu wpłaty na naszym koncie.</p>
                            <div className="order-confirmation-transfer">
                                <span>Dane do przelewu</span>
                                <strong>{BANK_ACCOUNT}</strong>
                                <small>
                                    {ADRES_0_BIURO}
                                    <br />
                                    {ADRES_1_BIURO}
                                    <br />
                                    {ADRES_2_BIURO}
                                </small>
                            </div>
                        </div>
                    )}

                    {props.system === SYSTEM_CHOICES.SYSTEM_BB ? (
                        <Link to="/panel" className="button is-primary order-confirmation-action">
                            Przejdź do Twojego Biegu Belfrów
                        </Link>
                    ) : (
                        <Link to="/kursy" className="button is-primary order-confirmation-action">
                            <FontAwesomeIcon icon={faBookOpen} />
                            Moje kursy
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Thankyou;
