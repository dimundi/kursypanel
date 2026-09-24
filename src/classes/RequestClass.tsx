import { RefCallBack } from "react-hook-form";
import IReqOptions from "../interfaces/IReqOptions";
import IReqError from "../interfaces/IReqError";
import { Notification, NotificationType } from "../components/Notification";
import { ReactElement } from "react";
import { EMAIL_BIURO } from "../components/Enumerators";

export default class RequestClass {
    /*  funkcja statyczna zwraca token
     */
    public static getToken() {
        return sessionStorage.getItem("access_token");
    }
    public static setToken(token: string) {
        sessionStorage.setItem("access_token", token);
    }
    public static clearTokens() {
        sessionStorage.setItem("access_token", "");
        RequestClass.clearTempToken();
    }

    /* pobierz tymczasowy token
     */
    public static getTempToken() {
        return sessionStorage.getItem("temp_access_token");
    }

    public static setTempToken(token: string) {
        sessionStorage.setItem("temp_access_token", token);
    }
    public static clearTempToken() {
        sessionStorage.setItem("temp_access_token", "");
    }

    /*  funkcja statyczna do wysyłania zapytań 
        requestUrl - ścieżka względna
        */
    public static makeRequest(
        requestUrl: string,
        reqOptions: IReqOptions | null,
        success_callback: RefCallBack | null,
        error_callback: RefCallBack | null,
        warning_callback?: RefCallBack
    ) {
        //requestUrl, requestOptions, callback, setNotification) {
        let req = new RequestClass();
        if (reqOptions === null) {
            /* jeżeli nie podanu opcji to wstawiam domyślne */
            reqOptions = {
                method: "GET",
            };
        }
        if (reqOptions.server === undefined) {
            reqOptions.server = "api";
        }
        let url = process.env.REACT_APP_API_URL;
        if (reqOptions.server === "auth") {
            url = process.env.REACT_APP_AUTH_URL;
        }

        req.send(url + requestUrl, reqOptions, success_callback, error_callback, warning_callback);
    }

    responseOk: boolean;
    responseStatus: number;

    constructor() {
        this.responseOk = false;
        this.responseStatus = 0;
    }

    public async send(
        requestUrl: string,
        requestOptions: IReqOptions,
        success_callback: RefCallBack | null,
        error_callback: RefCallBack | null,
        warning_callback?: RefCallBack
    ) {
        if (requestOptions.headers === undefined) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json; charset=UTF-8");
            requestOptions.headers = myHeaders;
        }

        if (requestOptions.skipAuth === undefined || requestOptions.skipAuth === false) {
            if (requestOptions.headers.get("Authorization") === null) {
                let token = requestOptions.tempAuth === true ? RequestClass.getTempToken() : RequestClass.getToken();
                if (token !== null) {
                    requestOptions.headers.append("Authorization", "Bearer " + token);
                }
            }
        }

        return fetch(requestUrl, requestOptions)
            .then((response) => {
                this.responseOk = response.ok;
                this.responseStatus = response.status;
                // if (!response.ok) {
                // throw new Error(`HTTP error, status = ${response.status}`);
                // }

                let contentType = response.headers.get("content-type");
                if (contentType === "application/pdf") {
                    return response.blob();
                }
                return response.json();
            })
            .then((dataJson) => {
                //const blob = new Blob([dataJson], { type: "application/pdf" });
                if (dataJson["type"] == "application/pdf") {
                    if (this.responseOk) {
                        const url = URL.createObjectURL(dataJson);
                        const pdfWindow = window.open();
                        if (pdfWindow != undefined) pdfWindow.location.href = url;
                        if (success_callback) success_callback(undefined);
                    }
                } else {
                    if (this.responseOk) {
                        if (success_callback) success_callback(dataJson);
                    }
                }
                if (!this.responseOk) {
                    {
                        var err: IReqError = dataJson;
                        if (err.errCode === undefined) err.errCode = this.responseStatus.toString();
                        err.status = this.responseStatus;

                        if (this.responseStatus === 401) {
                            /* błąd uwierzytelniania -> natychmiastowe wylogowanie */
                            sessionStorage.setItem("access_token", "");
                        }

                        if (err.warning !== undefined && err.warning === true && warning_callback) {
                            warning_callback(err);
                        } else if (error_callback) error_callback(err);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                var err: IReqError = {
                    status: 0,
                    errCode: "ui_fetch_001",
                    detail: error,
                };
                if (error_callback) error_callback(err);
            });
    }
    /* sprawdzenie czy błąd wymaga wylogowania się */
    public static logoutOnError(err: IReqError) {
        if (err.errCode !== undefined) {
            if (err.errCode === "401") return true;
            //console.log(err.errCode)
        }
        return false;
    }

    /* formatowanie błedu do wyświetlenia na ekranie */
    public static errorAlert(err: IReqError, warning?: boolean) {
        //console.log(err)
        let lead = "Wystąpił błąd połączenia.";
        let dispType: NotificationType = "danger";
        let msg = "";
        if (warning !== undefined && warning === true) {
            dispType = "warning";
        } else msg = "W przypadku pytań prosimy o kontakt " + EMAIL_BIURO;

        if (err.status === 400 && err.error_description !== undefined && err.error_description === "Invalid credentials given.") {
            lead = "Niepoprawny login lub hasło";
            msg = "Sprawdź login i hasło, ewentualnie zresetuj hasło.";
        } else {
            if (err.msg !== undefined) {
                lead = err.msg;
                // msg = "Jeżeli problem będzie się powtarzał, skontaktuj się z " + EMAIL_BIURO;
            }
            if (err.msgDescr !== undefined) {
                msg = err.msgDescr;
            }
        }

        if (err.status === 417 /* Expectation Failed */) {
            /* nie wyświetlaj inormacji, aby sprawdzić połączenie */
            msg = "";
        }

        return (
            <Notification type={dispType} lead={lead} code={err.errCode}>
                {msg}
            </Notification>
        );
    }

    // /* formatowanie ostrzeńenia do wyświetlenia na ekranie */
    // public static warningAlert(title: string, msg: ReactElement) {
    //     return (
    //         <Notification type="warning" lead={title}>
    //             {msg}
    //         </Notification>
    //     );
    // }

    /* formatowanie sukcesu do wyświetlenia na ekranie */
    public static succAlert(title: string, msg: ReactElement) {
        return (
            <Notification type="success" lead={title}>
                {msg}
            </Notification>
        );
    }
}
