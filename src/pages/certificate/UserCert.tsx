/* certyfikat użytkownika wyświetlany podczas edycji kursu do kursu */
import { CERT_STATUS_CHOICES, TEST_TYPE_CHOICES } from "../../components/Enumerators";
import CreateCerButton from "./CreateCertButton";
import { IUserCert } from "../../interfaces/ICertification";
import CertListItem from "./CertListItem";
import { useUserCourseContext } from "../../context/UserCourseContext";

export default function UserCert(props: { cert?: IUserCert }) {
    const { activeTab, setActiveTab } = useUserCourseContext();

    /* certyfikat istnieje */
    if (props.cert?.status === CERT_STATUS_CHOICES.CERT_STATUS_EXISTS) {
        return <CertListItem cert={props.cert} />;
    }

    /* certyfikatu nie wystawiamy! */
    if (props.cert?.status === CERT_STATUS_CHOICES.CERT_STATUS_NOT_AVAILABLE) {
        return <>Do tego szkolenia nie wystawiamy certyfikatu</>;
    }
    /* czy certyfikat nie istnieje, ale można go wystawić */
    if (props.cert?.conditions === undefined || props.cert?.conditions === null) {
        return (
            <>
                <div className="mt-2">Gratulacje możesz utworzyć certyfika ukończenia szkolenia.</div>
                <CreateCerButton cert={props.cert} className="mt-4" />
            </>
        );
    }

    /* certyfikat nie istnieje i musisz spełnić warunki jego wystawienia */
    return (
        <>
            <div className="mt-2">W celu otrzymania certyfikatu musisz jeszcze:</div>
            {props.cert?.conditions?.map((certCond, index) => (
                <div key={index}>
                    {certCond.type === TEST_TYPE_CHOICES.TEST_TYPE_SURVEY && " - wypełnić ankietę: "}

                    <a
                        onClick={() => {
                            if (activeTab !== "ankieta") {
                                if (setActiveTab) setActiveTab("ankieta");
                                return false;
                            }
                        }}
                    >
                        {certCond.name}
                    </a>
                </div>
            ))}
        </>
    );
}
