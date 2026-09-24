/* funkcje zarządza logowaniem i uprawnieniami użytkoenika */

import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

/* sprawdzam czy użytkownik jest zalogowany, jeżeli nie to wymuszam logowanie */
export const CheckIfUserIsLogged = (redirect?: string) => {
    const { isLogged, setIsLogged } = useContext(UserContext);
    const navigation = useNavigate();

    if (
        !isLogged ||
        sessionStorage.getItem("access_token") === "" ||
        sessionStorage.getItem("access_token") === null
    ) {
        let path;
        if (redirect) {
            path = "/login/" + redirect;
        } else path = "/login/account";

        if (isLogged) {
            setIsLogged(false);
        }
        navigation(path);
    }
};
