import { useSearchParams } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { useUserCourseContext } from "../../context/UserCourseContext";
import RequestClass from "../../classes/RequestClass";
import Wait from "../../components/elements/Wait";
import PageTitle from "../../components/layout/PageTitle";
import BodyContainer from "../../components/layout/BodyContainer";

export default function CourseContainer(props: {
    apiCoursesRequired?: boolean;
    apIUserCoursesRequired?: boolean;
    apiLessonRequired?: boolean;
    children: ReactNode;
    noPadding?: boolean /* czy kontener ma mieć boczny padding */;
}) {
    const {
        notification,
        setNotification,
        activeTab,
        setActiveTab,
        productId,
        lessonId,
        isUserCourseRead,
        setIsUserCourseRead,
        setCourses,
        setIsCoursesRead,
        isCoursesRead,
        userCourse,
        setUserCourse,
        lessonIdRead,
        setLessonIdRead,
        setLesson,
    } = useUserCourseContext();

    const [step, setStep] = useState(1);
    const [search] = useSearchParams();

    /* -------------------------------------------
     *   obsługa zapytań
     * ------------------------------------------- */
    const err_callback = (result: any) => {
        if (setNotification) setNotification(RequestClass.errorAlert(result));
        setStep(3);
    };

    useEffect(() => {
        let current = true;
        setStep(1);
        const fail = (result: any) => { if (current) err_callback(result); };
        const requestLesson = () => {
            RequestClass.readShared("course/" + productId + "/lesson/" + lessonId + "/", (result: any) => {
                if (!current) return;
                setLesson?.(result.lesson);
                setLessonIdRead?.(Number(result.lesson.lessonId));
                setStep(2);
            }, fail);
        };
        if (props.apiCoursesRequired || props.apiLessonRequired) {
            if (isUserCourseRead && userCourse?.product?.productId === productId) {
                if (props.apiLessonRequired) requestLesson();
                else setStep(2);
            } else {
                RequestClass.readShared("course/" + productId + "/", (result: any) => {
                    if (!current) return;
                    setUserCourse?.(result.courses);
                    setIsUserCourseRead?.(true);
                    // Kolejny efekt pobierze lekcję po zmianie isUserCourseRead.
                    if (!props.apiLessonRequired) setStep(2);
                }, fail);
            }
        } else if (props.apIUserCoursesRequired && !isCoursesRead) {
            RequestClass.readShared("usr/courses/", (result: any) => {
                if (!current) return;
                setCourses?.(result.courses);
                setIsCoursesRead?.(true);
                setStep(2);
            }, fail);
        } else setStep(2);
        return () => { current = false; };
    }, [productId, lessonId, props.apiCoursesRequired, props.apiLessonRequired, props.apIUserCoursesRequired, isUserCourseRead]);
    useEffect(() => {
        /* zmiany w momencie przełączania tabów  */
        if (setNotification) {
            setNotification("");
        }
    }, [activeTab]);

    let title = search.get("widok") === "lista" ? "Lista kursów" : "Moje kursy";
    if (productId > 0 && activeTab !== "lista_kursow") {
        // subtitle="Realizujesz kurs"
        if (userCourse?.product?.pName) title = userCourse?.product?.pName;
    }
    return (
        <>
            {/* productId: {productId}, lekcja: {lessonId} */}
            <PageTitle><h1>{title}</h1></PageTitle>

            {(activeTab !== "lista_kursow" || search.get("widok") === "lista") && <BodyContainer noPadding={true} className="mb-2">
                <div className="tabs">
                    <ul>
                        {/* <li className={activeTab==="kursy" ? "is-active":""}><a onClick={() => {setActiveTab("kursy")}}>Twoje kursy</a></li> */}
                        <li className={activeTab === "lista_kursow" ? "is-active" : ""}>
                            <a
                                onClick={() => {
                                    if (setActiveTab) setActiveTab("lista_kursow");
                                }}
                            >
                                Lista kursów
                            </a>
                        </li>
                        {productId > 0 && (
                            <li className={activeTab === "spis_tresci" ? "is-active" : ""}>
                                <a
                                    onClick={() => {
                                        if (setActiveTab) setActiveTab("spis_tresci");
                                    }}
                                >
                                    Spis treści
                                </a>
                            </li>
                        )}
                        {lessonId > 0 && (
                            <li className={activeTab === "lekcja" ? "is-active" : ""}>
                                <a
                                    onClick={() => {
                                        if (setActiveTab) setActiveTab("lekcja");
                                    }}
                                >
                                    Lekcja
                                </a>
                            </li>
                        )}
                        {productId > 0 && (
                            <li className={activeTab === "certyfikat" ? "is-active" : ""}>
                                <a onClick={() => setActiveTab?.("certyfikat")}>Certyfikat</a>
                            </li>
                        )}
                        {activeTab === "ankieta" && (
                            <li className="is-active">
                                <a
                                    onClick={() => {
                                        if (setActiveTab) setActiveTab("ankieta");
                                    }}
                                >
                                    Ankieta
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </BodyContainer>}
            <BodyContainer noPadding={props.noPadding} className="mb-5">
                {step === 1 && <Wait text="pobieranie treści kursu" />}
                {step === 2 && <>{props.children}</>}
                {notification}
            </BodyContainer>
        </>
    );
}
