import "./PanelTheme.scss";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ProtectRoute from "./ProtectRoute";
import { isMobile } from "react-device-detect";

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

const PageLayout = (props: { children: JSX.Element; isProtected?: boolean; bodyClassName?: string }) => {
    let mobileClass = "";
    if (isMobile) {
        // mobileClass=" p-3 "
    }
    return (
        <div data-theme="light" className="training-panel is-flex is-flex-direction-column is-fullheight-100vh">
            <header className="panel-header">
                <Navigation />
            </header>

            <main id="training-content" className={"training-content is-flex-grow-1 " + mobileClass + (props.bodyClassName || "")}>
                {props.isProtected === true ? <ProtectRoute>{props.children}</ProtectRoute> : <>{props.children}</>}
            </main>

            <Footer training />
        </div>
    );
};

export default PageLayout;
