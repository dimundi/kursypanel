import { RefCallBack } from "react-hook-form";
import HelperClass from "../../classes/HelperClass";
import { IBBApi, IBBParticipant } from "../../interfaces/IBB";
import { useState, useEffect, Dispatch, SetStateAction, ReactNode, Children } from "react";
import RequestClass from "../../classes/RequestClass";
import { requestState } from "../../components/types/custom";
import IReqOptions from "../../interfaces/IReqOptions";
import { ShipmentSelect } from "../../components/forms/ShipmentSelect";
import { BBUserPanel } from "./BBUserPanel";
// import ProdDetailModal from "../products/ProdDetailModal";

export interface IBBRegisterList {
    bbApi?: IBBApi;
    setBBApi?: Dispatch<SetStateAction<IBBApi>>;
    order_calback: RefCallBack | null; // return kiedy finalizujemy zamówienie
    refresh_calback: RefCallBack | null; // return kiedy odświeżamy interfejs
    children?: ReactNode; // przycisk didaj
}
/* *******************************************************************************************************
 *
 * ******************************************************************************************************* */
const BBRegisterList = (props: IBBRegisterList) => {
    const [apiReadState, setApiReadState] = useState("Idle" as requestState);
    const [notification, setNotification] = useState<JSX.Element | String>();
    const [selectedShipment, setSelectedShipment] = useState(
        /* pierwszy element z shipments */
        () => {
            if (props.bbApi?.shipment !== undefined && props.bbApi?.shipment.length > 0) {
                return props.bbApi?.shipment[0];
            }
            return undefined;
        }
    );
    const [totalToPay, setTotalToPay] = useState(HelperClass.calcBBBaskets(props.bbApi?.participants, selectedShipment));

    useEffect(() => {
        const err_callback = (result: any) => {
            setNotification(RequestClass.errorAlert(result));
            // if (setIsUserInfoRead)
            //     setIsUserInfoRead(true)

            setApiReadState("Error");
        };
        const succ_callback = (result: any) => {
            //setBBApi({ ...bbAPI, participants: result.participants, products: result.products, shipment: result.shipment });
            if (props.order_calback) props.order_calback(result.basketId);
            setApiReadState("OK");
        };
        if (apiReadState === "Start") {
            /* wysyłam zapytanie do API */
            setApiReadState("Progress");
            interface IReqDataToSend {
                shipmentId?: number;
            }
            let dataToSend: IReqDataToSend = {
                shipmentId: selectedShipment?.inStore?.productId,
            };
            let requestOptions: IReqOptions = {
                method: "POST",
                body: JSON.stringify(dataToSend),
            };
            RequestClass.makeRequest("bb/participant/finalize", requestOptions, succ_callback, err_callback);
        }
    }, [apiReadState]);

    useEffect(() => {
        setTotalToPay(HelperClass.calcBBBaskets(props.bbApi?.participants, selectedShipment));
    }, [selectedShipment]);

    /* funkcja sortowania */
    if (props.bbApi === undefined) return <>PUSTO</>;
    //console.log(props.bbApi);

    // let totalToPay = HelperClass.calcBaskets(props.bbApi.participants);

    /* ******************************************************************************************************* */
    function finzalizeOrder() {
        setNotification(<></>);
        setApiReadState("Start");
    }

    function sortParticipants(a: IBBParticipant, b: IBBParticipant) {
        if (a.name > b.name) return 1;
        else return -1;
    }
    /* ******************************************************************************************************* */
    // console.log("Render BBRegisterList");
    return (
        <>
            <div className="title mt-4">Twoja lista startowa</div>
            <div className="list has-visible-pointer-controls">
                {props.bbApi?.participants?.sort(sortParticipants).map((participant, index) => (
                    <BBUserPanel
                        key={"BBRLE" + index}
                        participant={participant}
                        products={props.bbApi?.products}
                        refresh_calback={props.refresh_calback}
                    />
                ))}
                {totalToPay > 0 ? (
                    <div className="px-2">
                        <div className="is-flex is-justify-content-flex-end  is-flex-wrap-wrap is-align-items-baseline">
                            <div className="mr-2">Wysyłka</div>

                            <ShipmentSelect
                                shipments={props.bbApi?.shipment}
                                selectedShipment={selectedShipment}
                                setSelectedShipment={setSelectedShipment}
                            />
                        </div>

                        <div className="is-flex is-justify-content-flex-end is-flex-wrap-wrap mt-2 is-align-items-baseline">
                            <div className="mr-2">
                                Razem do zapłaty: <span className="is-size-3">{totalToPay}</span> zł
                            </div>
                            <div
                                className={"button has-background-success-light " + (apiReadState == "Progress" ? "is-loading" : "")}
                                onClick={() => {
                                    finzalizeOrder();
                                }}
                            >
                                Finalizuj zamówienie
                            </div>
                            <div className="mx-2"> lub </div>

                            {props.children}
                        </div>

                        <div className="px-2">
                            <div>{notification}</div>
                        </div>
                    </div>
                ) : (
                    <div className="my-2 has-text-right">{props.children}</div>
                )}
            </div>
        </>
    );
};
export default BBRegisterList;
