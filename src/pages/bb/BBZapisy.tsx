import logoBB from "../../static/BB5_sm.png";
import { SYSTEM_CHOICES } from "../../components/Enumerators";
import Register from "../user/Register";
import { isMobile } from "react-device-detect";
import Login from "../user/Login";

export interface IBBZapisy {
    // system: SYSTEM_CHOICES; // BB - Bieg Belfra
}
export default function BBZapisy(props: IBBZapisy) {
    return (
        <>
            <div className="container">
                <div className="slim-wrap">
                    {isMobile ? <div className="my-6"></div> : <img alt="logo-platforma" src={logoBB} className="mt-6" />}
                </div>
                <div className="wrap">
                    <div className="title is-size-4 my-3 px-2 has-text-centered">Świetnie!</div>
                    <div className=" is-size-6 mt-1  has-text-centered">
                        <div>Bieg Belfrów jest już w zasięgu ręki.</div>
                        <div>Zaloguj się lub załóż konto.</div>
                        <div>Po zalogowaniu się będziesz mógł zarejestrować siebie, jak również innych uczestników.</div>
                        {/* <hr /> */}
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="columns is-mobile is-multiline mt-3 mb-6 is-centered">
                    <div className="column is-narrow">
                        <div className="card">
                            <div className="card-content has-background-light ">
                                <Login
                                    system={SYSTEM_CHOICES.SYSTEM_BB}
                                    noImage={true}
                                    title={"Mam już konto"}
                                    subtitle={"Możesz również użyć danych logowania do systemu kursów ODN Rewers."}
                                    className="px-4 py-2"
                                    hideRegisterLink={true}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="column is-narrow">
                        <div className="card">
                            <div className="card-content">
                                <Register
                                    system={SYSTEM_CHOICES.SYSTEM_BB}
                                    noImage={true}
                                    title={"Nie mam konta"}
                                    className="px-4 py-2"
                                    subtitle={"Jeżeli nie posiadasz konta, prosze załóż je."}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="container">
                <div className="slim-wrap">
                    <div className=" is-size-6 mt-1  has-text-centered">
                        <hr />
                    </div>
                </div>
            </div> */}
        </>
    );
}
