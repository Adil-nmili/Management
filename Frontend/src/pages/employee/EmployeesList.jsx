import { EmployeeDataTable } from "./data-table"
import { Employeecolumns } from "./columns"
import User from "../../../services/User";
import { useEffect, useState } from "react";

const EmployeesList = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await User.getEmployees();
          console.log(response.data);
      setData(response.data);
    };
    fetchData();
  }, []);


  return (
    <div>
      <div className="mt-10 w-4/5 mx-auto shad">

      <EmployeeDataTable columns={Employeecolumns} data={data} setEmployees={setData} employees={data} />
      </div>
    </div>
  )
}

export default EmployeesList
