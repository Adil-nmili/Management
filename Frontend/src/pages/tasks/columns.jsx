import {Button} from "@/components/ui/button"
import {AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,AlertDialogAction} from "@/components/ui/alert-dialog"
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import { MANAGEREDIT, MANAGERSHOW } from "../../../routes/Router";
import { Trash, Edit, Eye } from "lucide-react";
import Task from "../../../services/Task";
import { useState } from "react";

export const Taskcolumns = [
  {
    accessorKey: "id",
    header: "#ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "employee.name",
    header: "Employee",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
  },
  {
    accessorKey: "end_date",
    header: "End Date",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "progress",
    header: "Progress",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "attachments",
    header: "Attachments",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      const [data, setData] = useState([]);
      return (
        <div className="flex gap-2">

          <Link to={`/dashboard/tasks/${id}/edit`}>
            <Button variant={"outline"}><Eye className="w-4 h-4"/></Button>
          </Link>
          <Link to={`/dashboard/tasks/${id}/edit`}>
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
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    const deleteingProgress = toast.loading(
                      "Deleting In Progress...."
                    );
                    const { data: dataDeleting, status } =
                      await Task.delete(id);
                    toast.dismiss(deleteingProgress);
                    if (status >= 200 && status < 204) {
                        setData(data.filter((task) => task.id !== id));
                      toast("Task Deleted !!.", {
                        description: `The Task ${dataDeleting.data.title} are deleted successfuly.`,
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
