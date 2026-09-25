import { ReactNode } from "react";
import { isMobile } from "react-device-detect";


const PageTitle = (props:{ children:ReactNode }) => {
    
    let mobileClass=" py-5 "
    if (isMobile) {
        mobileClass=" pt-4 pb-5 "
    }
    
    return (
        <div className={"panel-page-title is-primary-gradient "+mobileClass}>
            <div className="container has-text-white p-responsive">
                {props.children}
            </div>
        </div>

    )
  };

export default PageTitle;