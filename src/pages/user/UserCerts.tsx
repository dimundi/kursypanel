import UserDataContainer from "./UserDataContainer";
import { useUserAccountContext } from "../../context/UserAccountContext";
import CertListItem from "../certificate/CertListItem";
import { isMobile } from "react-device-detect";

const UserCert = () => {
    const { certs } = useUserAccountContext();

    return (
        <>
            <UserDataContainer apiCertRequired={true} waitMsg="Pobieram listę certyfikatów">
                <>
                    {isMobile && <div className="mb-3 has-text-weight-bold">Twoje certyfikaty</div>}
                    {certs?.length === 0 ? (
                        <div className="account-empty-state">Nie masz jeszcze certyfikatów.</div>
                    ) : (
                        <div className="account-cert-list">
                            {certs?.map((cert, index) => (
                                <CertListItem key={index} cert={cert} variant="account" />
                            ))}
                        </div>
                    )}
                </>
            </UserDataContainer>
        </>
    );
};

export default UserCert;
