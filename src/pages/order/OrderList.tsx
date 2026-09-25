import OrderListItem from "./OrderListItem";
import UserDataContainer from "../user/UserDataContainer";
import { useUserAccountContext } from "../../context/UserAccountContext";
import { isMobile } from "react-device-detect";

const OrderList = () => {
    const { orders } = useUserAccountContext();

    return (
        <>
            <UserDataContainer apiOrderRequired={true} waitMsg="Pobieram listę zamówień">
                <>
                    {isMobile && <div className="mb-3 has-text-weight-bold">Twoje zamówienia</div>}
                    {orders?.length === 0 ? (
                        <div className="account-empty-state">Nie masz jeszcze zamówień.</div>
                    ) : (
                        <div className="account-order-list">
                            {orders?.map((order) => (
                                <OrderListItem key={order.orderId} order={order} />
                            ))}
                        </div>
                    )}
                </>
            </UserDataContainer>
        </>
    );
};

export default OrderList;
