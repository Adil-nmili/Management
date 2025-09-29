import {Button} from "@/components/ui/button"
import {AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,AlertDialogAction} from "@/components/ui/alert-dialog"
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import { TASKEDIT, TASKSHOW } from "../../../routes/Router";
import { Trash, Edit, Eye } from "lucide-react";
import Task from "../../../services/Task";

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
    cell: ({ row, setTasks, tasks }) => {
      const { id } = row.original;
      return (
        <div className="flex gap-2">

          <Link to={TASKSHOW.replace(":id", id)}>
            <Button variant={"outline"}><Eye className="w-4 h-4"/></Button>
          </Link>
          <Link to={TASKEDIT.replace(":id", id)}>
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
                  the task and remove its data from our servers.
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
                      await Task.delete(id);
                    toast.dismiss(deleteingProgress);
                    if (status >= 200 && status < 204) {
                        setTasks(tasks.filter((task) => task.id !== id));
                      toast("Task Deleted !!.", {
                        description: `The Task ${row.original.title} is deleted successfully.`,
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
