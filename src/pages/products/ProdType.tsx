import { COURSE_TYPES_CHOICES, PROD_TYPES_CHOICES, PROD_VARIANT_CHOICES } from "../../components/Enumerators";

/* wyświetla typ kursu */
// const ProdType=(props: {inStore?: IInStore, prodDef?:IProdDef}) => {
export interface IProdType {
    prodType?: PROD_TYPES_CHOICES;
    courseType?: COURSE_TYPES_CHOICES;
    className?: string;
    variantType?: PROD_VARIANT_CHOICES;
}

const ProdType = (props: IProdType) => {
    let prodTypeName = undefined;

    if (props.prodType === PROD_TYPES_CHOICES.PROD_TYPE_COURSE) {
        switch (props.courseType) {
            case COURSE_TYPES_CHOICES.COURSE_TYPE_WEBINAR:
                prodTypeName = "Webinar";
                break;
            case COURSE_TYPES_CHOICES.COURSE_TYPE_STATIONARY:
                prodTypeName = "Szkolenie stacjonarne";
                break;
            case COURSE_TYPES_CHOICES.COURSE_TYPE_ECOURSE:
                prodTypeName = "E-kurs";
                break;
        }
    } else if (props.prodType === PROD_TYPES_CHOICES.PROD_TYPE_BB) {
        switch (props.variantType) {
            case PROD_VARIANT_CHOICES.IRON:
                prodTypeName = "Pakiet startowy Iron Teacher";
                break;
            case PROD_VARIANT_CHOICES.RIDE:
                prodTypeName = "Pakiet startowy Rower";
                break;
            case PROD_VARIANT_CHOICES.WALK:
                prodTypeName = "Pakiet startowy Spacer";
                break;
            case PROD_VARIANT_CHOICES.RUN:
                prodTypeName = "Pakiet startowy Bieg";
                break;
        }
    }

    return <>{prodTypeName && <div className={props.className}>{prodTypeName}</div>}</>;
};

export default ProdType;
