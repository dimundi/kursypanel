import { useEffect, useState } from "react";
import RequestClass from "../../classes/RequestClass";
import Wait from "../../components/elements/Wait";
import { IDescr } from "../../interfaces/IDescr";
import HTMLCode from "../../components/elements/HTMLCode";
import { IInStore } from "../../interfaces/IProducts";
import {
    BLOCK_TYPES_CHOICES,
    COURSE_TYPES_CHOICES,
} from "../../components/Enumerators";

/*  productId -> te właściwości pobieramy
    getProductId -> pobież dane tylko wtedy gdy productId == getProductId */
const ProdDetail = (props: { inStore?: IInStore; getProductId?: number }) => {
    const [notification, setNotification] = useState<JSX.Element | String>();
    const [step, setStep] = useState(0);
    const [descr, setDescr] = useState<IDescr[]>([] as IDescr[]);

    const err_callback = (result: any) => {
        if (setNotification) setNotification(RequestClass.errorAlert(result));
        setStep(0);
    };
    const succ_callback = (result: any) => {
        // console.log(result.desc)
        setDescr(result.desc);
        setStep(2);
    };

    /* wysyłam zapytanie o szczegółowe informacje o produkcie */
    useEffect(() => {
        if (
            props.getProductId &&
            Math.abs(props.getProductId) === props.inStore?.productId
        ) {
            RequestClass.makeRequest(
                "prod/" + props.inStore?.productId + "/desc/",
                null,
                succ_callback,
                err_callback
            );
            setStep(1);
        }
    }, [props.getProductId]);

    return (
        <>
            {/* {props.productId} - {props.getProductId} */}
            {step === 1 && <Wait text="Pobieram szczegółowe informacje" />}
            {step === 2 && (
                <>
                    {descr
                        .filter((desc) => {
                            if (
                                props.inStore?.courseType ===
                                    COURSE_TYPES_CHOICES.COURSE_TYPE_WEBINAR &&
                                desc.type !==
                                    BLOCK_TYPES_CHOICES.BLOCK_TYPE_SHOP_PROD_DESC_WEBINAR
                            ) {
                                // console.log("ERR1")
                                return false;
                            } else if (
                                props.inStore?.courseType ===
                                    COURSE_TYPES_CHOICES.COURSE_TYPE_ECOURSE &&
                                desc.type !==
                                    BLOCK_TYPES_CHOICES.BLOCK_TYPE_SHOP_PROD_DESC_ECOURSE
                            ) {
                                // console.log("ERR2")
                                return false;
                            } else if (
                                props.inStore?.courseType ===
                                    COURSE_TYPES_CHOICES.COURSE_TYPE_STATIONARY &&
                                desc.type !==
                                    BLOCK_TYPES_CHOICES.BLOCK_TYPE_SHOP_PROD_DESC_STATIONARY
                            ) {
                                // console.log("ERR3")
                                return false;
                            }
                            return true;
                        })
                        .map((desc, index) => (
                            <>
                                <HTMLCode>{desc.txt}</HTMLCode>
                            </>
                        ))}
                </>
            )}
            {notification}
        </>
    );
};

export default ProdDetail;
