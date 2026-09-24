import { ADDR_TYPE_CHOICES } from "../components/Enumerators";

/* dane adresowe (faktura/wysyłka, etc...) */
export  interface  IAddr  {
    addrType?:ADDR_TYPE_CHOICES, // typ adresu
    aName?:string,   // imie i nazwisko
    company?:string,  // nazwa firmy
    line1?: string, // pierwsza linia adresu
    line2?: string, // druga linia adresu
    postcode?: string, // kod pocztowy
    city?: string, // miasto
    email?: string, 
    tel?: string, 
    NIP?: string,
  }