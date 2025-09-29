import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "../../../validation/serviceSchema";
import Service from '../../../services/Service';
import { Loader } from "lucide-react";

const ServiceForm = ({ setServices, services }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await Service.create(data);
      toast.success("Service created successfully!");
      setServices([...services, response.data]);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create service.");
    }
  };

  return (
    <form
      className='w-full mx-auto mt-10 '
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label className='my-4'>Service Name:</Label>
        <Input type='text' placeholder='Create New Service...' {...register("name")} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <Label className='my-4'>Description:</Label>
        <Textarea placeholder='Service Description...' {...register("description")} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <Button className='my-4' type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader className="animate-spin" /> : "Create"}
      </Button>
    </form>
  )
}

export default ServiceForm;