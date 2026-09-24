/* -------------------------------------------------------------
 * potwierdzenie wysłania zapytania
 * ------------------------------------------------------------- */

import UsrMsgTempl from "./user/UserMsgTempl";
import { Notification } from "../components/Notification";
import { Link } from "react-router-dom";

const Confirmation = () => {
    return (
        <UsrMsgTempl title="">
            <Notification type="success" lead="Sukces">
                Twoje zapytanie zostało wysłane. Dziękujemy!
            </Notification>

            <div className={"mt-5"}>
                <Link to="/">Wróć do sklepu</Link>
            </div>
        </UsrMsgTempl>
    );
};

export default Confirmation;
