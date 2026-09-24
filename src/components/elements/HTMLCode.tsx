/* komponent wstawia i formatuje style kodu html */
const HTMLCode = (props: { children?: string; className?: string }) => {
    if (props.children === undefined) {
        return <></>;
    }
    // let htmlCode=props.text
    // if (htmlCode === undefined) {
    //     htmlCode=""
    // } else {
    //     // /* wstawiam odpowiedznie klasy */
    //     // htmlCode= htmlCode.replace("<ul>", "<div class='list pl-6'>")
    //     // htmlCode= htmlCode.replace("</ul>", "</div>")
    // }

    return (
        <>
            <div className={"content " + props.className}>
                <div dangerouslySetInnerHTML={{ __html: props.children }}></div>
            </div>
        </>
    );
};

export default HTMLCode;
