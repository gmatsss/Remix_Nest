import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "./tailwind.css";
import TaskForm from "~/components/TaskForm";

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100">
        <Toaster position="top-right" reverseOrder={false} />
        <Outlet />

        {/* Floating Add Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-blue-700 transition"
        >
          ➕
        </button>

        {/* Modal for Adding Task */}
        {isModalOpen && (
          <Modal onClose={() => setModalOpen(false)}>
            <h2 className="text-xl font-bold mb-4">➕ Add New Task</h2>
            <TaskForm onClose={() => setModalOpen(false)} />
          </Modal>
        )}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      {children}
      <button
        onClick={onClose}
        className="w-full bg-gray-500 text-white py-2 mt-4 rounded-lg hover:bg-gray-600 transition"
      >
        ❌ Close
      </button>
    </div>
  </div>
);
