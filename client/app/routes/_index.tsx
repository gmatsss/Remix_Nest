import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Toaster } from "react-hot-toast";
import Header from "~/components/Header";
import { Todo } from "~/types/todo";
import { fetchTodos } from "~/utils/todoApi";

export const loader = async () => {
  const todos = await fetchTodos();
  const today = new Date().toISOString().split("T")[0];

  const pendingTasks = todos.filter(
    (todo: any) =>
      !todo.completed && (todo.start_date <= today || todo.end_date >= today)
  );
  const overdueTasks = todos.filter(
    (todo: any) => !todo.completed && todo.end_date < today
  );
  const completedTasks = todos.filter((todo: any) => todo.completed);

  return json({ pendingTasks, overdueTasks, completedTasks });
};

export default function Dashboard() {
  const { pendingTasks, overdueTasks, completedTasks } = useLoaderData<{
    pendingTasks: Todo[];
    overdueTasks: Todo[];
    completedTasks: Todo[];
  }>();

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <Header />

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-bold text-center">
          📊 Dashboard Overview
        </h2>

        {/* Overview Cards */}
        <div className="grid grid-cols-3 gap-4 my-6">
          <OverviewCard
            title="Pending"
            count={pendingTasks.length}
            color="bg-blue-500"
            link="/pending"
          />
          <OverviewCard
            title="Overdue"
            count={overdueTasks.length}
            color="bg-red-500"
            link="/overdue"
          />
          <OverviewCard
            title="Completed"
            count={completedTasks.length}
            color="bg-green-500"
            link="/completed"
          />
        </div>
      </div>
    </div>
  );
}

/* ✅ Modular Components */
const OverviewCard = ({
  title,
  count,
  color,
  link,
}: {
  title: string;
  count: number;
  color: string;
  link: string;
}) => (
  <Link
    to={link}
    className={`block ${color} text-white p-4 rounded-lg shadow-md text-center`}
  >
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl font-bold">{count}</p>
  </Link>
);
