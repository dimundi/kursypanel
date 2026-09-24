/* lekcja jako element spisu treści */
import HelperClass from "../../classes/HelperClass";
import { useUserCourseContext } from "../../context/UserCourseContext";
import { ILesson } from "../../interfaces/IUserCourse";


export default function LessonTabItem(props:{lesson?:ILesson, index?:number}) {

    const {setLessonId, lessonId, activeTab, setActiveTab} = useUserCourseContext()  
    
    return (
        <>
            <div className="my-3 is-size-4">
            <a onClick={() => {
                        if (setLessonId) {
                            if ((props.lesson?.lessonId !== undefined) && (props.lesson?.lessonId !== lessonId)) 
                                setLessonId(props.lesson?.lessonId);
                            if (activeTab !== 'lekcja') {
                                if (setActiveTab)
                                    setActiveTab('lekcja')
                            }
                        }
                        return false;
                    }}>
                {HelperClass.addUndefined(props.index, 1)}. {props.lesson?.name}</a>

            </div>
        </>
    )
}