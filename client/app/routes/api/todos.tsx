import { json } from "@remix-run/node";

export let todos = [
  {
    id: 1,
    task: "Learn Remix",
    completed: false,
    startDate: "2025-02-04",
    endDate: "2025-02-06",
  },
  {
    id: 2,
    task: "Build a Remix App",
    completed: false,
    startDate: "2025-02-04",
    endDate: "2025-02-06",
  },
];

export const loader = async () => {
  const response = await fetch("http://localhost:4000/todos");
  if (!response.ok) {
    throw new Response("Failed to load todos", { status: response.status });
  }
  const todos = await response.json();
  return json(todos);
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const actionType = formData.get("_action");
  const id = formData.get("id")?.toString();
  const task = formData.get("task")?.toString();
  const startDate = formData.get("startDate")?.toString();
  const endDate = formData.get("endDate")?.toString();

  let response;
  switch (actionType) {
    case "add":
      response = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, completed: false, startDate, endDate }),
      });
      break;
    case "delete":
      response = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE",
      });
      break;
    case "complete":
      response = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
      break;
    case "pending":
      response = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: false }),
      });
      break;
    case "edit":
      response = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, startDate, endDate }),
      });
      break;
    default:
      return json({ error: "Invalid action" }, { status: 400 });
  }

  if (!response.ok) {
    throw new Response("Failed to process action", { status: response.status });
  }
  return response.json();
};
