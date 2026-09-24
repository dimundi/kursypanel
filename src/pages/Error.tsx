import React from "react";
// import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { NavLink } from "react-router-dom";

const Error = () => {
    return (
        <section className="hero is-medium is-bold">
            <div className="hero-body">
                <div className="container readable">
                    <h1 className="title">Ups... Taka strona nie istnieje 🤔</h1>
                    <div>
                        <small>
                            Sprawdź adres albo wróć na <NavLink to="/">stronę główną</NavLink>.
                        </small>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Error;
