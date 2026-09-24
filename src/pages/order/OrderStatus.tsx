import { ORDER_STATUS_CHOICES, PAYMENT_SYS_CHOICES } from "../../components/Enumerators";

/* dekodowanie statusu zamówienia */
const OrderStatus = (props: { status?: ORDER_STATUS_CHOICES; paymentSys?: PAYMENT_SYS_CHOICES }) => {
    function getClassName() {
        switch (props.status) {
            case ORDER_STATUS_CHOICES.ORDER_PAID:
                return "px-2 has-text-success";
            case ORDER_STATUS_CHOICES.ORDER_CANCELED:
                return "px-2 has-background-danger";
            case ORDER_STATUS_CHOICES.ORDER_POSTPONE:
            case ORDER_STATUS_CHOICES.ORDER_STARTED:
                return "px-2 has-background-warning";
            default:
                return "px-2 has-background-light";
        }
    }

    function getStatus() {
        switch (props.status) {
            case ORDER_STATUS_CHOICES.ORDER_PAID:
                return "opłacone";
            case ORDER_STATUS_CHOICES.ORDER_CANCELED:
                return "anulowane";
            case ORDER_STATUS_CHOICES.ORDER_STARTED:
            case ORDER_STATUS_CHOICES.ORDER_POSTPONE:
                return "oczekiwanie na płatność";
            default:
                return "?";
        }
    }

    function getPaymentSys() {
        if (props.status === ORDER_STATUS_CHOICES.ORDER_STARTED || props.status === ORDER_STATUS_CHOICES.ORDER_POSTPONE) {
            switch (props.paymentSys) {
                case PAYMENT_SYS_CHOICES.PAYMENT_SYS_BANK_TRANSFER:
                    return "typ płatności: przelew bankowy";
                case PAYMENT_SYS_CHOICES.PAYMENT_SYS_PRZELEWY24:
                    return "typ płatności: przelewy24";
                default:
                    return "";
            }
        }
    }

    return (
        <>
            <span className={"mx-2 tag " + getClassName()}>{getStatus()}</span>
            {(props.status === ORDER_STATUS_CHOICES.ORDER_STARTED || props.status === ORDER_STATUS_CHOICES.ORDER_POSTPONE) && (
                <span className={"tag " + getClassName()}>{getPaymentSys()}</span>
            )}
        </>
    );
};

export default OrderStatus;
