import { Link } from "react-router-dom";
import logo from "../../static/rewers-footer-logo.svg";

export default function TrainingFooter() {
    return (
        <footer className="training-footer">
            <div className="training-footer-surface">
                <div className="training-footer-top">
                    <section className="training-footer-intro" aria-labelledby="footer-platform-title">
                        <h2 id="footer-platform-title">Platforma szkoleniowa Rewers</h2>
                        <p>Jesteś na platformie szkoleniowej. Tutaj znajdziesz swoje szkolenia, materiały i zaświadczenia.</p>
                        <nav className="training-footer-menu" aria-label="Linki platformy szkoleniowej">
                            <a className="training-footer-return" href="https://odnrewers.pl/">
                                ← Przejdź do strony Rewers
                            </a>
                        </nav>
                    </section>
                    <section className="training-footer-contact" aria-label="Dane kontaktowe">
                        <h2>
                            Biuro obsługi i kontaktu
                            <br />z klientami:
                        </h2>
                        <div className="training-footer-contact-columns">
                            <dl>
                                <dt>ADRES:</dt>
                                <dd>
                                    ul. Glazurowa 21/4,
                                    <br />
                                    80-180 Kowale
                                    <br />
                                    k. Gdańska
                                </dd>
                            </dl>
                            <dl>
                                <dt>TEL.:</dt>
                                <dd>57 532 12 22</dd>
                                <dt>EMAIL:</dt>
                                <dd>biuro@odnrewers.pl</dd>
                            </dl>
                        </div>
                    </section>
                </div>
                <div className="training-footer-bottom">
                    <span>© {new Date().getFullYear()} REWERS. Wszelkie prawa zastrzeżone.</span>
                    <a href="https://odnrewers.pl/polityka-prywatnosci/" target="_blank" rel="noopener noreferrer">
                        Polityka prywatności
                    </a>
                </div>
                <Link className="training-footer-logo" to="/" aria-label="Rewers — platforma szkoleniowa">
                    <img src={logo} alt="REWERS" />
                </Link>
            </div>
        </footer>
    );
}
