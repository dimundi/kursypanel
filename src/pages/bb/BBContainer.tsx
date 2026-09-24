import { ReactNode } from "react";
import PageTitle from "../../components/layout/PageTitle";
import BodyContainer from "../../components/layout/BodyContainer";
import ProdBreadCrumb from "../products/ProdBreadCrumb";
// import { useBBContext } from "../../context/BBContext";
import { isMobile } from "react-device-detect";

export interface IBBContainer {
    children: ReactNode;
}

export default function BBContainer(props: IBBContainer) {
    // const { activeTab, setActiveTab } = useBBContext();
    return (
        <>
            {/* productId: {productId}, lekcja: {lessonId} */}
            <PageTitle>
                <div className="container header-container">
                    <ProdBreadCrumb level1Title="Bieg Belfrów" />
                    <div>Wystartuj w 5 edycji Biegu Belfrów.</div>
                </div>
            </PageTitle>

            <BodyContainer noPadding={true} className={"mb-2 my-4 " + (isMobile && " px-3")}>
                {/* <div className="tabs">
                    <ul>
                        <li className={activeTab === "moje" ? "is-active" : ""}>
                            <a
                                onClick={() => {
                                    if (setActiveTab) {
                                        setActiveTab("moje");
                                    }
                                }}
                            >
                                Rejestracja uczestnika
                            </a>
                        </li>

                        <li className={activeTab === "grupa" ? "is-active" : ""}>
                            <a
                                onClick={() => {
                                    if (setActiveTab) setActiveTab("grupa");
                                }}
                            >
                                Moje grupy
                            </a>
                        </li>
                    </ul>
                </div> */}
                {props.children}
            </BodyContainer>
            {/* <BodyContainer noPadding={props.noPadding} className="mb-5">
                {step === 1 && <Wait text="pobieranie treści kursu" />}
                {step === 2 && <>{props.children}</>}
                {notification}
            </BodyContainer> */}
        </>
    );
}
