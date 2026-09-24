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

    return (
        <>
            <div className="mt-2 box">
                <div className="is-size-6">
                    <ProdType prodType={props.course?.product?.prodType} courseType={props.course?.product?.courseType} />
                </div>
                <div className="is-size-4">{props.course?.product?.pName}</div>
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
                        <span className="is-size-6 pr-3">
                            numer zamówienia: <b>{props.course?.orderId}</b>
                        </span>
                        <OrderStatus status={props.course?.status} paymentSys={props.course?.paymentSys} />
                    </div>
                )}

                <div className="is-size-6">
                    <nav className="level">
                        <div className="level-left">
                            <UserCourseStartButton course={props.course} />
                        </div>
                        <div className="level-right">
                            <a
                                onClick={() => {
                                    setShowMore(!showMore);
                                    return false;
                                }}
                            >
                                {" "}
                                {showMore ? "pokaż mniej" : "pokaż więcej"}
                            </a>
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
        </>
    );
};

export default UserCoursesListElement;
