import { Dispatch, SetStateAction, useState } from "react";
import { IInStore, IProduct } from "../../interfaces/IProducts";
import { TSHIRT_CHOICES } from "./BBEnum";
import BBHelperClass from "../../classes/BBHelperClass";
import HelperClass from "../../classes/HelperClass";

export interface IBBTshirt {
    tshirtId: number;
    setShirtId: Dispatch<SetStateAction<number>>;
    products?: IProduct[];
}

export interface IBBTshirtElement extends IBBTshirt {
    type: TSHIRT_CHOICES;
}

function sortTshirtVariants(a: IInStore, b: IInStore) {
    type arr1Type = "XS" | "S" | "M" | "L" | "XL" | "2XL";
    var map = { XS: 1, S: 2, M: 3, L: 4, XL: 5, "2XL": 6 };
    if (a.vName === undefined || b.vName === undefined) return 0;
    return map[a.vName as arr1Type] - map[b.vName as arr1Type];
}

function getTshirtPrice(tshirtObj: IProduct) {
    let maxPrice = 0;
    let minPrice = 1000;
    tshirtObj.inStore?.forEach((inStore) => {
        if (inStore.price !== undefined) {
            if (inStore.price > maxPrice) maxPrice = inStore.price;
            if (inStore.price < minPrice) minPrice = inStore.price;
        }
    });

    if (maxPrice === minPrice) return maxPrice;
    return minPrice + " - " + maxPrice;
}
interface ITshirt extends IBBTshirt {
    tshirtType: TSHIRT_CHOICES;
    // showModalId: number;
    // setShowModalId: Dispatch<SetStateAction<number>>;
}

const Tshirt = (props: ITshirt) => {
    let tshirtObj = BBHelperClass.getProductFromInStoreByVariant(props.tshirtType, props.products);
    const [showModalId, setShowModalId] = useState(0);
    if (!(tshirtObj === undefined || tshirtObj === null)) {
        return (
            <>
                <div className="column">
                    <div className={"card " + (HelperClass.isProductInStore(props.tshirtId, tshirtObj.inStore) && "has-background-info-light")}>
                        {/* <div className={"card "}> */}
                        <div className="card-content pb-1">
                            <div className="media">
                                <div className="media-left">
                                    <figure className="image is-48x48" onClick={() => setShowModalId(props.tshirtType * 1000)}>
                                        {props.tshirtType === TSHIRT_CHOICES.TSHIRT_W && (
                                            <img src="https://odnrewers.pl/media/bb/BB5_koszulka_damska_bez_tla.png" alt="koszulka damska" />
                                        )}
                                        {props.tshirtType === TSHIRT_CHOICES.TSHIRT_M && (
                                            <img src="https://odnrewers.pl/media/bb/BB5_koszulka_meska_bez_tla.png" alt="koszulka męska" />
                                        )}
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <div className="title is-4 p-0">{tshirtObj.prodDef?.name}</div>
                                    <div>
                                        {tshirtObj.inStore?.length !== undefined && tshirtObj.inStore?.length > 0 && (
                                            <>
                                                <strong>{getTshirtPrice(tshirtObj)} </strong>
                                                <small>zł</small>
                                            </>
                                        )}
                                    </div>

                                    {tshirtObj.inStore?.length === 0 ? (
                                        <>Brak na stanie, oczekujemy na dostawę.</>
                                    ) : (
                                        <>
                                            <div className="is-size-7">wybierz rozmiar</div>
                                            {tshirtObj.inStore
                                                ?.filter((prod) => {
                                                    if (prod.av === undefined) return true;
                                                    if (prod.av > 0) return true;
                                                    return false;
                                                })
                                                .sort(sortTshirtVariants)
                                                .map((tshirtVariant, index) => (
                                                    <span
                                                        key={props.tshirtType + index}
                                                        className="is-clickable"
                                                        onClick={() =>
                                                            tshirtVariant.productId &&
                                                            props.setShirtId(
                                                                tshirtVariant.productId === props.tshirtId ? 0 : tshirtVariant.productId
                                                            )
                                                        }
                                                    >
                                                        <span
                                                            key={"tshortvariant" + tshirtVariant.productId?.toString}
                                                            className={
                                                                "tag mr-2 p-4 " +
                                                                (tshirtVariant.productId === props.tshirtId ? "is-primary" : "is-light")
                                                            }
                                                        >
                                                            {tshirtVariant.vName}
                                                        </span>
                                                    </span>
                                                ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="pl-4 pb-1 is-clickable has-text-link" onClick={() => setShowModalId(props.tshirtType)}>
                            tabela rozmiarów
                        </div>
                    </div>
                </div>

                <div className={"modal " + (showModalId > 0 && " is-active")}>
                    <div className="modal-background" onClick={() => setShowModalId(0)}></div>
                    <div className="modal-content">
                        <figure className="image">
                            {showModalId === TSHIRT_CHOICES.TSHIRT_W && (
                                <img src="https://odnrewers.pl/media/bb/BB5_koszulka_damska_wymiary.png" alt="koszulka damska - wymiary" />
                            )}
                            {showModalId === TSHIRT_CHOICES.TSHIRT_W * 1000 && (
                                <img src="https://odnrewers.pl/media/bb/BB5_koszulka_damska.jpg" alt="koszulka damska" />
                            )}
                            {showModalId === TSHIRT_CHOICES.TSHIRT_M && (
                                <img src="https://odnrewers.pl/media/bb/BB5_koszulka_meska_wymiary.png" alt="koszulka mesk - wymiary" />
                            )}
                            {showModalId === TSHIRT_CHOICES.TSHIRT_M * 1000 && (
                                <img src="https://odnrewers.pl/media/bb/BB5_koszulka_meska.jpg" alt="koszulka damska" />
                            )}
                        </figure>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={() => setShowModalId(0)}></button>
                </div>

                {/* <ProdDetailModal
                    showModalId={showModalId}
                    product={tshirtObj}
                    hideActionButton={true}
                    //modalId={props.tshirtType}
                /> */}
            </>
        );
    }

    return <></>;
};

/* ------------------------------------------------ 
 * 
   ------------------------------------------------ */
const BBTshirts = (props: IBBTshirt) => {
    return (
        <div className="container">
            <div className="columns">
                <Tshirt products={props.products} tshirtType={TSHIRT_CHOICES.TSHIRT_W} setShirtId={props.setShirtId} tshirtId={props.tshirtId} />
                <Tshirt products={props.products} tshirtType={TSHIRT_CHOICES.TSHIRT_M} setShirtId={props.setShirtId} tshirtId={props.tshirtId} />
                {/* {showTshirt(TSHIRT_CHOICES.PROD_VARIANT_TSHIRT_W)}
                {showTshirt(TSHIRT_CHOICES.PROD_VARIANT_TSHIRT_M)} */}
            </div>
        </div>
    );
};
export default BBTshirts;
