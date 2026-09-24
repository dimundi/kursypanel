export default interface IReqError {
    // responseStatus?: string,
    status: number; // status odpowiedzi HTML
    errCode?: string | undefined; // kod błędu z API
    warning?: boolean | undefined; // kod ostrzeżenia z API
    msg?: string; // informacja dla klienta
    detail?: string; // szczegóły dla administratora
    msgDescr?: string; // szczegóły dla użytkownika

    /* kdy zwracane przez oAuth  */
    error_description?: string; // opis błędu
    error?: string; // typ błędu
}
