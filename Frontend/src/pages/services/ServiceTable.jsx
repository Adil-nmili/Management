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
import Service from "../../../services/Service";
import { Loader, Trash, Edit, Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SERVICEEDIT, SERVICESHOW } from "../../../routes/Router";

const ServiceTable = ({ setServices, services }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await Service.getAll();
        if (response.status >= 200 && response.status < 300) {
          setServices(response.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [setServices]);

  const handleDelete = async (id, name) => {
    const deletingProgress = toast.loading("Deleting In Progress....");
    try {
      await Service.delete(id);
      toast.dismiss(deletingProgress);
      setServices(services.filter((service) => service.id !== id));
      toast.success(`Service ${name} deleted successfully!`);
    } catch (error) {
      toast.dismiss(deletingProgress);
      toast.error(error.response?.data?.message || "Failed to delete service.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>A list of available Services.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.length > 0 ? (
          services.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">{service.id}</TableCell>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell className="flex justify-center gap-2">
                <Link to={SERVICESHOW.replace(":id", service.id)}>
                  <Button variant={"outline"}><Eye className="w-4 h-4"/></Button>
                </Link>
                <Link to={SERVICEEDIT.replace(":id", service.id)}>
                  <Button variant={"outline"}><Edit className="w-4 h-4"/></Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button variant={"destructive"}><Trash className="w-4 h-4"/></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete
                        the service and remove its data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(service.id, service.name)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="4" className="text-center">No Services Found</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ServiceTable;