import {
  useForm
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { managerSchema } from "../../../validation/managerSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Departement from "../../../services/Departement";
import User from "../../../services/User";
import { useNavigate } from "react-router-dom";
import { MANAGERS } from "../../../routes/Router";



const positions = [
  { id: 1, name: "Manager" },
  { id: 2, name: "Supervisor" },
  { id: 3, name: "Employee" },
]

const ManagerCreate = () => {
  const [departements, setDepartements] = useState([]);
  
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(managerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      address: "",
      departement_id: "",
      role: "Manager"
    },
  });

  useEffect(() => {
    async function getDepartements() {
      const response = await Departement.getAll();
      setDepartements(response.data);
    }
    getDepartements();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await User.createManager(data);
      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          icon: "success",
          title: "Manager Created",
          text: "Manager created successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate(MANAGERS);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Manager Creation Failed",
        text: error.response?.data?.message || "An error occurred.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-10 text-center underline">Create User</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 space-x-6 w-3/5 mx-auto"
      >
        <div className="flex flex-col gap-2">
          <Label>Name:</Label>
          <Input {...register("name")} placeholder="Manager name" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Email:</Label>
          <Input type="email" {...register("email")} placeholder="Manager email" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Password:</Label>
          <Input type="password" {...register("password")} placeholder="Password" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Confirm Password:</Label>
          <Input
            type="password"
            {...register("password_confirmation")}
            placeholder="Confirm Password"
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Address:</Label>
          <Input {...register("address")} placeholder="Address" />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Departement:</Label>
          <Select
            onValueChange={(val) => setValue("departement_id", val)}
            defaultValue=""
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a departement" />
            </SelectTrigger>
            <SelectContent>
              {departements.map((d) => (
                <SelectItem key={d.id} value={d.id.toString()}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.departement_id && <p className="text-red-500 text-sm">{errors.departement_id.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Position:</Label>
          <Select
            onValueChange={(val) => setValue("role", val)}
            defaultValue=""
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a position" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((p) => (
                <SelectItem key={p.id} value={p.name}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
        </div>
        <Button className="col-span-2" type="submit">Create</Button>
      </form>
    </div>
  );
};

export default ManagerCreate;
