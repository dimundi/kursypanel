import UserDataContainer from "./UserDataContainer";
import { useUserAccountContext } from "../../context/UserAccountContext";
import CertListItem from "../certificate/CertListItem";
import { isMobile } from "react-device-detect";

const UserCert = () => {
    const { certs } = useUserAccountContext();
    //console.log(certs)
    return (
        <>
            <UserDataContainer apiCertRequired={true} waitMsg="Pobieram listę certyfikatów">
                <>
                    {isMobile && <div className="mb-3 has-text-weight-bold">Twoje certyfikaty</div>}
                    {certs?.length === 0 ? (
                        <div>Nie masz jeszcze certyfikatów.</div>
                    ) : (
                        <>
                            {certs?.map((cert, index) => (
                                <CertListItem key={index} cert={cert} />
                            ))}
                        </>
                    )}
                </>
            </UserDataContainer>
        </>
    );
};

export default UserCert;
