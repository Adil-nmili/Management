import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Departement from "../../../services/Departement";
import { Loader } from "lucide-react";

const DepartementShow = () => {
  const { id } = useParams();
  const [departement, setDepartement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartement = async () => {
      try {
        const response = await Departement.getDepartement(id);
        setDepartement(response.data);
      } catch (err) {
        setError(err);
        toast.error("Failed to fetch department details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDepartement();
  }, [id]);

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

  if (!departement) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        No department found.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Department Details</h1>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>ID:</strong> {departement.id}</p>
        <p><strong>Name:</strong> {departement.name}</p>
        <p><strong>Manager:</strong> {departement.manager?.name || 'N/A'}</p>
        <p><strong>Employees Count:</strong> {departement.employees_count}</p>
      </div>
    </div>
  );
};

export default DepartementShow;