import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, } from "../../components/ui/select"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {  MANAGERS } from "../../../routes/Router"
import User from "../../../services/User"
import Departement from "../../../services/Departement"
const ManagerEdit = () => {
  const {id} = useParams();
  const [manager, setManager] = useState({})
  const [departements, setDepartements] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    async function getDepartements() {
      const response = await Departement.getAll().then(response => response);
      setDepartements(response.data);


      const managerResponse = await User.getManager(id).then(response => response.data  )
      setManager(managerResponse);
    }
    getDepartements();
  }, []);


  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response =  await User.createManager(manager).then(response => response);
      if (response.status <=200 && response.status <300) {
        navigate(MANAGERS);
      }
    } catch (error) {
      
    }
  }



  return (
    <div>
      <div>
            <h1 className="text-2xl font-bold my-10 text-center underline">Manager Edit</h1>

      </div>
      <form
        onSubmit={handelSubmit}
      className="grid grid-cols-2 gap-4 space-x-6 w-3/5  mx-auto">
        <div>
          <Label className="mb-2">Name Complete:</Label>
          <Input type="text" placeholder="Entrer the manager name" value={manager.name} onChange={(e) => setManager({ ...manager, name: e.target.value })} />
        </div>
        <div>
          <Label className="mb-2">Email:</Label>
          <Input type="email" placeholder="Entrer the manager email" value={manager.email} onChange={(e) => setManager({ ...manager, email: e.target.value })} />
        </div>
        <div>
          <Label className="mb-2">Password:</Label>
          <Input type="password" placeholder="Entrer the manager password" value={manager.password} onChange={(e) => setManager({ ...manager, password: e.target.value })} />
        </div>
        <div>
          <Label className="mb-2">Confirm Password:</Label>
          <Input type="password" placeholder="Confirm password" value={manager.password_confirmation} onChange={(e) => setManager({ ...manager, password_confirmation: e.target.value })} />
        </div>
        <div>
          <Label className="mb-2">Address:</Label>
          <Input type="text" placeholder="Address name" value={manager.address} onChange={(e) => setManager({ ...manager, address: e.target.value })} />
        </div>
       
        <div> 
          <Label className="mb-2">Departement:</Label>
          <Select name="departement_id" value={manager.departement_id} onValueChange={(e) => setManager({ ...manager, departement_id: e })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a departement" />
            </SelectTrigger>
            <SelectContent>
              {departements.map((departement) => (
                <SelectItem key={departement.id} value={departement.id}>{departement.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div> 
          <Label className="mb-2">Role:</Label>
          <Select name="role" value={manager.role} onValueChange={(e) => setManager({ ...manager, role: e })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="col-span-2" type="submit">Update</Button>
       
      </form>
    </div>
  )
}

export default ManagerEdit
