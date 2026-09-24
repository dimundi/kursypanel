import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

export type NotificationType = "success" | "danger" | "warning";

export interface INotificationOption {
    type?: NotificationType; //"success", "danger"  -> domyślne: success
    lead?: string; // pogrubiony test wiodący
    code?: string; // kod błędu
    children?: ReactNode; // zawartość wiadomości
}

export const Notification = (props: INotificationOption) => {
    let type: NotificationType = "success";
    if (props.type !== undefined) {
        type = props.type;
    }

    const classMap: { [key in NotificationType]: string } = {
        success: "has-text-success-dark",
        danger: "has-text-danger-dark",
        warning: "has-text-warning-dark",
    };

    return (
        <p className={"my-2 mx-2 notification is-light is-" + type}>
            {type === "danger" && (
                <>
                    <FontAwesomeIcon className="has-text-danger-dark is-size-4" icon={faFaceSadTear} /> <br />
                </>
            )}
            {type === "warning" && (
                <>
                    <FontAwesomeIcon className="has-text-warning-dark is-size-4" icon={faCircleExclamation} /> <br />
                </>
            )}
            {props.lead && <strong className={classMap[type]}>{props.lead} </strong>}

            <div className="has-text-grey">
                {/* {props.msg}  */}
                {props.children}
                {props.code && <span className="error-code">Kod błędu: {props.code}</span>}
            </div>
        </p>
    );
};
