import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


import { Notification } from "../../components/Notification";
import { useUserCourseContext } from "../../context/UserCourseContext";
import CourseContainer from "./CourseContainer";
import LessonTabItem from "./LessonTabItem";



export default function CourseContent() {
    const { userCourse, productId, isUserCourseRead } = useUserCourseContext();
    const lessons = userCourse?.course?.lessons || [];
    const navigate = useNavigate();
    const [search] = useSearchParams();
    useEffect(() => {
        if (search.get("widok") !== "start" || !isUserCourseRead) return;
        const target = lessons.find(item => item.lessonId === userCourse?.progress?.lessonId) || lessons[0];
        // Zastąp adres przejściowy, by Wstecz wracało bezpośrednio do listy.
        navigate("/kursy/" + productId + (target?.lessonId ? "/" + target.lessonId : ""), { replace: true });
    }, [isUserCourseRead, userCourse, productId, search, navigate]);
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

            </div>
        </CourseContainer>
    );
}