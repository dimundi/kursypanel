/* formatowanie terminu kursu */

import HelperClass from "../../classes/HelperClass";
import { BOOKING_TYPES_CHOICES } from "../../components/Enumerators";
import { componentSize } from "../../components/types/custom";
import { IInStore } from "../../interfaces/IProducts";

export interface IProdTerm {
    inStore?: IInStore;
    hr?: boolean; // czy rysować linię po wyświetleniu teminu
    breakLine?: boolean; // czy łamać linię po wyświetleniu teminu
    showIcon?: boolean; // czy wyświetlać ikonę
    showLabel?: boolean; // pokażnapis "termin:"
    size?: componentSize;
}

const ProdTerm = (props: IProdTerm) => {
    /*  hr == true -> rysuj linię na koniec 
    breakLine == true -> łamie wiersz po słowie termin (domyślnie true)
    showIcon == true -> zamiast opisu "termin" wyśiwet;a się ikona
*/

    if (HelperClass.isCourseTerm(props.inStore) == false) return <></>;
    let cSize: componentSize = "S";
    if (props.size !== undefined) cSize = props.size;

    return (
        <>
            <span className={cSize}>
                {props.showIcon === true ? (
                    <>
                        <i className="far fa-calendar-alt mr-2"></i>
                    </>
                ) : (
                    props.showLabel === true && <>termin:&nbsp;&nbsp;</>
                )}
                {props.breakLine === true && <br />}

                {props.inStore?.start ? (
                    HelperClass.formatDate(props.inStore.start, props.inStore?.dateFormat)
                ) : (
                    <>{!(props.showIcon === true || props.showLabel == true) && <>termin</>} do ustalenia</>
                )}

                {props.hr && props.inStore?.bookingType === BOOKING_TYPES_CHOICES.BOOKING_TYPE_ONLINE && <hr className="m-0" />}
            </span>
        </>
    );
};

export default ProdTerm;
