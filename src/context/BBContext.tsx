import { Dispatch, SetStateAction, createContext, useContext } from "react";

export type BBTabType = "moje" | "grupa";
export type BBContextType = {
    notification?: String | JSX.Element;
    setNotification?: Dispatch<SetStateAction<String | undefined | JSX.Element>>;

    activeTab?: BBTabType;
    setActiveTab?: Dispatch<SetStateAction<BBTabType>>;
};

export const BBContext = createContext<BBContextType>({});

export const useBBContext = () => useContext(BBContext);
