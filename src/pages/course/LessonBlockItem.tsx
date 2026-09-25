/* lekcja kursu */
import { ILessonBlock } from "../../interfaces/IUserCourse";
import HTMLCode from "../../components/elements/HTMLCode";
import { COURSE_BLOCK_CHOICES } from "../../components/Enumerators";

export default function LessonBlockItem(props: { block?: ILessonBlock }) {
    // const { lessonId, lesson } = useUserCourseContext()

    /* wymuszam numerowanie pytań */

    if (Number(props.block?.type) === COURSE_BLOCK_CHOICES.COURSE_BLOCK_HTML) {
        return <HTMLCode className="course-lesson-html">{props.block?.html || props.block?.txt}</HTMLCode>;
    }
    // if (props.block?.type === COURSE_BLOCK_CHOICES.COURSE_BLOCK_TEST) {
    //     let surveyCert: ISurveyCert = {};
    //     surveyCert.test = {};
    //     surveyCert.inStore = {};
    //     surveyCert.test.testId = props.block?.test;
    //     surveyCert.inStore.productId = props.block.
    //     Survey surveyCert={getSurveyCert()} />
    //     return <TestBlock surveyCert={props.block?.test} surveyType="online" />;
    // }
    return <></>;
}
