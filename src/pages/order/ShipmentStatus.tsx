import { SHIPMENT_STATUS_CHOICES } from "../../components/Enumerators";

/* dekodowanie statusu zamówienia */
const ShipmentStatus = (props: { status?: SHIPMENT_STATUS_CHOICES }) => {
    function getClassName() {
        switch (props.status) {
            case SHIPMENT_STATUS_CHOICES.SHIPMENT_SENT:
            case SHIPMENT_STATUS_CHOICES.SHIPMENT_DELIVERED:
                return "px-2 has-text-success";
            case SHIPMENT_STATUS_CHOICES.SHIPMENT_START:
            case SHIPMENT_STATUS_CHOICES.SHIPMENT_VALID:
                return "px-2 has-background-light";
            default:
                return "";
        }
    }

    function getStatus() {
        switch (props.status) {
            case SHIPMENT_STATUS_CHOICES.SHIPMENT_SENT:
                return "wysłane";
            case SHIPMENT_STATUS_CHOICES.SHIPMENT_START:
            case SHIPMENT_STATUS_CHOICES.SHIPMENT_VALID:
                return "przygotowanie wysyłki";
            case SHIPMENT_STATUS_CHOICES.SHIPMENT_DELIVERED:
                return "dostarczone";
            default:
                return "";
        }
    }

    return (
        <>
            <span className={"mx-2 tag " + getClassName()}>{getStatus()}</span>
        </>
    );
};

export default ShipmentStatus;
