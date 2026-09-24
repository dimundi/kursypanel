import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import HelperClass from "../../classes/HelperClass";
import { IUserCert } from "../../interfaces/ICertification";
import RequestClass from "../../classes/RequestClass";
import { Link } from "react-router-dom";

const CertListItem = (props: { cert: IUserCert }) => {
    return (
        <>
            <div className="mb-5">
                <Link target="_blank" to={props.cert.fileUrl + "?token=" + RequestClass.getToken()}>
                    <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
                    {props.cert.cName}
                </Link>
                <div>certyfikat utworzony: {HelperClass.formatDate(props.cert.created)}</div>
            </div>
        </>
    );
};

export default CertListItem;
