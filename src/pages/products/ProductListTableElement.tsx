import { useState } from "react";
import { COURSE_TYPES_CHOICES } from "../../components/Enumerators";
import { IProduct } from "../../interfaces/IProducts";

import ProdCoursesList from "./ProdCoursesList";
import { isMobile } from "react-device-detect";

const ProductListTableElement = (props: { product: IProduct }) => {
    type taTypesType = "none" | "webinar" | "ekurs" | "rada";

    const [activeTab, setActiveTab] = useState<taTypesType>(() => {
        // if (props.product.avCourseTypes?.includes (COURSE_TYPES_CHOICES.COURSE_TYPE_WEBINAR)) {
        //     return "webinar"
        // } else
        // if (props.product.avCourseTypes?.includes (COURSE_TYPES_CHOICES.COURSE_TYPE_ECOURSE)) {
        //     return "ekurs"
        // } else
        // if (props.product.avCourseTypes?.includes (COURSE_TYPES_CHOICES.COURSE_TYPE_STATIONARY)) {
        //     return "rada"
        // }
        return "none";
    });

    return (
        <>
            <div className="box my-2">
                <p className="mb-1 product-title">{props.product.prodDef?.name}</p>
                <p className="is-size-8 has-text-weight-light has-text-grey">
                    {props.product.prodDef?.at?.reverse().map((areaType, index) => (
                        <span key={props.product.prodDef?.prodDefId + "_" + index} className="mr-4">
                            {areaType}
                        </span>
                    ))}
                </p>

                <div className="tabs is-size-6-mobile is-size-5">
                    <ul>
                        {props.product.avCourseTypes?.includes(COURSE_TYPES_CHOICES.COURSE_TYPE_WEBINAR) && (
                            <li className={activeTab === "webinar" ? "is-active" : ""}>
                                <a
                                    onClick={() => {
                                        setActiveTab(activeTab === "webinar" ? "none" : "webinar");
                                    }}
                                >
                                    Webinar
                                </a>
                            </li>
                        )}
                        {props.product.avCourseTypes?.includes(COURSE_TYPES_CHOICES.COURSE_TYPE_ECOURSE) && (
                            <li className={activeTab === "ekurs" ? "is-active" : ""}>
                                <a
                                    onClick={() => {
                                        setActiveTab(activeTab === "ekurs" ? "none" : "ekurs");
                                    }}
                                >
                                    E-kurs
                                </a>
                            </li>
                        )}
                        {props.product.avCourseTypes?.includes(COURSE_TYPES_CHOICES.COURSE_TYPE_STATIONARY) && (
                            <li className={activeTab === "rada" ? "is-active" : ""}>
                                <a
                                    onClick={() => {
                                        setActiveTab(activeTab === "rada" ? "none" : "rada");
                                    }}
                                >
                                    Szkolenie stacjonarne
                                </a>
                            </li>
                        )}
                        {/* <li><button  className="delete is-small mt-1" onClick={() => {setActiveTab("none")}}></button></li> */}
                    </ul>
                </div>

                <div className={isMobile ? "" : "ml-6"}>
                    {activeTab === "webinar" && (
                        <ProdCoursesList
                            courseType={COURSE_TYPES_CHOICES.COURSE_TYPE_WEBINAR}
                            key={"webinar_" + props.product.prodDef?.prodDefId}
                            inStore={props.product.inStore}
                            prodDef={props.product.prodDef}
                        />
                    )}

                    {activeTab === "ekurs" && (
                        <ProdCoursesList
                            courseType={COURSE_TYPES_CHOICES.COURSE_TYPE_ECOURSE}
                            key={"ekurs_" + props.product.prodDef?.prodDefId}
                            inStore={props.product.inStore}
                            prodDef={props.product.prodDef}
                        />
                    )}

                    {activeTab === "rada" && (
                        <ProdCoursesList
                            courseType={COURSE_TYPES_CHOICES.COURSE_TYPE_STATIONARY}
                            key={"stationary_" + props.product.prodDef?.prodDefId}
                            inStore={props.product.inStore}
                            prodDef={props.product.prodDef}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductListTableElement;
