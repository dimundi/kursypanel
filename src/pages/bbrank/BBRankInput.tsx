import { IBBUserDistances } from "../../interfaces/IBB";

interface IBBRankInput {
    userDistances: IBBUserDistances;
}
/* *************************************************************************************************** */
export const BBRankInput = (props: IBBRankInput) => {
    /* *************************************************************************************************** */
    return (
        <>
            <div className="grid ">
                {/* {rankCells.map((rankCell, index) => (
                    <BBRankCellEl rankCell={rankCell} key={index} />
                ))} */}
            </div>
        </>
    );
};
