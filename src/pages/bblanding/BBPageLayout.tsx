import { isMobile } from "react-device-detect";
import Footer from "../../components/layout/Footer";
import BBNavigation from "../bb/BBNavigation";
import ProtectRoute from "../../components/layout/ProtectRoute";
import { useState } from "react";
import { BBContext, BBTabType } from "../../context/BBContext";

/* -------------------------------------------------
   * przykład layoutu TEJ strony - nie kasować tego komentarza
   * ------------------------------------------------- *
  return (
    <>
    <div className='is-flex is-flex-direction-column is-fullheight-100vh '>
      <nav>
          <div className="has-background-primary-light">
            NAGŁÓWEK
          </div>
      </nav>

      <div className="is-flex-grow-1 is-primary-gradient">
        <div className="container">
        BODY  zawartość w środkowej kulumnie
        </div>
        <div className="has-background-primary-light">
        zawartość na całą szerokość okna
        </div>
      </div>
      <div className="has-background-warning-light is-flex-align-items-flex-end mt-auto">
              <div className="py-5">
                STOPKA
              </div>
      </div>
 
    </div>
    
    </>
  )
   * -------------------------------------------------
   * koniec przykładu 
   * ------------------------------------------------- */

const BBPageLayout = (props: { children: JSX.Element; isProtected?: boolean; bodyClassName?: string }) => {
    const [activeTab, setActiveTab] = useState("moje" as BBTabType);
    const [notification, setNotification] = useState<JSX.Element | String>();

    let mobileClass = "";
    if (isMobile) {
        // mobileClass=" p-3 "
    }
    //console.log(props.bodyClassName);
    return (
        <BBContext.Provider
            value={{
                activeTab: activeTab,
                setActiveTab: setActiveTab,

                notification: notification,
                setNotification: setNotification,
            }}
        >
            <div className="is-flex is-flex-direction-column is-fullheight-100vh ">
                {/* <section className=""> */}
                <BBNavigation />
                {/* </section> */}

                <div className={"is-flex-grow-1 " + mobileClass + props.bodyClassName}>
                    {props.isProtected === true ? <ProtectRoute>{props.children}</ProtectRoute> : <>{props.children}</>}
                </div>

                {/* <div className={"is-flex-grow-1 " + mobileClass + props.bodyClassName}>{props.children}</div> */}

                <Footer />
            </div>
        </BBContext.Provider>
    );
};

export default BBPageLayout;
