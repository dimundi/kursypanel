import { useState } from "react";
import UserData from "./UserData";
import OrderList from "../order/OrderList";
import { UserAccountContext } from "../../context/UserAccountContext";
import { IOrder } from "../../interfaces/IOrder";
import { IUser } from "../../interfaces/IUser";
import UserVAT from "./UserVAT";
import UserCert from "./UserCerts";
import UserCouponList from "./UserCouponList";
import { IUrlCoupon } from "../../interfaces/IUrl";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/layout/PageTitle";
import { faBagShopping, faCertificate, faFileInvoice, faTicket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isMobile } from "react-device-detect";
import BodyContainer from "../../components/layout/BodyContainer";
import { IUserCert } from "../../interfaces/ICertification";

const UserAccount = () => {
    type taTypesType = "zamowienia" | "osobowe" | "none" | "rozliczeniowe" | "certyfikaty" | "kupony"; //| 'kursy'
    const urlParams = useParams<IUrlCoupon>();

    const navigate = useNavigate();
    const tabs = ["zamowienia", "osobowe", "rozliczeniowe", "certyfikaty", "kupony"];
    const activeTab: taTypesType = urlParams.kupon ? "kupony"
        : tabs.includes(urlParams.activeTab || "") ? urlParams.activeTab as taTypesType : "zamowienia";
    const setActiveTab = (tab: taTypesType) => navigate("/konto/" + tab);
    /* te hooki będę wykorzystywane w zakładkach */
    const [orders, setOrders] = useState<IOrder[]>([] as IOrder[]);
    const [certs, setCerts] = useState<IUserCert[]>([] as IUserCert[]);
    //  const [courses, setCourses] = useState<IUserCourse[]>([] as IUserCourse[])
    //  const [isCoursesRead, setIsCoursesRead] = useState(false)
    const [isOrdersRead, setIsOrdersRead] = useState(false);
    // const [tabNo, setTabNo] = useState(1)
    const [userData, setUserData] = useState<IUser>({});
    const [isUserDataRead, setIsUserDataRead] = useState(false);
    const [isCertDataRead, setIsCertDataRead] = useState(false);
    const [notification, setNotification] = useState<JSX.Element | String>();

    return (
        <>
            <PageTitle><h1>{{
                zamowienia: "Zamówienia",
                osobowe: "Dane osobowe",
                rozliczeniowe: "Dane rozliczeniowe",
                certyfikaty: "Certyfikaty",
                kupony: "Kupony",
                none: "Twoje konto",
            }[activeTab]}</h1></PageTitle>

            <section>
                <div className="container userAccount">
                    <div className="tabs">
                        <ul>
                            {/* <li className={activeTab==="kursy" ? "is-active":""}><a onClick={() => {setActiveTab("kursy")}}>Twoje kursy</a></li> */}
                            <li className={activeTab === "zamowienia" ? "is-active" : ""}>
                                <a
                                    onClick={() => {
                                        setActiveTab("zamowienia");
                                    }}
                                >
                                    {isMobile ? <FontAwesomeIcon icon={faBagShopping} /> : <>Zamówienia</>}
                                </a>
                            </li>
                            <li className={activeTab === "osobowe" ? "is-active" : ""}>
                                <a
                                    onClick={() => {
                                        setActiveTab("osobowe");
                                    }}
                                >
                                    {isMobile ? <FontAwesomeIcon icon={faUser} className="userAccount" /> : <>Dane osobowe</>}
                                </a>
                            </li>
                            <li className={activeTab === "rozliczeniowe" ? "is-active" : ""}>
                                <a
                                    onClick={() => {
                                        setActiveTab("rozliczeniowe");
                                    }}
                                >
                                    {isMobile ? <FontAwesomeIcon icon={faFileInvoice} /> : <>Dane rozliczeniowe</>}
                                </a>
                            </li>
                            <li className={activeTab === "certyfikaty" ? "is-active" : ""}>
                                <a
                                    onClick={() => {
                                        setActiveTab("certyfikaty");
                                    }}
                                >
                                    {isMobile ? <FontAwesomeIcon icon={faCertificate} /> : <>Certyfikaty</>}
                                </a>
                            </li>
                            <li className={activeTab === "kupony" ? "is-active" : ""}>
                                <a
                                    onClick={() => {
                                        setActiveTab("kupony");
                                    }}
                                >
                                    {isMobile ? <FontAwesomeIcon icon={faTicket} /> : <>Kupony</>}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <UserAccountContext.Provider
                        value={{
                            activeTab,
                            notification,
                            setNotification,
                            orders,
                            isOrdersRead,
                            setIsOrdersRead,
                            setOrders,
                            userData,
                            isUserDataRead,
                            setIsUserDataRead,
                            setUserData,
                            certs,
                            setCerts,
                            isCertDataRead,
                            setIsCertDataRead,
                            // courses, setCourses, isCoursesRead, setIsCoursesRead
                        }}
                    >
                        {/* { activeTab==="kursy" && 
                        <UserCoursesList/>
                } */}
                        <BodyContainer>
                            {activeTab === "certyfikaty" && <UserCert />}
                            {activeTab === "zamowienia" && <OrderList />}
                            {activeTab === "osobowe" && <UserData />}
                            {activeTab === "rozliczeniowe" && <UserVAT />}
                            {activeTab === "kupony" && <UserCouponList />}
                        </BodyContainer>
                    </UserAccountContext.Provider>
                </div>
            </section>
        </>
    );
};

export default UserAccount;
