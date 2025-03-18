import { useState, useEffect } from "react";
import * as _ from "lodash";
import { SubTask, Task } from "../../utils/interfaces";

interface UseTaskEditProps {
  initialTask?: Task;
  tasks: Task[];
  onSave: (task: Task) => Promise<boolean>;
}

interface UseTaskEditReturn {
  editedTask?: Task;
  editedTitle: string;
  setEditedTitle: (title: string) => void;
  editedSubTasks: SubTask[];
  toggleSubTaskCompletion: (subtaskId: string) => void;
  updateSubTask: (subtaskId: string, updatedFields: Partial<SubTask>) => void;
  addNewSubTask: () => void;
  deleteSubTask: (subtaskId: string) => void;
  saveChanges: () => Promise<boolean>;
  markAsCompleted: () => Promise<boolean>;
  calculateCompletionPercentage: (subTasks: SubTask[]) => number;
  updateCategory: (newCategory: string, newIcon: string) => void;
}

export const useTaskEdit = ({
  initialTask,
  tasks,
  onSave,
}: UseTaskEditProps): UseTaskEditReturn => {
  const [modifiedTasksArray, setModifiedTasksArray] = useState<Task[]>(
    _.cloneDeep(tasks)
  );

  const [editedTask, setEditedTask] = useState<Task | undefined>(
    initialTask ? _.cloneDeep(initialTask) : undefined
  );

  const [editedTitle, setEditedTitle] = useState(initialTask?.title || "");
  const [editedSubTasks, setEditedSubTasks] = useState<SubTask[]>(
    initialTask?.subTasks || []
  );

  // Update the hook's state when initialTask changes
  useEffect(() => {
    if (initialTask) {
      const clonedTask = _.cloneDeep(initialTask);
      setEditedTask(clonedTask);
      setEditedTitle(clonedTask.title || "");
      setEditedSubTasks(clonedTask.subTasks || []);
    }
  }, [initialTask]);

  // Update modifiedTasksArray when tasks change
  useEffect(() => {
    setModifiedTasksArray(_.cloneDeep(tasks));
  }, [tasks]);

  const calculateCompletionPercentage = (subTasks: SubTask[]): number => {
    const totalSubTasks = subTasks.length;
    const completedSubTasks = subTasks.filter((sub) => sub.completed).length;
    return totalSubTasks === 0
      ? 0
      : Math.round((completedSubTasks / totalSubTasks) * 100);
  };

  const updateCategory = (newCategory: string, newIcon: string) => {
    if (!editedTask) return;

    const updatedTask = {
      ...editedTask,
      category: newCategory,
      icon: newIcon,
    };

    updateTaskInArray(updatedTask);
  };

  const updateTaskInArray = (updatedTask: Task) => {
    if (!editedTask) return;

    setEditedTask(updatedTask);

    const newTasks = modifiedTasksArray.map((item) =>
      item.id === updatedTask.id ? updatedTask : item
    );

    setModifiedTasksArray(newTasks);
  };

  const toggleSubTaskCompletion = (subtaskId: string) => {
    if (!editedTask) return;

    const updatedSubTasks = editedSubTasks.map((subtask) =>
      subtask.id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    );

    setEditedSubTasks(updatedSubTasks);

    const updatedTask = {
      ...editedTask,
      subTasks: updatedSubTasks,
      progress: calculateCompletionPercentage(updatedSubTasks),
    };

    updateTaskInArray(updatedTask);
  };

  const updateSubTask = (
    subtaskId: string,
    updatedFields: Partial<SubTask>
  ) => {
    if (!editedTask) return;

    const updatedSubTasks = editedSubTasks.map((subtask) =>
      subtask.id === subtaskId ? { ...subtask, ...updatedFields } : subtask
    );

    setEditedSubTasks(updatedSubTasks);

    const updatedTask = {
      ...editedTask,
      subTasks: updatedSubTasks,
    };

    updateTaskInArray(updatedTask);
  };

  const addNewSubTask = () => {
    if (!editedTask) return;

    const newSubTask: SubTask = {
      id: Date.now().toString(),
      title: "New subtask",
      description: "Description",
      completed: false,
    };

    const updatedSubTasks = [...editedSubTasks, newSubTask];
    setEditedSubTasks(updatedSubTasks);

    const updatedTask = {
      ...editedTask,
      subTasks: updatedSubTasks,
    };

    updateTaskInArray(updatedTask);
  };

  const deleteSubTask = (subtaskId: string) => {
    if (!editedTask) return;

    const updatedSubTasks = editedSubTasks.filter(
      (subtask) => subtask.id !== subtaskId
    );

    setEditedSubTasks(updatedSubTasks);

    const updatedTask = {
      ...editedTask,
      subTasks: updatedSubTasks,
    };

    updateTaskInArray(updatedTask);
  };

  const saveChanges = async (): Promise<boolean> => {
    if (!editedTask) return false;

    const taskToSave = {
      ...editedTask,
      title: editedTitle,
    };

    setEditedTask(taskToSave); // Ensure state is updated

    try {
      const res = await onSave(taskToSave);
      return res;
    } catch (error) {
      console.error("Error saving changes:", error);
      return false;
    }
  };

  const markAsCompleted = async (): Promise<boolean> => {
    if (!editedTask) return false;

    const completedTask = {
      ...editedTask,
      progress: 100,
      subTasks: editedTask.subTasks.map((st) => ({
        ...st,
        completed: true,
      })),
    };

    setEditedTask(completedTask); // Ensure state is updated before saving

    try {
      await onSave(completedTask);
      return true;
    } catch (error) {
      console.error("Error marking task as completed:", error);
      return false;
    }
  };

  return {
    editedTask,
    editedTitle,
    setEditedTitle,
    editedSubTasks,
    toggleSubTaskCompletion,
    updateSubTask,
    addNewSubTask,
    deleteSubTask,
    saveChanges,
    markAsCompleted,
    calculateCompletionPercentage,
    updateCategory,
  };
};
