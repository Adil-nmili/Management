import { useEffect, useState } from "react";
import User from "../../services/User";
import Departement from "../../services/Departement";
import Service from "../../services/Service";
import Task from "../../services/Task";

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [managerCount, setManagerCount] = useState(0);
  const [directorCount, setDirectorCount] = useState(0);
  const [departementCount, setDepartementCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await User.getEmployees();
        setEmployeeCount(employees.data.length);

        const managers = await User.getManagers();
        setManagerCount(managers.data.length);

        const directors = await User.getDirectors();
        setDirectorCount(directors.data.length);

        const departements = await Departement.getAll();
        setDepartementCount(departements.data.length);

        const services = await Service.getAll();
        setServiceCount(services.data.length);

        const tasks = await Task.getAll();
        setTaskCount(tasks.data.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Employees</h2>
          <p className="text-3xl">{employeeCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Managers</h2>
          <p className="text-3xl">{managerCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Directors</h2>
          <p className="text-3xl">{directorCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Departments</h2>
          <p className="text-3xl">{departementCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Services</h2>
          <p className="text-3xl">{serviceCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Tasks</h2>
          <p className="text-3xl">{taskCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
