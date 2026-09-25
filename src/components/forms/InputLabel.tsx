import { ReactNode, isValidElement } from "react";

export const InputLabel = (props: { label?: string | JSX.Element; className?: string; htmlFor?: string }) => {
    if (props.label === undefined) return <></>;

    let isValidReactNode = isValidElement(props.label);
    return (
        <>
            {isValidReactNode ? (
                <label htmlFor={props.htmlFor} className={props.className}>{props.label}</label>
            ) : (
                <>
                    {props.label && (
                        <label htmlFor={props.htmlFor} className={props.className}>
                            <span dangerouslySetInnerHTML={{ __html: props.label as string }}></span>
                        </label>
                    )}
                </>
            )}
        </>
    );
};
