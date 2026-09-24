import MyBB from "./MyBB";
import { useBBContext } from "../../context/BBContext";
import GroupBB from "./GroupBB";

const BB = () => {
    return <MyBB />;
    // const { activeTab } = useBBContext();

    // return (
    //     <>
    //         {activeTab === "moje" && <MyBB />}
    //         {activeTab === "grupa" && <GroupBB />}
    //     </>
    // );
};

export default BB;
