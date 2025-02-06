import { useFetcher } from "@remix-run/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Todo } from "~/types/todo";

interface TaskFormProps {
  editingTodo?: Todo | null;
  onClose?: () => void;
}

export default function TaskForm({ editingTodo, onClose }: TaskFormProps) {
  const fetcher = useFetcher();
  const [task, setTask] = useState(editingTodo ? editingTodo.task : "");
  const [startDate, setStartDate] = useState(
    editingTodo ? editingTodo.startDate : ""
  );
  const [endDate, setEndDate] = useState(
    editingTodo ? editingTodo.endDate : ""
  );

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error);
      } else {
        toast.success(
          editingTodo
            ? "Task updated successfully!"
            : "Task added successfully!"
        );
        setTask("");
        setStartDate("");
        setEndDate("");
        onClose?.(); // Close modal after successful submission
      }
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <fetcher.Form
      method="post"
      action="/api/todos"
      className="flex flex-col gap-2"
    >
      <input type="hidden" name="id" value={editingTodo?.id} />
      <input
        type="text"
        name="task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Task name..."
        required
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        name="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        name="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        name="_action"
        value={editingTodo ? "edit" : "add"}
        className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        {editingTodo ? "✏️ Edit Task" : "➕ Add Task"}
      </button>
    </fetcher.Form>
  );
}
