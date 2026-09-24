import { BLOCK_TYPES_CHOICES } from "../components/Enumerators";

/* opisy produktów */
export  interface  IDescr {
    type: BLOCK_TYPES_CHOICES,
    txt: string // opis w HTML
}