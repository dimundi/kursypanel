/* spis treści kursu */
import { Notification } from "../../components/Notification";
import { useUserCourseContext } from "../../context/UserCourseContext";
import CourseContainer from "./CourseContainer";
import LessonTabItem from "./LessonTabItem";
import UserCert from "../certificate/UserCert";
import { Debug } from "../../components/elements/Debug";
import { CERT_STATUS_CHOICES } from "../../components/Enumerators";

export default function CourseContent() {
    const { userCourse } = useUserCourseContext();

    return (
        <>
            <CourseContainer apiCoursesRequired={true}>
                <div className="mt-4 is-size-5">Kurs składa się z następujących lekcji:</div>
                <div className="mt-0 is-size-6">kliknij na wybraną lekcję, aby rozpocząć kurs</div>

                {userCourse?.course?.lessons?.length === 0 ? (
                    <Notification type="danger">Ups. Wygląda na to, że ten kurs nie ma lekcji. Proszę skontaktuj się z naszym biurem.</Notification>
                ) : (
                    <>
                        {userCourse?.course?.lessons?.map((lesson, index) => (
                            <LessonTabItem lesson={lesson} key={"less_" + index} index={index} />
                        ))}
                    </>
                )}

                {userCourse?.cert?.status !== CERT_STATUS_CHOICES.CERT_STATUS_NOT_AVAILABLE && (
                    <>
                        <hr />
                        <div className="is-size-5 mb-3">Certyfikat</div>
                        <UserCert cert={userCourse?.cert} />
                    </>
                )}

                <Debug>
                    <div className="is-size-7">id produktu: {userCourse?.product?.productId}</div>
                    <div className="is-size-7">id kursu: {userCourse?.prodDef?.prodDefId}</div>
                </Debug>
            </CourseContainer>
        </>
    );
}
