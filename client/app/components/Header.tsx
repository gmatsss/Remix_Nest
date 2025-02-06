import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-5 shadow-md">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold">📝 To-Do List</h1>
        <p className="text-sm mt-1 opacity-80">
          Manage your tasks efficiently.
        </p>
        <nav className="mt-4 flex justify-center space-x-4">
          <Link to="/" className="px-3 py-2 bg-gray-700 rounded-md">
            Dashboard
          </Link>
          <Link to="/pending" className="px-3 py-2 bg-blue-500 rounded-md">
            Pending
          </Link>
          <Link to="/completed" className="px-3 py-2 bg-green-500 rounded-md">
            Completed
          </Link>
          <Link to="/overdue" className="px-3 py-2 bg-red-500 rounded-md">
            Overdue
          </Link>
        </nav>
      </div>
    </header>
  );
}
