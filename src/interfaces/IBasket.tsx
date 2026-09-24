import { BASKET_TYPE_CHOICES } from "../components/Enumerators";
import { IProdDef, IInStore, IShipment } from "./IProducts";

/* struktura danych koszyka  zastosowana w przypadku BB -> i taka ma być docelowa*/
export interface IBasketProduct {
    cnt?: number; // ilość produktów
    prodDef?: IProdDef; // definicja produktu - elementy wspólne dla każdego produktu w inStore
    inStore?: IInStore; // lista dostępnych terminów i akcesoriów dla danego kursu
}

export interface IBasketEl {
    type: BASKET_TYPE_CHOICES;
    basketId: string;
    products?: IBasketProduct[];
}

export interface IBasket extends IBasketEl {
    baskets?: IBasketEl[];
    shipment?: IShipment[];
}
