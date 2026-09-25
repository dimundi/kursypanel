import { CERT_STATUS_CHOICES, GENDER_USER_CHOICES, TEST_TYPE_CHOICES } from "../components/Enumerators";

/* struktura danych certyfikatu API*/
/* CZY TO JEST POTRZENE ? */
// export interface ICerification {
//     productId?: number; // id produktu (kursu) dla którego wystawiono certyfikat
//     link?: string; // link do pliku certyfikatu
//     created?: number; // data utworzenia UNIX - UTC
//     pName?: string; // nazwa kursu
// }

/* certyfikat uzytkownika  */
export interface IUserCert {
    productId?: number; // do jakiego produktu wystawiono ten certyfikat
    fileUrl?: string; // link do pliku certyfikatu
    created?: number; // data utworzenia UNIX - UTC
    cName?: string; // nazwa kursu
    status?: CERT_STATUS_CHOICES;
    userName?: string;
    gender?: GENDER_USER_CHOICES;
    conditions?: ICertCond[]; // warunki uzyskania certyfikatu, które nie zostały jeszcze spełnione
}

/* jakie testy są wymagana do zaliczenia certyfikatu */
export interface ICertCond {
    minOK?: number; // minimalna wartość z testu jaką należy mieć aby zaliczyć
    testId?: number; // id testu
    name?: string; // nazwa testu/ankiety
    type?: TEST_TYPE_CHOICES; // typ testu
}
