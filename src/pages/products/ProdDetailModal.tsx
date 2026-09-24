import { useEffect, useState } from "react";
import { IInStore, IProdDef, IProduct } from "../../interfaces/IProducts";
import ProdType from "./ProdType";
import ProdPrice from "./ProdPrice";
import ProdTerm from "./ProdTerm";
import ProdDetail from "./ProdDetail";
import ToCartButton from "../cart/ToCartButton";
import ProdDuration from "./ProdDuration";

/*-----------------------
 * jeżeli showModalId = inStore?.productId - wówczas wyświetlam showModal
 * hideActionButton? = true -> ukryj przyciski Do koszyka / Wyślij zapytanie
 *----------------------- */
export interface IProdDetailModal {
    inStore?: IInStore;
    prodDef?: IProdDef;
    product?: IProduct;
    showModalId?: number; // id modalu, który chcemy pokazać
    modalId?: number; // id tego modalu, lub inStore?.productId jeżeli props.modalId === undefied
    hideActionButton?: boolean;
}

const ProdDetailModal = (props: IProdDetailModal) => {
    let inStore = props.inStore;
    let prodDef = props.prodDef;
    let modalId = inStore?.productId;
    if (props.modalId !== undefined) modalId = props.modalId;

    if (props.product !== undefined) {
        prodDef = props.product.prodDef;
        if (props.product.inStore !== undefined && props.product.inStore.length > 0) inStore = props.product.inStore[0];
    }
    const [activateModal, setActivateModal] = useState("");
    useEffect(() => {
        if (props.showModalId && Math.abs(props.showModalId) === modalId) {
            setActivateModal(activateModal === "is-active" ? "" : "is-active");
        }
    }, [props.showModalId]);

    let hideActionButton = false;
    if (props.hideActionButton) {
        hideActionButton = props.hideActionButton;
    }
    // console.log(hideActionButton);
    return (
        <>
            <div className={`modal ${activateModal}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <div className="modal-card-head ">
                        <div className="modal-card-title">
                            <ProdType
                                className="is-size-6 mt-3 has-text-weight-semibold"
                                prodType={inStore?.prodType}
                                courseType={inStore?.courseType}
                            />

                            <div className="pt-1 modal_title_width"> {prodDef?.name ? prodDef?.name : inStore?.pName}</div>
                        </div>
                        {/* <div className="modal_delete_button">
                            <button className="delete" aria-label="close" onClick={() => setActivateModal("")}></button>
                        </div> */}
                    </div>

                    <section className="modal-card-body">
                        <ProdDetail inStore={inStore} getProductId={props.showModalId} />
                        <div className="is-size-7 ">identyfikator produktu: {inStore?.productId}</div>
                    </section>

                    <footer className="modal-card-foot">
                        <div className="list has-visible-pointer-controls">
                            <div className="list-item">
                                <div className="list-item-content">
                                    <ProdTerm inStore={inStore} />
                                    <ProdDuration inStore={inStore} showLabel={true} size={"XXS"} />
                                </div>

                                <div className="list-item-content">
                                    <div className="pl-4">
                                        <ProdPrice inStore={inStore} />
                                    </div>
                                </div>

                                <div className="list-item-controls">
                                    <div className="buttons is-right">
                                        {!hideActionButton && (
                                            <ToCartButton className="ml-2" inStore={inStore} key={inStore?.productId} />
                                        )}

                                        <button className="button mx-1" onClick={() => setActivateModal("")}>
                                            Zamknij okno
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button className="modal-close is-large" aria-label="close"></button>
                            {/* <div className="">
                                <ProdPrice inStore={inStore} />
                            </div> */}

                            {/* <div className="list-item-controls">
                                <div className="buttons is-right">
                                    {!hideActionButton && <ToCartButton className="ml-2" inStore={inStore} key={inStore?.productId} />}

                                    <button className="button mx-1" onClick={() => setActivateModal("")}>
                                        Zamknij okno
                                    </button>
                                </div>
                            </div> */}
                        </div>
                    </footer>
                    <div className="is-size-7 has-text-light">prod_id: {inStore?.productId}</div>
                </div>
            </div>
        </>
    );
};

export default ProdDetailModal;
