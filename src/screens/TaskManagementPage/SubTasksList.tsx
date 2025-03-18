import { SubTask, validationFields } from "../../utils/interfaces";
import { SubTaskItem } from "./SubTaskItem";

interface SubTasksListProps {
  subTasks: SubTask[];
  toggleSubTaskCompletion: (subtaskId: string) => void;
  updateSubTask: (subtaskId: string, updatedFields: Partial<SubTask>) => void;
  deleteSubTask: (subtaskId: string) => void;
  isDarkMode: boolean;
  validationFields: validationFields;
}

export const SubTasksList = ({
  subTasks,
  toggleSubTaskCompletion,
  updateSubTask,
  deleteSubTask,
  isDarkMode,
  validationFields,
}: SubTasksListProps): JSX.Element => {
  return (
    <div className="flex-col items-start gap-2 pl-4 pr-0 py-0 border-l-4 border-app-primary flex self-stretch w-full">
      {subTasks.map((subtask, index) => (
        <SubTaskItem
          key={subtask.id}
          subtask={subtask}
          toggleSubTaskCompletion={toggleSubTaskCompletion}
          updateSubTask={updateSubTask}
          deleteSubTask={deleteSubTask}
          isDarkMode={isDarkMode}
          validationFields={validationFields}
          index={index}
        />
      ))}
    </div>
  );
};
