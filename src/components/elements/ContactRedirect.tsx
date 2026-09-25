import { useEffect } from "react";

export const CONTACT_URL = "https://odnrewers.pl/kontakt/";

export default function ContactRedirect() {
    useEffect(() => {
        window.location.replace(CONTACT_URL);
    }, []);

    return <p>Przechodzenie do strony kontaktowej… <a href={CONTACT_URL}>Otwórz kontakt</a></p>;
}
