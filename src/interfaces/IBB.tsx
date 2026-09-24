import { isTypeReferenceNode } from "typescript";
import { BB_ACTIVITY_CHOICES, BB_PAKIET_CHOICES } from "../pages/bb/BBEnum";
import { IBasket, IBasketProduct } from "./IBasket";
import { IOrderArchive } from "./IOrder";
import { IProduct, IShipment } from "./IProducts";

export interface IOrderBasketProduct extends IBasketProduct {
    order?: IOrderArchive;
}

/* struktura danych z API /bb */
export interface IBBParticipantRankBasic {
    nick?: string; // nick uczestnika - może być udostępniany publicznie
    groupName?: string; // nazwa grupy
    startNo?: number; //
    total_run?: number;
    total_walk?: number;
    total_ride?: number;
}

export interface IBBParticipant extends IBBParticipantRankBasic {
    pk: number; // identyfikator  z tabeli BBeditionUser
    email?: string; // adres emial uczestnika BB, jeżeli email = email zalogowanego użytkownika to oaznacza, że to jego wpis
    name: string; // nazwa uczestnika
    rankConsent: boolean; // czy uczestnik wyraził zgodę na uczestnictwo w Indywidualnym Rankingu Belfrów
    activity: BB_PAKIET_CHOICES; // aktywność, na którą zapisał się uczestnik i za nią zapłacił
    basket?: IBasket; // co w koszyku, ale jeszcze nie kupione
    products?: IOrderBasketProduct[]; // to co już jest zamówione lub/i zapłacone
}

export interface IBBApi {
    participants: IBBParticipant[];
    // activities: IBBActivity[];
    products: IProduct[];
    shipment: IShipment[];
}

export interface IBBRankParticipant extends IBBParticipantRankBasic {
    distance?: number;
    position?: number;
    pk?: number;
}

export interface IBBRank {
    activityType?: BB_PAKIET_CHOICES;
    table?: IBBRankParticipant[];
}

export interface IBBUserDistance {
    day?: number; // numer kolejny dnia
    distance?: number;
}

/* odpowiedz z zapytania o wyniki uczestnika */
export interface IBBUserDistances {
    activityType?: BB_ACTIVITY_CHOICES;
    table?: IBBUserDistance[];
}
