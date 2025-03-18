// UI Components
import { TaskList } from "../../components/ui/TaskList";
import { AddNewTaskButton } from "../../components/ui/AddNewTaskButton";
import { Dropdown } from "../../components/ui/Dropdown";
import { useState } from "react";

// Component imports
import { TaskSection } from "./TaskSection";

// Stores
import { useTaskStore } from "../../store/TaskStore";
import { useTheme } from "../../store/ThemeStore";
import { Task } from "../../utils/interfaces";

/**
 * Homepage component that displays tasks in progress and completed tasks
 */
export const Homepage = (): JSX.Element => {
  const { isDarkMode } = useTheme();
  const { tasks, loading, error } = useTaskStore();

  // State to manage selected filters for both dropdowns
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Handle filter selection - this will be passed to both dropdowns
  const handleFilterSelect = (value: string) => {
    setSelectedFilters((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Loading state
  if (loading) {
    return (
      <div
        className={`flex items-center justify-center h-screen ${
          isDarkMode
            ? "bg-bg-dark text-foreground-dark"
            : "bg-bg-light text-foreground-light"
        }`}
      >
        Loading...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`flex items-center justify-center h-screen ${
          isDarkMode
            ? "bg-bg-dark text-foreground-dark"
            : "bg-bg-light text-foreground-light"
        }`}
      >
        Error: {error}
      </div>
    );
  }

  // Filter tasks based on selected filters if any
  const filterTasks = (taskList: Task[]) => {
    if (selectedFilters.length === 0) return taskList;
    return taskList.filter((task) => selectedFilters.includes(task.category));
  };

  // Calculate task counts
  const inProgressTasks = filterTasks(
    tasks.filter((task) => task.progress !== 100)
  );
  const completedTasks = filterTasks(
    tasks.filter((task) => task.progress === 100)
  );

  // Custom Dropdown component that wraps the original to provide synchronized behavior
  const SyncedDropdown = () => (
    <Dropdown
      title="Filter"
      isCheckbox={true}
      selectedOptions={selectedFilters}
      onOptionToggle={handleFilterSelect}
    />
  );

  return (
    <div
      className={`flex flex-col w-full flex-1 min-h-0 px-9 py-9 ${
        isDarkMode ? "bg-bg-dark" : "bg-bg-light"
      } justify-between`}
    >
      <main className="flex flex-col items-start gap-5 pt-7 pb-0 relative self-stretch w-full">
        {/* In Progress Section */}
        <TaskSection
          title="In progress"
          count={inProgressTasks.length}
          isDarkMode={isDarkMode}
          rightElement={<SyncedDropdown />}
        />

        {/* Task List */}
        <TaskList tasks={[...inProgressTasks, ...completedTasks]} />

        {/* Completed Section */}
        <TaskSection
          title="Completed"
          count={completedTasks.length}
          isDarkMode={isDarkMode}
          rightElement={<SyncedDropdown />}
        />
        <AddNewTaskButton />
      </main>
    </div>
  );
};
