/* API produktów /prod/*/

import {
    BOOKING_TYPES_CHOICES,
    COURIER_TYPE_CHOICES,
    COURSE_TYPES_CHOICES,
    DATE_FORMAT_CHOICES,
    DELIVERY_TYPE_CHOICES,
    DURATION_UNIT_CHOICES,
    PROD_TYPES_CHOICES,
    PROD_VARIANT_CHOICES,
    SHIPMENT_REQ_TYPES_CHOICES,
} from "../components/Enumerators";

export interface ICoachShort {
    id?: number; // id trenera (potrzebne jak trzeba będzie pobrać szczegółowe dane)
    name?: string; // imię i nazwisko trenera
}

/* lista dostępnych terminów (produktów) i akcesoriów dla danego kursu */
export interface IInStore {
    productId?: number;
    pName?: string; //  nazwa laternatywna, jeżeli jest pusta to używamy nazwy z IProduct
    vName?: string; // nazwa wariantu (np. rozmiar, kolor, itp)
    courseType?: COURSE_TYPES_CHOICES; //  typ kursu dla danego terminu
    prodType?: PROD_TYPES_CHOICES; //  nie wiem co z tym zrobić,
    //  typ produktu tego terminu (może się różnić od tego w IProduct, gdy na przykład termin jest jakimś adddonem)
    start?: number; //  początek kursu (jeżeli dotyczy) UnixTime (UTC)
    stop?: number; //  koniec kursu (jeżeli dotyczy) UnixTime (UTC)
    dateFormat?: DATE_FORMAT_CHOICES; //  w jakim formacie mają być wyświetlane daty start i stop
    price?: number; //  cena w PLN w zł
    av?: number; //  ilość dostępnych produktów. 999 - nielimitowany, -1 - już nie ma
    //av_max?: number; //  ilość dostępnych produktów jaka była na początku
    bookingType?: BOOKING_TYPES_CHOICES; //  sposób w jakim użytkownik może nabyć produkt
    coach?: ICoachShort[]; //  lista trenerów obsługująca dany termin
    duration?: number; //  czas trwania kursu w jednostkach durationUnit
    durationUnit?: DURATION_UNIT_CHOICES; //  w jakich jednostkach wyrażony jest duration
    specialOffer?: number; // jeżeli > 0 wówczas jest to produkt promowany, im większa wartość specialOffer tym bardziej promowany
}

/* lista dostępnych terminów i akcesoriów dla danego kursu */
export interface IProdDef {
    prodDefId?: number;
    name?: string; //   nazwa produktu
    prodType?: PROD_TYPES_CHOICES; //   typ produktu
    variantType?: PROD_VARIANT_CHOICES; //   typ produktu
    at?: string[]; //   obszary zaintersowań - indeksy
    img?: string; //   link do obrazka wiodącego
    shipmentReq?: SHIPMENT_REQ_TYPES_CHOICES; // czy wymagana jest wysyłka
}

/* nazywnictwo tak jak w API -> nie zmianiać */
export interface IProduct {
    /* pola pobrane z API */
    prodDef?: IProdDef; // definicja produktu - elementy wspólne dla każdego produktu w inStore
    inStore?: IInStore[]; // lista dostępnych terminów i akcesoriów dla danego kursu
    /* pola wyliczone */
    avCourseTypes?: COURSE_TYPES_CHOICES[]; // jakie typy kursów są dostępne dla tego kursu (wyliczone na podstawie InStore)
}

export interface IShipmentdDef extends IProdDef {
    courier?: COURIER_TYPE_CHOICES;
    deliveryType?: DELIVERY_TYPE_CHOICES;
}
export interface IShipment {
    /* pola pobrane z API */
    prodDef?: IShipmentdDef; // definicja produktu - elementy wspólne dla każdego produktu w inStore
    inStore?: IInStore; // opis jako produkt
}

/* oferta specjalna */
export interface ISpecialOffer {
    prodDef?: IProdDef; // definicja produktu - elementy wspólne dla każdego produktu w inStore
    inStore?: IInStore; // lista dostępnych terminów i akcesoriów dla danego kursu
}

export interface IAreaType {
    id?: number;
    label?: string;
}

export default interface IProducts {
    products?: IProduct[]; // status odpowiedzi HTML
    specialOffer?: ISpecialOffer[]; // oferta specjalna (promki)
}
