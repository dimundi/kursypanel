import { GENDER_USER_CHOICES } from "../components/Enumerators";
import { IOrder } from "./IOrder";

/* dane użytkownika - odpowiedź na zapytanie z API /usr/ */
export interface IUserEssential {
    first_name?: string;
    last_name?: string;
    email?: string;
    gender?: GENDER_USER_CHOICES;
}
export interface IUser extends IUserEssential {
    // domyślne danerozliczeniowe są zachowane w strukturze IOrder
    default?: IOrder;
}
