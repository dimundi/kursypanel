import React from "react";
import classNames from "classnames";
import { InputLabel } from "./InputLabel";
import { GENDER_USER_CHOICES } from "../Enumerators";

// distance - dystans aktywnosci jako liczba 1.2
export type ValidateTypes = "none" | "email" | "password" | "confirmPass" | "noFirstOption" | "distance";
// noFirstOption -> nie jest wybrana piersza opcja na liście SELECT
export type InputType = "password" | "text" | "radio" | "checkbox" | "textarea" | "select";

export type IFormOption = {
    label?: string;
    value?: string;
};

export const genderFormOptions: IFormOption[] = [
    { label: "-", value: GENDER_USER_CHOICES.GENDER_NOT_SET.toString() },
    { label: "Pani", value: GENDER_USER_CHOICES.GENDER_FEMALE.toString() },
    { label: "Pan", value: GENDER_USER_CHOICES.GENDER_MALE.toString() },
];

export type InputProps = {
    id: string;
    name?: string;
    label?: string | JSX.Element;
    type?: InputType;

    className?: string; // dodatkowe klasy formatujące input
    labelClassName?: string;

    placeholder?: string;
    value?: any;
    defaultValue?: any;
    defaultChecked?: boolean; // dla checkboxa
    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
    // onKeyPress?(e: React.ChangeEvent<HTMLInputElement>):void
    disabled?: boolean;

    /* react-hook-form methods: */
    register: any;
    errors?: any; // callback do funkcji error useForm

    /* validation: based on react-hook methods */
    required?: boolean; // validacja -> czy wymagany
    validateType?: ValidateTypes; // typ walidacji

    refValue?: any; // wartość referencyjna (na przykład potwierdzenie hasla)

    /* dla pola select */
    options?: IFormOption[];
};

export const Input = (props: InputProps) => {
    /* lista domyślnych klas formatujących w zależności od typu */
    const classMap: { [key in InputType]: string } = {
        text: "input",
        radio: "",
        checkbox: "",
        password: "input",
        textarea: "textarea",
        select: "select",
    };

    /* JAK DZIAŁA WALIDACJA
          1. sprawdza czy pole jest wypełnine (warunek props.required = true)
          2. sprawdza prowidłowość według validatePatternMap
          3. sprawdza prowidłowość według validateFunMap
          */

    const ValidatePassword = (password?: any) => {
        if (password) {
            if (password.length < 8) {
                return "Hasło musi mieć co najmniej 8 znaków.";
            }
        }
        return true;
    };

    const ValidateConfirmPassword = (password?: any) => {
        if (password !== props.refValue) {
            return "Hasła nie są takie same.";
        }
        return true;
    };

    const ValidateNoFirstOption = (value?: any) => {
        //console.log(value);
        if (props.options !== undefined && props.options?.length > 0) {
            if (value === props.options[0].value) {
                return "wybierz opcję";
            }
        }
        return true;
    };

    const validateFunMap: {
        [key in ValidateTypes]: { (data: any): string | boolean };
    } = {
        none: (data) => {
            return true;
        },
        email: (data) => {
            return true;
        },
        distance: (data) => {
            data = data.replace(",", ".");
            let n = parseFloat(data);
            if (Number.isNaN(n) == true) {
                return "błędna liczba";
            }
            let m = data.split(".");

            if (m.length == 2 && m[1].length > 1) return "jedno miejsce po przecinku";
            return true;
        },
        password: ValidatePassword,
        confirmPass: ValidateConfirmPassword,
        noFirstOption: ValidateNoFirstOption,
    };

    const validatePatternMap: { [key in ValidateTypes]: {} } = {
        none: {},
        password: {},
        confirmPass: {},
        noFirstOption: {},
        email: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "niepoprawny adres email",
        },
        distance: {},
    };

    let required = true;
    if (props.required !== undefined) required = props.required;

    let err_message = "";
    for (let key in props.errors) {
        if (key === props.id) {
            /* błąd dotyczy tego pola -> formatujemy */
            if (props.errors[key].type === "required") {
                err_message = "to pole jest wymagane";
            } else err_message = props.errors[key].message;
        }
    }

    /* ustalam bieżący lub domyślny typ walidacji */
    let validateType: ValidateTypes = "none";
    if (props.validateType !== undefined) validateType = props.validateType;

    /* ustalam bieżący lub domyślny typ elementu */
    let type: InputType = "text";
    if (props.type !== undefined) type = props.type;

    /* RENDER */

    var inputProps: InputProps = {
        id: props.id,
        register: {},
        name: props.name,
        className: classNames([classMap[type], props.className]),
    };

    // if (props.ref !== undefined)
    //   inputProps.ref = props.ref

    if (type !== "textarea") {
        inputProps.type = type;
        inputProps.placeholder = props.placeholder;
        // inputProps.value = props.value

        if (props.defaultValue !== undefined) inputProps.defaultValue = props.defaultValue;

        if (props.value !== undefined) inputProps.value = props.value;

        if (props.defaultChecked !== undefined) {
            inputProps.defaultChecked = props.defaultChecked;
        }
        if (props.disabled !== undefined) {
            inputProps.disabled = props.disabled;
        }
        // if (props.onChange !== undefined) {
        //   console.log("B")
        //   inputProps.onChange=props.onChange
        // }
    }

    return (
        <>
            {
                (type === "text" || type === "textarea" || type === "password" || type === "select") && (
                    /* dla text label jest przed inputem */
                    <InputLabel htmlFor={props.id} label={props.label} className={props.labelClassName} />
                )
                // (props.label  &&
                // <label className='is-size-7'><div dangerouslySetInnerHTML={{__html: props.label}}></div></label>
                // )
            }

            {type === "textarea" ? (
                <textarea
                    {...inputProps}
                    {...props.register(props.id, {
                        required,
                        pattern: validatePatternMap[validateType],
                        validate: validateFunMap[validateType],
                    })}
                >
                    {props.value}
                </textarea>
            ) : type === "select" ? (
                <>
                    <div className="select">
                        <select
                            {...props.register(props.id, {
                                required,
                                pattern: validatePatternMap[validateType],
                                validate: validateFunMap[validateType],
                            })}
                        >
                            {props.options?.map((option, index) => (
                                <option
                                    key={index}
                                    value={option.value}
                                    selected={option.value === inputProps.defaultValue?.toString() ? true : false}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </>
            ) : (
                <>
                    {props.onChange !== undefined ? (
                        <input
                            {...inputProps}
                            aria-label={props.label}
                            {...props.register(props.id, {
                                required,
                                pattern: validatePatternMap[validateType],
                                validate: validateFunMap[validateType],
                            })}
                            onChange={props.onChange}

                            // onKeyUp={props.onKeyPress}
                        />
                    ) : (
                        <input
                            {...inputProps}
                            aria-label={props.label}
                            {...props.register(props.id, {
                                required,
                                pattern: validatePatternMap[validateType],
                                validate: validateFunMap[validateType],
                            })}
                        />
                    )}
                </>
            )}

            {
                type !== "text" && type !== "textarea" && type !== "password" && type !== "select" && (
                    <InputLabel htmlFor={props.id} label={props.label} className={props.labelClassName ? props.labelClassName : "ml-2"} />
                )
                // (props.label  &&
                //   <label className='mb-1'><span className='ml-2' dangerouslySetInnerHTML={{__html: props.label}}></span></label>
                // )
            }
            {err_message && (
                <div>
                    <span className=" tag is-danger">{err_message}</span>
                </div>
            )}
        </>
    );
};
