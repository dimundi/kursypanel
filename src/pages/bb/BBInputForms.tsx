import { useState } from "react";
import { Input } from "../../components/forms/Input";
import CustomLinks from "../../components/elements/CustomLinks";
import { CUSTOM_LINK_TYPE } from "../../components/Enumerators";

export type bbInputFormType = "name" | "groupName" | "nick" | "rankConsent";

export const BBInputForm = (props: { type: bbInputFormType; register: any; errors?: any; defaultValue?: any; labelClassName?: string }) => {
    const [showMore, setShowMore] = useState(false);
    switch (props.type) {
        case "rankConsent":
            return (
                <>
                    <div className="mt-4">
                        <Input
                            id={"rankConsent"}
                            label={
                                <span>
                                    Chcę wziąć udział w dodatkowej rywalizacji <strong>Indywidualny Ranking Belfrów</strong>.
                                </span>
                            }
                            register={props.register}
                            defaultChecked={props.defaultValue}
                            required={false}
                            type="checkbox"
                        ></Input>

                        <div className="is-size-7 pt-1">
                            <a onClick={() => setShowMore(!showMore)}>Skrócone zasady Indywidualnego Rankingu Belfrów</a>
                            {showMore && (
                                <div>
                                    <ul>
                                        <li>
                                            Przejdź, przebiegnij lub przejedź <strong>najwięcej kilometrów</strong> spośród wszystkich aktywnych
                                            Belfrów.
                                        </li>
                                        <li>
                                            Sumaryczny <strong>dzienny</strong> pokonany <strong>dystans wpisujesz do formularza</strong> na tej
                                            stronie - dostępnego po zalogowaniu się.
                                        </li>
                                        <li>
                                            Twój numer startowy, nick, sumaryczny pokonany dystans oraz aktualna <strong>pozycja w rankingu</strong>{" "}
                                            wyświetlać się będzie w czasie rzeczywistym w tabeli rankingowej.
                                        </li>
                                        <li>
                                            Możesz rywalizować w dyscyplinie zgodnie z wybranym pakietem startowym lub w każdej dyscyplinie jeżeli
                                            wybierzesz Iron Teacher.
                                        </li>
                                        <li>
                                            Szczegółowy regulamin w
                                            <CustomLinks linkType={CUSTOM_LINK_TYPE.BB_CURRENT_RULES} className=" ml-1" showIcon={false} />
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            );
        case "nick":
            return (
                <Input
                    id={"nick"}
                    name="nick"
                    label="Imię lub pseudonim"
                    placeholder="imię lub nick"
                    register={props.register}
                    labelClassName={props.labelClassName}
                    defaultValue={props.defaultValue}
                    errors={props.errors}
                    required={false}
                ></Input>
            );
        case "name":
            return (
                <Input
                    id={"name"}
                    name="name"
                    label="* Imię i nazwisko"
                    placeholder="nazwa uczestnika"
                    register={props.register}
                    labelClassName={props.labelClassName}
                    defaultValue={props.defaultValue}
                    errors={props.errors}
                    required={true}
                ></Input>
            );
        case "groupName":
            return (
                <Input
                    id={"groupName"}
                    name="groupName"
                    label="Nazwa grupy"
                    placeholder="nazwa grupy"
                    register={props.register}
                    labelClassName={props.labelClassName}
                    defaultValue={props.defaultValue}
                    errors={props.errors}
                    required={false}
                ></Input>
            );
    }
    return <></>;
};
