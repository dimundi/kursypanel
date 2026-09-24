import {
    COURSE_TYPES_CHOICES,
    DATE_FORMAT_CHOICES,
    DELIVERY_TYPE_CHOICES,
    ORDER_STATUS_CHOICES,
    PROD_TYPES_CHOICES,
    SHIPMENT_STATUS_CHOICES,
    SYSTEM_CHOICES,
} from "../components/Enumerators";
import { IBBParticipant, IOrderBasketProduct } from "../interfaces/IBB";
import { IBasket } from "../interfaces/IBasket";
import { IInStore, IProduct, IShipment } from "../interfaces/IProducts";
import { IUserCourse } from "../interfaces/IUserCourse";

export default class HelperClass {
    /* ---------------------------------------------------------
    sformatuj listę dostępnych metod wysyłki
    --------------------------------------------------------- */
    public static getShipmentsMethod(shipments?: IShipment[]) {
        return (
            <>
                {shipments?.map((shipment, index) => (
                    <div>
                        {shipment.inStore?.pName}: <strong>{shipment.inStore?.price}</strong> zł
                    </div>
                ))}
            </>
        );
    }

    /* ---------------------------------------------------------
    pobierz status przesyłki
    --------------------------------------------------------- */
    public static getShipmentStatus(orderBasketProd?: IOrderBasketProduct[]) {
        return SHIPMENT_STATUS_CHOICES.SHIPMENT_VALID;
        // let basketProdObj = orderBasketProd?.find(
        //     (obj) =>
        //         obj.order?.status == ORDER_STATUS_CHOICES.ORDER_PAID &&
        //         (obj.order?.shipmentStatus === SHIPMENT_STATUS_CHOICES.SHIPMENT_START ||
        //             obj.order?.shipmentStatus === SHIPMENT_STATUS_CHOICES.SHIPMENT_VALID)
        // );
        // if (basketProdObj === undefined || basketProdObj === null) return 0;
        // return basketProdObj.order?.shipmentStatus === undefined ? SHIPMENT_STATUS_CHOICES.SHIPMENT_NONE : basketProdObj.order?.shipmentStatus;
    }

    /* ---------------------------------------------------------
    czy płatność jest oczekująca z IOrderBasketProduct[]
    zwraca numer zamówienia jeżeli jest oczekująca lub 0 jeżeli nie jest oczekującca
    --------------------------------------------------------- */
    public static isPaymentPanding(orderBasketProd?: IOrderBasketProduct[]) {
        let basketProdObj = orderBasketProd?.find(
            (obj) => obj.order?.status == ORDER_STATUS_CHOICES.ORDER_STARTED || obj.order?.status == ORDER_STATUS_CHOICES.ORDER_POSTPONE
        );
        if (basketProdObj === undefined || basketProdObj === null) return 0;
        return basketProdObj.order?.orderId === undefined ? 0 : basketProdObj.order?.orderId;
    }
    /* ---------------------------------------------------------
    pobierz typ wysyłki
    --------------------------------------------------------- */
    public static getShipmentName(shipment?: IShipment) {
        if (shipment === undefined) return "Nie wybrano metody wysyłki";
        switch (shipment.prodDef?.deliveryType) {
            case DELIVERY_TYPE_CHOICES.DELIVERY_TYPE_DIRECT:
                return "Przesyłka kurierska";
            case DELIVERY_TYPE_CHOICES.DELIVERY_TYPE_PACZKOMAT:
                return "Paczkomat";
        }
        return "Nie wybrano metody wysyłki";
    }

    /* ---------------------------------------------------------
    przelicz sumę w koszyku
    --------------------------------------------------------- */
    public static calcBasket(basket?: IBasket) {
        if (basket === undefined) return 0;
        if (basket.products == undefined || basket.products.length === 0) {
            return 0;
        }
        let sum = 0;
        for (let key in basket.products) {
            if (basket.products[key].inStore !== undefined) {
                let price = basket.products[key].inStore?.price;
                if (price === undefined) continue;
                let cnt = basket.products[key].cnt;
                if (cnt === undefined) cnt = 1;
                sum += price * cnt;
            }
        }
        return sum;
    }

    /* ---------------------------------------------------------
    przelicz sumę w koszykach w IBBParticipant[], uwzględnij Shipment (opcjonalnie)
    --------------------------------------------------------- */
    public static calcBBBaskets(participant?: IBBParticipant[], shipment?: IShipment) {
        let sum = 0;

        if (participant === undefined || participant.length === 0) {
            return sum;
        }

        for (let key in participant) {
            sum += this.calcBasket(participant[key].basket);
        }

        if (sum > 0 && shipment !== undefined) {
            if (shipment.inStore?.price) sum += shipment.inStore?.price;
        }

        return sum;
    }

    /* ---------------------------------------------------------
    szuka IShipment w IShipment[] po productId
    --------------------------------------------------------- */
    public static findShipment(shipmentId: number | string | null | undefined, shipments?: IShipment[]) {
        if (shipmentId === null || shipmentId === undefined || shipments === undefined || shipments.length === 0) return undefined;

        let idx = shipments.findIndex((shipment) => shipment.inStore?.productId?.toString() === shipmentId.toString());
        if (idx >= 0) {
            return shipments[idx];
        }
        return undefined;
    }
    /* ---------------------------------------------------------
    sprawdza czy w InnStore jest product Id
    --------------------------------------------------------- */
    public static isProductInStore(productId?: number, inStore?: IInStore[]) {
        if (HelperClass.getProductInStore(productId, inStore) === undefined) return false;
        return true;
    }

    /* ---------------------------------------------------------
    pobiera pierwszy productId z InnStore, 
    jeżeli nie ma adnego produktu zwraca 0, jest to używanem jeżeli wiemy, że danyProddef ma tylko 1 produkt
    --------------------------------------------------------- */
    public static getFirstProductIdInStore(inStore?: IInStore[]) {
        if (inStore === undefined) return 0;
        if (inStore.length === 0) return 0;
        let productId = inStore[0].productId;
        if (productId === undefined) return 0;
        return productId;
    }

    /* ---------------------------------------------------------
    pobiera product z InnStore
    --------------------------------------------------------- */
    public static getProductInStore(productId?: number, inStore?: IInStore[]) {
        if (productId === undefined || inStore === undefined) return undefined;
        return inStore.find((value) => {
            if (value.productId == productId) return true;
        });
    }

    /* ---------------------------------------------------------
    pobiera InnStore z Product[] po productId
    --------------------------------------------------------- */
    public static getProductInProduct(productId?: number, products?: IProduct[]) {
        if (productId === undefined || products === undefined) return undefined;
        let retInStore = undefined as IInStore | undefined;
        products.find((iProduct) => {
            retInStore = iProduct.inStore?.find((inStore) => {
                if (inStore.productId == productId) {
                    return true;
                }
            });
            if (retInStore != undefined) return true;
        });
        return retInStore;
    }

    /* ---------------------------------------------------------
        sprawdza czy podano termin rozpoczęcia kursu
       --------------------------------------------------------- */
    public static isCourseTerm(inStore?: IInStore) {
        if (inStore?.prodType === undefined) {
            //  || inStore?.dateFormat === DATE_FORMAT_CHOICES.DATE_FORMAT_NONE) {
            return false;
        }
        if (inStore?.courseType === COURSE_TYPES_CHOICES.COURSE_TYPE_ECOURSE) return false;
        return true;
    }
    /* ---------------------------------------------------------
        konwersja stringu oznaczająceo  stronę na przekierowanie na enumerator SYSTEM_CHOICES
       --------------------------------------------------------- */
    public static redirectToSystemEnum(redirect: string) {
        if (redirect === "bb" || redirect === "BB") return SYSTEM_CHOICES.SYSTEM_BB;
        return SYSTEM_CHOICES.SYSTEM_KURSY;
    }
    /* ---------------------------------------------------------
        usuwa z końca i początku stringa <p> i </p>
       --------------------------------------------------------- */
    public static cleanMainParagraph(text?: string) {
        if (text === undefined) return "";
        // console.log(text.substring(0, 3));
        // console.log(text.substring(text.length - 4));
        if (text.substring(0, 3) === "<p>" && text.substring(text.length - 4) === "</p>") {
            return text.substring(3, text.length - 4);
        }
        return text;
    }
    /* ---------------------------------------------------------
        usuwanie sierotek i wdów
       --------------------------------------------------------- */
    public static cleanSierotki(text: string) {
        return text
            .replaceAll(" i ", " i&nbsp;")
            .replaceAll(" w ", " w&nbsp;")
            .replaceAll(" o ", " o&nbsp;")
            .replaceAll(" W ", " W&nbsp;")
            .replaceAll(" Z ", " Z&nbsp;")
            .replaceAll(" z ", " z&nbsp;")
            .replaceAll("&nbsp;z ", "&nbsp;z&nbsp;");
    }

    /* ---------------------------------------------------------
        upobranie dnia tygodia
       --------------------------------------------------------- */
    public static getDOW(day: number) {
        switch (day) {
            case 1:
                return "poniedziałek";
            case 2:
                return "wtorek";
            case 3:
                return "środa";
            case 4:
                return "czwartek";
            case 5:
                return "piątek";
            case 6:
                return "sobota";
            case 0:
                return "niedziela";
            default:
                return "-";
        }
    }

    /* ---------------------------------------------------------
        możenie dwóch zmiennych, które mogą być niezdefiniowane 
       --------------------------------------------------------- */
    public static multiplyUndefined(valueA?: number, valueB?: number) {
        if (valueA === undefined || valueB === undefined) return 0;
        return valueA * valueB;
    }

    /* ---------------------------------------------------------
        dodawanie dwóch zmiennych, które mogą być niezdefiniowane 
       --------------------------------------------------------- */
    public static addUndefined(valueA?: number, valueB?: number, errResponse?: string | number) {
        if (valueA === undefined || valueB === undefined) {
            if (errResponse) return errResponse;
            return "";
        }
        return valueA + valueB;
    }

    /* ---------------------------------------------------------
        pobieranie potencjalnie niezdefiniowanej liczby
       --------------------------------------------------------- */
    public static getUndefinedNumber(valueA?: number, errResponse?: number) {
        if (valueA === undefined || valueA === null) {
            if (errResponse) return errResponse;
            return 0;
        }
        return valueA;
    }
    /* ---------------------------------------------------------
        pobieranie potencjalnie niezdefiniowanej string
       --------------------------------------------------------- */
    public static getUndefinedString(value?: string) {
        if (value === undefined) {
            return "";
        }
        return value;
    }
    /* ---------------------------------------------------------
        sprawdzam czy produkt jest ekursem 
       --------------------------------------------------------- */
    public static isEkurs(inStore?: IInStore, prodType?: PROD_TYPES_CHOICES, courseType?: COURSE_TYPES_CHOICES) {
        if (inStore === undefined && (prodType === undefined || courseType === undefined)) {
            return false;
        }
        var pType: PROD_TYPES_CHOICES | undefined;
        var cType: COURSE_TYPES_CHOICES | undefined;

        if (inStore !== undefined) {
            pType = inStore.prodType;
            cType = inStore.courseType;
        } else {
            pType = prodType;
            cType = courseType;
        }
        if (cType === undefined || pType === undefined) return false;

        if (pType === PROD_TYPES_CHOICES.PROD_TYPE_COURSE && cType === COURSE_TYPES_CHOICES.COURSE_TYPE_ECOURSE) return true;

        return false;
    }

    /* ---------------------------------------------------------
        spawdzam czy kurs jest aktywny
    --------------------------------------------------------- */
    public static courseIsValid(course?: IUserCourse) {
        if (course === undefined) return false;

        if (course.product?.courseType === COURSE_TYPES_CHOICES.COURSE_TYPE_ECOURSE) {
            return HelperClass.dateIsRange(course.validTo);
        }
        return true;
    }

    /* ---------------------------------------------------------
        spawdzam czy data jest przeterminowane
        jeżeli start === undefined to go nie spawdzam        
    --------------------------------------------------------- */
    public static dateIsPast(unixDateStart?: number, unixDateStop?: number) {
        if (unixDateStart === undefined) {
            return false;
        }
        if (unixDateStart > Date.now() / 1000) {
            return false;
        }

        if (unixDateStop !== undefined) {
            /* sprawdza, czy nie w trakcie */
            if (unixDateStop < Date.now() / 1000) {
                return false;
            }
        }
        return true;
    }
    /* ---------------------------------------------------------
        spawdzam czy data jest w przedziale
        jeżeli start === undefined to go nie spawdzam        
    --------------------------------------------------------- */
    public static dateIsRange(unixDateStop?: number, unixDateStart?: number) {
        if (unixDateStop === undefined) {
            return false;
        }
        // if (unixDateStop > 9999999999) {
        //     /* czas podany w mikrosekundach */
        //     unixDateStop /=100
        // }
        // console.log(Date.now()/1000)
        // console.log(unixDateStop)

        if (unixDateStop < Date.now() / 1000) {
            return false;
        }

        if (unixDateStart === undefined) return true;
        else if (unixDateStart > Date.now() / 1000) return false;
        return true;
    }

    /* ---------------------------------------------------------
        formatowanie daty z czasu UNIX 
    --------------------------------------------------------- */
    public static formatDate(unixDate?: number, dateFormat?: DATE_FORMAT_CHOICES) {
        /* unixDate czas w sekundach UNIX UTC */

        // console.log(unixDate);
        if (dateFormat === undefined || dateFormat === DATE_FORMAT_CHOICES.DATE_FORMAT_NONE) {
            dateFormat = DATE_FORMAT_CHOICES.DATE_FORMAT_DATE;
        }
        if (unixDate === undefined || unixDate === null) return "";
        const date = new Date(unixDate * 1000); // Convert Unix timestamp to milliseconds

        if (dateFormat === DATE_FORMAT_CHOICES.DATE_FORMAT_MONTH_YEAR) {
            return Intl.DateTimeFormat("pl-PL", {
                year: "numeric",
                month: "long",
            }).format(date);
        } else if (dateFormat === DATE_FORMAT_CHOICES.DATE_FORMAT_DATE_TIME) {
            return Intl.DateTimeFormat("pl-PL", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            }).format(date);

            //  return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        } else {
            return Intl.DateTimeFormat("pl-PL", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }).format(date);

            //return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        }
    }
}
