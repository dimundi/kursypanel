import { EMAIL_BIURO, TELEFON_BIURO } from "../../components/Enumerators";

export default function BBHelpMsg() {
    return (
        <>
            <div className="my-4 mx-2">
                W przypadku pytań bądź wątpliwości prosimy o kontakt: <strong>{EMAIL_BIURO}</strong> lub <strong>{TELEFON_BIURO}</strong>.
            </div>
        </>
    );
}
