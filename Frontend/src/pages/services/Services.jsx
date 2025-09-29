
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import ServiceTable from "./ServiceTable";
import ServiceForm from "./ServiceForm";

const Services = () => {
  const [services, setServices] = useState([]);

  return (
    <div className="flex flex-col items-center gap-10 my-10">
      <div>
        <h2
          className="text-2xl font-bold text-center underline"
          style={{ letterSpacing: "2px" }}
        >
          Services
        </h2>
      </div>

      <Tabs defaultValue="services" className="md:w-[600px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="add-new">Add-New-One</TabsTrigger>
        </TabsList>
        <TabsContent value="services">
          <ServiceTable services={services} setServices={setServices} />
        </TabsContent>
        <TabsContent value="add-new">
          <ServiceForm services={services} setServices={setServices} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Services;
