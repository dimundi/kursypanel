/* kilka stałych */
export const ADRES_0_BIURO = "Educo sp. z o.o.";
export const ADRES_1_BIURO = "ul. Heweliusza 11/819";
export const ADRES_2_BIURO = "80-890 Gdańsk";
export const TELEFON_BIURO = "575 321 222";
export const EMAIL_BIURO = "kontakt@odnrewers.pl";
export const BANK_ACCOUNT = "98 1870 1045 2078 1081 7959 0001";

export enum SYSTEM_CHOICES {
    SYSTEM_KURSY = 0,
    SYSTEM_BB = 1, // Bieg Belfrów
}

/* typ płatności */
export enum PAYMENT_SYS_CHOICES {
    PAYMENT_SYS_BANK_TRANSFER = 0,
    PAYMENT_SYS_PRZELEWY24 = 1,
    PAYMENT_SYS_COUPON = 3,
    PAYMENT_SYS_UNKNOWN = 4,
}

/* identyfikatory sklepów */
export enum SHOP_CHOICES {
    SHOP_KURSY = "KUR",
    SHOP_BB = "BB",
    SHOP_INTERNAL = "INT",
}

/* sposób rezerwacji/zakupu produktu */
export enum BOOKING_TYPES_CHOICES {
    BOOKING_TYPE_INQUIRY = 0,
    BOOKING_TYPE_ONLINE = 1,
}

export let BASKET_UNKNOWN = "-"; // ta stała przypisana do basketId informuje, że basket nie był czytany

/* enumerator zgodny z API */
export enum BASKET_TYPE_CHOICES {
    BASKET_ORDER = 0, //koszyk zamówienia
    BASKET_INQUIRY = 1, //koszyk zapytania
    //BASKET_OFFER = 2, //koszyk przygotowanej wcześniej oferty dla klienta (rozsyłamy link z tym koszykiem w którym są wstepnie wypełnione pola)
    BASKET_UNDEFINED = 3, //?
    BASKET_BB = 4, // Bieg Belfrow
    // BASKET_ORDER='order_basket_id',  //koszyk zamówienia
    // BASKET_INQUIRY='inquiry_basket_id' //koszyk zapytania
}

/* typy linków do zasobów stałych (abyśmy mogli nimi globalnie zarządzać) */
export enum CUSTOM_LINK_TYPE {
    REWERS_COURSE_OFFER = 1, // oferta kursów
    REWERS_SHOP_RULES = 2, // regulamin sklepu i polityka prywatności
    REWERS_AKREDYTACJA = 3,
    WPIS_DO_EWIDENCJI = 4,
    BB_CURRENT_RULES = 5, // regulamin bieżącej edycji Biegu Belfrów
    BB_CURRENT_FLYER = 6, // ulotka biegu belfrów
    BB_PHOTO_RULES = 7, // regulamin konkursu fotograficznego
}

export enum ADDR_TYPE_CHOICES {
    // ADDR_TYPE_UNKNOWN=100, // "-"),
    // ADDR_TYPE_PAYER=0, //, "płatnik"),
    // ADDR_TYPE_RECIPIENT=1, //, "odbiorca"),
    // ADDR_TYPE_CONTACT=2, //, "kontakt"),
    // ADDR_TYPE_SHIPMENT=3, //, "wysyłka"),
    ADDR_TYPE_PAYER_BY_USER = 4, // adres płatnika - zarządzane przez użytkownika a nie przez biura via CRM
    ADDR_TYPE_RECIPIENT_BY_USER = 5, // adres odbiorny - (zarządzane przez użytkownika)"),
    ADDR_TYPE_SHIPMENT_BY_USER = 6, // adres wysyłki - (zarządzane przez użytkownika)"),
    ADDR_TYPE_CONTACT_BY_USER = 7, // dane kontaktowe - (zarządzane przez użytkownika na potrzeby konkretnego zamówienia)"),
}

export enum INVOICE_CHOICES {
    /* enumerator zgodny z API! */
    INVOICE_PRIV = 0, //  faktura imienna (osoba fizyczna)
    INVOICE_PAYER = 1, //  tylko płatnik
    INVOICE_PAYER_AND_RECIPENT = 2, // płatnik i odbiorca
    INVOICE_NONE = 3,
}

/* kategorie kursów - mają być stringi! */
export enum CATEGORY_CHOICES {
    /* enumerator zgodny z API! */
    CATEGORY_ECOURSE = "1",
    CATEGORY_OPEN = "2",
    CATEGORY_CLOSE = "3", // rady pedagogiczne
}

/* kategorie produktów */
export enum PROD_TYPES_CHOICES {
    PROD_TYPE_NONE = 0, // nie wiadomo co to
    PROD_TYPE_COURSE = 1, // kurs  (jaki typ kursu COURSE_TYPES_CHOICES)
    PROD_TYPE_WORKSHOP = 2, // szkolenie
    PROD_TYPE_ADDON = 3, // dodatek
    PROD_TYPE_SUBSC = 4, // subskrypcja
    PROD_TYPE_BB = 5, // BB
    PROD_TYPE_SHIPMENT = 6, // wysyłka
}

export enum PROD_VARIANT_CHOICES {
    NONE = 0,
    WALK = 1,
    RUN = 2,
    RIDE = 3,
    IRON = 4,
    TSHIRT_W = 5,
    TSHIRT_M = 6,
}

/* typ kursów */
export enum COURSE_TYPES_CHOICES {
    COURSE_TYPE_UNKNOWN = 0, // nie wiadomo co to
    COURSE_TYPE_ECOURSE = 1, // ekurs
    COURSE_TYPE_STATIONARY = 2, // stacjonarny
    COURSE_TYPE_WEBINAR = 3, // webinar
}

/* statusy transakcji */
export enum ORDER_STATUS_CHOICES {
    ORDER_NOT_VALID = 0, // utworzono wpis, ale nie jest on jeszcze związany z żadną transakcją
    ORDER_STARTED = 1,
    ORDER_PAID = 2,
    ORDER_CANCELED = 3,
    ORDER_POSTPONE = 4,
}

/* statusy wysyłki */
export enum SHIPMENT_STATUS_CHOICES {
    SHIPMENT_NONE = 0, // brak wysyłki
    SHIPMENT_VALID = 1, // transakcja zarejestrowana, ale nic jeszcze nie robimy
    SHIPMENT_START = 2, // w trakcie przygotowywania wysyłki
    SHIPMENT_SENT = 3, // wysłana
    SHIPMENT_DELIVERED = 4, // odebrana
}

/* enumeratory bloków opisowych */
export enum BLOCK_TYPES_CHOICES {
    BLOCK_TYPE_NONE = 0,
    // BLOCK_TYPE_TARGET = 1,
    // BLOCK_TYPE_PROGRAM = 2,
    // BLOCK_TYPE_BENEFIT_CERT = 5,
    // BLOCK_TYPE_NOTES = 6,
    // BLOCK_TYPE_WORKSHOP_PROGRAM = 7,
    BLOCK_TYPE_SHOP_PROD_DESC_WEBINAR = 20,
    BLOCK_TYPE_SHOP_PROD_DESC_ECOURSE = 30,
    BLOCK_TYPE_SHOP_PROD_DESC_STATIONARY = 40,
}

/* jednostki czasu trwania */
export enum DURATION_UNIT_CHOICES {
    DURATION_UNIT_MIN = 0,
    DURATION_UNIT_DAY = 1,
}

/* sposób formatowania daty */
export enum DATE_FORMAT_CHOICES {
    DATE_FORMAT_NONE = 0, // "-"
    DATE_FORMAT_DATE = 1, // "DD.MM.YYYY"
    DATE_FORMAT_DATE_TIME = 2, // "DD.MM.YYYY, HH:mm"
    DATE_FORMAT_MONTH_YEAR = 3, // "miesiąc słownie YYYY"
}

/* statusy postępu kursu */
export enum COURSE_PROGRESS_CHOICES {
    COURSE_PROGRESS_NOT_STARTED = 0,
    COURSE_PROGRESS_STARTED = 1,
    COURSE_PROGRESS_FINISHED = 2,
}

/* typy bloków lekcji kursu */
export enum COURSE_BLOCK_CHOICES {
    COURSE_BLOCK_HTML = 1,
    //COURSE_BLOCK_MOVIE=2,
    COURSE_BLOCK_TEST = 3,
}

/* statusy certyfikatow */
export enum CERT_STATUS_CHOICES {
    CERT_STATUS_UNKNOWN = 0, // nie wiem jaki jest status :(
    CERT_STATUS_EXISTS = 1, // utworzony
    //CERT_STATUS_CONDITION = 2, // nie spełnione warunki utworzenia certyfikatu
    CERT_STATUS_NOT_AVAILABLE = 20, // nie wystawiamy certyfikatu do tego szkolenia :(
}

export enum TEST_TYPE_CHOICES {
    TEST_TYPE_TEST = 0, // test
    TEST_TYPE_SURVEY = 1, // ankieta online
    TEST_TYPE_SURVEY_OFFLINE = 2, // ankieta offline
}

export enum TEST_PROGRESS_CHOICES {
    TEST_NOT_STARTED = 0, // nie rozpoczęty
    TEST_IN_PROGRESS = 1, // w trakcie
    TEST_FINISHED = 2, // zakończony
}

/* typy testów  pytań do testów */
export enum TEST_Q_TYPE_CHOICES {
    TEST_Q_TYPE_NONE = 0, // ?
    TEST_Q_TYPE_RADIO = 1, //jednokrotnego wyboru - radio button
    TEST_Q_TYPE_DROP = 2, //jednokrotnego wyboru - drop box
    TEST_Q_TYPE_MULTI = 3, // wielokrotnego wyboru
    TEST_Q_TYPE_SURVEY = 4, // ocena od 1 do 6
    TEST_Q_TYPE_TEXT255 = 5, // pole testowe do 255 znaków
}

/* płęć / forma grzecznościowa */
export enum GENDER_USER_CHOICES {
    GENDER_NOT_SET = 0,
    GENDER_MALE = 1,
    GENDER_FEMALE = 2,
}

/* firma kurierska */
export enum COURIER_TYPE_CHOICES {
    COURIER_NONE = 0,
    COURIER_INPOST = 1,
}

/* sposób nadania */
export enum DELIVERY_TYPE_CHOICES {
    DELIVERY_TYPE_NONE = 0,
    DELIVERY_TYPE_DIRECT = 1, // dostawa bezpośrednia - kurier
    DELIVERY_TYPE_PACZKOMAT = 2, // paczkomat
}

/* czy wymagana jest wysyłka */
export enum SHIPMENT_REQ_TYPES_CHOICES {
    SHIPMENT_REQ_NONE = 0, //nie
    SHIPMENT_REQ_ANY = 1, // tak -> w dowolnej formie
}
