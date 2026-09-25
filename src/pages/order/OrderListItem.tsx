import { useState } from "react";
import { IOrder } from "../../interfaces/IOrder";
import OrderStatus from "./OrderStatus";
import ProdType from "../products/ProdType";
import ShipmentStatus from "./ShipmentStatus";
import { SHIPMENT_STATUS_CHOICES } from "../../components/Enumerators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const OrderListItem = (props: { order: IOrder }) => {
    const [showProd, setShowProd] = useState(false);

    return (
        <article className="account-order-card">
            <div className="account-order-main">
                <div className="account-order-header">
                    <div>
                        <div className="account-order-eyebrow">Zamówienie</div>
                        <h3>
                            Nr {props.order.orderId}
                            <span> z dnia {props.order.date}</span>
                        </h3>
                    </div>
                    <div className="account-order-summary">{props.order.summary} zł</div>
                </div>

                <div className="account-order-meta">
                    <div>
                        <span>Status</span>
                        <OrderStatus status={props.order.status} paymentSys={props.order.paymentSys} />
                    </div>

                    {props.order.shipmentStatus !== undefined && props.order.shipmentStatus !== SHIPMENT_STATUS_CHOICES.SHIPMENT_NONE && (
                        <div>
                            <span>Status wysyłki</span>
                            <ShipmentStatus status={props.order.shipmentStatus} />
                        </div>
                    )}
                </div>

                <div className={showProd ? "account-order-products" : "is-hidden"}>
                    {props.order.products?.map((cartProduct, key) => (
                        <div className="account-order-product" key={key}>
                            <div>
                                <strong>
                                    {key + 1}. {cartProduct.inStore?.pName}
                                </strong>
                                <div className="account-order-product-type">
                                    <ProdType
                                        className="is-inline has-text-weight-semibold"
                                        prodType={cartProduct.prodDef?.prodType}
                                        variantType={cartProduct.prodDef?.variantType}
                                        courseType={cartProduct.inStore?.courseType}
                                    />
                                </div>
                            </div>
                            <div className="account-order-product-values">
                                <span>{cartProduct.inStore?.price} zł</span>
                                <span>ilość: {cartProduct.cnt}</span>
                            </div>
                        </div>
                    ))}
                    {props.order.shipment?.inStore?.price && (
                        <div className="account-order-product">
                            <strong>{props.order.shipment?.inStore.pName}</strong>
                            <div className="account-order-product-values">
                                <span>{props.order.shipment?.inStore.price} zł</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <button
                className="account-order-toggle"
                type="button"
                aria-expanded={showProd}
                onClick={() => {
                    setShowProd(!showProd);
                }}
            >
                <FontAwesomeIcon icon={showProd ? faChevronUp : faChevronDown} />
                <span>{showProd ? "Ukryj" : "Szczegóły"}</span>
            </button>
        </article>
    );
};

export default OrderListItem;
