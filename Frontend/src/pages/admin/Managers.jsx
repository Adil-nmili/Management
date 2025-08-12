import { DataTable } from "./data-table"
import { Admincolumns } from "./columns"
import User from "../../../services/User";
import { useEffect, useState } from "react";

const Managers = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await User.getManagers();
      setData(response.data);
    };
    fetchData();
  }, []);


  return (
    <div>
      <div className="mt-10 w-4/5 mx-auto shad">

      <DataTable columns={Admincolumns} data={data} />
      </div>
    </div>
  )
}

export default Managers
