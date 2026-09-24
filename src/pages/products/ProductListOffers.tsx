import { isMobile } from "react-device-detect";
import BodyContainer from "../../components/layout/BodyContainer";
import IProducts from "../../interfaces/IProducts";
import ProductListTilesElement from "./ProductListTilesElement";

/********************************************
 * from - index w props.products?.specialOffer od którego wyświetlamy
 * maksymalnie 3 sztuki
 ********************************************  */
const ProductListOfferItem = (props: { products: IProducts; from: number }) => {
    let offerCount = props.products?.specialOffer?.length;

    if (offerCount === undefined || props.from > offerCount) {
        return <></>;
    }
    let index1 = props.from >= offerCount ? -1 : props.from;
    let index2 = props.from + 1 >= offerCount ? -1 : props.from + 1;
    let index3 = props.from + 2 >= offerCount ? -1 : props.from + 2;

    // console.log("size");
    // console.log(offerCount);
    // console.log("--");
    // console.log(index1);
    // console.log(index2);
    // console.log(index3);

    function renderOffer(index: number) {
        return (
            <>
                {props.products.specialOffer && (
                    <>
                        {index >= 0 ? (
                            <ProductListTilesElement
                                key={index}
                                inStore={props.products.specialOffer[index].inStore}
                                prodDef={props.products.specialOffer[index].prodDef}
                            />
                        ) : (
                            <ProductListTilesElement key="blank_1" />
                        )}
                    </>
                )}
            </>
        );
    }

    return (
        <>
            {isMobile ? (
                <>
                    <div className="is-flex">{renderOffer(index1)}</div>
                    <div className="is-flex">{renderOffer(index2)}</div>
                    <div className="is-flex">{renderOffer(index3)}</div>
                </>
            ) : (
                <div className="is-flex is-flex-direction-row  ">
                    {renderOffer(index1)}
                    {renderOffer(index2)}
                    {renderOffer(index3)}
                    {/* {renderOffer(index2)} */}
                    {/* {renderOffer(index3)} */}
                </div>
            )}
        </>

        // <>
        //     <div className="is-flex is-flex-direction-row  ">
        //         {props.products?.specialOffer?.map(
        //             (specialOffer, index) =>
        //                 !(isMobile === true && index == props.from) && (
        //                     <ProductListTilesElement key={index} inStore={specialOffer.inStore} prodDef={specialOffer.prodDef} />
        //                 )
        //         )}
        //         {!isMobile && (
        //             <>
        //                 {props.products?.specialOffer != undefined && (
        //                     <>
        //                         {props.products?.specialOffer?.length < 3 && <ProductListTilesElement key="blank_1" />}
        //                         {props.products?.specialOffer?.length < 2 && <ProductListTilesElement key="blank_2" />}
        //                     </>
        //                 )}
        //             </>
        //         )}
        //     </div>
        // </>
    );
};

/********************************************
 *
 ********************************************  */

const ProductListOffers = (props: { products: IProducts }) => {
    return (
        <>
            {props.products?.specialOffer?.length !== undefined && props.products?.specialOffer?.length > 0 && (
                <>
                    <BodyContainer className="mt-1">
                        <div className="mb-1 is-size-5-mobile is-size-4">{isMobile ? "Polecane szkolenie" : "Polecane szkolenia"}</div>
                    </BodyContainer>

                    <ProductListOfferItem products={props.products} from={0} />
                    <ProductListOfferItem products={props.products} from={3} />
                </>
            )}
        </>
    );
};

export default ProductListOffers;
