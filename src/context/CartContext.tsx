import { Dispatch, SetStateAction, createContext, useContext } from "react";
import type { IOrder } from "../interfaces/IOrder";
import { IInStore, IShipment } from "../interfaces/IProducts";
import { BASKET_TYPE_CHOICES, SYSTEM_CHOICES } from "../components/Enumerators";

export interface ICartUIConfig {
    // initialStepId: number; // numer kroku od którego zaczynamy wyświetlanie
}

export type CartContextType = {
    config?: ICartUIConfig;
    basketId?: string;
    basketType?: BASKET_TYPE_CHOICES;
    //setProducts?: Dispatch<SetStateAction<IInStore[]>>; // aktualizacja listy produktów (całej!)

    getInvoiceData: boolean; // czy przy finalizacji zamówienia podawać dane  fiskalne -> to wynika z UI, a nie ustawień indywidualnych użytkownika

    /* id (productId) wybranej formy wysyłki -> opis znajduje się w shipments */
    shipmentId?: number;

    /* dostępne formy wysyłki */
    shipments?: IShipment[];
    setShipments?: Dispatch<SetStateAction<IShipment[]>>;

    setNotification?: Dispatch<SetStateAction<String | undefined | JSX.Element>>;
    // first_name?:string, // to jest do wywalenia - próba
    // email?:string;      // to jest do wywalenia - próba

    isUserInfoRead?: boolean; // czy odczytano dane użytkownika z API
    setIsUserInfoRead?: Dispatch<SetStateAction<boolean>>;

    order?: IOrder;
    setOrder?: Dispatch<SetStateAction<IOrder>>;

    // updateFirstName?: Dispatch<SetStateAction<string>>
    activeStepId?: number; // aktualny numer kroku wypełniania koszyka
    setActiveStepId?: Dispatch<SetStateAction<number>>; // funkcja zmiany kroku

    system: SYSTEM_CHOICES;
};

export const CartContext = createContext<CartContextType>({ getInvoiceData: true, system: SYSTEM_CHOICES.SYSTEM_KURSY });

export const useCartContext = () => useContext(CartContext);

// const CartContextProvider: React.FC<React.ReactNode> = ({ children }) => {
//     const [todos, setTodos] = React.useState<ITodo[]>([
//       {
//         id: 1,
//         title: 'post 1',
//         description: 'this is a description',
//         status: false,
//       },
//       {
//         id: 2,
//         title: 'post 2',
//         description: 'this is a description',
//         status: true,
//       },
//     ]);
// }

//export { CartContext};

// const CartContext = createContext({
//     cart: null,
//   });

//   export { CartContext };
