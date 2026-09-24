import BBHelperClass from "../../classes/BBHelperClass";
import { PROD_VARIANT_CHOICES } from "../../components/Enumerators";
import { BB_PAKIET_CHOICES } from "../bb/BBEnum";

export interface IRankButton {
    activityType: BB_PAKIET_CHOICES | PROD_VARIANT_CHOICES;
    selected: boolean;
    distance: number;
    // position: number;
}
export const BBRankButton = (props: IRankButton) => {
    return (
        <>
            <div className="has-text-centered mx-2">
                <button className={"button px-2 py-1" + (props.selected == true ? " has-background-info-90" : "")}>
                    <div className="p-1">
                        <div>{props.activityType == BB_PAKIET_CHOICES.RUN && <>bieg</>}</div>
                        <div>{props.activityType == BB_PAKIET_CHOICES.WALK && <>spacer</>}</div>
                        <div>{props.activityType == BB_PAKIET_CHOICES.RIDE && <>rower</>}</div>
                        <div className="is-family-code is-size-4">
                            {BBHelperClass.distanceM2KM(props.distance)}
                            <span className="is-size-6 ml-1">km</span>
                        </div>
                        {/* <hr className="p-0 m-0" /> */}
                        {/* <div className=" is-size-6">poz. -</div> */}
                    </div>
                </button>
            </div>
        </>
    );
};
