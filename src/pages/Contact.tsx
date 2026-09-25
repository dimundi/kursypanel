// Stary widok /szkolenia/kontakt: na razie nieużywany w routingu panelu szkoleń.
// Zachowany do ewentualnego przywrócenia. Trasa /bb/kontakt również jest na razie wyłączona.
import { useContext, useEffect, useState } from "react";
import { ADDR_TYPE_CHOICES, ADRES_1_BIURO, ADRES_2_BIURO, EMAIL_BIURO, TELEFON_BIURO } from "../components/Enumerators";
import { ContactForm } from "../components/forms/ContactForm";
import { IOrder } from "../interfaces/IOrder";
import ProdBreadCrumb from "./products/ProdBreadCrumb";
import PageTitle from "../components/layout/PageTitle";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { IBasketProduct } from "../interfaces/IBasket";

const Contact = () => {
    // wszystkie dane związane z zapytaniem ofertowym
    const [order] = useState<IOrder>({
        products: [] as IBasketProduct[],
        addrContact: {
            addrType: ADDR_TYPE_CHOICES.ADDR_TYPE_CONTACT_BY_USER,
            aName: "",
        },
    });

    const [isSent, setIsSent] = useState(false);
    const navigate = useNavigate();
    const { setInquiryCnt } = useContext(UserContext);

    useEffect(() => {
        if (isSent === true) {
            /* formularz został poprawnie wysłany */
            setInquiryCnt(0);

            navigate("/zapytanie/sukces");
        }
    }, [isSent]);

    return (
        <>
            <PageTitle>
                <div className="container header-container">
                    <ProdBreadCrumb level1Title="Formularz kontaktowy" />
                    <div>Masz pytania? Napisz do nas.</div>
                </div>
            </PageTitle>

            <section>
                {" "}
                <div className="container">
                    <div className="columns m-2">
                        <div className="column ">
                            <ContactForm order={order} setIsSent={setIsSent} />
                        </div>
                        <div className="column box p-6">
                            <p className=" is-size-4">
                                Biuro Obsługi Klienta
                                <br />
                            </p>
                            <p className="is-size-5">
                                {ADRES_1_BIURO}
                                <br />
                                {ADRES_2_BIURO}
                                <br />
                                <br />
                                tel. {TELEFON_BIURO} <br />
                                {EMAIL_BIURO}
                                <br />
                            </p>

                            <p className="my-4">Biuro pracuje od poniedziałku do piątku w godzinach 7.00-15.00</p>
                            {/* <p className="is-size-5">
                                ODN Rewers posiada akredytację Pomorskiego Kuratora Oświaty.
                                <CustomLinks linkType={CUSTOM_LINK_TYPE.REWERS_AKREDYTACJA} className="is-size-6" />
                            </p> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
