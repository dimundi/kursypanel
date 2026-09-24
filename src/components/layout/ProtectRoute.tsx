import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ProtectedRoute = (props: { children: JSX.Element }) => {
    const { isLogged } = useContext(UserContext);
    const { pathname } = useLocation();

    if (isLogged === false) {
        //console.log(pathname);
        var p = "/" + pathname.substring(1).replaceAll("/", "_");
        return <Navigate to={"/login" + p} replace />;
    }
    return props.children;
};

export default ProtectedRoute;
