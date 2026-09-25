import { ReactNode } from "react";
import logo from "../../static/ODNRewers_sm.png";
import logoBB from "../../static/BB5_sm.png";
import { isMobile } from "react-device-detect";
import { SYSTEM_CHOICES } from "../../components/Enumerators";

export interface IUsrMsgTempl {
    title?: string;
    subtitle?: string;
    introContent?: ReactNode;
    system?: SYSTEM_CHOICES; // BB - Bieg Belfra
    noImage?: boolean;
    className?: string;
}

interface IUsrMsgTemplFull extends IUsrMsgTempl {
    children: ReactNode;
}

export default function UsrMsgTempl(props: IUsrMsgTemplFull) {
    if (props.system !== SYSTEM_CHOICES.SYSTEM_BB) {
        return (
            <section className="panel-auth" aria-label={props.title || "Konto uczestnika"}>
                <div className="panel-auth-intro">
                    <span className="panel-eyebrow">PLATFORMA SZKOLENIOWA</span>
                    {props.introContent || (
                        <>
                            <h1>
                                Twoja przestrzeń
                                <br />
                                do nauki.
                            </h1>
                            <p>
                                Szkolenia, materiały i zaświadczenia.
                                <br />
                                Wszystko w jednym miejscu.
                            </p>
                        </>
                    )}
                </div>
                <div className={"panel-auth-card " + (props.className || "")}>
                    <h2 className="panel-auth-title">{props.title}</h2>
                    {props.subtitle && <p className="panel-auth-subtitle">{props.subtitle}</p>}
                    {props.children}
                </div>
            </section>
        );
    }
    return (
        <>
            <section className="mb-5">
                <div className="container">
                    <div className={"slim-wrap " + props.className}>
                        {(props.noImage == undefined || props.noImage == false) &&
                            (isMobile ? (
                                <div className="my-6"></div>
                            ) : (
                                <img alt="logo-platforma" src={props.system == SYSTEM_CHOICES.SYSTEM_BB ? logoBB : logo} className="mt-6" />
                            ))}
                        <div className="title is-size-4 mt-5 mb-2  has-text-centered">{props.title}</div>
                        {props.subtitle && (
                            <div className="is-size-7 has-text-centered">
                                {props.subtitle}
                                <hr className="my-4" />
                            </div>
                        )}

                        {props.children}
                    </div>
                </div>
            </section>
        </>
    );
}
