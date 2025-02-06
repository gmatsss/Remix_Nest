import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import toast from "react-hot-toast";
import TaskForm from "./TaskForm";
import { Todo } from "~/types/todo";

interface TaskListProps {
  todos: Todo[];
}

export default function TaskList({ todos }: TaskListProps) {
  const fetcher = useFetcher();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  return (
    <div>
      {editingTodo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">✏️ Edit Task</h2>
            <TaskForm
              editingTodo={editingTodo}
              onClose={() => setEditingTodo(null)}
            />
            <button
              onClick={() => setEditingTodo(null)}
              className="w-full bg-gray-500 text-white py-2 mt-4 rounded-lg hover:bg-gray-600 transition"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
          >
            <span
              className={`text-gray-800 ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.task}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingTodo(todo)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
              >
                ✏️ Edit
              </button>

              <fetcher.Form method="post" action="/api/todos">
                <input type="hidden" name="id" value={todo.id} />
                <button
                  type="submit"
                  name="_action"
                  value={todo.completed ? "pending" : "complete"}
                  className={`px-3 py-1 rounded-lg transition ${
                    todo.completed
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                  onClick={() => {
                    toast.success(
                      todo.completed
                        ? "Task moved to pending!"
                        : "Task completed!"
                    );
                  }}
                >
                  {todo.completed ? "🔄 Pending" : "✅ Complete"}
                </button>
              </fetcher.Form>

              <fetcher.Form method="post" action="/api/todos">
                <input type="hidden" name="id" value={todo.id} />
                <button
                  type="submit"
                  name="_action"
                  value="delete"
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  onClick={() => {
                    toast.error("Task deleted!");
                  }}
                >
                  ❌ Delete
                </button>
              </fetcher.Form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
