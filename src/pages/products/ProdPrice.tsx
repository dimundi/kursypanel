import { BOOKING_TYPES_CHOICES, COURSE_TYPES_CHOICES } from "../../components/Enumerators";
import { componentSize, componentSizeMap } from "../../components/types/custom";
import { IInStore } from "../../interfaces/IProducts";

/* formatowanie ceny kursu 
props.showNetto == true -> pokaż również ceny netto

*/

export interface IProdPrice {
    inStore?: IInStore;
    showIcon?: boolean; // czy wyświetlać ikonę
    showNetto?: boolean;
    showLabel?: boolean;
    size?: componentSize;
}

const ProdPrice = (props: IProdPrice) => {
    // function getNetto() {
    //     if (props.inStore?.price !== undefined && props.inStore.price > 0) {
    //         return Math.round((props.inStore.price / 1.23) * 100) / 100 + " zł netto, 23% VAT";
    //     }
    //     return "";
    // }

    let cSize: componentSize = "S";
    if (props.size !== undefined) cSize = props.size;

    return (
        <>
            {props.inStore?.bookingType === BOOKING_TYPES_CHOICES.BOOKING_TYPE_ONLINE && (
                <>
                    <div className="mr-4">
                        <div className={componentSizeMap[cSize]}>
                            {props.showIcon ? (
                                <span className="pr-3">
                                    <i className="fa-solid fa-credit-card"></i>
                                </span>
                            ) : (
                                props.showLabel && <>cena: </>
                            )}
                            {props.inStore.price} zł {props.inStore.courseType !== COURSE_TYPES_CHOICES.COURSE_TYPE_ECOURSE && <>/ osoba</>}
                            {props.showNetto && (
                                <>
                                    <br />
                                    getNetto()
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProdPrice;
