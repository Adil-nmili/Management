import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { departementSchema } from "../../../validation/departementSchema";
import Departement from "../../../services/Departement";
import User from "../../../services/User";
import { DEPARTMENTS } from "../../../routes/Router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader } from "lucide-react";

const DepartementEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [managers, setManagers] = useState([]);
  const [loadingManagers, setLoadingManagers] = useState(true);
  const [loadingDepartement, setLoadingDepartement] = useState(true);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(departementSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [managersResponse, departementResponse] = await Promise.all([
          User.getManagers(),
          Departement.getDepartement(id),
        ]);

        setManagers(managersResponse.data);
        const departementData = departementResponse.data;

        // Pre-fill form fields
        setValue("name", departementData.name);
        setValue("manager_id", String(departementData.manager_id));
      } catch (error) {
        toast.error("Failed to fetch data.");
        console.error(error);
      } finally {
        setLoadingManagers(false);
        setLoadingDepartement(false);
      }
    };
    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await Departement.update(id, data);
      toast.success("Department updated successfully!");
      navigate(DEPARTMENTS);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update department.");
    }
  };

  if (loadingManagers || loadingDepartement) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center">Edit Department</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Department Name</Label>
            <Input id="name" type="text" placeholder="Department Name" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="manager_id">Manager</Label>
            <Select onValueChange={(value) => setValue("manager_id", value)} value={register("manager_id").value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a manager" />
              </SelectTrigger>
              <SelectContent>
                {managers.map((manager) => (
                  <SelectItem key={manager.id} value={String(manager.id)}>{manager.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.manager_id && <p className="text-red-500 text-sm">{errors.manager_id.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader className="animate-spin" /> : "Update Department"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DepartementEdit;