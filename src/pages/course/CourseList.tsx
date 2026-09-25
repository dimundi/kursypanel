import HelperClass from "../../classes/HelperClass";
import { COURSE_TYPES_CHOICES } from "../../components/Enumerators";
import { useUserCourseContext } from "../../context/UserCourseContext";
import { IUserCourse } from "../../interfaces/IUserCourse";
import CourseContainer from "./CourseContainer";
import UserCoursesListElement from "./UserCourseListElement";

const CoursesList = () => {
    const { courses } = useUserCourseContext();

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

    const visibleCourses = courses?.filter(filterUserCourses).sort(sortUserCourses) || [];
    return (
        <>
            <CourseContainer apIUserCoursesRequired={true} noPadding={true}>
                {/* <CourseContainer apiCoursesRequired={true}> */}
                {/* <UserDataContainer apIUserCoursesRequired={true} waitMsg="Pobieram listę kursów" >           */}
                <>
                    {visibleCourses.length === 0 ? (
                        <div>Nie masz jeszcze kursów.</div>
                    ) : (
                        <div className="course-card-grid">
                            {visibleCourses
                                .map((course, index) => (
                                    <UserCoursesListElement course={course} key={"usercl_" + index} index={index + 1} />
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
