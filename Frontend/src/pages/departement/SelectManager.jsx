import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect,useState } from "react";
import Departement from "../../../services/Departement";

const SelectManager = ({handleManager}) => {

  const [managers, setManagers] = useState([]);


  useEffect(() => {
    async function getManagers() {
      
      const response = await Departement.getManager().then(response => response)  
      setManagers(response.data)
    }

    getManagers();
  }, []);

  return (
    <Select name="manager_id" onValueChange={handleManager} >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Manager" />
      </SelectTrigger>
      <SelectContent>
        {managers.map((manager) => (
          <SelectItem value={manager.id}>{manager.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectManager;