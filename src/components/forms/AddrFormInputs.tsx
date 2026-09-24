import { Input } from "./Input";
import { IAddr } from "../../interfaces/IAddr";

/*
contact - dane kontaktowe
contact_offer - rozszerzone dane kontaktowe używane w przypadku ofert
inv_priv - osoba fizyczna -> dane na fakturzr
inv_payer - firma, płatnik
inv_recipent - firma odniorca
*/

export type AddrInputType =
    | "contact_offer"
    | "contact"
    | "inv_priv"
    | "inv_payer"
    | "inv_recipent"
    | "shipment_addr"
    | "shipment_contact"
    | "shipment_paczkomat";

type AddrInputFields = "aName" | "email" | "NIP" | "line1" | "postcode" | "city" | "citypostcode" | "company" | "tel" | "APM";

export interface IAddrFormInputs {
    prefixName: string; // dodawany do nazwy pól
    register?: any;
    data?: IAddr;
    addrType: AddrInputType; // na podstawie tego ustalamy co ma być w formularzu
    setData(data: IAddr): any; // callback
    errors: any; // callback
    forceRequired?: boolean; // czy pola są obowiązkowe (w przypadku definiowania formularza w ustawieniach użytkownika nie ma potrzeby definiowania wszystkich pól)
    // fields?: AddrInputFields[]; // jakie pola i w jakiej kolejności mają się wyświetlać
}

export const AddrFormInputs = (props: IAddrFormInputs) => {
    if (props.data === undefined) return <></>;

    let addrData = props.data;
    //    let forceRequired = props.forceRequired === undefined ? true : props.forceRequired;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (props.prefixName + "aName" === e.target.id) {
            addrData.aName = e.target.value;
        } else if (props.prefixName + "email" === e.target.id) {
            addrData.email = e.target.value;
        } else if (props.prefixName + "NIP" === e.target.id) {
            addrData.NIP = e.target.value;
        } else if (props.prefixName + "line1" === e.target.id) {
            addrData.line1 = e.target.value;
        } else if (props.prefixName + "postcode" === e.target.id) {
            addrData.postcode = e.target.value;
        } else if (props.prefixName + "city" === e.target.id) {
            addrData.city = e.target.value;
        } else if (props.prefixName + "company" === e.target.id) {
            addrData.company = e.target.value;
        } else if (props.prefixName + "tel" === e.target.id) {
            addrData.tel = e.target.value;
        }
        props.setData(addrData);
    }

    let fieldsRequired = {
        aName: true,
        email: true,
        NIP: true,
        line1: true,
        postcode: true,
        city: true,
        company: true,
        tel: false,
        APM: true,
    };

    let fieldsName = {
        aName: "imię i nazwisko",
        email: "email",
        NIP: "NIP",
        line1: "adres",
        postcode: "kod pocztowy",
        city: "miasto",
        company: "nazwa instytucji",
        tel: "numer telefonu",
        APM: "Numer paczkomatu",
    };

    let fieldsPlaceholderName = {
        aName: "imię i nazwisko",
        email: "@",
        NIP: "NIP",
        line1: "adres",
        postcode: "00 - 000",
        city: "miasto",
        company: "nazwa instytucji",
        tel: "numer telefonu",
        APM: "Numer paczkomatu",
    };

    let fields = [] as AddrInputFields[];

    switch (props.addrType) {
        case "shipment_paczkomat":
            fields = ["APM"];
            break;
        case "contact_offer":
            fields = ["aName", "company", "city", "email", "tel"];
            fieldsRequired["city"] = false;
            break;
        case "contact":
            fields = ["aName", "email", "tel"];
            break;
        case "inv_priv":
            fields = ["aName", "line1", "postcode", "city"];
            break;
        case "inv_payer":
            fields = ["company", "line1", "postcode", "city", "NIP"];
            fieldsName["company"] = "nazwa płatnika";
            fieldsName["company"] = "odbiorcy";
            break;
        case "inv_recipent":
            fields = ["company", "line1", "postcode", "city"];
            break;
        case "shipment_addr":
            fields = ["aName", "line1", "citypostcode"];
            fieldsName["aName"] = "imię i nazwisko lub nazwa firmy/szkoły";
            break;
        case "shipment_contact":
            fields = ["email", "tel"];
            break;
    }

    return <>{fields.map((field) => showInputField(field))}</>;

    function showInputField(field: AddrInputFields) {
        if (props.data == undefined) return;

        switch (field) {
            case "APM":
                return (
                    <Input
                        id={props.prefixName + "APM"}
                        name="APM"
                        label={fieldsName["APM"]}
                        placeholder={fieldsPlaceholderName["APM"]}
                        register={props.register}
                        onChange={handleChange}
                        defaultValue={props.data.aName}
                        errors={props.errors}
                        required={fieldsRequired["APM"]}
                    ></Input>
                );
            case "aName":
                return (
                    <Input
                        id={props.prefixName + "aName"}
                        name="aName"
                        label={fieldsName["aName"]}
                        placeholder={fieldsPlaceholderName["aName"]}
                        register={props.register}
                        onChange={handleChange}
                        defaultValue={props.data.aName}
                        errors={props.errors}
                        required={fieldsRequired["aName"]}
                    ></Input>
                );
            case "line1":
                return (
                    <Input
                        id={props.prefixName + "line1"}
                        name="adres"
                        label={fieldsName["line1"]}
                        placeholder={fieldsPlaceholderName["line1"]}
                        register={props.register}
                        onChange={handleChange}
                        defaultValue={props.data.line1}
                        errors={props.errors}
                        required={fieldsRequired["line1"]}
                    ></Input>
                );
            case "email":
                return (
                    <Input
                        id={props.prefixName + "email"}
                        name="email"
                        label={fieldsName["email"]}
                        placeholder={fieldsPlaceholderName["email"]}
                        register={props.register}
                        onChange={handleChange}
                        defaultValue={props.data.email}
                        errors={props.errors}
                        validateType="email"
                        required={fieldsRequired["email"]}
                    ></Input>
                );
            case "NIP":
                return (
                    <Input
                        id={props.prefixName + "NIP"}
                        name="NIP"
                        label={fieldsName["NIP"]}
                        placeholder={fieldsPlaceholderName["NIP"]}
                        register={props.register}
                        onChange={handleChange}
                        defaultValue={props.data.NIP}
                        errors={props.errors}
                        required={fieldsRequired["NIP"]}
                    ></Input>
                );
            case "citypostcode":
                return (
                    <div className="columns">
                        <div className="column">
                            <Input
                                id={props.prefixName + "postcode"}
                                name="kod pocztowy"
                                label={fieldsName["postcode"]}
                                placeholder={fieldsPlaceholderName["postcode"]}
                                register={props.register}
                                onChange={handleChange}
                                defaultValue={props.data.postcode}
                                errors={props.errors}
                                required={fieldsRequired["postcode"]}
                            ></Input>
                        </div>
                        <div className="column">
                            <Input
                                id={props.prefixName + "city"}
                                name="miasto"
                                label={fieldsName["city"]}
                                placeholder={fieldsPlaceholderName["city"]}
                                register={props.register}
                                onChange={handleChange}
                                defaultValue={props.data.city}
                                errors={props.errors}
                                required={fieldsRequired["city"]}
                            ></Input>
                        </div>
                    </div>
                );
            case "city":
                return (
                    <Input
                        id={props.prefixName + "city"}
                        name="miasto"
                        label={fieldsName["city"]}
                        placeholder={fieldsPlaceholderName["city"]}
                        register={props.register}
                        onChange={handleChange}
                        defaultValue={props.data.city}
                        errors={props.errors}
                        required={fieldsRequired["city"]}
                    ></Input>
                );

            case "postcode":
                return (
                    <Input
                        id={props.prefixName + "postcode"}
                        name="kod pocztowy"
                        label={fieldsName["postcode"]}
                        placeholder={fieldsPlaceholderName["postcode"]}
                        register={props.register}
                        onChange={handleChange}
                        defaultValue={props.data.postcode}
                        errors={props.errors}
                        required={fieldsRequired["postcode"]}
                    ></Input>
                );
            case "company":
                return (
                    <Input
                        id={props.prefixName + "company"}
                        name="nazwa instytucji"
                        label={fieldsName["company"]}
                        placeholder={fieldsPlaceholderName["company"]}
                        register={props.register}
                        onChange={handleChange}
                        defaultValue={props.data.company}
                        errors={props.errors}
                        required={fieldsRequired["company"]}
                    ></Input>
                );
            case "tel":
                return (
                    <Input
                        id={props.prefixName + "tel"}
                        name="numer telefonu"
                        label={fieldsName["tel"]}
                        placeholder={fieldsPlaceholderName["tel"]}
                        register={props.register}
                        onChange={handleChange}
                        defaultValue={props.data.tel}
                        errors={props.errors}
                        required={fieldsRequired["tel"]}
                    ></Input>
                );
        }
    }

    return <></>;
};
