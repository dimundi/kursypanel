import { Link, useParams } from "react-router-dom";
import { ADRES_0_BIURO, ADRES_1_BIURO, ADRES_2_BIURO, BANK_ACCOUNT, SYSTEM_CHOICES } from "../components/Enumerators";
import { IUrlOrderPayment } from "../interfaces/IUrl";

export type orderConfirmationType = "przelew" | "p24";
export interface IThankyou {
    type: orderConfirmationType;
    system?: SYSTEM_CHOICES; // np. BB - Bieg Belfra
}

const Thankyou = (props: IThankyou) => {
    const urlParams = useParams<IUrlOrderPayment>();

    return (
        <section className="hero  is-primary is-bold">
            <div className="hero-body">
                <div className="container mt-4 mb-4">
                    <h1 className="title">Dziękujemy za złożenie zamówienia </h1>
                    {urlParams.orderId && <h2 className="title">Numer Twojego zamówienia: {urlParams.orderId} </h2>}

                    {props.type === "p24" ? (
                        <>
                            <div className="is-size-5">Twoja płatność została zaksięgowana.</div>
                        </>
                    ) : (
                        <>
                            <div className="is-size-5">Wybrałeś płatność przelewem.</div>
                            <div className="mt-3">Dane do przelewu:</div>
                            <div>
                                Numer konta: {BANK_ACCOUNT}
                                <br />
                                {ADRES_0_BIURO}
                                <br />
                                {ADRES_1_BIURO}
                                <br />
                                {ADRES_2_BIURO}
                                <br />
                            </div>
                            <div className="mt-5">Twoje zamówienie zostanie zrealizowane po zaksięgowaniu wpłaty na naszym koncie.</div>
                        </>
                    )}
                    <div className="mt-3">
                        {props.system === SYSTEM_CHOICES.SYSTEM_BB ? (
                            <>
                                <Link to="/panel" className="is-underlined" style={{ color: "white" }}>
                                    <button className="button is-warning mt-3">Przejdź do Twojego Biegu Belfrów</button>
                                </Link>
                            </>
                        ) : (
                            <>
                                Sprawdź zakładkę{" "}
                                <Link to="/kursy" className="is-underlined" style={{ color: "white" }}>
                                    moje kursy
                                </Link>
                                .
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Thankyou;
