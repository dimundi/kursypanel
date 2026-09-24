import { isValidElement, useState } from "react";
import { IInStore, IProdDef } from "../../interfaces/IProducts";
import ToCartButton from "../cart/ToCartButton";
import ProdDetailModal from "./ProdDetailModal";
import ProdDuration from "./ProdDuration";
import ProdPrice from "./ProdPrice";
import ProdType from "./ProdType";
import ProdTerm from "./ProdTerm";
import { NoOrphans } from "../../components/elements/NoOrphans";
import HelperClass from "../../classes/HelperClass";

const ProductListTilesElement = (props: { inStore?: IInStore; prodDef?: IProdDef }) => {
    const [showModalId, setShowModalId] = useState(0);
    const [isClicked, setIsClicked] = useState(false);

    function getShowModalId(productId?: number) {
        if (productId === undefined) return 0;

        /* zmieniam znak, żeby wymusić TOGGLE */
        if (showModalId > 0) return -1 * productId;
        else return productId;
    }
    var image = "https://rewers.edu.pl/wp-content/uploads/2023/02/Pixmac000084372766.jpg";
    if (props.prodDef?.img) image = props.prodDef?.img;

    return (
        <>
            <div className="column">
                {props.inStore && (
                    <>
                        <article className="box p-0" style={{ backgroundColor: "#eeeeee", position: "relative" }}>
                            <article
                                className="img"
                                style={{
                                    height: "15rem",
                                    backgroundImage: `url(${image})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    borderTopRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                }}
                            >
                                {HelperClass.isCourseTerm(props.inStore) && (
                                    <span
                                        className="tag is-info"
                                        style={{ position: "absolute", right: 10, top: "1rem", fontSize: "1em", color: "white" }}
                                    >
                                        <ProdTerm inStore={props.inStore} breakLine={false} showIcon={true} />
                                    </span>
                                )}
                                {/* <span
                                    className="tag is-primary"
                                    style={{ position: "absolute", right: 10, top: "1rem", fontSize: "1em", fontWeight: "bold" }}
                                >
                                    <ProdTerm inStore={props.inStore} breakLine={false} showIcon={true} />
                                </span> */}
                                {/* <span
                                    className="tag is-warning"
                                    style={{ position: "absolute", right: 10, top: "8.5rem", color: "white", fontSize: "0.8em", fontWeight: "bold" }}
                                >
                                    DLA DYREKTORÓW
                                </span> */}
                                <span
                                    className="tag is-accent"
                                    style={{ position: "absolute", right: 10, top: "12.4rem", fontSize: "1em", fontWeight: "bold" }}
                                >
                                    <ProdType prodType={props.inStore?.prodType} courseType={props.inStore?.courseType} />
                                </span>
                            </article>

                            <article className="p-2">
                                <article className="mb-0" style={{ minHeight: "3.5rem" }}>
                                    <NoOrphans className="mt-1 title is-5">
                                        {props.inStore.pName ? props.inStore.pName : props.prodDef?.name}
                                    </NoOrphans>
                                    <nav className="level px-4 is-size-4">
                                        <div className="level-left">
                                            <ProdDuration inStore={props.inStore} showIcon={true} size={"S"} />
                                        </div>
                                        <div className="level-right">
                                            <ProdPrice inStore={props.inStore} showIcon={true} size={"S"} />
                                        </div>
                                    </nav>
                                </article>
                                <hr style={{ border: "1px solid #aaaaaa" }} className="my-2" />
                                {/* <article style={{ height:"7.5rem"}}> */}
                                <div className="is-flex is-flex-wrap-wrap">
                                    <div>
                                        <ToCartButton inStore={props.inStore} setIsClicked={setIsClicked} />
                                        {isClicked === false && (
                                            <div>
                                                <a
                                                    className="is-size-8 has-text-weight-light has-text-grey"
                                                    onClick={() => setShowModalId(getShowModalId(props.inStore?.productId))}
                                                >
                                                    Szczegóły szkolenia
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    {isClicked === false && (
                                        <div className="pl-3 ">
                                            {/* <ProdType prodType={props.inStore?.prodType} courseType={props.inStore?.courseType} /> */}
                                            {/* <ProdDuration inStore={props.inStore} /> */}
                                            {/* <ProdPrice inStore={props.inStore} /> */}
                                            {/* <ProdTerm inStore={props.inStore} breakLine={false} showIcon={true} /> */}
                                            <ProdDetailModal showModalId={showModalId} inStore={props.inStore} prodDef={props.prodDef} />
                                        </div>
                                    )}
                                </div>
                                {/* </article> */}

                                {/* 

                            <article className="mb-2" style={{ height:"4rem"}}>
                                <nav className="level">
                                    <div className="lecel-left">                            
                                        <ToCartButton inStore={props.inStore}/>       
                                        <div>
                                        <a className="is-size-8 has-text-weight-light has-text-grey" onClick={() => setShowModalId(getShowModalId(props.inStore?.productId))}>Szczegóły szkolenia</a>
                                        </div>
                                    </div>
                                    <div className="lecel-right">
                                        <ProdType prodType={props.inStore?.prodType} courseType={props.inStore?.courseType}/>
                                        <ProdDuration inStore={props.inStore}/>
                                        <ProdPrice inStore={props.inStore}/> 
                                        <ProdTerm inStore={props.inStore} breakLine={false} showIcon={true}/> 
                                        <ProdDetailModal showModalId={showModalId} inStore={props.inStore} prodDef={props.prodDef}/>                           
                                    </div>
                                </nav>
                            </article> */}
                            </article>
                        </article>
                    </>
                )}
            </div>
        </>
    );
};

export default ProductListTilesElement;
