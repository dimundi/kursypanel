import { useContext, useState } from "react";
import CartClass from "../../classes/CartClass";
import RequestClass from "../../classes/RequestClass";
import { BASKET_TYPE_CHOICES, PROD_TYPES_CHOICES } from "../../components/Enumerators";
import { useCartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import ProdPrice from "../products/ProdPrice";
import ProdType from "../products/ProdType";
import ProdDuration from "../products/ProdDuration";
import { IBasketProduct } from "../../interfaces/IBasket";
import HelperClass from "../../classes/HelperClass";
import { RefCallBack } from "react-hook-form";

export interface ICartItem {
    cartProduct?: IBasketProduct;
    can_product_edit: boolean; // czy użytkownik może edytować produkty
    hide_prices?: boolean; // czy wyświetlać ceny (domyślnie False)
    idx?: number;
    success_callback?: RefCallBack;
}
const CartItem = (props: ICartItem) => {
    // let cartProduct = props.cartProduct;
    const { order, setOrder, basketId } = useCartContext();
    const [notification, setNotification] = useState<JSX.Element | String>();
    const { setBasketCnt, setInquiryCnt } = useContext(UserContext);
    const basketType = CartClass.get_basketType(basketId);

    let can_product_edit = props.can_product_edit;

    if (props.cartProduct?.prodDef?.prodType === PROD_TYPES_CHOICES.PROD_TYPE_BB) can_product_edit = false;

    /* -----
     * aktualizacja elementu w koszyku
     * ----- */
    const updateCartDB = (quantity: number, productId?: number) => {
        if (productId === undefined) return;

        const succ_callback = (result: any) => {
            //console.log(setOrder)
            if (setOrder) {
                setOrder({ ...order, products: result.products });
            }
            if (basketType === BASKET_TYPE_CHOICES.BASKET_INQUIRY) {
                setInquiryCnt(result.products.length);
            } else {
                setBasketCnt(result.products.length);
            }
            /* to jest konieczne, aby skasować informację o błędzie, jeżeli była tam chwilę wcześniej */
            setNotification("");
            if (props.success_callback) {
                props.success_callback(undefined);
            }
        };
        const err_callback = (result: any) => {
            setNotification(RequestClass.errorAlert(result));
        };

        return CartClass.put(
            productId,
            quantity,
            basketType === undefined ? BASKET_TYPE_CHOICES.BASKET_ORDER : basketType,
            succ_callback,
            err_callback
        );
    };
    /* -----
     * API: aktualizacja koszyka
     * ----- */
    const updateCartQuantity = (event: any) => {
        updateCartDB(event.target.value, props.cartProduct?.inStore?.productId);
    };

    /* -----
     *  API:  usunięcie elementu z koszyka
     * ----- */
    const deleteFromCart = () => {
        updateCartDB(-9999, props.cartProduct?.inStore?.productId);
    };

    // const [showModalId, setShowModalId] = useState(0);

    // function getShowModalId(productId?: number) {
    //     if (productId === undefined) return 0;

    //     /* zmieniam znak, żeby wymusić TOGGLE */
    //     if (showModalId > 0) return -1 * productId;
    //     else return productId;
    // }

    return (
        <>
            <tr key={props.cartProduct?.inStore?.productId}>
                <td className="has-text-left">
                    <div className="is-size-5">
                        {can_product_edit && (
                            <span
                                className="has-text-danger is-clickable is-size-5 has-text-weight-bold m-0 pr-4"
                                onClick={() => {
                                    if (window.confirm("Czy usunąć z koszyka: " + props.cartProduct?.inStore?.pName)) {
                                        deleteFromCart();
                                    }
                                }}
                            >
                                x
                            </span>
                        )}
                        {props.idx && <span className="is-size-6 mr-3">{props.idx}. </span>}
                        {props.cartProduct?.inStore?.pName}
                    </div>
                    {props.cartProduct?.prodDef?.prodType === PROD_TYPES_CHOICES.PROD_TYPE_COURSE && (
                        <>
                            <hr className="my-2" />
                            <ProdType prodType={props.cartProduct?.prodDef?.prodType} courseType={props.cartProduct?.inStore?.courseType} />
                            <div className="webinar-details">
                                <ProdPrice inStore={props.cartProduct?.inStore} size="XS" />
                                <ProdDuration inStore={props.cartProduct?.inStore} size="XS" />
                            </div>
                        </>
                    )}
                </td>
                <td>
                    {can_product_edit ? (
                        <input
                            type="number"
                            className="input"
                            name={"quantity" + props.cartProduct?.inStore?.productId}
                            data-productid={props.cartProduct?.inStore?.productId}
                            data-price={props.cartProduct?.inStore?.price}
                            onChange={updateCartQuantity}
                            defaultValue={props.cartProduct?.cnt}
                            min="1"
                            max="30"
                        />
                    ) : (
                        props.cartProduct?.cnt
                    )}
                </td>
                {props.hide_prices !== true && (
                    <>
                        <td>{props.cartProduct?.inStore?.price} zł</td>
                        <td>{HelperClass.multiplyUndefined(props.cartProduct?.cnt, props.cartProduct?.inStore?.price)} zł</td>
                    </>
                )}
            </tr>
        </>
    );
};
export default CartItem;
