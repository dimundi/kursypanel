import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import HelperClass from "../../classes/HelperClass";
import { IUserCert } from "../../interfaces/ICertification";
import RequestClass from "../../classes/RequestClass";
import { Link } from "react-router-dom";

const CertListItem = (props: { cert: IUserCert; variant?: "default" | "account" }) => {
    const certUrl = props.cert.fileUrl + "?token=" + RequestClass.getToken();

    if (props.variant !== "account") {
        return (
            <div className="mb-5">
                <Link target="_blank" to={certUrl}>
                    <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
                    {props.cert.cName}
                </Link>
                <div>certyfikat utworzony: {HelperClass.formatDate(props.cert.created)}</div>
            </div>
        );
    }

    return (
        <article className="account-cert-card">
            <div className="account-cert-card-icon" aria-hidden="true">
                <FontAwesomeIcon icon={faFilePdf} />
            </div>
            <div className="account-cert-card-content">
                <h3>{props.cert.cName}</h3>
                <div className="account-cert-card-meta">Certyfikat utworzony: {HelperClass.formatDate(props.cert.created)}</div>
            </div>
            <Link className="button is-primary account-cert-card-action" target="_blank" to={certUrl}>
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Pobierz PDF
            </Link>
        </article>
    );
};

export default CertListItem;
