import { TabPanel } from "@chakra-ui/react";
import React, { useState } from "react";
import Tr from "../Trservice/Tr";
import plus from "../../../assets/Form/icons.svg";


const Tableservice = ({handleBody}) => {
    const [tr,setTr] = useState([true])

    const addRow = () => {
        setTr((prev) => [...prev, true]);
      };
  return (
    <TabPanel className="flex items-end">
      <table className="w-full rounded-md	">
        <th className="rounded-md	">
          <td className=" bg-blue-100">Key</td>
          <td className=" bg-blue-100">Value</td>
          <td className=" bg-blue-100">Description</td>
        </th>
        <div>
          {tr.map(() => {
            return <Tr handleBody={handleBody} />;
          })}
        </div>
      </table>
      <div className="addLink  ml-4 " onClick={addRow}>
        <img src={plus} alt="addlink" />
      </div>
    </TabPanel>
  );
};

export default Tableservice;
