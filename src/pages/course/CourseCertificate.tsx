import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { useUserCourseContext } from "../../context/UserCourseContext";
import { CERT_STATUS_CHOICES } from "../../components/Enumerators";
import CourseContainer from "./CourseContainer";
import UserCert from "../certificate/UserCert";

export default function CourseCertificate() {
    const { userCourse } = useUserCourseContext();
    const certExists = userCourse?.cert?.status === CERT_STATUS_CHOICES.CERT_STATUS_EXISTS;

    return (
        <CourseContainer apiCoursesRequired={true} noPadding={true}>
            <section className={"course-certificate course-certificate-tab" + (certExists ? " is-ready" : "")} aria-labelledby="course-certificate-title">
                <div className="course-certificate-heading">
                <span className="course-certificate-icon" aria-hidden="true"><FontAwesomeIcon icon={faCertificate} /></span>
                <h2 id="course-certificate-title">Twój certyfikat</h2>
                </div>
                <div className="course-certificate-content">
                {userCourse?.cert && userCourse.cert.status !== CERT_STATUS_CHOICES.CERT_STATUS_NOT_AVAILABLE
                    ? <UserCert cert={userCourse.cert} />
                    : <p>Do tego szkolenia nie jest dostępny certyfikat.</p>}
                </div>
            </section>
        </CourseContainer>
    );
}
