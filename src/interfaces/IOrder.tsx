import { ORDER_STATUS_CHOICES, PAYMENT_SYS_CHOICES, SHIPMENT_STATUS_CHOICES } from "../components/Enumerators";
import { IAddr } from "./IAddr";
import { IBasketProduct } from "./IBasket";
import { IShipment } from "./IProducts";

//export type invoiceTypeType = "vatinvoice" | "invoice" | "none";
/* pełen zestaw danych w koszyku umożliwiający złożenie zamówienia -> to jest również wykorzystywane prze przeglądaniu archiwalnych zamówień*/
export interface IOrderArchive {
    // te poniższe są używane w momencie kiedy przeglądamy archiwalne zamówienia
    orderId?: number;
    date?: string; // data złożenia zamównienia
    status?: ORDER_STATUS_CHOICES; // status zamówienia
    shipmentStatus?: SHIPMENT_STATUS_CHOICES; // status zamówienia
    paymentSys?: PAYMENT_SYS_CHOICES; // sposób płatności
}

export interface IOrder extends IOrderArchive {
    invoice?: boolean; // czy wystawić fakturę VAT (jeżeli nie to znaczy, że faktura imienna)
    recipent?: boolean; // jeżeli true to znaczy, że odbiorca jest taki sam jak płatnik
    //invoiceType?: INVOICE_CHOICES,  // typ faktury -> enumerator zgodny z API
    products?: IBasketProduct[]; // lista produktów w koszyku
    shipment?: IShipment; // wybrana metoda wysyłki
    summary?: number; // całkowity koszt zamównienia (uwzględnia rabaty)
    addrContact?: IAddr; // dane kontaktowe
    addrPayer?: IAddr; // adres płatnika
    addrRecipient?: IAddr; // adres odbiorcy
    addrShipment?: IAddr; // ades dostawy
    //addr?: IAddr[],                 // lista adresowa (adresy rozliczeniowe oraz do wysyłki)
}
