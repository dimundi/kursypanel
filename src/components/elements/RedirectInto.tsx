import { useNavigate, useParams } from "react-router-dom";
import { IUrlRedirectInto } from "../../interfaces/IUrl";
import RequestClass from "../../classes/RequestClass";
import { useEffect, useState } from "react";

export const RedirectInto = () => {
    const urlParams = useParams<IUrlRedirectInto>();
    const navigation = useNavigate();
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        if (urlParams.token !== undefined) {
            RequestClass.setToken(urlParams.token);
            navigation("/konto");
        }
    }, [navigation]);

    if (urlParams.token !== undefined) {
        RequestClass.setToken(urlParams.token);
    }

    return <>błąd przekierowania</>;
};
