/* informacje o kontakcie z biurem w przypadku problemów */

import { EMAIL_BIURO, TELEFON_BIURO } from "../Enumerators";

const EmergencyContact = () => {
    return (
        <>
            <div className="has-text-centered mt-2">
                W przypadku problemów prosimy o kontakt z biurem tel. <b>{TELEFON_BIURO}</b> lub adres <b>{EMAIL_BIURO}</b>
            </div>
        </>
    );
};

export default EmergencyContact;
