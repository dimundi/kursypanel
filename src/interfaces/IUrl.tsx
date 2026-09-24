import { CATEGORY_CHOICES } from "../components/Enumerators";

export type IUrlProductList = {
    categoryId: CATEGORY_CHOICES;
    basketId: string;
};

export type IUrlRedirectInto = {
    token: string;
};

export type IUrlCart = {
    basketId: string;
};

export type IUrlUserActivation = {
    key: string;
    redirect: string;
};

export type IUrlLogin = {
    redirect: string;
};
export type IUrlCourse = {
    productId: string;
    lessonId: string;
};
export type IUrlCoupon = {
    kupon: string;
    activeTab?: string;
};

export type IUrlSurveyCert = {
    kod: string;
};

export type IUrlOrderPayment = {
    orderId: string;
};
