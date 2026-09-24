import { IAddr } from "../../interfaces/IAddr";
import { ADDR_TYPE_CHOICES } from "../Enumerators";


/* wyświetlanie danych adresowych */
const AddrView = (props: {addr?:IAddr, title?:string}) => {
        
        return (
            <>
            <div className="has-text-weight-semibold">
                {props.title &&
                    <>{props.title}</>
                }
                {!props.title &&
                    <>
                    {props.addr?.addrType===ADDR_TYPE_CHOICES.ADDR_TYPE_CONTACT_BY_USER && 
                        <>Dane kontaktowe</>
                    }
                    {props.addr?.addrType===ADDR_TYPE_CHOICES.ADDR_TYPE_PAYER_BY_USER && 
                        <>Dane płatnika</>
                    }
                    {props.addr?.addrType===ADDR_TYPE_CHOICES.ADDR_TYPE_RECIPIENT_BY_USER && 
                        <>Dane odbiorcy</>
                    }
                    {props.addr?.addrType===ADDR_TYPE_CHOICES.ADDR_TYPE_SHIPMENT_BY_USER && 
                        <>Dane do wysyłki</>
                    }
                    </>
                }
            </div>
            {props.addr?.aName && 
                <div>{props.addr?.aName}</div>
            }
            {props.addr?.email && 
                <div>{props.addr?.email}</div>
            }
            {props.addr?.tel && 
                <div>{props.addr?.tel}</div>
            }
            {props.addr?.company && 
                <div>{props.addr?.company}</div>
            }
            {props.addr?.line1 && 
                <div>{props.addr?.line1}</div>
            }
            {(props.addr?.postcode || props.addr?.city)&& 
                <div>{props.addr?.postcode} {props.addr?.city}</div>
            }
            {props.addr?.NIP && 
                <div>NIP: {props.addr?.NIP}</div>
            }

            </>
        )

}

export default AddrView;