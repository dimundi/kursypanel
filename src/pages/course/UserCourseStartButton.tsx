import { useNavigate } from "react-router-dom";
/* przycisk rozpoczęcia, albo kontynuowania kursu użytkownika */
import HelperClass from "../../classes/HelperClass";
import { IUserCourse } from "../../interfaces/IUserCourse";
import { useUserCourseContext } from "../../context/UserCourseContext";

const UserCourseStartButton = (props:{course?:IUserCourse, className?:string}) =>  {


    const navigate = useNavigate(); 

    if ( HelperClass.courseIsValid(props.course) === false) {
        return (
            <>      
            <div className="has-text-danger-dark">Kurs jest nieaktywny</div>
            </>
        )
    }

    if (HelperClass.isEkurs(props.course?.product)) {
        return (
            <>
            <a onClick={() => {
                    if (props.course?.product?.productId) navigate("/kursy/" + props.course.product.productId);
                    return false;
                    }} className={props.className+` mt-2 button is-primary is-light`}> 
            
            {   props.course?.progress?.started ?
                    <>Kontynuuj</>
                    :
                    <>Rozpocznij</>                                
            }
            </a>
            
            {/* <Link to={"/course/"+props.course?.product?.productId+"/"} className={props.className+` mt-2 button is-primary is-light`}> 
            
            Rozpocznij kurs ({props.course?.prodDef?.prodDefId}) </Link> */}

            </>
        )

    } else {
        return (
            <>
            </>
        )
    }
}

export default UserCourseStartButton;
