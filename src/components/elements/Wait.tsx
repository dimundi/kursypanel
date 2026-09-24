/* wyświetlanie danych adresowych */
const Wait = (props: { text?: string }) => {
    return (
        <>
            <div className="has-text-centered">
                {props.text && <div>{props.text}</div>}
                <progress style={{ margin: "auto", maxWidth: "25%" }} className="slim progress is-small is-primary" max="100"></progress>
            </div>
        </>
    );
};

export default Wait;
