import CustomLinks from "../../components/elements/CustomLinks";
import { CUSTOM_LINK_TYPE } from "../../components/Enumerators";

export const BBUlotka = () => {
    return (
        <>
            <div className="box mt-2 has-background-warning-95 is-half m-4">
                Pobierz, wydrukuj i powieś ulotkę:
                <span className="ml-2">
                    <CustomLinks linkType={CUSTOM_LINK_TYPE.BB_CURRENT_FLYER} className="is-size-5" />
                </span>
            </div>
        </>
    );
};
