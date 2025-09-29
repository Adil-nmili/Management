import Task from "../../../services/Task";
import { useEffect, useState } from "react";
import { TaskDataTable } from "./data-table";
import { Taskcolumns } from "./columns";
import { Loader } from "lucide-react";

const TasksList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Task.getAll();
        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="mt-10 w-full mx-auto shad">
        {data.length === 0 ? (
          <div className="text-center text-gray-500">No tasks found.</div>
        ) : (
          <TaskDataTable columns={Taskcolumns} data={data} setTasks={setData} tasks={data} />
        )}
      </div>
    </div>
  )
}

export default TasksList
