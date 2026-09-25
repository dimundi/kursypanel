import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCompass } from "@fortawesome/free-solid-svg-icons";

const Error = () => {
    return (
        <section className="not-found-page">
            <div className="not-found-card">
                <div className="not-found-icon" aria-hidden="true">
                    <FontAwesomeIcon icon={faCompass} />
                </div>
                <div className="not-found-content">
                    <p className="not-found-eyebrow">Błąd 404</p>
                    <h1>Nie znaleźliśmy tej strony</h1>
                    <p className="not-found-message">
                        Adres może być nieaktualny albo został wpisany z błędem. Możesz wrócić na stronę główną albo przejść do swoich kursów.
                    </p>
                    <div className="not-found-actions">
                        <Link to="/" className="button is-primary">
                            Strona główna
                        </Link>
                        <Link to="/kursy" className="button is-light">
                            <FontAwesomeIcon icon={faBookOpen} />
                            Moje kursy
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Error;
