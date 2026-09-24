import { useContext, useEffect, useState } from "react";
import CartClass from "../classes/CartClass";
import { ADDR_TYPE_CHOICES, BASKET_TYPE_CHOICES, BASKET_UNKNOWN, CATEGORY_CHOICES, SYSTEM_CHOICES } from "../components/Enumerators";
import CartItem from "./cart/CartItem";
import RequestClass from "../classes/RequestClass";
import { IOrder } from "../interfaces/IOrder";
import { CartContext } from "../context/CartContext";
import { ContactForm } from "../components/forms/ContactForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IUrlProductList } from "../interfaces/IUrl";
import ProdBreadCrumb from "./products/ProdBreadCrumb";
import { isMobile } from "react-device-detect";
import PageTitle from "../components/layout/PageTitle";
import BodyContainer from "../components/layout/BodyContainer";
import { NoOrphans } from "../components/elements/NoOrphans";
import { UserContext } from "../context/UserContext";
import { IBasketProduct } from "../interfaces/IBasket";
import { requestState } from "../components/types/custom";

const Inquiry = () => {
    const basketType = BASKET_TYPE_CHOICES.BASKET_INQUIRY;
    const { setInquiryCnt } = useContext(UserContext);
    const [notification, setNotification] = useState<JSX.Element | String>();
    const urlParams = useParams<IUrlProductList>();
    const [apiReadState, setApiReadState] = useState("Idle" as requestState);
    const [basketId] = useState(
        urlParams.basketId
            ? () => {
                  /* jeżeli w urlu wysyłany jest basketId, to wpisuję go jako domyślny basket Id */
                  CartClass.set_basketId(BASKET_TYPE_CHOICES.BASKET_INQUIRY, urlParams.basketId);
                  return urlParams.basketId;
              }
            : CartClass.get_basketId(basketType)
    );
    const [productCnt, setProductCnt] = useState(0); /* ilość produktów w koszyku */
    const [isSent, setIsSent] = useState(false);
    const navigate = useNavigate();

    // wszystkie dane związane z zapytaniem ofertowym
    const [order, setOrder] = useState<IOrder>({
        products: [] as IBasketProduct[],
        addrContact: {
            addrType: ADDR_TYPE_CHOICES.ADDR_TYPE_CONTACT_BY_USER,
            aName: "",
        },
    });

    /* ----------------------------------------------------------------------
     *  wysłanie zapytania o koszyk -> przy zmianie basketId
     * ----------------------------------------------------------------------*/
    useEffect(() => {
        /* trigeruję pobranie doanych o koszyku */
        if (basketId !== undefined && basketId !== BASKET_UNKNOWN && basketType === BASKET_TYPE_CHOICES.BASKET_INQUIRY) {
            if (!(apiReadState === "Start" || apiReadState === "Progress")) {
                setApiReadState("Start");
            }
        }
    }, [basketId]);

    /* ----------------------------------------------------------------------
     *  wysłanie zapytania o koszyk -> przy zmianie basketId
     * ----------------------------------------------------------------------*/
    useEffect(() => {
        function succ_callback(result: any) {
            if (result !== null) {
                if (order !== undefined) {
                    if (setOrder) {
                        setOrder({ ...order, products: result.products });
                    }
                }
                if (result.products.length > 0) setProductCnt(result.products.length);
            }

            setApiReadState("OK");
            setNotification(<></>);
        }

        function err_callback(result: any) {
            setNotification(RequestClass.errorAlert(result));
            setApiReadState("Error");
        }
        // log(urlParams.basketId);
        // wysłanie zapytanie do serwera
        if (apiReadState === "Start") {
            setApiReadState("Progress");
            // console.log("zapytanie o Basket");
            CartClass.get({
                basketId: basketId,
                basketType: BASKET_TYPE_CHOICES.BASKET_INQUIRY,
                success_callback: succ_callback,
                error_callback: err_callback,
            });
            setNotification(<></>);
        }
    }, [apiReadState]);

    // function isProduct() {
    //     console.log(basketId);
    //     return true;
    //     // if (order.products !== undefined) if (order.products?.length > 0) return true;
    //     // return false;
    //}

    /* ----------------------------------------------------------------------
     *  wysłano zapytanie ofertowe
     * ----------------------------------------------------------------------*/
    useEffect(() => {
        if (isSent === true) {
            /* formularz został poprawnie wysłany */
            setInquiryCnt(0);
            //CartClass.set_basketId(BASKET_TYPE_CHOICES.BASKET_INQUIRY, "")
            navigate("/zapytanie/sukces");
        }
    }, [isSent]);

    return (
        <>
            {notification}

            <PageTitle>
                <ProdBreadCrumb
                    categoryId={urlParams.categoryId ? urlParams.categoryId : CATEGORY_CHOICES.CATEGORY_CLOSE}
                    level3Title="Zapytanie ofertowe"
                />
                <div>
                    Chętnie zorganizujemy dla Ciebie szkolenie. <br />
                    Napisz do nas.
                </div>
            </PageTitle>

            <BodyContainer noPadding={false}>
                <div className="columns my-4 ">
                    {productCnt > 0 && (
                        <div className="column ">
                            <h2 className="is-size-5 is-size-6-mobile">Jestem zainteresowany następującymi szkoleniami:</h2>

                            <div id="cart" className="block">
                                <CartContext.Provider
                                    value={{
                                        basketId: basketId,
                                        order: order,
                                        setOrder: setOrder,
                                        setNotification: setNotification,
                                        getInvoiceData: false,
                                        system: SYSTEM_CHOICES.SYSTEM_KURSY,
                                    }}
                                >
                                    {order?.products?.map((cartProduct) => (
                                        <CartItem
                                            key={cartProduct.inStore?.productId}
                                            cartProduct={cartProduct}
                                            can_product_edit={true}
                                            hide_prices={true}
                                        />
                                    ))}
                                </CartContext.Provider>
                            </div>
                            <div className="mt-5 mb-5 has-text-left">
                                <Link
                                    to={urlParams.categoryId !== undefined ? "/list/" + urlParams.categoryId : "/"}
                                    className="mr-2 button is-primary is-outlined"
                                >
                                    {isMobile ? <>chcę dodać kolejne szkolenie</> : <>chcę dodać kolejne szkolenie z oferty sklepu</>}
                                </Link>

                                <NoOrphans className="mt-5 is-size-6 is-size-7-mobile">
                                    Jeżeli nie znalazłeś w ofercie szkolenia, które Cię interesuje, napisz do nas. Z przyjemnością zoorganizujemy
                                    szkolenie według Twoich indywidualnych potrzeb.
                                </NoOrphans>
                            </div>
                        </div>
                    )}
                    <div className="column box">
                        <ContactForm
                            order={order}
                            title=" "
                            setIsSent={setIsSent}
                            infoLabel="dodatkowe informacje (liczba uczestników, proponowane terminy)"
                        />
                    </div>
                </div>
            </BodyContainer>
        </>
    );
};
export default Inquiry;
