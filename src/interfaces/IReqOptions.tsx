export default interface IReqOptions {
    method: string;
    body?: string | URLSearchParams;
    headers?: Headers;
    skipAuth?: boolean; // czy pominąć autoryzację TOKENEM
    tempAuth?: boolean; // czy użyć alternatywnego tokena temp_token_auth
    server?: "api" | "auth";
    responseType?: "json" | "any";
}
