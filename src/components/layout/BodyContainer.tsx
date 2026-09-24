import { ReactNode } from "react";

/* -------------------------------------------------
 * noPadding - nie dodawaj paddingu od krawędzi dla mobilków
 * ------------------------------------------------- */
const BodyContainer = (props: { children: ReactNode; noPadding?: boolean; className?: string }) => {
    let p_responsive = "p-responsive";
    if (props.noPadding === true) p_responsive = "";

    return (
        <div className={"container " + props.className}>
            <div className={p_responsive}>{props.children}</div>
        </div>
    );
};

export default BodyContainer;
