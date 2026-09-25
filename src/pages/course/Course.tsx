import CourseCertificate from "./CourseCertificate";
import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { IUrlCourse } from "../../interfaces/IUrl";
import { Suspense, useState } from "react";
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

const CourseView = () => {
    const urlParams = useParams<IUrlCourse>();

    const navigate = useNavigate();
    const [search] = useSearchParams();
    const productId = Number(urlParams.productId) || -1;
    const lessonId = Number(urlParams.lessonId) || -1;
    const compact = search.get("widok") === "lista";
    const activeTab: courseTabType = compact ? "lista_kursow" : productId > 0
        ? search.get("widok") === "certyfikat" ? "certyfikat" : search.get("widok") === "ankieta" ? "ankieta" : search.get("widok") === "spis" ? "spis_tresci" : lessonId > 0 ? "lekcja" : "spis_tresci"
        : "lista_kursow";
    const setLessonId = (value: React.SetStateAction<number>) => {
        const id = typeof value === "function" ? value(lessonId) : value;
        if (id > 0) navigate("/kursy/" + productId + "/" + id);
    };
    const setActiveTab = (value: React.SetStateAction<courseTabType>) => {
        const tab = typeof value === "function" ? value(activeTab) : value;
        if (tab === activeTab && tab !== "lista_kursow") return;
        const coursePath = "/kursy" + (productId > 0 ? "/" + productId : "") + (lessonId > 0 ? "/" + lessonId : "");
        if (tab === "lista_kursow") navigate(coursePath + "?widok=lista");
        else if (tab === "certyfikat") navigate(coursePath + "?widok=certyfikat");
        else if (tab === "ankieta") navigate(coursePath + "?widok=ankieta");
        else if (tab === "spis_tresci") navigate(coursePath + "?widok=spis");
        else if (lessonId > 0) navigate("/kursy/" + productId + "/" + lessonId);
    };
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
                    {activeTab === "lista_kursow" && <CourseList compact={compact} />}
                    {activeTab === "spis_tresci" && <CourseContent />}
                    {activeTab === "lekcja" && <Lesson />}
                    {activeTab === "certyfikat" && <CourseCertificate />}
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

export default function Course() {
    const location = useLocation();
    // Nowy adres oznacza nowy widok i dane, także przy Wstecz/Dalej.
    return <CourseView key={location.pathname + location.search} />;
}
