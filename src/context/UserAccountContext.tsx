import { Dispatch, SetStateAction, createContext, useContext } from "react";
import type { IOrder } from "../interfaces/IOrder";
import { IUser } from "../interfaces/IUser";
import { IUserCert } from "../interfaces/ICertification";
//import { IUserCourse } from "../interfaces/IUserCourse";

export type UserAccountContextType = {
    orders?: IOrder[];
    setOrders?: Dispatch<SetStateAction<IOrder[]>>;
    isOrdersRead?: boolean;
    setIsOrdersRead?: Dispatch<SetStateAction<boolean>>;

    certs?: IUserCert[];
    setCerts?: Dispatch<SetStateAction<IUserCert[]>>;
    isCertDataRead?: boolean;
    setIsCertDataRead?: Dispatch<SetStateAction<boolean>>;

    // isCoursesRead?:boolean,
    // setIsCoursesRead?:Dispatch<SetStateAction<boolean>>,
    // courses?:IUserCourse[],
    // setCourses?:Dispatch<SetStateAction<IUserCourse[]>>,

    userData?: IUser;
    setUserData?: Dispatch<SetStateAction<IUser>>;
    isUserDataRead?: boolean;
    setIsUserDataRead?: Dispatch<SetStateAction<boolean>>;
    notification?: String | JSX.Element;
    setNotification?: Dispatch<SetStateAction<String | undefined | JSX.Element>>;

    activeTab?: string; // numer kolejny tab'a
};

export const UserAccountContext = createContext<UserAccountContextType>({});

export const useUserAccountContext = () => useContext(UserAccountContext);
