import { COURSE_BLOCK_CHOICES, COURSE_PROGRESS_CHOICES, ORDER_STATUS_CHOICES, PAYMENT_SYS_CHOICES } from "../components/Enumerators";
import { IUserCert } from "./ICertification";
import { IInStore, IProdDef } from "./IProducts";
import ITest from "./ITest";

/* bloki lekcji */
export interface ILessonBlock {
    blockId?: number;
    type?: COURSE_BLOCK_CHOICES;
    html?: string;
    test?: ITest;
}

/* szczegóły lekcji */
export interface ILesson {
    lessonId?: number;
    name?: string; // tytuł lekcji
    prevId?: number; // id poprzedniej lekcji
    nextId?: number; // id następnej lekcji
    blocks?: ILessonBlock[]; // bloki lekcji
}

/* szczegóły kursu */
export interface ICourseDetails {
    prodDefId?: number;
    lessons?: ILesson[];
}

/* szczegóły postępu */
export interface ICourseProgress {
    status?: COURSE_PROGRESS_CHOICES;
    lessonId?: number; // ostatnio otwarta lekcja
    started?: number; // data rozpoczęcia kursu
    updated?: number; // data ostatniej aktywności użytkownikas
}

/* struktura danych kursów użytkownika API*/
export interface IUserCourse {
    product?: IInStore; //informacje o produkcie - KURSIE
    prodDef?: IProdDef; //definicja produktu
    validTo?: number; //data dostępności kursu dla klienta (jeżeli dotyczy) UnixTime (UTC)
    progress?: ICourseProgress; //stan wykonania kursu przez uzytkownika
    course?: ICourseDetails; //szczegóły kursu (podział na lekcje)
    cert?: IUserCert; //informacje o certyfikacie
    orderId?: number;
    // date?: string; // data złożenia zamównienia
    status?: ORDER_STATUS_CHOICES; // status zamówienia
    paymentSys?: PAYMENT_SYS_CHOICES; // sposób płatności
}
