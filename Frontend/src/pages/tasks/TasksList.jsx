import Task from "../../../services/Task";
import { useEffect, useState } from "react";
import { TaskDataTable } from "./data-table";
import { Taskcolumns } from "./columns";

const TasksList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Task.getAll();
      if (response.status >= 200 && response.status < 300) {
        setData(response.data);
      }
    };
    fetchData();
  }, []);

  console.log("data", data);

    return (
    <div>
      <div className="mt-10 w-full mx-auto shad">
        <TaskDataTable columns={Taskcolumns} data={data} />
      </div>
    </div>
  )
}

export default TasksList
