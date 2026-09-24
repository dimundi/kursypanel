import { Dispatch, SetStateAction, useState } from "react";
import BBActivityComp, { BBActivityShop } from "../bblanding/BBActivityComp";
import { BB_PAKIET_CHOICES } from "./BBEnum";
import { IProduct } from "../../interfaces/IProducts";
import BBHelperClass from "../../classes/BBHelperClass";
import HelperClass from "../../classes/HelperClass";
import { PROD_VARIANT_CHOICES } from "../../components/Enumerators";
// import { IBBActivity } from "../../interfaces/IBB";

export interface IBBActivitiesJSX {
    activityId: number; //productId
    setActivityId: Dispatch<SetStateAction<number>>;
    products?: IProduct[];
}

/* ------------------------------------------------ 
 * 
   ------------------------------------------------ */
const BBActivities = (props: IBBActivitiesJSX) => {
    const [showModalId, setShowModalId] = useState<BB_PAKIET_CHOICES | undefined>(undefined);
    /* ----------------------------------------------------- */
    function showActivity(activityType: BB_PAKIET_CHOICES) {
        let activityObj = BBHelperClass.getProductFromInStoreByVariant(activityType, props.products);
        if (activityObj != undefined) {
            return (
                <div className="column">
                    <div
                        className={
                            "card " +
                            (HelperClass.isProductInStore(props.activityId, activityObj.inStore) && "has-background-info-light")
                        }
                    >
                        <div
                            onClick={() => props.setActivityId(HelperClass.getFirstProductIdInStore(activityObj?.inStore))}
                            className="is-clickable"
                        >
                            <div className="card-content pb-1">
                                <BBActivityShop activityType={activityType} bbActivity={activityObj} />
                            </div>
                        </div>
                        <div className="pl-4 pb-1 is-clickable has-text-link" onClick={() => setShowModalId(activityType)}>
                            więcej informacji
                        </div>
                    </div>
                </div>
            );
        }
        return <></>;
    }
    return (
        <>
            <div className="columns">
                {showActivity(BB_PAKIET_CHOICES.WALK)}
                {showActivity(BB_PAKIET_CHOICES.RUN)}
                {showActivity(BB_PAKIET_CHOICES.RIDE)}
                {showActivity(BB_PAKIET_CHOICES.IRON)}
            </div>

            <div className={"modal " + (showModalId !== undefined && " is-active")}>
                <div className="modal-background" onClick={() => setShowModalId(undefined)}></div>
                <div className="modal-content">
                    {showModalId !== undefined && (
                        <BBActivityComp activityType={showModalId} hideImage={true} hideRegister={true} />
                    )}
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={() => setShowModalId(undefined)}></button>
            </div>
        </>
    );
};

export default BBActivities;
