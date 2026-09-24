import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CATEGORY_CHOICES } from "../../components/Enumerators";
import { useNavigate } from "react-router-dom";

/*  productId -> te właściwości pobieramy
    getProductId -> pobież dane tylko wtedy gdy productId == getProductId */
const ProdBreadCrumb = (props: { categoryId?: CATEGORY_CHOICES; level1Title?: string; level3Title?: string }) => {
    const navigation = useNavigate();

    let level1Title = "Oferta";

    let level = 1;
    if (props.level1Title !== undefined) level1Title = props.level1Title;

    if (props.categoryId !== undefined) level++;
    if (props.level3Title !== undefined) level++;

    function setClass(levelFun: number) {
        // log("___:" + levelFun)
        if (level === levelFun) {
            // return " is-active is-size-3 " + ((level > 1) && " ")
            return " is-active is-size-3 is-size-4-mobile ";
        } else {
            return " is-clickable is-size-5 is-size-6-mobile";
        }
    }

    function setNavigation(levelFun: number) {
        if (level === levelFun) {
            return undefined;
        } else {
            switch (levelFun) {
                case 3:
                    return undefined;
                case 2:
                    if (props.categoryId !== undefined) return () => navigation("/list/" + props.categoryId);
                    else return () => navigation("/");
                case 1:
                default:
                    return () => navigation("/");
            }
        }
    }

    return (
        <>
            <div>
                <span onClick={setNavigation(1)} className={setClass(1)}>
                    {level1Title}
                </span>
                {props.categoryId !== undefined && (
                    <>
                        <span onClick={setNavigation(2)} className={setClass(2)}>
                            <FontAwesomeIcon className="px-2 is-size-7-mobile is-size-6" icon={faChevronRight} />
                            {props.categoryId === CATEGORY_CHOICES.CATEGORY_CLOSE && <>Dla rad pedagogicznych</>}
                            {props.categoryId === CATEGORY_CHOICES.CATEGORY_OPEN && <>Dla indywidualnych odbiorców</>}
                            {props.categoryId === CATEGORY_CHOICES.CATEGORY_ECOURSE && <>ekursy</>}
                        </span>
                    </>
                )}
                {props.level3Title && (
                    <div onClick={setNavigation(3)} className={setClass(3)}>
                        {props.level3Title}
                    </div>
                )}
            </div>
        </>
    );
};

export default ProdBreadCrumb;
