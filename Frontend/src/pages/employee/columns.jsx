import {Button} from "@/components/ui/button"
import {AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,AlertDialogAction} from "@/components/ui/alert-dialog"
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import { EMPLOYEEEDIT, EMPLOYEESHOW } from "../../../routes/Router";
import { Trash, Edit, Eye } from "lucide-react";
import User from "../../../services/User";

export const Employeecolumns = [
  {
    accessorKey: "id",
    header: "#ID",
  },
  {
    accessorKey: "name",
    header: "Full Name",
  },
  {
    accessorKey: "role",
    header: "Position",
  },
  {
    accessorKey: "departement.name",
    header: "Departement",
  },
  {
    id: "actions",
    cell: ({ row, setEmployees, employees }) => {
      const { id } = row.original;
      return (
        <div className="flex gap-2">

          <Link to={EMPLOYEESHOW.replace(":id", id)}>
            <Button variant={"outline"}><Eye className="w-4 h-4"/></Button>
          </Link>
          <Link to={EMPLOYEEEDIT.replace(":id", id)}>
            <Button variant={"outline"}><Edit className="w-4 h-4"/></Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger >
              <Button variant={"destructive"}><Trash className="w-4 h-4"/></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  the employee and remove their data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    const deleteingProgress = toast.loading(
                      "Deleting In Progress...."
                    );
                    const { status } =
                      await User.deleteEmployee(id);
                    toast.dismiss(deleteingProgress);
                    if (status >= 200 && status < 204) {
                      setEmployees(employees.filter((employee) => employee.id !== id));
                      toast("Employee Deleted !!.", {
                        description: `The Employee ${row.original.name} is deleted successfully.`,
                        icon: <Trash />,
                      });
                    }
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
