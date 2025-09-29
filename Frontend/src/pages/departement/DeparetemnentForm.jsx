import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import Departement from '../../../services/Departement'
import User from '../../../services/User'
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { departementSchema } from "../../../validation/departementSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader } from "lucide-react";

const DeparetemnentForm = ({ setDepartements, departments }) => {
  const [managers, setManagers] = useState([]);
  const [loadingManagers, setLoadingManagers] = useState(true);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(departementSchema),
  });

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await User.getManagers();
        setManagers(response.data);
      } catch (error) {
        toast.error("Failed to fetch managers.");
      } finally {
        setLoadingManagers(false);
      }
    };
    fetchManagers();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await Departement.create(data);
      toast.success("Department created successfully!");
      setDepartements([...departments, response.data]);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create department.");
    }
  };

  if (loadingManagers) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }

  return (
    <form
      className='w-full mx-auto mt-10 '
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label className='my-4'>Department Name:</Label>
        <Input type='text' placeholder='Create New Department...' {...register("name")} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <Label className='my-4'>Manager:</Label>
        <Select onValueChange={(value) => register("manager_id").onChange({ target: { value } })}>
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
      <Button className='my-4' type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader className="animate-spin" /> : "Create"}
      </Button>
    </form>
  )
}

export default DeparetemnentForm
