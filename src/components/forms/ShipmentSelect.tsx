import { Dispatch, SetStateAction, useEffect, useState } from "react";
import HelperClass from "../../classes/HelperClass";
import { IShipment } from "../../interfaces/IProducts";
import { IFormOption } from "./Input";
import { IOrder } from "../../interfaces/IOrder";
import CartClass from "../../classes/CartClass";
import { BASKET_TYPE_CHOICES } from "../Enumerators";
import RequestClass from "../../classes/RequestClass";

export interface IShipmentSelect {
    shipments?: IShipment[];
    selectedShipment?: IShipment; // domyślny - inicjacyjny sposób wysyłki
    basketType?: BASKET_TYPE_CHOICES;

    /* teraz metoda aktualizacji sposobu wysyłki */
    /* 1. poprzez modyfikację samego selectedShipment */
    setSelectedShipment?: Dispatch<SetStateAction<IShipment | undefined>>; // ustawienie nowego typu wysyłki
    /* LUB / I poprzez modyfikację Iorder -> tworzenie koszyka */
    order?: IOrder;
    setOrder?: Dispatch<SetStateAction<IOrder>>;
}

export const ShipmentSelect = (props: IShipmentSelect) => {
    // const [selectedShipment, setSelectedShipment] = useState(
    //     props.selectedShipment?.inStore?.productId !== undefined ? props.selectedShipment?.inStore?.productId.toString : undefined
    // );

    const [shipment, setShipment] = useState<IShipment | undefined>(props.selectedShipment);
    const [notification, setNotification] = useState<JSX.Element | String>();
    const shipmentOptions: IFormOption[] = [
        // { label: "-", value: "0" },
        // { label: "kurier - 17 zł", value: "2" },
        // { label: "paczkomat - 15 zł", value: "3" },
    ];
    props.shipments?.forEach((shipment, index) => {
        shipmentOptions.push({
            label:
                HelperClass.getUndefinedString(shipment.inStore?.pName) +
                " " +
                HelperClass.getUndefinedNumber(shipment.inStore?.price).toString() +
                " zł",
            value: HelperClass.getUndefinedNumber(shipment.inStore?.productId).toString(),
        });
    });

    let shipmentSent = false;
    /* *********************************************************************** */
    const updateCartDB = (newShipment?: IShipment) => {
        if (newShipment === undefined || props.basketType === undefined || newShipment.inStore?.productId === undefined) return;

        const succ_callback = (result: any) => {
            // console.log("zapisuję nowy shipment");
            // console.log("result");
            // console.log(result);

            let rShipment = HelperClass.findShipment(result.shipmentId, props.shipments);
            // console.log("rShipment");
            // console.log(rShipment);
            // console.log("order before");
            // console.log(props.order);
            // console.log("........");
            if (props.setOrder) {
                props.setOrder({ ...props.order, shipment: HelperClass.findShipment(result.shipmentId, props.shipments) });
            }
            // console.log("order after");
            // console.log(props.order);
            // console.log(",,,,,,,,");
            setShipment(rShipment);
            if (props.setSelectedShipment) props.setSelectedShipment(rShipment);
            /* to jest konieczne, aby skasować informację o błędzie, jeżeli była tam chwilę wcześniej */
            setNotification("");
            shipmentSent = false;
        };
        const err_callback = (result: any) => {
            setNotification(RequestClass.errorAlert(result));
            shipmentSent = false;
        };

        // console.log("WYSYŁAM BASKET");
        if (shipmentSent == false) {
            shipmentSent = true;
            return CartClass.addShipment({
                shipmentId: newShipment.inStore?.productId,
                basketType: props.basketType,
                custom_success_callback: succ_callback,
                custom_error_callback: err_callback,
            });
        }
    };
    /* ***********************************************************************
     * inicjalizacja wartości domyślnej
     * *********************************************************************** */
    useEffect(() => {
        if (shipment === undefined) {
            /* ustawiam na pierwszy z listy */
            // console.log("Brak ustawionego SHipment");
            if (props.shipments !== undefined && props.shipments?.length > 0) {
                updateCartDB(props.shipments[0]);
                // if (props.setOrder) {
                //     props.setOrder({ ...props.order, shipment: props.shipments[0] });
                // }
            }
            /* oraz wysyłam zapytanie do API, aby zapisała informację w koszyku */
        }
    }, [shipment]);

    /* ***********************************************************************
     * inicjalizacja wartości domyślnej
     * *********************************************************************** */
    // if (props.selectedShipment === undefined) {
    //     /* ustawiam na pierwszy z listy */
    //     console.log("Brak ustawionego SHipment");
    //     if (props.shipments !== undefined && props.shipments?.length > 0) {
    //         updateCartDB(props.shipments[0]);
    //         // if (props.setOrder) {
    //         //     props.setOrder({ ...props.order, shipment: props.shipments[0] });
    //         // }
    //     }
    //     /* oraz wysyłam zapytanie do API, aby zapisała informację w koszyku */
    // }
    /* *********************************************************************** */
    function onChangeShipment(e: any) {
        // console.log("a");
        // console.log(e.target.value);
        let shipment = HelperClass.findShipment(e.target.value, props.shipments);
        /* UWAGA! e.target.value to NUMBER (productId) -> trzeba przekonwertować na IShipment */
        // if (props.setOrder) {
        //     if (props.order !== undefined) {
        //         props.setOrder({
        //             ...props.order,
        //             shipment: shipment,
        //         });
        //     }
        // }
        updateCartDB(shipment);
        if (props.setSelectedShipment) props.setSelectedShipment(shipment);
    }
    /* *********************************************************************** */
    // function isSelected(value: string | undefined) {
    //     if (value === undefined) return false;
    //     if (value === props.selectedShipment?.inStore?.productId?.toString()) return true;
    //     return false;
    // }
    /* *********************************************************************** */
    return (
        <>
            <div className="select">
                <select onChange={(e) => onChangeShipment(e)} defaultValue={shipment?.inStore?.productId?.toString()}>
                    {shipmentOptions.map((option, index) => (
                        <option
                            key={index}
                            value={option.value}
                            // selected={isSelected(option.value)}
                            // order?.shipment?.inStore?.productId !== undefined
                            //     ? order?.shipment?.inStore?.productId?.toString()
                            //     : "1"
                            // }
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};
