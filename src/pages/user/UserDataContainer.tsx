import { ReactNode, useContext, useEffect, useState } from "react";
import RequestClass from "../../classes/RequestClass";
import Wait from "../../components/elements/Wait";
import { useUserAccountContext } from "../../context/UserAccountContext";
import { UserContext } from "../../context/UserContext";

/* apiOrderRequired - czy wymagane jest wyslanie zapytania o Order */
export default function UserDataContainer(props: {
    apiUserRequired?: boolean;
    apiOrderRequired?: boolean;
    apiCertRequired?: boolean;
    apIUserCoursesRequired?: boolean;
    children: ReactNode;
    waitMsg?: string;
}) {
    const [step, setStep] = useState(1);
    const {
        activeTab,
        notification,
        setNotification,
        isOrdersRead,
        setIsOrdersRead,
        setOrders,
        isUserDataRead,
        setIsUserDataRead,
        setUserData,
        setCerts,
        isCertDataRead,
        setIsCertDataRead,
        //setCourses, isCoursesRead, setIsCoursesRead
    } = useUserAccountContext();

    // activeTab, notification, setNotification, setOrders, isOrdersRead, setIsOrdersRead, setUserData, isUserDataRead, setIsUserDataRead} = useUserAccountContext()
    /* jak coś nie tak to wylogowujemy się ! */
    const { setIsLogged } = useContext(UserContext);

    const err_callback = (result: any) => {
        if (setNotification) setNotification(RequestClass.errorAlert(result));
        setStep(0);
        if (RequestClass.logoutOnError(result)) {
            setIsLogged(false);
        }
    };

    /* ----------------------------------------------------------------- */
    useEffect(() => {
        if (step === 1) {
            if (props.apiOrderRequired === true) {
                /* wysyłam zapytanie o listę zamówień */
                const succ_callback = (result: any) => {
                    if (setOrders) {
                        setOrders(result.orders);
                    }
                    if (setIsOrdersRead) {
                        setIsOrdersRead(true);
                    }

                    setStep(2);
                };

                if (isOrdersRead === false) {
                    RequestClass.makeRequest("order/", null, succ_callback, err_callback);
                } else {
                    setStep(2);
                }
            } else if (props.apiUserRequired === true) {
                /* wysyłam zapytanie o dane użytwkonika */
                const succ_callback = (result: any) => {
                    if (setUserData) {
                        setUserData(result);
                    }
                    if (setIsUserDataRead) {
                        setIsUserDataRead(true);
                    }

                    setStep(2);
                };
                if (isUserDataRead === false) {
                    RequestClass.makeRequest("usr/", null, succ_callback, err_callback);
                } else setStep(2);
            } else if (props.apiCertRequired === true) {
                const succ_callback = (result: any) => {
                    if (setCerts) {
                        setCerts(result.certs);
                    }
                    if (setIsCertDataRead) {
                        setIsCertDataRead(true);
                    }
                    setStep(2);
                };

                if (isCertDataRead === false) {
                    RequestClass.makeRequest("usr/certs/", null, succ_callback, err_callback);
                } else setStep(2);
            } else {
                setStep(2);
            }
            // else
            // if (props.apIUserCoursesRequired === true) {
            //     const succ_callback = (result:any) => {
            //         if (setCourses) {
            //             setCourses(result.courses)
            //         }
            //         if (setIsCoursesRead) {
            //             setIsCoursesRead(true)
            //         }
            //         setStep(2)
            //     }

            //     if (isCoursesRead === false) {
            //         RequestClass.makeRequest("usr/courses/", null, succ_callback, err_callback)
            //     } else
            //         setStep(2)

            //     } else {
            //     setStep(2)
            // }
        }
    }, [step]);

    useEffect(() => {
        if (step === 2) {
            if (props.apiUserRequired === true && isUserDataRead === false) {
                // zmieniliśmy dane i odczytujemy ponownie po zapisie
                setStep(1);
            }
        }
    }, [isUserDataRead]);

    useEffect(() => {
        /* zmiany w momencie przełączania tabów  */
        if (setNotification) {
            setNotification("");
        }
    }, [activeTab]);

    return (
        <>
            <div>
                {step === 1 && <Wait text={props.waitMsg} />}
                {step === 2 && <>{props.children}</>}
                {notification}
            </div>
        </>
    );
}
