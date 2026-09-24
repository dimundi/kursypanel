/* to wszystko jest do usuniecia -> zastąpic RequestClass.tsx */
import {Notification} from "./Notification";

const FetchErrorAlert = () => {
   
    return(
        <Notification type="mute" lead="Wystąpił błąd połączenia." code={helpersFetch.responseStatus} msg="Spróbuj ponownie za chwilę lub sprawdź połączenie internetowe. Jeżeli problem będzie się powtarzał, skontaktuj się z biuro@rewers.edu.pl." />
    );
}

const helpersFetch = {

    responseOk: false,
    responseStatus: null,

    parseFetchResponse: function(response){
        helpersFetch.responseOk      = response.ok;
        helpersFetch.responseStatus  = response.status;
        //debug console.log(helpersFetch.responseOk, helpersFetch.responseStatus);
        if (typeof response.json === "function")
            return response.json();
        else
            return {msg: "Nieidentyfikowany błąd odpowiedzi.", errCode: "ui_fetch_001"}; //nie powinno się zdarzyć, bo try,catch fetcha przechwytuje grube błędy, ale na wszelki wypadek
    },

    fetchResponseAlert: function() {
        return (<FetchErrorAlert status={helpersFetch.responseStatus}/>);
    },

    handleFetchErrors: function(result, msgFunction, customErrorHandle){
        if(!helpersFetch.responseOk){
            if (msgFunction !== undefined) msgFunction(<Notification type="danger" msg={result.msg || result.detail || 'Wystąpił nieznany błąd.'} code={result.errCode || result.status_code || 'nieznany'}/>);
            if (customErrorHandle !== undefined) customErrorHandle(result);
            return false;
        }
        return true;
    },

    makeRequest: function(requestUrl, requestOptions, callback, setMsg, customErrorHandle) {
                
        return
        if  (requestOptions.headers === undefined) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json; charset=UTF-8");
            requestOptions.headers=myHeaders;
        }
        
        // console.log(requestOptions.headers);
        // console.log(requestOptions.headers.get("Authorization"));

        if (requestOptions.headers.get("Authorization") === null) {
            let token= sessionStorage.getItem('access_token');
            if (token !== null) {
                requestOptions.headers.append("Authorization", 'Bearer '+sessionStorage.getItem('access_token'));
            }                        
        }
        

        return fetch( requestUrl, requestOptions )
        .then( helpersFetch.parseFetchResponse )
        .then(result => {
          if(!helpersFetch.handleFetchErrors(result, setMsg, customErrorHandle)) return;
          callback(result);
        })
        .catch(error => {
          setMsg(helpersFetch.fetchResponseAlert);
        });
    },
    

}

export default helpersFetch;