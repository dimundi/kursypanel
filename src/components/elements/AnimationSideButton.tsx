import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useDebounce } from "use-debounce";

const AnimationSideButton = (props: { to: string }) => {
    const [animationClass, setAnimationClass] = useState(" side-button-hide-animation ");
    // const initialClass = useDebounce("side-button-hide-animation", 300);
    const { setInquiryCnt } = useContext(UserContext);

    return (
        <>
            <div className="side-button-container">
                <button
                    className="delete ml-2 mb-1"
                    aria-label="close"
                    onClick={() => {
                        setInquiryCnt(0);
                        return false;
                    }}
                ></button>
                <div
                    className={"side-button " + animationClass}
                    onMouseEnter={() => setAnimationClass("side-button-show")}
                    onMouseLeave={() => setAnimationClass("side-button-show")}
                >
                    <Link to={props.to}>
                        <div className="side-button-content">
                            <FontAwesomeIcon icon={faPaperPlane} />
                            <span className="ml-3">Twoje zapytanie </span>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default AnimationSideButton;
