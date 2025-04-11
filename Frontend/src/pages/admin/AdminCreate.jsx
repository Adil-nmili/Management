import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, } from "../../components/ui/select"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { HOME } from "../../../routes/Router"
import User from "../../../services/User"
import Departement from "../../../services/Departement"
const AdminCreate = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    position: "",
    address : '',
    departement_id : '',
    role: "Admin"
    
  })
  const [departements, setDepartements] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    async function getDepartements() {
      const response = await Departement.getAll().then(response => response);
      setDepartements(response.data);
    }
    getDepartements();
  }, []);
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response =  await User.create(admin).then(response => response);
      if (response.status <=200 && response.status <300) {
        navigate(HOME);
      }
    } catch (error) {
      
    }
  }



  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold my-10 text-center underline">Admin Create</h1>

      </div>
      <form
        onSubmit={handelSubmit}
      className="grid grid-cols-2 gap-4 space-x-6 w-3/5  mx-auto">
        <div>
          <Label className="mb-2">Name Complete:</Label>
          <Input type="text" placeholder="Entrer the admin name" onChange={(e) => setAdmin({ ...admin, name: e.target.value })} />
        </div>
        <div>
          <Label className="mb-2">Email:</Label>
          <Input type="email" placeholder="Entrer the admin email" onChange={(e) => setAdmin({ ...admin, email: e.target.value })} />
        </div>
        <div>
          <Label className="mb-2">Password:</Label>
          <Input type="password" placeholder="Entrer the admin password" onChange={(e) => setAdmin({ ...admin, password: e.target.value })} />
        </div>
        <div>
          <Label className="mb-2">Confirm Password:</Label>
          <Input type="password" placeholder="Confirm password" onChange={(e) => setAdmin({ ...admin, password: e.target.value })} />
        </div>
        <div>
          <Label className="mb-2">Address:</Label>
          <Input type="text" placeholder="Address name" onChange={(e) => setAdmin({ ...admin, address: e.target.value })} />
        </div>
        <div>
          <Label className="mb-2">Position:</Label>
          <Input type="text" placeholder="Position name" onChange={(e) => setAdmin({ ...admin, position: e.target.value })} />
        </div>
        <div> 
          <Label className="mb-2">Departement:</Label>
          <Select name="departement_id" onValueChange={(e) => setAdmin({ ...admin, departement_id: e })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a departement" />
            </SelectTrigger>
            <SelectContent>
              {departements.map((departement) => (
                <SelectItem value={departement.id}>{departement.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div> 
          <Label className="mb-2">Role:</Label>
          <Select name="role" onValueChange={(e) => setAdmin({ ...admin, role: e })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="col-span-2" type="submit">Create</Button>
       
      </form>
    </div>
  )
}

export default AdminCreate
