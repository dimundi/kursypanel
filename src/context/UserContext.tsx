import { createContext } from "react";
import { IUserEssential } from "../interfaces/IUser";

// do trigerowania odświeżania interfesjsu
const UserContext = createContext({
    isLogged: false,
    user: {} as IUserEssential,
    setUser: (user: IUserEssential) => {},
    userName: "",
    setUserName: (userName: string) => {},
    setIsLogged: (state: boolean) => {},
    basketCnt: 0, // ilość elementów w koszyku
    setBasketCnt: (cnt: number) => {},
    inquiryCnt: 0, // ilość elementów zapytania
    setInquiryCnt: (cnt: number) => {},
});

export { UserContext };
