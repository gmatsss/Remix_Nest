import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import Header from "~/components/Header";
import TaskList from "~/components/TaskList";
import { fetchCompletedTodos } from "~/utils/todoApi";

export const loader = async () => {
  const completedTasks = await fetchCompletedTodos();
  return json(completedTasks);
};

export default function CompletedTasks() {
  const todos = useLoaderData();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-center mb-4">
          ✅ Completed Tasks
        </h2>
        {todos.length > 0 ? (
          <TaskList todos={todos} />
        ) : (
          <p className="text-center text-gray-500">No completed tasks yet 🎉</p>
        )}
      </div>
    </div>
  );
}
