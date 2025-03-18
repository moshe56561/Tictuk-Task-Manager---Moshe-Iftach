import { Trash2Icon, CheckCircleIcon } from "lucide-react";
import { Button } from "../../components/ui/Button";

interface EditTaskActionsProps {
  onAddSubTask: () => void;
  onDeleteTask: () => void;
  isDarkMode: boolean;
  isNewTask: boolean | undefined;
}

export const EditTaskActions = ({
  onAddSubTask,
  onDeleteTask,
  isDarkMode,
  isNewTask,
}: EditTaskActionsProps): JSX.Element => {
  return (
    <>
      <Button
        variant="outline"
        className={`h-9 gap-2 px-3 py-2 ${
          isDarkMode ? "bg-[#0A013D]" : "bg-bg-light"
        } border-[1px] border-[#5F33E1] rounded-[8px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.12)] flex items-center`}
        onClick={onAddSubTask}
      >
        <span
          className={`font-button font-medium text-[20px] ${
            isDarkMode
              ? "text-foreground-dark hover:text-black"
              : "text-foreground-light hover:text-black"
          } flex items-center`}
        >
          <span className="text-[30px] mr-1">+</span> Add sub tasks
        </span>
      </Button>

      {!isNewTask && (
        <Button
          variant="outline"
          className={`h-9 gap-2 px-3 py-2 ${
            isDarkMode ? "bg-bg-dark" : "bg-bg-light"
          } border-app-primary shadow-shadow flex items-center`}
          onClick={onDeleteTask}
        >
          <Trash2Icon
            className={`w-5 h-5 ${
              isDarkMode ? "text-white" : "text-black"
            } hover:${isDarkMode ? "text-black" : "text-white"}`}
          />
        </Button>
      )}
    </>
  );
};

interface SaveActionsProps {
  onSaveChanges: () => void;
  onMarkCompleted: () => void;
  isDarkMode: boolean;
  isNewTask: boolean | undefined;
}

// Using compound component pattern
EditTaskActions.SaveActions = function SaveActions({
  onSaveChanges,
  onMarkCompleted,
  isDarkMode,
  isNewTask,
}: SaveActionsProps): JSX.Element {
  return (
    <>
      <Button
        variant="custom-primary"
        className="h-9 w-full rounded-lg shadow-shadow"
        onClick={onSaveChanges}
      >
        <span className="font-button font-medium text-[16px]">
          {isNewTask ? `Save new task` : `Save changes`}
        </span>
      </Button>

      {!isNewTask && (
        <Button
          variant="outline"
          className={`h-9 w-full ${
            isDarkMode ? "bg-bg-dark" : "bg-bg-light"
          } border-app-primary ${
            isDarkMode ? "text-foreground-dark" : "text-foreground-light"
          } rounded-lg shadow-shadow`}
          onClick={onMarkCompleted}
        >
          <CheckCircleIcon className="w-5 h-5 mr-2" />
          <span className="font-button font-medium text-[16px]">
            Mark as completed
          </span>
        </Button>
      )}
    </>
  );
};
