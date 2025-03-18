import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { Checkbox } from "../../components/ui/Checkbox";
import { SubTask, validationFields } from "../../utils/interfaces";
import Penciel from "../../icons/Penciel.svg";
import Trash from "../../icons/Trash.svg";

interface SubTaskItemProps {
  subtask: SubTask;
  toggleSubTaskCompletion: (subtaskId: string) => void;
  updateSubTask: (subtaskId: string, updatedFields: Partial<SubTask>) => void;
  deleteSubTask: (subtaskId: string) => void;
  isDarkMode: boolean;
  validationFields?: validationFields;
  index: number;
}

export const SubTaskItem = ({
  subtask,
  toggleSubTaskCompletion,
  updateSubTask,
  deleteSubTask,
  isDarkMode,
  validationFields,
  index,
}: SubTaskItemProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(subtask.title);
  const [localError, setLocalError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const serverError = validationFields?.missingSubTaskTitles?.includes(index);

  useEffect(() => {
    setLocalError(serverError || false);
  }, [serverError]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        if (isEditing) {
          saveChanges();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, editedTitle]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const saveChanges = () => {
    updateSubTask(subtask.id, { title: editedTitle });
    setIsEditing(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setEditedTitle(newTitle);

    if (localError && newTitle.trim() !== "") {
      setLocalError(false);
    }
  };

  // SVG filter for the purple color #5F33E1
  const purpleFilter =
    "invert(25%) sepia(82%) saturate(2869%) hue-rotate(254deg) brightness(88%) contrast(92%)";

  return (
    <div
      className="flex items-center gap-3 self-stretch w-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={cardRef}
    >
      <Checkbox
        id={`subtask-${subtask.id}`}
        checked={subtask.completed}
        onCheckedChange={() => toggleSubTaskCompletion(subtask.id)}
        className={`w-6 h-6 border-2 ${
          isDarkMode ? "border-foreground-dark" : "border-gray-300"
        }`}
      />
      <div
        className={`flex-1 transition-all duration-200 ${
          isHovered ? "pr-16" : ""
        }`}
      >
        <div className="w-full relative">
          <Card
            className={`w-full rounded-xl ${
              localError ? "border border-[#D30136]" : "border-0"
            } ${isDarkMode ? "bg-bg-secondary-dark" : "bg-white shadow-md"}`}
          >
            <CardContent className="p-3">
              <div className="flex flex-col items-start gap-1">
                <span
                  className={`text-[12px] font-normal ${
                    isDarkMode ? "text-bg-secondary-light" : "text-gray-600"
                  }`}
                >
                  Sub task
                </span>
                {isEditing ? (
                  <input
                    ref={inputRef}
                    value={editedTitle}
                    onChange={handleTitleChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveChanges();
                      if (e.key === "Escape") {
                        setEditedTitle(subtask.title);
                        setIsEditing(false);
                      }
                    }}
                    className={`text-[14px] w-full border-none font-medium outline-none ${
                      isDarkMode
                        ? "text-foreground-dark bg-bg-secondary-dark"
                        : "text-gray-900 bg-white"
                    }`}
                  />
                ) : (
                  <div
                    className={`text-[14px] w-full font-medium ${
                      isDarkMode ? "text-foreground-dark" : "text-gray-900"
                    }`}
                  >
                    {subtask.title}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          {localError && (
            <span className="text-[#D30136] text-[12px] font-normal font-inter mt-[4px] block text-left">
              error text
            </span>
          )}
        </div>
      </div>
      {isHovered && (
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-2">
          <div className="w-6 h-6 cursor-pointer" onClick={handleEditClick}>
            <img
              src={Penciel as unknown as string}
              alt="Edit"
              className="w-full h-full"
              style={{ filter: purpleFilter }}
            />
          </div>
          <div
            className="w-6 h-6 cursor-pointer"
            onClick={() => deleteSubTask(subtask.id)}
          >
            <img
              src={Trash as unknown as string}
              alt="Delete"
              className="w-full h-full"
              style={{ filter: purpleFilter }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
