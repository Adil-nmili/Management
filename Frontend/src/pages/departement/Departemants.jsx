import DeparetemnentForm from "./DeparetemnentForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DepartmentTable from "./DepartmentTable";

const Departemants = () => {
  return (
    <div className="flex flex-col items-center gap-10 my-10">
      <div>
        <h2
          className="text-2xl font-bold text-center underline"
          style={{ letterSpacing: "2px" }}
        >
          Departement
        </h2>
      </div>

      <Tabs defaultValue="departments" className="md:w-[600px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="add-new">Add-New-One</TabsTrigger>
        </TabsList>
        <TabsContent value="departments">
          <DepartmentTable />
        </TabsContent>
        <TabsContent value="add-new">
          <DeparetemnentForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Departemants;
