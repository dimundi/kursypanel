import { useState } from "react";
import { IOrder } from "../../interfaces/IOrder";
import OrderStatus from "./OrderStatus";
import ProdType from "../products/ProdType";
import ShipmentStatus from "./ShipmentStatus";
import { SHIPMENT_STATUS_CHOICES } from "../../components/Enumerators";

const OrderListItem = (props: { order: IOrder }) => {
    const [showProd, setShowProd] = useState(false);

    return (
        <>
            <div className="list-item">
                <div className="list-item-content">
                    <div className="list-item-title">
                        Zamówienie nr: <span className="has-text-weight-semibold">{props.order.orderId}</span> z dnia {props.order.date}
                    </div>
                    <div className="list-item-description">
                        <div>
                            status: <OrderStatus status={props.order.status} paymentSys={props.order.paymentSys} />
                        </div>

                        {props.order.shipmentStatus !== undefined && props.order.shipmentStatus !== SHIPMENT_STATUS_CHOICES.SHIPMENT_NONE && (
                            <div>
                                status wysyłki: <ShipmentStatus status={props.order.shipmentStatus} />
                            </div>
                        )}
                        <div>wartość zamówienia: {props.order.summary} zł</div>
                        {/* <div>
                            <a
                                className="is-size-7"
                                onClick={() => {
                                    setShowProd(!showProd);
                                }}
                            >
                                {showProd ? <>ukryj listę produktów</> : <>pokaż listę produktów</>}
                            </a>
                        </div> */}
                        <div className={showProd ? "content" : "is-hidden"}>
                            <blockquote>
                                <div className="list ">
                                    {props.order.products?.map((cartProduct, key) => (
                                        <div className="list-item" key={key}>
                                            <div className="list-item-content">
                                                <div className="list-item-title">
                                                    {key + 1}. {cartProduct.inStore?.pName}
                                                </div>
                                                <div className="list-item-description">
                                                    <nav className="level">
                                                        <div className="level-left">
                                                            <div className="level-item">
                                                                <ProdType
                                                                    className="is-inline has-text-weight-semibold"
                                                                    prodType={cartProduct.prodDef?.prodType}
                                                                    variantType={cartProduct.prodDef?.variantType}
                                                                    courseType={cartProduct.inStore?.courseType}
                                                                />
                                                            </div>
                                                            <div className="level-item">wartość: {cartProduct.inStore?.price} zł</div>
                                                            <div className="level-item">ilość: {cartProduct.cnt}</div>
                                                        </div>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {props.order.shipment?.inStore?.price && (
                                        <>
                                            <div className="list-item" key={"XX"}>
                                                <div className="list-item-content">
                                                    <div className="list-item-title"></div>
                                                    <div className="list-item-description">
                                                        <nav className="level">
                                                            <div className="level-left">
                                                                <div className="level-item">{props.order.shipment?.inStore.pName}</div>
                                                                <div className="level-item">{props.order.shipment?.inStore.price} zł</div>
                                                            </div>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </div>
                <div className="list-item-controls">
                    <div className="buttons is-right">
                        <button
                            className="button"
                            onClick={() => {
                                setShowProd(!showProd);
                            }}
                        >
                            <span className="icon is-small">
                                <i className="fas fa-ellipsis-h"></i>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderListItem;
