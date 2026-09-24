import { ReactNode } from "react";

/* ---------------------------------------------------------
Czy jesteśmy w trybie DEBUG
--------------------------------------------------------- */
export function isDebug() {
    
    if (process.env.REACT_APP_DEBUG==="true") {
        return true
    } else
        return false
}

/* ---------------------------------------------------------
logowanie do konsoli
--------------------------------------------------------- */
export function log(msg:any) {
    if (isDebug()) {
        console.log(msg)
    }    
}

// /* wyświetla obiekt tylko, jeżeli jest włączony tryb debug */
export const Debug = (props: {children?:ReactNode}) => {

        return (            
            <>           
            {isDebug()===true &&
                props.children}
            </>
        )   
}