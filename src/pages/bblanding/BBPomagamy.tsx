import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { NoOrphans } from "../../components/elements/NoOrphans";

/* -------------------------------------------------
 * Podopieczny Biegu Belfrów
 * ------------------------------------------------- */
export const BBPomagamy = () => {
    return (
        <>
            <div className="title has-text-centered mb-6">Podopieczna 5 edycji Biegu Belfrów</div>
            <div className="columns px-2">
                <div className="column">
                    <figure className="image">
                        <img src="https://odnrewers.pl/media/bb/5BB_Podobieczna_Maja.jpg" />
                    </figure>
                </div>
                <div className={"column is-two-thirds is-size-5 " + (isMobile == true ? "ml-1" : "ml-6")}>
                    <>
                        <div>
                            <strong>Maja Ciborowska</strong> jest 7-letnią dziewczynką, która uwielbia, zabawy w wodzie, lody i
                            pyszności, które przygotowuje jej babcia. Jest ciekawym świata i pogodnym dzieckiem.
                        </div>
                        <div>
                            <NoOrphans>
                                Na co dzień Maja potrzebuje opieki przez całą dobę, gdyż cierpi na czterokończynowe porażenie
                                mózgowe. Dziewczynka nie chodzi i nie siedzi. Maja uczęszcza do specjalistycznego przedszkola, w
                                którym pracuje w programie Cyber-Oko i nosi specjalistyczne okulary, gdyż poprzez wzrok wykazuje
                                swoją wolę i sygnalizuje swoje potrzeby. Rehabilitowana jest metodą Vojty, jeździ także na
                                zastrzyki z botuliny, które mają na celu bardziej ją rozluźnić i polepszyć przy tym efekty
                                rehabilitacji.
                            </NoOrphans>
                        </div>
                        <div>
                            <NoOrphans>
                                Maja rośnie i potrzebuje nowych sprzętów, które ułatwią jej życie i pomogą w codziennym
                                funkcjonowaniu. Najważniejsza jest jednak rehabilitacja, bo dzięki niej Maja robi postępy i
                                lepiej radzi sobie na co dzień.
                            </NoOrphans>
                        </div>
                        <div className="is-size-6">Cały zysk z V edycji Biegu Belfrów przekażemy na rzecz Mai.</div>
                    </>

                    {/* <Link to="/zapisy" reloadDocument>
                        <div className="button is-warning">Zapisz się</div>
                    </Link> */}
                </div>
            </div>
        </>
    );
};
