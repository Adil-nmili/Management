import {Button} from "@/components/ui/button"
import {AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,AlertDialogAction} from "@/components/ui/alert-dialog"
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"


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
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "departement",
    header: "Departement",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="flex gap-2">
          <Link to={`/admin/${id}/edit`}>
            <button className="btn btn-sm btn-primary">Edit</button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant={"destructive"}>Delete</Button>
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
                      await SizesApi.delete(id);
                    toast.dismiss(deleteingProgress);
                    if (status >= 200 && status < 204) {
                      setSizes(sizes.filter((size) => size.id !== id));
                      toast("Category Deleted !!.", {
                        description: `The Category ${dataDeleting.data.size_name} are deleted successfuly.`,
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
