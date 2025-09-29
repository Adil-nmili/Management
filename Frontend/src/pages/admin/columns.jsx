import {Button} from "@/components/ui/button"
import {AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,AlertDialogAction} from "@/components/ui/alert-dialog"
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import { MANAGEREDIT, MANAGERSHOW } from "../../../routes/Router";
import { Trash, Edit, Eye } from "lucide-react";
import User from "../../../services/User";

export const Admincolumns = [
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
    cell: ({ row, setManagers, managers }) => {
      const { id } = row.original;
      return (
        <div className="flex gap-2">

          <Link to={MANAGERSHOW.replace(":id", id)}>
            <Button variant={"outline"}><Eye className="w-4 h-4"/></Button>
          </Link>
          <Link to={MANAGEREDIT.replace(":id", id)}>
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
                  the manager and remove their data from our servers.
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
                      await User.deleteManager(id);
                    toast.dismiss(deleteingProgress);
                    if (status >= 200 && status < 204) {
                      setManagers(managers.filter((manager) => manager.id !== id));
                      toast("Manager Deleted !!.", {
                        description: `The Manager ${row.original.name} is deleted successfully.`,
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
