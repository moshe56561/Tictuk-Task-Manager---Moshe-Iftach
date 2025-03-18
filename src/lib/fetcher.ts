// This file should be an api gate in production for the task porpuses we used a local storage.
import { Task } from "../utils/interfaces";
import tasks from "../localStorageFile/tasks.json";

export const fetchTasks = async (): Promise<Task[]> => {
  if (typeof window !== "undefined") {
    // Check if there are tasks in localStorage
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      return JSON.parse(storedTasks); // Return stored tasks if they exist
    } else {
      // If no tasks in localStorage, use the default tasks from tasks.json
      localStorage.setItem("tasks", JSON.stringify(tasks)); // Store default tasks in localStorage
      return tasks; // Return the default tasks
    }
  }

  // If not in the browser environment (e.g., server-side), return default tasks
  return tasks;
};

export const addTask = async (newTask: Task): Promise<void> => {
  try {
    if (typeof window !== "undefined") {
      // Get existing tasks from localStorage or use the default tasks if not available
      const storedTasks = localStorage.getItem("tasks");
      const currentTasks: Task[] = storedTasks
        ? JSON.parse(storedTasks)
        : tasks;

      // Add the new task
      currentTasks.push(newTask);

      // Save back to localStorage
      localStorage.setItem("tasks", JSON.stringify(currentTasks));
    }
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Failed to add task");
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    if (typeof window !== "undefined") {
      const storedTasks = localStorage.getItem("tasks");
      const currentTasks: Task[] = storedTasks
        ? JSON.parse(storedTasks)
        : tasks;
      const updatedTasks = currentTasks.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }
};
