/* lekcja kursu */
import { useUserCourseContext } from "../../context/UserCourseContext";
import CourseContainer from "./CourseContainer";
import { Notification } from "../../components/Notification";
import LessonBlockItem from "./LessonBlockItem";
import HelperClass from "../../classes/HelperClass";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Lesson() {
    const { setLessonId, lesson } = useUserCourseContext();

    // console.log(lesson?.blocks)

    return (
        <>
            <CourseContainer apiLessonRequired={true}>
                {lesson?.blocks?.length === 0 ? (
                    <Notification type="danger">
                        Wygląda na to, że ta lekcja nie ma zawartości.
                        <br />
                        Proszę skontaktuj się z naszym biurem.
                    </Notification>
                ) : (
                    <>
                        {lesson?.blocks?.map((block, index) => (
                            <>
                                <LessonBlockItem block={block} key={"block_" + index} />
                            </>
                        ))}

                        {lesson?.prevId !== undefined && lesson?.prevId > 0 && (
                            <>
                                <a
                                    className="mr-6"
                                    onClick={() => {
                                        if (setLessonId) {
                                            setLessonId(HelperClass.getUndefinedNumber(lesson?.prevId, -1));
                                        }
                                        return false;
                                    }}
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} /> poprzednia lekcja
                                </a>
                            </>
                        )}

                        {lesson?.nextId !== undefined && lesson?.nextId > 0 && (
                            <>
                                <a
                                    onClick={() => {
                                        if (setLessonId) {
                                            // console.log(lesson?.nextId)
                                            setLessonId(HelperClass.getUndefinedNumber(lesson?.nextId, -1));
                                        }
                                        return false;
                                    }}
                                >
                                    następna lekcja <FontAwesomeIcon icon={faArrowRight} />
                                </a>
                            </>
                        )}
                    </>
                )}
            </CourseContainer>
        </>
    );
}
