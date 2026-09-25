import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { Notification } from "../../components/Notification";
import { useUserCourseContext } from "../../context/UserCourseContext";
import CourseContainer from "./CourseContainer";
import LessonTabItem from "./LessonTabItem";
import UserCert from "../certificate/UserCert";
import { CERT_STATUS_CHOICES } from "../../components/Enumerators";

export default function CourseContent() {
    const { userCourse } = useUserCourseContext();
    const lessons = userCourse?.course?.lessons || [];
    return (
        <CourseContainer apiCoursesRequired={true} noPadding={true}>
            <div className="course-overview">
                <section className="course-lessons" aria-labelledby="course-lessons-title">
                    <div className="course-section-heading">
                        <h2 id="course-lessons-title">Lekcje kursu</h2>
                        <span className="course-lesson-count">{lessons.length}</span>
                    </div>
                    <p className="course-section-hint">Wybierz lekcję, aby rozpocząć naukę.</p>
                    {lessons.length === 0 ? (
                        <Notification type="danger">Ten kurs nie ma jeszcze lekcji. Skontaktuj się z naszym biurem.</Notification>
                    ) : (
                        <ol className="course-lesson-list">
                            {lessons.map((lesson, index) => (
                                <li key={lesson.lessonId ?? index}><LessonTabItem lesson={lesson} index={index} /></li>
                            ))}
                        </ol>
                    )}
                </section>
                {userCourse?.cert && userCourse.cert.status !== CERT_STATUS_CHOICES.CERT_STATUS_NOT_AVAILABLE && (
                    <section className="course-certificate" aria-labelledby="course-certificate-title">
                        <span className="course-certificate-icon" aria-hidden="true"><FontAwesomeIcon icon={faCertificate} /></span>
                        <h2 id="course-certificate-title">Twój certyfikat</h2>
                        <UserCert cert={userCourse.cert} />
                    </section>
                )}
            </div>
        </CourseContainer>
    );
}