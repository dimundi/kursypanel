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

    /* -------------------------------------------
     *   obsługa zapytań
     * ------------------------------------------- */
    const err_callback = (result: any) => {
        if (setNotification) setNotification(RequestClass.errorAlert(result));
        setStep(3);
    };

    useEffect(() => {
        /* -------------------------------------------
         *   zapytanie o konkretny kurs
         * ------------------------------------------- */
        if (props.apiCoursesRequired === true) {
            const succ_callback = (result: any) => {
                if (setUserCourse) {
                    setUserCourse(result.courses);
                }
                if (setIsUserCourseRead) {
                    setIsUserCourseRead(true);
                }
                setStep(2);
            };

            if (productId > 0 && (isUserCourseRead === false || (productId > 0 && productId !== userCourse?.product?.productId))) {
                RequestClass.makeRequest("course/" + productId + "/", null, succ_callback, err_callback);
            } else {
                setStep(2);
            }
        } else if (props.apiLessonRequired === true) {
            /* -------------------------------------------
             *   zapytanie o konkretną lekcję
             * ------------------------------------------- */
            const succ_callback = (result: any) => {
                let lessonIdRead = parseInt(result.lesson.lessonId);
                if (setLesson && setLessonIdRead && lessonIdRead > 0) {
                    userCourse?.course?.lessons?.forEach((lesson, index) => {
                        if (lesson.lessonId === lessonIdRead) {
                            setLesson(result.lesson);
                            setLessonIdRead(lessonIdRead);
                        }
                    });
                }
                setStep(2);
            };

            // console.log(lessonIdRead)
            // console.log(lessonId)
            if (lessonIdRead <= 0 || lessonId !== lessonIdRead) {
                RequestClass.makeRequest("course/" + productId + "/lesson/" + lessonId + "/", null, succ_callback, err_callback);
            } else setStep(2);
        } else {
            /* -------------------------------------------
             *   zapytanie o wszystkie kursy
             * ------------------------------------------- */
            if (props.apIUserCoursesRequired === true) {
                const succ_callback = (result: any) => {
                    if (setCourses) {
                        setCourses(result.courses);
                    }
                    if (setIsCoursesRead) {
                        setIsCoursesRead(true);
                    }
                    setStep(2);
                };

                if (isCoursesRead === false) {
                    RequestClass.makeRequest("usr/courses/", null, succ_callback, err_callback);
                } else setStep(2);
            } else {
                setStep(2);
            }
        }
    }, [step, lessonId]);

    useEffect(() => {
        /* zmiany w momencie przełączania tabów  */
        if (setNotification) {
            setNotification("");
        }
    }, [activeTab]);

    let title = "Twoje kursy";
    let subtitle = "Wybierz kurs, który chcesz uruchomić.";
    if (activeTab === "spis_tresci") {
        subtitle = "Wybierz lekcję tego kursu";
    } else if (activeTab === "lekcja") {
        subtitle = "";
    } else if (activeTab === "ankieta") {
        subtitle = "Wypełnij ankietę";
    }

    if (productId > 0 && activeTab !== "lista_kursow") {
        // subtitle="Realizujesz kurs"
        if (userCourse?.product?.pName) title = userCourse?.product?.pName;
    }
    return (
        <>
            {/* productId: {productId}, lekcja: {lessonId} */}
            <PageTitle>
                {/* <nav
                    className="breadcrumb mb-1 is-size-7-mobile is-size-3"
                    aria-label="breadcrumbs"
                > */}
                <ul>
                    <li className="is-active is-size-6-mobile is-size-4">
                        <a href="#" className="has-text-white">
                            {title}
                        </a>
                    </li>
                </ul>
                {/* </nav> */}
                <div className="is-size-7-mobile is-size-6 ">{subtitle}</div>
            </PageTitle>

            <BodyContainer noPadding={true} className="mb-2">
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
            </BodyContainer>
            <BodyContainer noPadding={props.noPadding} className="mb-5">
                {step === 1 && <Wait text="pobieranie treści kursu" />}
                {step === 2 && <>{props.children}</>}
                {notification}
            </BodyContainer>
        </>
    );
}
