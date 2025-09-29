import { DataTable } from "./data-table"
import { Admincolumns } from "./columns"
import User from "../../../services/User";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

const Managers = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await User.getManagers();
        setData(response.data);
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
      <div className="mt-10 w-4/5 mx-auto shad">
        {data.length === 0 ? (
          <div className="text-center text-gray-500">No managers found.</div>
        ) : (
          <DataTable columns={Admincolumns} data={data} setManagers={setData} managers={data} />
        )}
      </div>
    </div>
  )
}

export default Managers
