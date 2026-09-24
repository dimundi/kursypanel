import { Dispatch, SetStateAction, useState } from "react";
import { UseFormRegister, FieldValues, DeepMap, FieldError } from "react-hook-form";
import { IOrder } from "../../interfaces/IOrder";
import { IShipment } from "../../interfaces/IProducts";
import { Input } from "./Input";
import { AddrFormInputs } from "./AddrFormInputs";
import { ADDR_TYPE_CHOICES, DELIVERY_TYPE_CHOICES } from "../Enumerators";
import HelperClass from "../../classes/HelperClass";
import { IAddr } from "../../interfaces/IAddr";

export interface IShipmentFormInputs {
    order?: IOrder;
    changeMethod_callback?: (data: any) => void;
    setOrder?: Dispatch<SetStateAction<IOrder>>;
    register: UseFormRegister<FieldValues>;
    errors: DeepMap<FieldValues, FieldError>;

    classNames?: string; // dodatkowe klasy formatujące  cały blok

    //forceRequired?: boolean; // czy pola są obowiązkowe (w przypadku definiowania formularza w ustawieniach użytkownika nie ma potrzeby definiowania wszystkich pól)
}

export const ShipmentFormInputs = (props: IShipmentFormInputs) => {
    // const [addrShipment, setAddrShipment] = useState(props.order?.addrShipment);
    const [addrShipment, setAddrShipment] = useState<IAddr>(() => {
        // console.log(props.order?.addrShipment?.email);
        // console.log(props.order?.addrContact?.email);
        return {
            ...props.order?.addrShipment,
            email: props.order?.addrShipment?.email === undefined ? props.order?.addrContact?.email : props.order?.addrShipment?.email,
            aName: props.order?.addrShipment?.aName === undefined ? props.order?.addrContact?.aName : props.order?.addrShipment?.aName,
        };
    });

    /* ********************************************************************  */
    return (
        <>
            <div className={props.classNames + " slim"}>
                {/* <div>Wybierz formę dostawy:</div>
                {props.shipments?.map((shipment, index) => (
                    <div>
                        <Input
                            type="radio"
                            register={props.register}
                            onChange={onChange}
                            id={SHIPMENT_TYPE_RADIO_ID}
                            value={shipment.inStore?.productId}
                            defaultChecked={!props.order?.invoice}
                            label={shipment.inStore?.pName + " - " + shipment.inStore?.price + " zł"}
                            className="m-2"
                            labelClassName="is-size-4"
                        ></Input>
                    </div>
                ))} */}

                <div className="mt-4">
                    metoda wysyłki: <b>{HelperClass.getShipmentName(props.order?.shipment)}</b>{" "}
                    <a className="is-size-7" onClick={props.changeMethod_callback}>
                        (zmień metodę wysyłki)
                    </a>
                </div>
                {props.order?.shipment?.prodDef?.deliveryType !== undefined && <div className="mt-4">Wprowadź dane do wysyłki</div>}

                {props.order?.shipment?.prodDef?.deliveryType === DELIVERY_TYPE_CHOICES.DELIVERY_TYPE_DIRECT && (
                    <>
                        <div className="mt-4">
                            <AddrFormInputs
                                addrType={"shipment_addr"}
                                register={props.register}
                                errors={props.errors}
                                data={props.order.addrShipment}
                                setData={setAddrShipment}
                                prefixName="shipment_"
                            />
                        </div>
                        <div className="mt-4">Dane dla kuriera:</div>
                    </>
                )}

                {props.order?.shipment?.prodDef?.deliveryType === DELIVERY_TYPE_CHOICES.DELIVERY_TYPE_PACZKOMAT && (
                    <>
                        <div className="mt-4">
                            <AddrFormInputs
                                addrType={"shipment_paczkomat"}
                                register={props.register}
                                errors={props.errors}
                                data={props.order.addrShipment}
                                setData={setAddrShipment}
                                prefixName="shipment_"
                            />
                        </div>
                    </>
                )}
                {props.order?.shipment?.prodDef?.deliveryType !== undefined && (
                    <div className="mt-4">
                        <AddrFormInputs
                            addrType={"shipment_contact"}
                            register={props.register}
                            errors={props.errors}
                            data={props.order?.addrShipment}
                            setData={setAddrShipment}
                            prefixName="shipment_"
                        />
                    </div>
                )}
            </div>
        </>
    );
};
