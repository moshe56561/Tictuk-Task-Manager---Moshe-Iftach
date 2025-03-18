import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchTasks,
  addTask as addTaskToStorage,
  deleteTask as deleteTaskFromStorage,
} from "../lib/fetcher";
import { Task } from "../utils/interfaces";

interface TaskStoreContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (newTask: Task) => Promise<void>;
  editTask: (newTask: Task) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  setTasks: Function;
}

const TaskStoreContext = createContext<TaskStoreContextType | undefined>(
  undefined
);

export const TaskStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasksData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTaskData = async (newTask: Task) => {
    setLoading(true);
    setError(null);
    try {
      await addTaskToStorage(newTask);
      await fetchTasksData();
    } catch (error) {
      setError("Failed to add task");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const editTaskData = async (updatedTask: Task) => {
    setLoading(true);
    setError(null);
    try {
      const storedTasks = localStorage.getItem("tasks");
      const currentTasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
      const taskIndex = currentTasks.findIndex(
        (task) => task.id === updatedTask.id
      );
      if (taskIndex !== -1) {
        currentTasks[taskIndex] = updatedTask;
      }
      localStorage.setItem("tasks", JSON.stringify(currentTasks));
      await fetchTasksData();
    } catch (error) {
      setError("Failed to edit task");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteTaskData = async (taskId: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTaskFromStorage(taskId);
      await fetchTasksData();
    } catch (error) {
      setError("Failed to delete task");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  return (
    <TaskStoreContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks: fetchTasksData,
        addTask: addTaskData,
        editTask: editTaskData,
        deleteTask: deleteTaskData,
        setTasks,
      }}
    >
      {children}
    </TaskStoreContext.Provider>
  );
};

export const useTaskStore = () => {
  const context = useContext(TaskStoreContext);
  if (!context) {
    throw new Error("useTaskStore must be used within a TaskStoreProvider");
  }
  return context;
};
