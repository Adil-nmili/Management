import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "../../../validation/serviceSchema";
import Service from "../../../services/Service";
import { SERVICES } from "../../../routes/Router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";

const ServiceEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loadingService, setLoadingService] = useState(true);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(serviceSchema),
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await Service.getService(id);
        const serviceData = response.data;

        // Pre-fill form fields
        setValue("name", serviceData.name);
        setValue("description", serviceData.description);
      } catch (error) {
        toast.error("Failed to fetch service data.");
        console.error(error);
      } finally {
        setLoadingService(false);
      }
    };
    fetchService();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await Service.update(id, data);
      toast.success("Service updated successfully!");
      navigate(SERVICES);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update service.");
    }
  };

  if (loadingService) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center">Edit Service</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Service Name</Label>
            <Input id="name" type="text" placeholder="Service Name" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Service Description" {...register("description")} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader className="animate-spin" /> : "Update Service"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ServiceEdit;