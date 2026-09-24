import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { ILesson, IUserCourse } from "../interfaces/IUserCourse";

export type courseTabType = "spis_tresci" | "lekcja" | "lista_kursow" | "ankieta";
export type UserCourseContextType = {
    userCourse?: IUserCourse;
    setUserCourse?: Dispatch<SetStateAction<IUserCourse>>;
    isUserCourseRead?: boolean;
    setIsUserCourseRead?: Dispatch<SetStateAction<boolean>>;
    productId: number;
    setProductId?: Dispatch<SetStateAction<number>>;
    lessonId: number;
    setLessonId?: Dispatch<SetStateAction<number>>;

    notification?: String | JSX.Element;
    setNotification?: Dispatch<SetStateAction<String | undefined | JSX.Element>>;

    isCoursesRead?: boolean;
    setIsCoursesRead?: Dispatch<SetStateAction<boolean>>;
    courses?: IUserCourse[];
    setCourses?: Dispatch<SetStateAction<IUserCourse[]>>;

    lessonIdRead: number;
    setLessonIdRead?: Dispatch<SetStateAction<number>>;
    lesson?: ILesson;
    setLesson?: Dispatch<SetStateAction<ILesson>>;

    // isSurveyRead?: boolean;
    // setIsSurveyRead?: Dispatch<SetStateAction<boolean>>;

    activeTab?: courseTabType;
    setActiveTab?: Dispatch<SetStateAction<courseTabType>>;
};

export const UserCourseContext = createContext<UserCourseContextType>({ productId: -1, lessonId: -1, lessonIdRead: -1 });

export const useUserCourseContext = () => useContext(UserCourseContext);
