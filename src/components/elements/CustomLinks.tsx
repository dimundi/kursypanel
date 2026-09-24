import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { CUSTOM_LINK_TYPE } from "../Enumerators";

/* JSX który zarządza linkami do statycznych zasobów */
// export type fileTypes = 'pdf' |'jpg'

// export type linkTypes = 'pdf' |'jpg'

// interface  ICustomLink  {
//     linkType: linkTypes
//     // fileType: fileTypes,
//     // link?:string,

// }

const CustomLinks = (props: { linkType: CUSTOM_LINK_TYPE; className?: string; showIcon?: boolean; label?: JSX.Element }) => {
    let icon = faFilePdf;
    let href = "";
    let label = <></>;

    let showIcon = true;
    if (props.showIcon !== undefined) {
        showIcon = props.showIcon;
    }

    switch (props.linkType) {
        case CUSTOM_LINK_TYPE.BB_PHOTO_RULES:
            href = " https://odnrewers.pl/media/BB_Regulamin_konkursu_foto.pdf";
            label = <>Regulamin konkursu fotograficznego</>;
            break;
        case CUSTOM_LINK_TYPE.REWERS_COURSE_OFFER:
            href = "https://odnrewers.pl/media/Oferta_Szkolen.pdf";
            label = <>Pobierz ofertę szkoleń w PDF</>;
            break;
        case CUSTOM_LINK_TYPE.REWERS_SHOP_RULES:
            href = "https://odnrewers.pl/media/Regulamin_Sklepu.pdf";
            label = <>Regulamin i polityka prywatności {showIcon && "sklepu internetowego"}</>;
            break;
        case CUSTOM_LINK_TYPE.REWERS_AKREDYTACJA:
            href = "https://odnrewers.pl/media/ODN_akredytacja.pdf";
            label = <>Akredytacja Pomorskiego Kuratora Oświaty </>;
            break;
        case CUSTOM_LINK_TYPE.WPIS_DO_EWIDENCJI:
            href = "https://odnrewers.pl/media/ODN_ewidencja.pdf";
            label = <>Wpis do ewidencji</>;
            break;
        case CUSTOM_LINK_TYPE.BB_CURRENT_RULES:
            href = "https://odnrewers.pl/media/BB5_regulamin.pdf";
            label = <>Regulamin 5 edycji Biegu Belfrów</>;
            break;
        case CUSTOM_LINK_TYPE.BB_CURRENT_FLYER:
            href = "https://odnrewers.pl/media/Ulotka_Bieg_Belfrow.pdf";
            label = <>Ulotka Biegu Belfrów</>;
            break;
    }

    if (props.label !== undefined) label = props.label;

    return (
        <>
            <a className={props.className} href={href} target="_blank">
                {" "}
                {showIcon && <FontAwesomeIcon icon={icon} className="mr-2" />}
                {label}
            </a>
        </>
    );
};

export default CustomLinks;
