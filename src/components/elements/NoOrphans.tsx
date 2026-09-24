import HelperClass from "../../classes/HelperClass";
import HTMLCode from "./HTMLCode";

/* usuwa sierotki na końcu linii */
export const NoOrphans = (props: { children?: string; className?: string }) => {
    return (
        <div className={props.className}>
            <HTMLCode>{props.children && HelperClass.cleanSierotki(props.children)}</HTMLCode>
        </div>
    );
};
