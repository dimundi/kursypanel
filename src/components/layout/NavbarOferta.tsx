import { Link } from "react-router-dom"
import { CATEGORY_CHOICES } from "../Enumerators"


export const NavbarOferta = () => {
    return (
        <>
        <Link className="navbar-item" reloadDocument 
            to={"/list/"+CATEGORY_CHOICES.CATEGORY_OPEN}>Szkolenia indywidualne</Link>
        {/* <hr className="navbar-divider"/> */}
        <Link className="navbar-item" reloadDocument 
            to={"/list/"+CATEGORY_CHOICES.CATEGORY_CLOSE}>Szkolenia dla rad pedagogicznych</Link>
        {/* <hr className="navbar-divider"/> */}
        </>
    )
}