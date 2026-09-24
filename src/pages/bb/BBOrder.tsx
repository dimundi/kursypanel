import { RefCallBack, useForm } from "react-hook-form";
import { IBBApi } from "../../interfaces/IBB";
import { AddrFormInputs } from "../../components/forms/AddrFormInputs";
import { useState } from "react";
import { ADDR_TYPE_CHOICES } from "../../components/Enumerators";
import { IOrder } from "../../interfaces/IOrder";
import Cart from "../cart/Cart";

export interface IBBOrder {
    bbApi?: IBBApi;
    back_calback: RefCallBack; // cofnięcie
    order?: IOrder;
}

/* *******************************************************************************
 * finalizowanie zamówienia BB
 * ******************************************************************************* */
const BBOrder = (props: IBBOrder) => {
    const [addrData, setAddrData] = useState(
        props.order ? props.order.addrShipment : { addrType: ADDR_TYPE_CHOICES.ADDR_TYPE_SHIPMENT_BY_USER, aName: "" }
    );
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    /* ----------------------------------------------------- */
    /* wysłanie formularza */
    function onSubmit(data: any) {
        // console.log(data);
    }

    /* ----------------------------------------------------- */

    return <></>;

    return (
        <>
            {/* <script async src="https://mapa.apaczka.pl/client/apaczka.map.js" onLoad={() => console.log("script loaded")} /> */}

            <div className="pb-2 is-size-4">
                <small
                    className="button is-small"
                    onClick={() => {
                        if (props.back_calback) props.back_calback(undefined);
                    }}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </small>{" "}
                Rejestracja na Bieg Belfrów - finalizacja
            </div>
            <article>
                Wprowadź dane do wysyłki:
                <div>
                    {/* <AddrFormInputs
                        prefixName="bbAddr_"
                        addrType="shipment"
                        register={register}
                        errors={errors}
                        data={addrData}
                        setData={setAddrData}
                    /> */}
                </div>
                <div className="mt-5 has-text-centered">
                    <button
                        className={` mt-2 button is-primary ` + (isSubmitted ? "is-loading" : "")}
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Zarejestruj uczestnika na 5 Bieg Belfrów
                    </button>
                </div>
            </article>
        </>
    );
};

export default BBOrder;
