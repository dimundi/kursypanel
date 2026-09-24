import { componentSize, componentSizeMap } from "../../components/types/custom";
import { IInStore } from "../../interfaces/IProducts";

export interface IProdDuration {
    inStore?: IInStore;
    showIcon?: boolean; // czy wyświetlać ikonę
    showLabel?: boolean; // wyświetl  label zamiast ikony
    size?: componentSize;
}

/* formatowanie czasu trwania kursu */
const ProdDuration = (props: IProdDuration) => {
    // function getNetto() {
    //     if ((props.inStore.price !== undefined) && (props.inStore.price  >0 )) {
    //         return Math.round((props.inStore.price/1.23)*100)/100 + " zł netto, 23% VAT"
    //     }
    //     return ""
    // }

    let cSize: componentSize = "S";
    if (props.size !== undefined) cSize = props.size;

    return (
        <>
            {props.inStore?.duration !== undefined && props.inStore.duration > 0 && (
                <>
                    <div className={componentSizeMap[cSize]}>
                        {props.showIcon ? (
                            <span className="pr-3">
                                <i className="fa-solid fa-clock"></i>
                            </span>
                        ) : (
                            props.showLabel && <>czas trwania:&nbsp;&nbsp;</>
                        )}
                        {props.inStore.duration} {props.inStore.durationUnit === 1 ? (props.inStore.duration === 1 ? " dzień" : " dni") : " minut"}{" "}
                    </div>
                </>
            )}
        </>
    );
};

export default ProdDuration;
