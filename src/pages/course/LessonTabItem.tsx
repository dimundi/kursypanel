import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useUserCourseContext } from "../../context/UserCourseContext";
import { ILesson } from "../../interfaces/IUserCourse";

export default function LessonTabItem(props: { lesson?: ILesson; index?: number }) {
    const { setLessonId, setActiveTab } = useUserCourseContext();
    return (
        <button type="button" className="course-lesson-button" disabled={props.lesson?.lessonId === undefined}
            onClick={() => {
                if (props.lesson?.lessonId === undefined) return;
                setLessonId?.(props.lesson.lessonId);

            }}>
            <span className="course-lesson-number" aria-hidden="true">{String((props.index ?? 0) + 1).padStart(2, "0")}</span>
            <span className="course-lesson-name">{props.lesson?.name}</span>
            <span className="course-lesson-open" aria-hidden="true"><FontAwesomeIcon icon={faArrowRight} /></span>
        </button>
    );
}