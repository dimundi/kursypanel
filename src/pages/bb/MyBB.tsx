import { useEffect, useState } from "react";
import BBContainer from "./BBContainer";
import BBRegister from "./BBRegister";
import Wait from "../../components/elements/Wait";
import RequestClass from "../../classes/RequestClass";
import { requestState } from "../../components/types/custom";
import BBRegisterList from "./BBRegisterList";
import { IBBApi } from "../../interfaces/IBB";
import { useNavigate } from "react-router-dom";
import BBHelpMsg from "./BBHelpMsg";

type myBBTabType = "LIST" | "ADD";

const MyBB = () => {
    const [tab, setTab] = useState("LIST" as myBBTabType);
    const [bbAPI, setBBApi] = useState({} as IBBApi);
    const [notification, setNotification] = useState<JSX.Element | String>();
    const navigate = useNavigate();
    /* czy wymagane zapytanie do API */
    // const [apiRequired, setApiRequired] = useState(true);
    /* czy odebrane zapytanie z API */
    const [apiReadState, setApiReadState] = useState("Start" as requestState);

    useEffect(() => {
        const err_callback = (result: any) => {
            setNotification(RequestClass.errorAlert(result));
            setApiReadState("Error");
        };
        const succ_callback = (result: any) => {
            setBBApi({ ...bbAPI, participants: result.participants, products: result.products, shipment: result.shipment });
            setApiReadState("OK");
            if (result.participants.length === 0) setTab("ADD");
            setNotification(<></>);
        };
        if (apiReadState === "Start") {
            /* wysyłam zapytanie do API */
            setApiReadState("Progress");
            RequestClass.makeRequest("bb/", null, succ_callback, err_callback);
            setNotification(<></>);
        }
    }, [apiReadState]);

    /*  ****************************************************************** */
    function myList() {
        return (
            <>
                <BBRegisterList
                    bbApi={bbAPI}
                    setBBApi={setBBApi}
                    order_calback={(basketId: string) => {
                        /* linkujemy na nową stronę finalizacji zamówienia */
                        navigate("/koszyk/" + basketId);
                        // setTab("ORDER");
                    }}
                    refresh_calback={() => setApiReadState("Start")}
                >
                    <div className="button has-background-primary-light my-1" onClick={() => setTab("ADD")}>
                        {bbAPI.participants !== undefined && bbAPI.participants.length > 0
                            ? "Dodaj kolejnego uczestnika"
                            : "Zapisz się na Bieg Belfrów_"}
                    </div>
                </BBRegisterList>
                <BBHelpMsg />
            </>
        );
    }

    /*  ****************************************************************** */
    function myAdd() {
        return (
            <>
                <BBRegister
                    bbApi={bbAPI}
                    back_calback={() => {
                        setTab("LIST");
                    }}
                    userAdd_calback={(message) => {
                        setTab("LIST");
                        setNotification(
                            RequestClass.succAlert("Dziękujemy!", <div>Uczestnik został dodany do listy. Niezapomnij opłacić opłaty startowej.</div>)
                        );
                        /* wymuzam nowe pobranie uczestników */
                        setApiReadState("Start");
                    }}
                />
            </>
        );
    }
    /*  ****************************************************************** */
    if (apiReadState === "Progress" || apiReadState === "Error") {
        return (
            <BBContainer>
                {notification && apiReadState === "Progress" && (
                    <div className="mt-5">
                        <Wait></Wait>
                    </div>
                )}
                {notification && apiReadState === "Error" && (
                    <>
                        <div
                            className="mt-5"
                            onClick={() => {
                                setNotification(<></>);
                                setApiReadState("Start");
                            }}
                        >
                            <button className="button  mt-4 is-warning">Spróbuj ponownie</button>
                        </div>
                    </>
                )}

                {notification}
            </BBContainer>
        );
    }
    // console.log("Render MyBB");
    return (
        <>
            <BBContainer>
                {notification}
                {/* <MyBBStatus /> */}
                {tab === "LIST" && myList()}
                {tab === "ADD" && myAdd()}
            </BBContainer>
        </>
    );
};

export default MyBB;
