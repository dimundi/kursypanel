import { useState } from "react";
import { COURSE_TYPES_CHOICES } from "../../components/Enumerators";
import { IInStore, IProdDef } from "../../interfaces/IProducts";
import ProdDetailModal from "./ProdDetailModal";
import ProdPrice from "./ProdPrice";
import ProdDuration from "./ProdDuration";
import ToCartButton from "../cart/ToCartButton";
import ProdTerm from "./ProdTerm";

/* wyświetlanie listy kursów jako listy produktów w sklepie 
    courseType*/
const ProdCoursesList = (props: { inStore?: IInStore[]; prodDef?: IProdDef; courseType: COURSE_TYPES_CHOICES }) => {
    const [showModalId, setShowModalId] = useState(0);

    function getShowModalId(productId?: number) {
        if (productId === undefined) return 0;

        /* zmieniam znak, żeby wymusić TOGGLE */
        if (showModalId > 0) return -1 * productId;
        else return productId;
    }

    return (
        <>
            {/* <div className="mb-2 has-text-weight-bold">Terminy:</div> */}
            <div className="list has-visible-pointer-controls">
                {props.inStore
                    ?.filter((inStore) => {
                        return inStore.courseType === props.courseType ? true : false;
                    })
                    .map((inStore, key) => (
                        <div className="list-item" key={"ar_" + key}>
                            {/* <article key={"ar_" + key}> */}
                            <div className="list-item-content">
                                <div className="is-flex is-flex-wrap-wrap py-2" key={inStore.productId}>
                                    {/* <div className="is-size-6 level-left"> */}

                                    {/* <div className="level-item"> */}

                                    <>
                                        <div className="ml-2 is-size-7">
                                            <ProdTerm hr={true} inStore={inStore} />
                                            <ProdDuration inStore={inStore} showLabel={true} size={"XS"} />
                                        </div>
                                    </>
                                    {/* </div> */}

                                    {/* <div className="level-item is-size-7"> */}
                                    {/* <div className="ml-2 is-size-7">
                                        <ProdPrice inStore={inStore} />
                                    </div> */}
                                    {/* </div> */}
                                </div>
                            </div>

                            <ProdDetailModal showModalId={showModalId} inStore={inStore} prodDef={props.prodDef} />
                            <div className="list-item-controls">
                                {" "}
                                <div className="buttons is-right">
                                    <ProdPrice inStore={inStore} />
                                    <ToCartButton className="ml-2" inStore={inStore} />
                                    {/* <button className="button">
                                        <span className="icon is-small">
                                            <i className="fas fa-edit"></i>
                                        </span>
                                        <span>Edit</span>
                                    </button> */}

                                    <button className="button">
                                        <a onClick={() => setShowModalId(getShowModalId(inStore.productId))}>
                                            <span className="icon is-small">
                                                <i className="fas fa-ellipsis-h"></i>
                                            </span>
                                        </a>
                                    </button>
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                    ))}
            </div>
        </>
    );
};

export default ProdCoursesList;
