import { Card, CardContent } from "../../components/ui/Card";
import { Task, validationFields } from "../../utils/interfaces";
import { Dropdown } from "../../components/ui/Dropdown";
import { useState, useEffect } from "react";

interface EditTaskFormProps {
  task?: Task;
  editedTitle: string;
  setEditedTitle: (title: string) => void;
  isDarkMode: boolean;
  onCategoryChange?: (category: string, icon: string) => void;
  validationFields?: validationFields;
}

export const EditTaskForm = ({
  task,
  editedTitle,
  setEditedTitle,
  isDarkMode,
  onCategoryChange,
  validationFields,
}: EditTaskFormProps): JSX.Element => {
  return (
    <div className="flex flex-col items-start gap-2 self-stretch w-full">
      <TaskCategorySelector
        task={task}
        isDarkMode={isDarkMode}
        onCategoryChange={onCategoryChange}
        validationFields={validationFields}
      />
      <TaskTitleInput
        editedTitle={editedTitle}
        setEditedTitle={setEditedTitle}
        isDarkMode={isDarkMode}
        validationFields={validationFields}
      />
    </div>
  );
};

interface TaskCategorySelectorProps {
  task?: Task;
  isDarkMode: boolean;
  onCategoryChange?: (category: string, icon: string) => void;
  validationFields?: {
    categoryAndIconExist: boolean;
  };
}

const TaskCategorySelector = ({
  task,
  isDarkMode,
  onCategoryChange,
  validationFields,
}: TaskCategorySelectorProps): JSX.Element => {
  const [isError, setIsError] = useState(
    validationFields?.categoryAndIconExist === false
  );

  useEffect(() => {
    setIsError(validationFields?.categoryAndIconExist === false);
  }, [validationFields]);

  const normalizeCategory = (category?: string): string => {
    if (!category) return "";
    const categoryMap: Record<string, string> = {
      "Self Care": "SelfCare",
      Pet: "Pet",
      Personal: "Personal",
      Shop: "Shop",
      Work: "Work",
    };
    return categoryMap[category] || category;
  };

  const categoryOptions = [
    { value: "Pet", icon: "Pet" },
    { value: "Personal", icon: "Personal" },
    { value: "Self Care", icon: "SelfCare" },
    { value: "Shop", icon: "Shop" },
    { value: "Work", icon: "Work" },
  ];

  const handleCategorySelect = (value: string, icon: string) => {
    if (onCategoryChange) {
      onCategoryChange(value, icon);
    }
    if (isError) setIsError(false); // Clear error when a category is selected
  };

  return (
    <div className="w-full relative">
      <div
        className={`w-full ${
          isDarkMode ? "text-foreground-dark" : "text-foreground-light"
        } ${isError ? "border border-[#D30136] rounded-[12px]" : ""}`}
      >
        <Dropdown
          title="Select Category"
          options={categoryOptions}
          isCheckbox={false}
          selectedValue={normalizeCategory(task?.category)}
          onSelect={handleCategorySelect}
          fullWidth={true}
        />
      </div>
      {/* Error Message */}
      {isError && (
        <span className="text-[#D30136] text-[12px] font-normal font-inter mt-[4px] block text-left">
          err category
        </span>
      )}
    </div>
  );
};

interface TaskTitleInputProps {
  editedTitle: string;
  setEditedTitle: (title: string) => void;
  isDarkMode: boolean;
  validationFields?: {
    titleExist: boolean;
  };
}

const TaskTitleInput = ({
  editedTitle,
  setEditedTitle,
  isDarkMode,
  validationFields,
}: TaskTitleInputProps): JSX.Element => {
  const [isError, setIsError] = useState(
    validationFields?.titleExist === false
  );

  useEffect(() => {
    setIsError(validationFields?.titleExist === false);
  }, [validationFields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
    if (isError) setIsError(false); // Clear error when typing
  };

  return (
    <div className="w-full relative">
      <Card
        className={`w-full ${
          isDarkMode
            ? "bg-bg-secondary-dark rounded-xl"
            : "bg-white rounded-[12px] shadow-md"
        } ${isError ? "border border-[#D30136]" : "border-0"} mt-[10px]`}
      >
        <CardContent className="p-3">
          <div className="relative w-full">
            {/* Floating Label */}
            <label
              className={`absolute left-3 transition-all ${
                editedTitle
                  ? "top-[6px] text-[12px] font-medium"
                  : "top-1/2 -translate-y-1/2 text-[16px] font-medium"
              } ${
                isDarkMode ? "text-white" : "text-gray-500"
              } pointer-events-none`}
            >
              Name your task
            </label>
            {/* Input Field */}
            <input
              value={editedTitle}
              onChange={handleChange}
              className={`w-full h-[48px] border-transparent px-3 pb-[6px] pt-[20px] text-[16px] font-bold bg-transparent outline-none leading-none ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            />
          </div>
        </CardContent>
      </Card>
      {/* Error Message */}
      {isError && (
        <span className="text-[#D30136] text-[12px] font-normal font-inter mt-[4px] block text-left">
          error text
        </span>
      )}
    </div>
  );
};
