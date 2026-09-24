/* przycisk dodawania/generowania certyfiaktu */

import { useState } from "react";
import RequestClass from "../../classes/RequestClass";
import { useUserCourseContext } from "../../context/UserCourseContext";
import { faArrowRight, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { IUserCert } from "../../interfaces/ICertification";

export default function CreateCerButton(props: { cert?: IUserCert; className?: string }) {
    const [notification, setNotification] = useState<JSX.Element | String>();
    const { setIsUserCourseRead } = useUserCourseContext();

    const [content, setContent] = useState<JSX.Element | String>(
        <button className={"p-2 button is-accent " + props.className} onClick={() => checkUserName()}>
            Utwórz certyfikat
        </button>
    );

    function checkUserName() {
        setContent(
            <>
                <div className="mt-3 is-size-5">Proszę zweryfikuj dane, które pojawią się na certyfikacie</div>
                <div className="mt-3">
                    Imię i nazwisko: <b>{props.cert?.userName}</b> <Link to="/konto/osobowe">(zmień)</Link>
                </div>
                <div className="mb-3">
                    <button className={"p-2 button is-accent " + props.className} onClick={() => action()}>
                        Wszystko się zgadza, utwórz certyfikat
                    </button>
                </div>

                <div className="mb-3">Po wygenerowaniu wszelkie zmiany na certyfikacie są możliwe za pośrednictwem naszego biura.</div>
            </>
        );
    }

    function action() {
        const err_callback = (result: any) => {
            if (setNotification) setNotification(RequestClass.errorAlert(result));
        };

        function succ_callback(result: any) {
            if (setNotification)
                setNotification(
                    RequestClass.succAlert(
                        "Gratulacje!",
                        <>
                            Certyfikat został utworzony! Możesz go pobrać tutaj <FontAwesomeIcon className="mx-2" icon={faArrowRight} />{" "}
                            <a href={result.cert}>
                                <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
                                Twój certyfikat
                            </a>
                            <div className="mt-3">
                                Zawsze możesz pobrać swoje certyfikaty:<br></br>
                                1. rozwiń menu w prawym górnym rogu ekranu i wybierz{" "}
                                <Link to="/konto" className="has-text-weight-bold">
                                    Konto
                                </Link>
                                , <br></br>2. przejdź do zakładki <b>Certyfikaty</b> .
                            </div>
                        </>
                    )
                );
            /* wymuś przeładownie informacji o kursie */
            if (setIsUserCourseRead) setIsUserCourseRead(false);
            setContent(<></>);
        }

        /* WYŚLIJ ZAPYTANIE O WYGENREROWANIE CERTYFIKATU */
        return RequestClass.makeRequest("course/" + props.cert?.productId + "/cert/", null, succ_callback, err_callback);
    }

    if (props.cert?.productId === null) {
        return <></>;
    }
    return (
        <>
            {content}
            {notification}
        </>
    );
}
