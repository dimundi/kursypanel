import CartClass from "../../classes/CartClass";
import { useCartContext } from "../../context/CartContext";
import CartItem from "./CartItem";
import { ShipmentSelect } from "../../components/forms/ShipmentSelect";
import { RefCallBack } from "react-hook-form";
export interface ICartItems {
    can_product_edit: boolean; // czy użytkownik może edytować produkty
    can_shipment_edit: boolean; // czy użytkownik może edytować produkty
    show_shipment: boolean; // czy ma być widoczna wysyłka
    success_callback?: RefCallBack;
}
const CartItems = (props: ICartItems) => {
    const { order, setOrder, shipments, basketType } = useCartContext();
    let isShipmentRequired = CartClass.isShipmentRequired(order?.products);

    let listIndex = 0;
    function getIdx() {
        listIndex += 1;
        return listIndex;
    }
    return (
        <>
            <table className="table is-fullwidth has-text-right">
                <thead>
                    <tr>
                        {/* <th>Nazwa szkolenia</th> */}
                        <th></th>
                        <th className="has-text-right">Ilość</th>
                        <th className="has-text-right">Cena</th>
                        <th className="has-text-right">Koszt</th>
                    </tr>
                </thead>
                <tbody>
                    {order?.products?.map((cartProduct, index: number) => (
                        <>
                            <CartItem
                                key={cartProduct.inStore?.productId}
                                cartProduct={cartProduct}
                                can_product_edit={props.can_product_edit}
                                idx={getIdx()}
                                success_callback={props.success_callback}
                            />
                        </>
                    ))}
                    {props.show_shipment == true && props.can_shipment_edit === false && (
                        <CartItem
                            key={order?.shipment?.inStore?.productId}
                            cartProduct={{ cnt: 1, prodDef: order?.shipment?.prodDef, inStore: order?.shipment?.inStore }}
                            can_product_edit={props.can_product_edit}
                            idx={getIdx()}
                        />
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>SUMA:</th>
                        <th className="has-text-right">
                            <div className="is-size-4">{order?.summary} zł</div>
                        </th>
                    </tr>
                </tfoot>
                {isShipmentRequired && props.can_shipment_edit === true && (
                    <tfoot>
                        <tr>
                            <td className="has-text-left">metoda wysyłki:</td>

                            <td></td>
                            <td colSpan={2} className="has-text-right">
                                <ShipmentSelect
                                    basketType={basketType}
                                    shipments={shipments}
                                    selectedShipment={order?.shipment}
                                    order={order}
                                    setOrder={setOrder}
                                />
                            </td>
                        </tr>
                    </tfoot>
                )}
            </table>
        </>
    );
};
export default CartItems;
