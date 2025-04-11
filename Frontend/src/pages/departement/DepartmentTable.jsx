import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import Departement from "../../../services/Departement";

const DepartmentTable = () => {
  const [departments, setDepartements] = useState([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await Departement.getAll();
        if (response.status >= 200 && response.status < 300) {
          setDepartements(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDepartments();
  }, []);
  console.log(departments);
  return (
    <Table>
      <TableCaption>A list of available Departments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Receposable of Department</TableHead>
          <TableHead className="text-right">Amount of Employees</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {setDepartements.length > 0 ? departments.map((department) => (
          <TableRow>
            <TableCell className="font-medium">{department.id}</TableCell>
            <TableCell>{department.name}</TableCell>
            <TableCell>{department.manager.name}</TableCell>
            <TableCell className="text-end">{department.employees_count}</TableCell>
          </TableRow>
        )) : 'No Departments Found'}
      </TableBody>
    </Table>
  );
};

export default DepartmentTable;
