import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Service from "../../../services/Service";
import { Loader } from "lucide-react";

const ServiceShow = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await Service.getService(id);
        setService(response.data);
      } catch (err) {
        setError(err);
        toast.error("Failed to fetch service details.");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
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

  if (!service) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        No service found.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Service Details</h1>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>ID:</strong> {service.id}</p>
        <p><strong>Name:</strong> {service.name}</p>
        <p><strong>Description:</strong> {service.description}</p>
      </div>
    </div>
  );
};

export default ServiceShow;