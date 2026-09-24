import { PROD_VARIANT_CHOICES } from "../components/Enumerators";
import { IBBParticipant, IBBUserDistances } from "../interfaces/IBB";
import { IBasketProduct } from "../interfaces/IBasket";
// import { IBBActivity } from "../interfaces/IBB";
import { IProduct } from "../interfaces/IProducts";
import { BB_PAKIET_CHOICES, ACTIVITY_STATUS_CHOICES, TSHIRT_CHOICES, BB_ACTIVITY_CHOICES } from "../pages/bb/BBEnum";

/* -------------------------------------------------
 *
 * ------------------------------------------------- */
export interface IPakietType {
    type: BB_PAKIET_CHOICES | PROD_VARIANT_CHOICES;
    status: ACTIVITY_STATUS_CHOICES;
}

/* -------------------------------------------------
 *
 * ------------------------------------------------- */
export interface IActivityMatrix {
    img: NodeRequire;
    icon: NodeRequire;
    packageName: string; // nazwa pakietu
    title: string;
    distance?: string;
    distanceWalk?: string;
    distanceRun?: string;
    distanceRide?: string;
    form1: string; // przejdź, przebiegnij, przejedź
    form2: string;
    form3: string;
    price: number;
}

export const ActivityMatrix: { [key in BB_PAKIET_CHOICES]: IActivityMatrix } = {
    0: {
        img: require("../static/images/BB_spacer.jpg"),
        icon: require("../static/images/icon_walk.png"),
        packageName: "",
        title: "",
        distance: "",
        form1: "",
        form2: "",
        form3: "",
        price: 100,
    },
    /* ACTIVITY_WALK = 1, */
    1: {
        img: require("../static/images/BB_spacer.jpg"),
        icon: require("../static/images/icon_walk.png"),
        packageName: "Spacer",
        title: "Spacer",
        distance: "6",
        form1: "przejdź",
        form2: "przejść",
        form3: "spacerów",
        price: 40,
    },
    /*ACTIVITY_RUN = 2, */
    2: {
        img: require("../static/images/BB_bieg.jpg"),
        icon: require("../static/images/icon_run.png"),
        packageName: "Bieg",
        title: "Bieg",
        distance: "6",
        form1: "przebiegnij",
        form2: "przebiec",
        form3: "biegów",
        price: 40,
    },
    /* ACTIVITY_RIDE = 3, */
    3: {
        img: require("../static/images/BB_jazda.jpg"),
        icon: require("../static/images/icon_ride.png"),
        packageName: "Rower",
        title: "Rower",
        distance: "12",
        form1: "przejedź",
        form2: "przejechać",
        form3: "jazd",
        price: 40,
    },
    /*ACTIVITY_IRON = 4,*/
    4: {
        img: require("../static/images/BB_iron.jpg"),
        icon: require("../static/images/icon_iron.png"),
        packageName: "Iron Teacher",
        title: "Iron Teacher",
        distanceWalk: "12",
        distanceRun: "18",
        distanceRide: "48",
        form1: "przejdź, przebiegnij i przejedź",
        form2: "przejść, przebiec i przejechać",
        form3: "",
        price: 80,
    },
};

/* ---------------------------------------------------------
 *
 *  --------------------------------------------------------- */
export default class BBHelperClass {
    /* ---------------------------------------------------------
    pobranie ceny aktywności
    --------------------------------------------------------- */
    // public static getActivityPrice(activityType: ACTIVITY_CHOICES, bbproducts?: IProduct[]) {
    //     if (bbActivities === undefined) {
    //         return 0;
    //         //#return ActivityMatrix[activityType].price;
    //     } else {
    //         for (let key in bbActivities) {
    //             if (bbActivities[key].activity === activityType) return bbActivities[key].price;
    //         }
    //     }
    //     return 0;
    // }

    /* ---------------------------------------------------------
    przeliczanie dystansu z metrów na kilometry
    --------------------------------------------------------- */
    public static distanceM2KM(value: number) {
        return (value - (value % 100)) / 1000;
    }

    /* ---------------------------------------------------------
    wyliczanie sumerycznego dystansu ze struktury IBBUserDistances dla aktywności activityType
    --------------------------------------------------------- */
    public static calculateTotalDistance(userDistances: IBBUserDistances[], activityType: BB_ACTIVITY_CHOICES) {
        let userDistance = userDistances?.find((obj) => obj.activityType == activityType);
        if (userDistance === undefined || userDistance === null) return 0;

        let distance = 0;
        userDistance.table?.forEach((obj) => {
            if (obj.distance !== undefined) distance = distance + obj.distance;
        });
        return distance;
    }
    /* ---------------------------------------------------------
    pobranie nazwy aktywności
    --------------------------------------------------------- */
    public static getActivityName(activityType: BB_PAKIET_CHOICES | PROD_VARIANT_CHOICES | null) {
        if (activityType === undefined || activityType === null) return ActivityMatrix[BB_PAKIET_CHOICES.NONE].title;
        if (
            activityType.valueOf() == BB_PAKIET_CHOICES.IRON.valueOf() ||
            activityType.valueOf() == BB_PAKIET_CHOICES.RIDE.valueOf() ||
            activityType.valueOf() == BB_PAKIET_CHOICES.RUN.valueOf() ||
            activityType.valueOf() == BB_PAKIET_CHOICES.WALK.valueOf()
        )
            return ActivityMatrix[activityType.valueOf() as BB_PAKIET_CHOICES].title;
        return ActivityMatrix[BB_PAKIET_CHOICES.NONE].title;
    }

    /* ---------------------------------------------------------
    sprawdzenie jaki jest wybrany typ aktywności uczestnika
    --------------------------------------------------------- */
    public static getParticipantActivityType(participant?: IBBParticipant): IPakietType {
        if (participant === undefined) {
            return { type: BB_PAKIET_CHOICES.NONE, status: ACTIVITY_STATUS_CHOICES.SELECTED };
        }
        if (!(participant.activity === undefined || participant.activity === null))
            return { type: participant.activity, status: ACTIVITY_STATUS_CHOICES.PAID };

        function productFindCondition(variant: PROD_VARIANT_CHOICES | undefined) {
            switch (variant) {
                case PROD_VARIANT_CHOICES.IRON:
                case PROD_VARIANT_CHOICES.WALK:
                case PROD_VARIANT_CHOICES.RIDE:
                case PROD_VARIANT_CHOICES.RUN:
                    return true;
            }
            return false;
        }
        /* szukam produkt, który jest atywnością  */
        let basketProductObj = participant.products?.find((basketProduct) => {
            return productFindCondition(basketProduct.prodDef?.variantType);
        });
        /* szukam produkt w koszyku, który jest atywnością  */
        if (basketProductObj === undefined)
            basketProductObj = participant.basket?.products?.find((basketProduct) => {
                return productFindCondition(basketProduct.prodDef?.variantType);
            });

        if (basketProductObj !== undefined && basketProductObj.prodDef?.variantType !== undefined) {
            return {
                type: basketProductObj.prodDef?.variantType,
                status: ACTIVITY_STATUS_CHOICES.SELECTED,
            };
        }

        // if (participant.basket !== undefined && participant.basket.products !== undefined && participant.basket.products.length > 0) {
        //     for (let key in participant.basket.products) {
        //         if (participant.basket.products[key] !== undefined) {
        //             if (participant.basket.products[key].prodDef !== undefined)
        //                 if (participant.basket.products[key].prodDef?.variantType !== undefined) {
        //                     let x = participant.basket.products[key].prodDef?.variantType;
        //                     // if (x !== undefined)
        //                     if (
        //                         x === PROD_VARIANT_CHOICES.PROD_VARIANT_IRON ||
        //                         x === PROD_VARIANT_CHOICES.PROD_VARIANT_WALK ||
        //                         x === PROD_VARIANT_CHOICES.PROD_VARIANT_RIDE ||
        //                         x === PROD_VARIANT_CHOICES.PROD_VARIANT_RUN
        //                     ) {
        //                         return {
        //                             type: x,
        //                             status: ACTIVITY_STATUS_CHOICES.ACTIVITY_SELECTED,
        //                         };
        //                         // return participant.basket.products[key].prodDef?.variantType;
        //                     }
        //                 }
        //         }
        //     }
        // }
        return { type: BB_PAKIET_CHOICES.NONE, status: ACTIVITY_STATUS_CHOICES.SELECTED };
    }

    /* ---------------------------------------------------------
    pobiera z IBBParticipant obiekt(y) koszulki i zwraca jako IBasketProduct[]
    --------------------------------------------------------- */
    public static getParticipantTShirtObjs(participant?: IBBParticipant) {
        if (participant === undefined) {
            return [];
        }

        let tshirts = [] as IBasketProduct[];
        /* teraz powinienem sprawdzić orderds */

        /* teraz spawdzam koszyk */
        if (
            participant.basket !== undefined &&
            participant.basket.products !== undefined &&
            participant.basket.products.length > 0
        ) {
            for (let key in participant.basket.products) {
                if (participant.basket.products[key] !== undefined) {
                    if (participant.basket.products[key].prodDef !== undefined)
                        if (participant.basket.products[key].prodDef?.variantType !== undefined) {
                            let x = participant.basket.products[key].prodDef?.variantType;
                            if (x !== undefined) {
                                if (x === PROD_VARIANT_CHOICES.TSHIRT_M || x === PROD_VARIANT_CHOICES.TSHIRT_W) {
                                    tshirts.push(participant.basket.products[key]);
                                }
                            }
                        }
                }
            }
        }
        return tshirts;
    }

    /* ---------------------------------------------------------
    pobranie IInstore  ZPI IProduct koszulki według wskazanego typu
    --------------------------------------------------------- */
    public static getProductFromInStoreByVariant(
        variantType: PROD_VARIANT_CHOICES | TSHIRT_CHOICES | BB_PAKIET_CHOICES,
        bbproducts?: IProduct[]
    ) {
        if (bbproducts === undefined) {
            return null;
        } else {
            for (let key in bbproducts) {
                if (bbproducts[key].prodDef?.variantType === variantType) return bbproducts[key];
            }
        }
        return null;
    }
}
