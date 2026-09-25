import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faArrowRight, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import HelperClass from "../../classes/HelperClass";
import { IUserCourse } from "../../interfaces/IUserCourse";
import ProdType from "../products/ProdType";
import UserCourseStartButton from "./UserCourseStartButton";
import { COURSE_TYPES_CHOICES, DATE_FORMAT_CHOICES, ORDER_STATUS_CHOICES } from "../../components/Enumerators";
import ProdTerm from "../products/ProdTerm";
import ProdDuration from "../products/ProdDuration";
import OrderStatus from "../order/OrderStatus";

const UserCoursesListElement = (props: { course?: IUserCourse; index: number }) => {
    const [showMore, setShowMore] = useState(false);

    const [failedImage, setFailedImage] = useState<string>();
    const image = props.course?.prodDef?.img;
    const title = props.course?.product?.pName || props.course?.prodDef?.name || "Szkolenie";
    const canOpen = HelperClass.courseIsValid(props.course) && HelperClass.isEkurs(props.course?.product) && !!props.course?.product?.productId;
    const cover = image && image !== failedImage ? (
        <img src={image} alt="" loading="lazy" onError={() => setFailedImage(image)} />
    ) : (
        <div className="course-card-placeholder" aria-hidden="true"><FontAwesomeIcon icon={faBookOpen} /></div>
    );
    return (
        <>
            <article className="course-card">
                {canOpen ? (
                    <Link className="course-card-image" to={"/kursy/" + props.course?.product?.productId}
                        aria-label={(props.course?.progress?.started ? "Kontynuuj kurs: " : "Rozpocznij kurs: ") + title}>
                        {cover}
                    </Link>
                ) : <div className="course-card-image">{cover}</div>}
                <div className="course-card-body">
                <div className="course-card-type">
                    <ProdType prodType={props.course?.product?.prodType} courseType={props.course?.product?.courseType} />
                </div>
                <h2 className="course-card-title">{title}</h2>
                {props.course?.product?.courseType === COURSE_TYPES_CHOICES.COURSE_TYPE_WEBINAR &&
                    (!HelperClass.dateIsPast(props.course?.product.start, props.course?.product.stop) ? (
                        <>
                            <ProdTerm inStore={props.course.product} breakLine={false} showIcon={true} size={"XS"} />
                            <ProdDuration inStore={props.course.product} showIcon={true} size={"XXS"} />
                            <span className="tag is-light">W sprawach organizacyjnych będziemy kontaktować się mailowo.</span>
                        </>
                    ) : (
                        "Szkolenie się odbyło"
                    ))}
                {props.course?.product?.courseType === COURSE_TYPES_CHOICES.COURSE_TYPE_STATIONARY && (
                    <span className="tag is-light">W sprawach organizacyjnych będziemy kontaktować się mailowo.</span>
                )}

                {props.course?.status !== ORDER_STATUS_CHOICES.ORDER_PAID && (
                    <div>
                        <div className="course-card-order-number">
                            numer zamówienia: <b>{props.course?.orderId}</b>
                        </div>
                        <div className="course-card-labels"><OrderStatus status={props.course?.status} paymentSys={props.course?.paymentSys} /></div>
                    </div>
                )}

                <div className="is-size-6 course-card-actions">
                    <nav className="level">
                        <div className="level-left">
                            <UserCourseStartButton course={props.course} />
                        </div>
                        <div className="level-right">
                            <button type="button" className="course-card-details-toggle" aria-expanded={showMore}
                                onClick={() => {
                                    setShowMore(!showMore);
                                    return false;
                                }}
                            >
                                {" "}
                                {showMore ? "Zwiń" : "Szczegóły"}
                                <span className="course-card-details-arrow" aria-hidden="true"><FontAwesomeIcon icon={showMore ? faArrowUp : faArrowRight} /></span>
                            </button>
                        </div>
                    </nav>
                </div>

                {showMore && (
                    <div className="is-size-7">
                        <hr />
                        {props.course?.progress?.started && (
                            <div>
                                kurs rozpocząłeś:{" "}
                                {HelperClass.formatDate(props.course?.progress?.started, DATE_FORMAT_CHOICES.DATE_FORMAT_DATE_TIME)}
                            </div>
                        )}
                        {props.course?.progress?.updated && (
                            <div>
                                ostatnia aktywność:{" "}
                                {HelperClass.formatDate(props.course?.progress?.updated, DATE_FORMAT_CHOICES.DATE_FORMAT_DATE_TIME)}
                            </div>
                        )}

                        {props.course?.validTo &&
                            (HelperClass.courseIsValid(props.course) ? (
                                <div>kurs dostępny do: {HelperClass.formatDate(props.course?.validTo)}</div>
                            ) : (
                                <div className="has-text-danger-dark">kurs dostępny do dnia: {HelperClass.formatDate(props.course?.validTo)}</div>
                            ))}
                        <div className="is-size-7">id produktu: {props.course?.product?.productId}</div>
                    </div>
                )}
                </div>
            </article>
        </>
    );
};

export default UserCoursesListElement;
