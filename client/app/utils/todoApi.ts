// app/utils/todoApi.ts

export const fetchTodos = async () => {
    const response = await fetch("http://localhost:4000/todos");
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    return await response.json();
  };
  
  export const fetchCompletedTodos = async () => {
    const todos = await fetchTodos();
    return todos.filter((todo: any) => todo.completed);
  };
  
  export const fetchOverdueTodos = async () => {
    const todos = await fetchTodos();
    const today = new Date().toISOString().split("T")[0];
  
    return todos.filter((todo: any) => !todo.completed && todo.end_date < today);
  };
  
  export const fetchPendingTodos = async () => {
    const todos = await fetchTodos();
    const today = new Date().toISOString().split("T")[0]; 
  
    return todos.filter(
      (todo: any) =>
        !todo.completed && todo.start_date <= today && todo.end_date >= today
    );
  };
  