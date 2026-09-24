import { Dispatch, SetStateAction, useState } from "react";
import { IAddr } from "../../interfaces/IAddr";
import { AddrFormInputs } from "./AddrFormInputs";
import { Input } from "./Input";
import { IOrder } from "../../interfaces/IOrder";
import { DeepMap, FieldError, FieldValues, UseFormRegister } from "react-hook-form";

export interface IInvoiceFormInputs {
    order?: IOrder;
    setOrder?: Dispatch<SetStateAction<IOrder>>;
    register: UseFormRegister<FieldValues>;
    errors: DeepMap<FieldValues, FieldError>;

    classNames?: string; // dodatkowe klasy formatujące  cały blok

    forceRequired?: boolean; // czy pola są obowiązkowe (w przypadku definiowania formularza w ustawieniach użytkownika nie ma potrzeby definiowania wszystkich pól)
}

export const InvoiceFormInputs = (props: IInvoiceFormInputs) => {
    const PURCHASE_TYPE_RADIO_ID = "purchase_type_radio_id";
    const PURCHASE_TYPE_CHECK_ID = "purchase_type_checkbox_id";
    const PURCHASE_TYPE_PRIVATE = "priv";
    const PURCHASE_TYPE_INVOICE = "inv";

    const [addrContact, setAddrContact] = useState(props.order?.addrContact);
    const [addrPayer, setAddrPayer] = useState(props.order?.addrPayer);
    const [addrRecipient, setAddrRecipient] = useState(props.order?.addrRecipient);
    let forceRequired = props.forceRequired;
    // if (props.forceRequired === undefined)
    //     props.forceRequired=true

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (props.setOrder) {
            if (e.target.id === PURCHASE_TYPE_CHECK_ID) {
                props.setOrder({ ...props.order, recipent: e.target.checked });
            } else if (e.target.id === PURCHASE_TYPE_RADIO_ID) {
                if (e.target.value === PURCHASE_TYPE_PRIVATE) {
                    props.setOrder({ ...props.order, invoice: false });
                    //setOrder({...order, invoiceType:INVOICE_CHOICES.INVOICE_PRIV})
                } else {
                    props.setOrder({ ...props.order, invoice: true });
                    //setOrder({...order, invoiceType:INVOICE_CHOICES.INVOICE_PAYER})
                }
            }
        }
    }
    //console.log(props.order?.invoice)
    return (
        <>
            <div className={props.classNames + " slim"}>
                <div className="is-size-5-mobile is-size-5 has-text-weight-bold is-inline-block">
                    <Input
                        type="radio"
                        register={props.register}
                        onChange={onChange}
                        id={PURCHASE_TYPE_RADIO_ID}
                        value={PURCHASE_TYPE_PRIVATE}
                        defaultChecked={!props.order?.invoice}
                        labelClassName="is-size-6"
                        label="Kupuję prywatnie"
                        className="m-2"
                    ></Input>
                </div>
                <div className="is-size-5-mobile is-size-5 has-text-weight-bold is-inline-block">
                    <Input
                        type="radio"
                        register={props.register}
                        onChange={onChange}
                        id={PURCHASE_TYPE_RADIO_ID}
                        value={PURCHASE_TYPE_INVOICE}
                        defaultChecked={props.order?.invoice}
                        // defaultValue={order?.invoice?PURCHASE_TYPE_INVOICE:""}
                        label="Kupuję na fakturę"
                        labelClassName="is-size-6"
                        className="m-2"
                    ></Input>
                </div>

                {props.order?.addrContact && (
                    <>
                        <div className="mt-4 has-text-weight-semibold is-size-6">Dane kontaktowe odnośnie zamówienia</div>

                        <AddrFormInputs
                            addrType={"contact"}
                            register={props.register}
                            errors={props.errors}
                            data={props.order?.addrContact}
                            setData={setAddrContact}
                            prefixName="contact_"
                        />
                    </>
                )}

                {!props.order?.invoice && (
                    <>
                        <div className="mt-5 has-text-weight-semibold is-size-6">Kupuję prywatnie, proszę wystawić fakturę imienną na dane:</div>
                        <AddrFormInputs
                            addrType={"inv_priv"}
                            register={props.register}
                            errors={props.errors}
                            data={props.order?.addrPayer}
                            setData={setAddrPayer}
                            prefixName="priv_"
                            forceRequired={forceRequired}
                        />
                    </>
                )}

                {props.order?.invoice && (
                    <>
                        <div className="mt-6 has-text-weight-semibold is-size-6">Dane płatnika</div>
                        <div className="is-size-6">Do zamówienia wystawimy fakturę VAT na dane:</div>
                        <AddrFormInputs
                            addrType={"inv_payer"}
                            register={props.register}
                            errors={props.errors}
                            data={props.order?.addrPayer}
                            setData={setAddrPayer}
                            prefixName="platnik_"
                            forceRequired={forceRequired}
                        />

                        <Input
                            type="checkbox"
                            id={PURCHASE_TYPE_CHECK_ID}
                            onChange={onChange}
                            defaultChecked={props.order?.recipent ? true : false}
                            value={PURCHASE_TYPE_CHECK_ID}
                            className="mt-5"
                            required={false}
                            register={props.register}
                            label="dane odbiorcy są takie same jak dane płatnika"
                        ></Input>

                        {!props.order?.recipent && (
                            <>
                                <div className="mt-2 has-text-weight-semibold is-size-6">Dane odbiorcy</div>
                                <div className="is-size-6">Dla kogo dokonano zakupu (np. dane szkoły).</div>
                                <AddrFormInputs
                                    addrType={"inv_recipent"}
                                    register={props.register}
                                    errors={props.errors}
                                    data={props.order?.addrRecipient}
                                    setData={setAddrRecipient}
                                    prefixName="odbiorca_"
                                    forceRequired={forceRequired}
                                />
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};
