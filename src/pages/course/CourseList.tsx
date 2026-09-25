import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import HelperClass from "../../classes/HelperClass";
import { COURSE_TYPES_CHOICES } from "../../components/Enumerators";
import { useUserCourseContext } from "../../context/UserCourseContext";
import { IUserCourse } from "../../interfaces/IUserCourse";
import CourseContainer from "./CourseContainer";
import UserCoursesListElement from "./UserCourseListElement";

const CoursesList = ({ compact = false }: { compact?: boolean }) => {
    const { courses, productId, lessonId } = useUserCourseContext();

    function sortUserCourses(a: IUserCourse, b: IUserCourse) {
        // Ta sama ocena dostępności co w przycisku uruchamiania kursu.
        const activeFirst = Number(HelperClass.courseIsValid(b)) - Number(HelperClass.courseIsValid(a));
        if (activeFirst !== 0) return activeFirst;

        // W obrębie grupy najpierw ostatnio używane kursy.
        return (b.progress?.updated ?? 0) - (a.progress?.updated ?? 0);
    }
    function filterUserCourses(course: IUserCourse) {
        if (course.product?.courseType === COURSE_TYPES_CHOICES.COURSE_TYPE_ECOURSE) return true;
        if (course.product?.courseType === COURSE_TYPES_CHOICES.COURSE_TYPE_WEBINAR) return true;
        return false;
    }

    const visibleCourses = courses?.filter(filterUserCourses).filter(course => !compact || HelperClass.courseIsValid(course)).sort(sortUserCourses) || [];
    return (
        <>
            <CourseContainer apIUserCoursesRequired={true} noPadding={true}>
                {/* <CourseContainer apiCoursesRequired={true}> */}
                {/* <UserDataContainer apIUserCoursesRequired={true} waitMsg="Pobieram listę kursów" >           */}
                <>
                    {visibleCourses.length === 0 ? (
                        <div>{compact ? "Nie masz aktywnych kursów." : "Nie masz jeszcze kursów."}</div>
                    ) : (
                        <div className={compact ? "course-compact-list" : "course-card-grid"}>
                            {visibleCourses
                                .map((course, index) => (
                                                                        compact ? (
                                        <Link
                                            className={"course-compact-row" + (course.product?.productId === productId ? " is-current" : "")}
                                            key={course.product?.productId ?? index}
                                            aria-current={course.product?.productId === productId ? "true" : undefined}
                                            to={"/kursy/" + course.product?.productId + (course.product?.productId === productId && lessonId > 0 ? "/" + lessonId + "?widok=spis" : "")}>
                                            <span className="course-lesson-number">{String(index + 1).padStart(2, "0")}</span>
                                            <span className="course-compact-name">
                                                <span>{course.product?.pName || course.prodDef?.name || "Szkolenie"}</span>
                                                <small>{course.product?.productId === productId ? "Aktualnie otwarty kurs" : "Aktywny"}</small>
                                            </span>
                                            <span className="course-lesson-open" aria-hidden="true"><FontAwesomeIcon icon={faArrowRight} /></span>
                                        </Link>                                    ) : <UserCoursesListElement course={course} key={"usercl_" + index} index={index + 1} />
                                    // <CertListItem key={index} cert={cert} />
                                ))}
                        </div>
                    )}
                </>
            </CourseContainer>
        </>
    );
};

export default CoursesList;
