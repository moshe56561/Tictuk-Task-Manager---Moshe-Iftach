import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTaskStore } from "../../store/TaskStore";
import { useTheme } from "../../store/ThemeStore";
import { EditTaskHeader } from "./EditTaskHeader";
import { EditTaskForm } from "./EditTaskForm";
import { SubTasksList } from "./SubTasksList";
import { EditTaskActions } from "./EditTaskActions";
import { useTaskEdit } from "./useTaskEdit";
import { Task, validationFields } from "../../utils/interfaces";
import { validateTaskFields } from "../../utils/validateTaskFields";

export const TaskManagement = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const { deleteTask } = useTaskStore();
  const { tasks, fetchTasks, editTask, loading, addTask } = useTaskStore();
  const { isDarkMode } = useTheme();
  const [isNewTask] = useState<boolean | undefined>(location.state?.newTask);
  const [validationFields, setValidationFields] = useState<validationFields>({
    categoryAndIconExist: true,
    titleExist: true,
    missingSubTaskTitles: [],
  });

  // Local state for the current task
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  // Get taskId from location or localStorage, but use a ref to avoid re-renders
  const taskId =
    location.state?.hoveredTaskId || localStorage.getItem("currentTaskId");

  // Only fetch tasks once when component mounts
  useEffect(() => {
    console.log("Fetching tasks...");
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Removed fetchTasks from dependency array to avoid loops

  // Update current task when tasks change, but only if we have a taskId
  useEffect(() => {
    if (isNewTask) {
      const currentNewTask: Task = {
        category: "",
        icon: "",
        iconBg: "",
        id: Date.now().toString(),
        progress: 0,
        subTasks: [],
        title: "",
      };
      setCurrentTask(currentNewTask);
    } else if (taskId && tasks.length > 0) {
      const foundTask = tasks.find((task) => task.id === taskId);

      if (foundTask) {
        setCurrentTask(foundTask);
        // Store the current taskId in localStorage
        localStorage.setItem("currentTaskId", taskId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, isNewTask]); // Only depend on tasks changing, not taskId

  // Use the custom hook for task editing
  const {
    editedTitle,
    setEditedTitle,
    editedSubTasks,
    toggleSubTaskCompletion,
    updateSubTask,
    addNewSubTask,
    deleteSubTask,
    saveChanges,
    markAsCompleted,
    updateCategory,
  } = useTaskEdit({
    initialTask: currentTask,
    tasks,
    onSave: async (task) => {
      const resValidation: validationFields = validateTaskFields(task);
      if (
        !resValidation.categoryAndIconExist ||
        (resValidation.missingSubTaskTitles.length && task.subTasks.length) ||
        !resValidation.titleExist
      ) {
        setValidationFields(resValidation);
        return false;
      }
      if (isNewTask) {
        await addTask(task);
        localStorage.removeItem("currentTaskId"); // Clear after saving
      } else {
        await editTask(task);
        localStorage.removeItem("currentTaskId"); // Clear after saving
      }
      navigate("/");
      return true;
    },
  });

  const handleBackClick = () => {
    navigate("/");
  };

  const handleSaveChanges = async () => {
    const success = await saveChanges();
    if (success) {
      localStorage.removeItem("currentTaskId");
      navigate("/");
    }
  };

  const handleMarkAsCompleted = async () => {
    const success = await markAsCompleted();
    if (success) {
      navigate("/");
    }
  };

  const handleDeleteTask = () => {
    if (currentTask) deleteTask(currentTask?.id);
    navigate("/");
  };

  // Show loading state
  if (loading) {
    return (
      <div
        className={`flex flex-col min-h-screen items-center justify-center ${
          isDarkMode
            ? "bg-bg-dark text-foreground-dark"
            : "bg-bg-light text-foreground-light"
        }`}
      >
        Loading task...
      </div>
    );
  }

  // Show not found state if we've loaded tasks but couldn't find the task
  if (!loading && tasks.length > 0 && taskId && !currentTask) {
    return (
      <div
        className={`flex flex-col min-h-screen items-center justify-center ${
          isDarkMode
            ? "bg-bg-dark text-foreground-dark"
            : "bg-bg-light text-foreground-light"
        }`}
      >
        Task not found.{" "}
        <button onClick={handleBackClick} className="underline ml-2">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col flex-1 min-h-0 items-start px-9 py-0 relative ${
        isDarkMode ? "bg-bg-dark" : "bg-bg-light"
      }`}
    >
      <EditTaskHeader onBackClick={handleBackClick} isDarkMode={isDarkMode} />
      <div className="flex flex-col items-start gap-5 pt-7 pb-0 self-stretch w-full">
        <h1
          className={`font-titles font-semibold ${
            isDarkMode ? "text-foreground-dark" : "text-foreground-light"
          } text-[16px]`}
        >
          {isNewTask ? `Create new task` : `Edit Task`}
        </h1>
        {currentTask && (
          <>
            <EditTaskForm
              task={currentTask}
              editedTitle={editedTitle}
              setEditedTitle={setEditedTitle}
              isDarkMode={isDarkMode}
              onCategoryChange={updateCategory}
              validationFields={validationFields}
            />
            <SubTasksList
              subTasks={editedSubTasks}
              toggleSubTaskCompletion={toggleSubTaskCompletion}
              updateSubTask={updateSubTask}
              deleteSubTask={deleteSubTask}
              isDarkMode={isDarkMode}
              validationFields={validationFields}
            />
            <div className="flex justify-between self-stretch w-full items-center">
              <EditTaskActions
                onAddSubTask={addNewSubTask}
                onDeleteTask={handleDeleteTask}
                isDarkMode={isDarkMode}
                isNewTask={isNewTask}
              />
            </div>
          </>
        )}
        <div className="flex flex-col items-start gap-3 pt-7 pb-0 self-stretch w-full mt-auto">
          <EditTaskActions.SaveActions
            onSaveChanges={handleSaveChanges}
            onMarkCompleted={handleMarkAsCompleted}
            isDarkMode={isDarkMode}
            isNewTask={isNewTask}
          />
        </div>
      </div>
    </div>
  );
};
