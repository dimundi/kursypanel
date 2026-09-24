import { COURSE_TYPES_CHOICES } from "../../components/Enumerators";
import { useUserCourseContext } from "../../context/UserCourseContext";
import { IUserCourse } from "../../interfaces/IUserCourse";
import CourseContainer from "./CourseContainer";
import UserCoursesListElement from "./UserCourseListElement";

const CoursesList = () => {
    const { courses } = useUserCourseContext();

    function sortUserCourses(a: IUserCourse, b: IUserCourse) {
        // if (b.progress?.started === undefined) {
        //     return -1
        // }
        if (a.progress?.updated !== undefined && b.progress?.updated === undefined) {
            return -1;
        }
        if (a.progress?.updated === undefined && b.progress?.updated !== undefined) {
            return 1;
        }
        // if ((a.progress?.started === undefined) && (b.progress?.started === undefined)) {
        //     return 0
        // }
        // if (((a.progress?.started !== undefined) && (b.progress?.started !== undefined)) && (a.progress?.started > b.progress?.started)) {
        //     console.log("A")
        //     return -1
        // }
        if (a.progress?.updated !== undefined && b.progress?.updated !== undefined && a.progress?.updated < b.progress?.updated) {
            //console.log("A")
            return 1;
        }
        // if (a.progress?.started < b.progress?.started) {
        //     console.log("B")
        //     return 1
        // }
        //console.log("C")
        return 0;
    }

    function filterUserCourses(course: IUserCourse) {
        if (course.product?.courseType === COURSE_TYPES_CHOICES.COURSE_TYPE_ECOURSE) return true;
        if (course.product?.courseType === COURSE_TYPES_CHOICES.COURSE_TYPE_WEBINAR) return true;
        return false;
    }

    return (
        <>
            <CourseContainer apIUserCoursesRequired={true} noPadding={true}>
                {/* <CourseContainer apiCoursesRequired={true}> */}
                {/* <UserDataContainer apIUserCoursesRequired={true} waitMsg="Pobieram listę kursów" >           */}
                <>
                    {courses?.length === 0 ? (
                        <div>Nie masz jeszcze kursów.</div>
                    ) : (
                        <>
                            {courses
                                ?.filter(filterUserCourses)
                                .sort(sortUserCourses)
                                .map((course, index) => (
                                    <UserCoursesListElement course={course} key={"usercl_" + index} index={index + 1} />
                                    // <CertListItem key={index} cert={cert} />
                                ))}
                        </>
                    )}
                </>
            </CourseContainer>
        </>
    );
};

export default CoursesList;
