import ContactRedirect from "../elements/ContactRedirect";
import TrainingOfferRedirect from "../elements/TrainingOfferRedirect";
import React, { Suspense, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BASKET_TYPE_CHOICES, BASKET_UNKNOWN, SYSTEM_CHOICES } from "../Enumerators";

// import Home from "../../pages/Home";
import Rules from "../../pages/Rules";
//import Contact from "../../pages/Contact";
//import Inquiry from "../../pages/Inquiry";
//import Cart from "../../pages/cart/Cart";
import Thankyou from "../../pages/Thankyou";
//import Login from "../../pages/user/Login";
import Register from "../../pages/user/Register";
import Error from "../../pages/Error";
import Activation from "../../pages/user/Activation";
//import UserAccount from "../../pages/user/UserAccount";
import PasswdReminder from "../../pages/user/PasswdReminder";
import ScrollToTop from "../elements/ScrollToTop";
// import Course from "../../pages/course/Course";
// import PageLayout from "./PageLayout";
// import Confirmation from "../../pages/Confirmation";
import CartClass from "../../classes/CartClass";
// import SurveyCert from "../../pages/test/SurveyCert";
import RequestClass from "../../classes/RequestClass";
import { RedirectInto } from "../elements/RedirectInto";
// import BBMain from "../../pages/bblanding/BBMain";
// import BBPageLayout from "../../pages/bblanding/BBPageLayout";
// import BBZapisy from "../../pages/bb/BBZapisy";

/* ten komponent będzie wydzielony w osobnym pliku .js */
const Cart = React.lazy(() => import("../../pages/cart/Cart"));
const Home = React.lazy(() => import("../../pages/Home"));
const PageLayout = React.lazy(() => import("./PageLayout"));
const Confirmation = React.lazy(() => import("../../pages/Confirmation"));
// const CartClass = React.lazy(() => import("../../classes/CartClass"));
const SurveyCert = React.lazy(() => import("../../pages/test/SurveyCert"));
// const RequestClass = React.lazy(() => import("../../classes/RequestClass"));
const BBMain = React.lazy(() => import("../../pages/bblanding/BBMain"));
const BBPageLayout = React.lazy(() => import("../../pages/bblanding/BBPageLayout"));
const BBZapisy = React.lazy(() => import("../../pages/bb/BBZapisy"));
const BB = React.lazy(() => import("../../pages/bb/BB"));
const Course = React.lazy(() => import("../../pages/course/Course"));
const Login = React.lazy(() => import("../../pages/user/Login"));
const Inquiry = React.lazy(() => import("../../pages/Inquiry"));
const Contact = React.lazy(() => import("../../pages/Contact"));
const UserAccount = React.lazy(() => import("../../pages/user/UserAccount"));

function getSessionStorageOrDefault(key: string, defaultValue: any) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
        return defaultValue;
    }
    return stored;
    //return JSON.parse(stored);
}

function getSessionStorageIsLogged() {
    const token = sessionStorage.getItem("access_token");
    if (token) {
        return true;
    }
    return false;
}

//<Route path="/login" component={() => <Login onLogin={pokeState} />}/>
export const Router = () => {
    const [isLogged, setIsLogged_] = useState(getSessionStorageIsLogged());
    const [basketCnt, setBasketCnt_] = useState(getSessionStorageOrDefault("order_basket_cnt", 0));
    const [userName, setUserName_] = useState(getSessionStorageOrDefault("user_name", ""));
    const [user, setUser] = useState({});
    const [inquiryCnt, setInquiryCnt_] = useState(getSessionStorageOrDefault("inquiry_basket_cnt", 0));

    function setInquiryCnt(value: number) {
        setInquiryCnt_(value);
        sessionStorage.setItem("inquiry_basket_cnt", value.toString());
        if (value === 0) CartClass.set_basketId(BASKET_TYPE_CHOICES.BASKET_INQUIRY, BASKET_UNKNOWN);
    }

    /* triger UI: zalogowanie lub wylogowanie */
    function setIsLogged(state: boolean) {
        setIsLogged_(state);
        if (state === false) {
            RequestClass.clearTokens();
            //sessionStorage.setItem("access_token", "");
        }
    }

    /* triger UI: zmiana ilości elementów w koszyku */
    function setBasketCnt(value: number) {
        setBasketCnt_(value);
        sessionStorage.setItem("order_basket_cnt", value.toString());
    }

    function setUserName(value: string) {
        setUserName_(value);
        sessionStorage.setItem("user_name", value);
    }

    return (
        <UserContext.Provider
            value={{
                isLogged: isLogged,
                setIsLogged: setIsLogged,
                basketCnt: basketCnt,
                setBasketCnt: setBasketCnt,
                userName: userName,
                user: user,
                setUser: setUser,
                setUserName: setUserName,
                inquiryCnt: inquiryCnt,
                setInquiryCnt: setInquiryCnt,
            }}
        >
            {/* Suspense jest konieczny, jeżeli rozbijamy pliki *.js na mniejsze  */}
            <Suspense fallback={<div>Loading...</div>}>
                {/* <BrowserRouter basename={"/"}>
                    <Routes>
                        <Route path="/bb/kursy" element={<Navigate to="/szkolenia/kursy" />} />
                    </Routes>
                </BrowserRouter> */}
                <BrowserRouter basename={"/bb"}>
                    <div className="router-content ">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <BBPageLayout bodyClassName={"has-background-white"}>
                                        {/* bodyClassName={"is-primary-gradient"}> */}
                                        <BBMain />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/panel"
                                element={
                                    <BBPageLayout isProtected={true}>
                                        <BB />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/pliki"
                                element={
                                    <BBPageLayout>
                                        <Rules />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/kontakt"
                                element={
                                    <BBPageLayout>
                                        <Contact />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/zapisy"
                                element={
                                    <BBPageLayout>
                                        <BBZapisy />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/passwdreminder/"
                                element={
                                    <BBPageLayout>
                                        <PasswdReminder system={SYSTEM_CHOICES.SYSTEM_BB} />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/passwdreminder/:redirect?"
                                element={
                                    <BBPageLayout>
                                        <PasswdReminder system={SYSTEM_CHOICES.SYSTEM_BB} />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/rejestracja/:redirect?"
                                element={
                                    <BBPageLayout>
                                        <Register system={SYSTEM_CHOICES.SYSTEM_BB} />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/login/:redirect?"
                                element={
                                    <BBPageLayout>
                                        <Login system={SYSTEM_CHOICES.SYSTEM_BB} />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/aktywacja/:key"
                                element={
                                    <BBPageLayout>
                                        <Activation activation={true} system={SYSTEM_CHOICES.SYSTEM_BB} />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/aktywacja/:key/:redirect?"
                                element={
                                    <BBPageLayout>
                                        <Activation activation={true} system={SYSTEM_CHOICES.SYSTEM_BB} />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/konto"
                                element={
                                    <BBPageLayout isProtected={true}>
                                        <UserAccount />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/konto/:activeTab/"
                                element={
                                    <BBPageLayout isProtected={true}>
                                        <UserAccount />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/koszyk/:basketId?"
                                element={
                                    <BBPageLayout>
                                        <Cart system={SYSTEM_CHOICES.SYSTEM_BB} />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/zamowienie/przelew/:orderId?"
                                element={
                                    <BBPageLayout>
                                        <Thankyou type={"przelew"} system={SYSTEM_CHOICES.SYSTEM_BB} />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/zamowienie/p24/:orderId?"
                                element={
                                    <BBPageLayout>
                                        <Thankyou type={"p24"} system={SYSTEM_CHOICES.SYSTEM_BB} />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/passwd/:key"
                                element={
                                    <BBPageLayout>
                                        <Activation activation={false} system={SYSTEM_CHOICES.SYSTEM_BB} />
                                    </BBPageLayout>
                                }
                            />
                            <Route
                                path="/passwd/:key/:redirect?"
                                element={
                                    <BBPageLayout>
                                        <Activation activation={false} system={SYSTEM_CHOICES.SYSTEM_BB} />
                                    </BBPageLayout>
                                }
                            />
                        </Routes>
                    </div>
                </BrowserRouter>

                <BrowserRouter basename={"/szkolenia"}>
                    <div className="router-content ">
                        <Routes>
                            <Route path="/redirect/:token" element={<RedirectInto />} />
                            <Route path="/" element={<Navigate to="/kursy" replace />} />
                            <Route path="/list/2" element={<TrainingOfferRedirect />} />
                            <Route path="/list/3" element={<TrainingOfferRedirect />} />
                            <Route
                                path="/pliki"
                                element={
                                    <PageLayout>
                                        <Rules />
                                    </PageLayout>
                                }
                            />
                             {/* Stary widok /szkolenia/kontakt na razie nieużywany w routingu; zachowany do ewentualnego przywrócenia.
<Route
                                path="/kontakt"
                                element={
                                    <PageLayout>
                                        <Contact />
                                    </PageLayout>
                                }
                            />
                            */}
                            <Route path="/kontakt" element={<ContactRedirect />} />
                            {/* Usunąć poniższy link po lutym 2024 */}
                            <Route
                                path="/platforma/zapytanie/:categoryId?/:basketId?"
                                element={
                                    <PageLayout>
                                        <Inquiry />
                                    </PageLayout>
                                }
                            />

                            <Route
                                path="/ankieta/:kod"
                                element={
                                    <PageLayout>
                                        <SurveyCert />
                                    </PageLayout>
                                }
                            />

                            <Route
                                path="/zapytanie/:categoryId?/:basketId?"
                                element={
                                    <PageLayout>
                                        <Inquiry />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/zapytanie/sukces"
                                element={
                                    <PageLayout>
                                        <Confirmation />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/koszyk/:basketId?"
                                element={
                                    <PageLayout>
                                        <Cart />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/zamowienie/przelew/:orderId?"
                                element={
                                    <PageLayout>
                                        <Thankyou type={"przelew"} />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/zamowienie/p24/:orderId?"
                                element={
                                    <PageLayout>
                                        <Thankyou type={"p24"} />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/login/:redirect?"
                                element={
                                    <PageLayout>
                                        <Login system={SYSTEM_CHOICES.SYSTEM_KURSY} />
                                    </PageLayout>
                                }
                            />
                            {/* <Route
                                path="/rejestracja"
                                element={
                                    <PageLayout>
                                        <Register />
                                    </PageLayout>
                                }
                            /> */}
                            <Route
                                path="/rejestracja/:redirect?"
                                element={
                                    <PageLayout>
                                        <Register system={SYSTEM_CHOICES.SYSTEM_KURSY} />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/passwdreminder/"
                                element={
                                    <PageLayout>
                                        <PasswdReminder />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/passwdreminder/:redirect?"
                                element={
                                    <PageLayout>
                                        <PasswdReminder />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/aktywacja/:key"
                                element={
                                    <PageLayout>
                                        <Activation activation={true} />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/aktywacja/:key/:redirect?"
                                element={
                                    <PageLayout>
                                        <Activation activation={true} />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/passwd/:key"
                                element={
                                    <PageLayout>
                                        <Activation activation={false} />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/passwd/:key/:redirect?"
                                element={
                                    <PageLayout>
                                        <Activation activation={false} />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/konto"
                                element={
                                    <PageLayout isProtected={true}>
                                        <UserAccount />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/konto/:activeTab/"
                                element={
                                    <PageLayout isProtected={true}>
                                        <UserAccount />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/kupon/:kupon"
                                element={
                                    <PageLayout isProtected={true}>
                                        <UserAccount />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/kursy/:productId/:lessonId"
                                element={
                                    <PageLayout isProtected={true}>
                                        <Course />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/kursy/:productId"
                                element={
                                    <PageLayout>
                                        <Course />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/bb/"
                                element={
                                    <PageLayout isProtected={true}>
                                        <BB />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/kursy/"
                                element={
                                    <PageLayout isProtected={true}>
                                        <Course />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="/home"
                                element={
                                    <PageLayout isProtected={true}>
                                        <Home />
                                    </PageLayout>
                                }
                            />
                            <Route
                                path="*"
                                element={
                                    <PageLayout>
                                        <Error />
                                    </PageLayout>
                                }
                            />
                        </Routes>
                    </div>
                    <ScrollToTop />
                </BrowserRouter>
            </Suspense>
        </UserContext.Provider>
    );
};
