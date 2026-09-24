import { useContext, useState } from "react";
import CartClass from "../../classes/CartClass";
import RequestClass from "../../classes/RequestClass";
import { BASKET_TYPE_CHOICES } from "../../components/Enumerators";
import { useCartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import ProdPrice from "../products/ProdPrice";
import ProdTerm from "../products/ProdTerm";
import ProdType from "../products/ProdType";
import ProdDuration from "../products/ProdDuration";
import ProdDetailModal from "../products/ProdDetailModal";
import { IBasketProduct } from "../../interfaces/IBasket";

const CartItem_old = (props: { cartProduct: IBasketProduct }) => {
    let cartProduct = props.cartProduct;
    const { order, setOrder, basketId } = useCartContext();
    const [notification, setNotification] = useState<JSX.Element | String>();
    const { setBasketCnt, setInquiryCnt } = useContext(UserContext);

    const basketType = CartClass.get_basketType(basketId);
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
        updateCartDB(event.target.value, cartProduct.inStore?.productId);
    };

    /* -----
     *  API:  usunięcie elementu z koszyka
     * ----- */
    const deleteFromCart = () => {
        updateCartDB(-9999, cartProduct.inStore?.productId);
    };

    const [showModalId, setShowModalId] = useState(0);

    function getShowModalId(productId?: number) {
        if (productId === undefined) return 0;

        /* zmieniam znak, żeby wymusić TOGGLE */
        if (showModalId > 0) return -1 * productId;
        else return productId;
    }

    return (
        <>
            <div className="cart-item is-flex is-flex-wrap-wrap">
                {/* <div className="button is-danger is-inverted is-size-5 has-text-weight-bold m-0" onClick={deleteFromCart}>x</div> */}

                <div className="cart-col cart-col-item">
                    <div className="title mb-1 is-size-3-desktop is-size-4-tablet is-size-5-mobile">
                        <div
                            className="has-text-danger-dark is-clickable is-size-5 has-text-weight-bold m-0"
                            onClick={deleteFromCart}
                        >
                            x
                        </div>
                        {cartProduct.inStore?.pName}
                    </div>
                    {/* <a href="#">zobacz szczegóły</a> */}
                    <ProdType prodType={cartProduct.prodDef?.prodType} courseType={cartProduct.inStore?.courseType} />
                    {cartProduct.inStore?.start !== undefined && cartProduct.inStore?.start > 0 && (
                        <div className="webinar-details-item mb-4">
                            <ProdTerm inStore={cartProduct.inStore} showIcon={true} />
                        </div>
                    )}
                    {basketType === BASKET_TYPE_CHOICES.BASKET_ORDER && (
                        <>
                            <div className="webinar-details">
                                <ProdPrice inStore={cartProduct.inStore} />
                                <ProdDuration inStore={cartProduct.inStore} size="M" />
                            </div>
                        </>
                    )}
                    <div className="is-size-6">
                        <a onClick={() => setShowModalId(getShowModalId(cartProduct.inStore?.productId))}>
                            szczegóły szkolenia{" "}
                        </a>
                    </div>
                </div>
                {basketType === BASKET_TYPE_CHOICES.BASKET_ORDER && (
                    <div className="cart-col cart-col-prices is-flex">
                        <div>
                            <label>Uczestnicy</label>
                            <input
                                type="number"
                                className="input"
                                name={"quantity" + cartProduct.inStore?.productId}
                                data-productid={cartProduct.inStore?.productId}
                                data-price={cartProduct.inStore?.price}
                                onChange={updateCartQuantity}
                                defaultValue={cartProduct.cnt}
                                min="1"
                                max="30"
                            />
                        </div>
                        <div>
                            <label>zł/osoba</label>
                            <input
                                type="text"
                                className="input"
                                name={"cost" + cartProduct.inStore?.productId}
                                value={cartProduct.inStore?.price}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>Koszt [zł]</label>
                            {cartProduct.inStore?.price && cartProduct.cnt && (
                                <input
                                    type="text"
                                    className="input"
                                    name={"total" + cartProduct.inStore.productId}
                                    value={cartProduct.cnt * cartProduct.inStore.price}
                                    readOnly
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
            {/* <hr className="mb-0 mt-4"></hr> */}
            <div className="cart-item is-flex">{notification}</div>
            <ProdDetailModal showModalId={showModalId} inStore={cartProduct.inStore} hideActionButton={true} />
        </>
    );
};
export default CartItem_old;
