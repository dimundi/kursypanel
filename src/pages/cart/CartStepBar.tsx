import { isMobile } from "react-device-detect"

/* --------------------------------------------------------
 *  Pasek informujący o etapie zamówienia w koszyku
 * -------------------------------------------------------- */
export const CartStepBar = (props: {activeStepId: number, }) => {


    if (isMobile) {
        let stepText=""
        switch (props.activeStepId) {
            case 1:
                stepText = "Produkty w koszyku"
                break;
            case 2:
                stepText = "Dane do zamówienia"
                break;
            case 3:
                stepText = "Posumowanie i płatność"
                break;
        }
        return (
            <>
                <div className="webi-steps-wrap is-flex is-justify-content-space-between px-5 mx-4 my-2">
                    <span className="is-size-6">Krok: {props.activeStepId}</span><span className="is-size-6">{stepText}</span>
                </div>
            </>
        )
    }
    /* --------------------------------------------------------
    *  is desktop
    * -------------------------------------------------------- */
    return (
        
        <>
            <div className="webi-steps-wrap is-flex is-justify-content-space-between px-5 mx-4 my-6">
            <div className="step">
                <span id="step-1" className={'webi-circle' + ((props.activeStepId===1) ? ' active' : "")}>1</span> Twoje produkty    </div>
            <div className="step">
                <span id="step-2" className={'webi-circle' + ((props.activeStepId===2) ? ' active' : "")}>2</span> Dane zamawiającego    </div>
            <div className="step">
                <span id="step-3" className={'webi-circle' + ((props.activeStepId===3) ? ' active' : "")}>3</span> Podsumowanie i płatność    </div>
            </div>
        </>
        
    )
}