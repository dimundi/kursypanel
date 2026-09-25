import { useEffect } from "react";

export const TRAINING_OFFER_URL = "https://odnrewers.pl/szkolenia-dla-nauczycieli/";

// Compatibility for bookmarks to the retired public catalogue.
export default function TrainingOfferRedirect() {
    useEffect(() => {
        window.location.replace(TRAINING_OFFER_URL);
    }, []);
    return <p>Przechodzenie do oferty szkoleń… <a href={TRAINING_OFFER_URL}>Otwórz ofertę</a></p>;
}
