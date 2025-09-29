import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Task from "../../../services/Task";
import { Loader } from "lucide-react";

const TaskShow = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await Task.getTask(id);
        setTask(response.data);
      } catch (err) {
        setError(err);
        toast.error("Failed to fetch task details.");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

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

  if (!task) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        No task found.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>ID:</strong> {task.id}</p>
        <p><strong>Title:</strong> {task.title}</p>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Employee:</strong> {task.employee?.name || 'N/A'}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Start Date:</strong> {task.start_date}</p>
        <p><strong>End Date:</strong> {task.end_date}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Progress:</strong> {task.progress}%</p>
        <p><strong>Notes:</strong> {task.notes}</p>
        <p><strong>Attachments:</strong> {task.attachments}</p>
      </div>
    </div>
  );
};

export default TaskShow;