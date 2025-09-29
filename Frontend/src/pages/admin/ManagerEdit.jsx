import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { managerSchema } from "../../../validation/managerSchema";
import User from "../../../services/User";
import Departement from "../../../services/Departement";
import { MANAGERS } from "../../../routes/Router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader } from "lucide-react";

const ManagerEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loadingManager, setLoadingManager] = useState(true);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(managerSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departmentsResponse, managerResponse] = await Promise.all([
          Departement.getAll(),
          User.getManager(id),
        ]);

        setDepartments(departmentsResponse.data);
        const managerData = managerResponse.data;

        // Pre-fill form fields
        setValue("name", managerData.name);
        setValue("email", managerData.email);
        // Password fields are typically not pre-filled for security reasons
        setValue("address", managerData.address);
        setValue("position", managerData.position);
        setValue("departement_id", String(managerData.departement_id));
      } catch (error) {
        toast.error("Failed to fetch data.");
        console.error(error);
      } finally {
        setLoadingDepartments(false);
        setLoadingManager(false);
      }
    };
    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await User.updateManager(id, data);
      toast.success("Manager updated successfully!");
      navigate(MANAGERS);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update manager.");
    }
  };

  if (loadingDepartments || loadingManager) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center">Edit Manager</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Name" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          {/* Password fields are typically not pre-filled for security reasons, and should be optional for update */}
          <div>
            <Label htmlFor="password">New Password (optional)</Label>
            <Input id="password" type="password" placeholder="New Password" {...register("password")} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div>
            <Label htmlFor="password_confirmation">Confirm New Password</Label>
            <Input id="password_confirmation" type="password" placeholder="Confirm New Password" {...register("password_confirmation")} />
            {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>}
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" type="text" placeholder="Address" {...register("address")} />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>
          <div>
            <Label htmlFor="position">Position</Label>
            <Input id="position" type="text" placeholder="Position" {...register("position")} />
            {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
          </div>
          <div>
            <Label htmlFor="departement_id">Department</Label>
            <Select onValueChange={(value) => setValue("departement_id", value)} value={register("departement_id").value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={String(dept.id)}>{dept.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.departement_id && <p className="text-red-500 text-sm">{errors.departement_id.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader className="animate-spin" /> : "Update Manager"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ManagerEdit;
