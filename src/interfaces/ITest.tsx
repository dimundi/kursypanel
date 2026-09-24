/* testy i ankiety */

import { GENDER_USER_CHOICES, TEST_PROGRESS_CHOICES, TEST_Q_TYPE_CHOICES, TEST_TYPE_CHOICES } from "../components/Enumerators";
import { IInStore } from "./IProducts";

export interface ITestA {
    testAId?: number;
    txt?: string; // treść odpowiedzi jako HTML
}

export interface ITestQ {
    testQId: number;
    qType?: TEST_Q_TYPE_CHOICES; // typ pytania
    txt?: string; // treść pytania jao HTML
    a?: ITestA[]; // lista potencjalnych odpowiedzi
}

export default interface ITest {
    testId?: number;
    productId?: number; // id produktu do którego podpięty ten test
    name?: string; // nazwa testu
    type?: TEST_TYPE_CHOICES; // typ testu
    txt?: string; // opis kursu w HTML
    q?: ITestQ[]; // lista pytań testu

    /* PROGRES UŻYTKOWNIKA PONIŻEJ */
    status?: TEST_PROGRESS_CHOICES; // status testu
    restartIn?: number; // kiedy można zrestartować test (Wykonać ponownie)
    aok?: number; // ilość opodowiedzi poprawnych
    anok?: number; // ilość odpowiedzi będnych
    result?: number; // rezultat w procentach
}

/* 
 online - ankieta wykonywana do kursu, który był realizowany online
 offline - ankieta wykonywana na podstawie linku /ankieta -> zwykle dla kursów offline i kończy się wygenerowaniem i wysłaniem mailem certyfikatu
 */
//export type surveyType = "online" | "offline";

/* struktura danych do generowania certyfikatów po wypełnieniu ankiety */
export interface ISurveyCert {
    inStore?: IInStore; // produkt, który jest ankietowany
    test?: ITest; // ankieta
    masked_email?: string; // zamaskowany adres email
    access_token?: string; // token umożliwiający zalogowanie się, jeżeli klient nie ma konta
    fname?: string; // imię, jakie ma się znaleźć na certyfikacie
    lname?: string; // nazwisko, jakie ma się znaleźć na certyfikacie
    gender?: GENDER_USER_CHOICES; // płęć / forma grzecznościowa
    //surveyType: surveyType; // typ ankiety
}
