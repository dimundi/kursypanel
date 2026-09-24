import { useParams } from "react-router-dom";
import { IUrlCourse } from "../../interfaces/IUrl";
import { Suspense, useEffect, useState } from "react";
import { ILesson, IUserCourse } from "../../interfaces/IUserCourse";
// import RequestClass from "../../classes/RequestClass";
// import CourseContainer from "./CourseContainer";
import { UserCourseContext, courseTabType } from "../../context/UserCourseContext";
import CourseContent from "./CourseContent";
import Lesson from "./Lesson";
import CourseList from "./CourseList";
import Survey from "../test/Survey";
import CourseContainer from "./CourseContainer";
import { TEST_TYPE_CHOICES } from "../../components/Enumerators";
import { ISurveyCert } from "../../interfaces/ITest";

const Course = () => {
    const urlParams = useParams<IUrlCourse>();

    const [productId, setProductId] = useState(urlParams.productId ? parseInt(urlParams.productId) : -1);
    const [lessonId, setLessonId] = useState(urlParams.lessonId ? parseInt(urlParams.lessonId) : -1);

    useEffect(() => {
        if (urlParams.productId && parseInt(urlParams.productId) !== productId) {
            setProductId(parseInt(urlParams.productId));
        }
    }, [urlParams]);

    const [activeTab, setActiveTab] = useState<courseTabType>(() => {
        if (productId > 0) {
            /* jest konkretny produt Id */
            if (lessonId > 0) {
                /* jest konkretna lekcja */
                return "lekcja";
            } else {
                return "spis_tresci";
            }
        }
        return "lista_kursow";
    });

    // wszystkie kursy - skrótowo
    const [courses, setCourses] = useState<IUserCourse[]>([] as IUserCourse[]);
    const [isCoursesRead, setIsCoursesRead] = useState(false);

    // aktualny kurs - szczegółowo
    const [userCourse, setUserCourse] = useState<IUserCourse>({});
    const [isUserCourseRead, setIsUserCourseRead] = useState(false);

    // aktualna lekcja - szczegółowo
    const [lessonIdRead, setLessonIdRead] = useState(-1);
    const [lesson, setLesson] = useState<ILesson>({});

    const [notification, setNotification] = useState<JSX.Element | String>();

    function getSurveyCert() {
        let surveyCert: ISurveyCert = {};

        userCourse?.cert?.conditions?.forEach((cond) => {
            if (surveyCert.test && surveyCert.test.testId) return;
            if (cond.type === TEST_TYPE_CHOICES.TEST_TYPE_SURVEY) {
                if (cond.testId) {
                    if (!surveyCert.test) {
                        surveyCert.test = {};
                    }
                    surveyCert.test.testId = cond.testId;
                    if (!surveyCert.inStore) {
                        surveyCert.inStore = {};
                    }
                    surveyCert.inStore.productId = productId;
                }
            }
        });
        return surveyCert;
    }

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <UserCourseContext.Provider
                    value={{
                        activeTab,
                        setActiveTab,
                        lessonId,
                        setLessonId,
                        productId,
                        setProductId,
                        notification,
                        setNotification,
                        userCourse,
                        setUserCourse,
                        isUserCourseRead,
                        setIsUserCourseRead,
                        courses,
                        setCourses,
                        isCoursesRead,
                        setIsCoursesRead,
                        lessonIdRead,
                        setLessonIdRead,
                        lesson,
                        setLesson,
                        // isSurveyRead,
                        // setIsSurveyRead,
                    }}
                >
                    {activeTab === "lista_kursow" && <CourseList />}
                    {activeTab === "spis_tresci" && <CourseContent />}
                    {activeTab === "lekcja" && <Lesson />}
                    {activeTab === "ankieta" && (
                        <CourseContainer apiCoursesRequired={true}>
                            <Survey surveyCert={getSurveyCert()} />
                            {/* <Survey testId={getSurveyId()} productId={userCourse.cert?.productId} surveyType="online" /> */}
                        </CourseContainer>
                    )}
                </UserCourseContext.Provider>
            </Suspense>
        </>
    );
};

export default Course;
