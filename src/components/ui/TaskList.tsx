import React, { useState } from "react";
import { Card } from "./Card";
import { Checkbox } from "./Checkbox";
import { useNavigate } from "react-router-dom";
import { Task } from "../../utils/interfaces";
import { useTheme } from "../../store/ThemeStore";
import { CircleProgressBar } from "./CircleProgressBar ";
import iconDict from "../../utils/iconsDict";
import { iconesColorDict } from "../../utils/iconsColorDict";
import { useTaskStore } from "../../store/TaskStore";
import Penciel from "../../icons/Penciel.svg";
import Trash from "../../icons/Trash.svg";

interface TaskListProps {
  tasks: Task[];
}
type IconType = keyof typeof iconesColorDict;

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const { isDarkMode } = useTheme();
  const { deleteTask } = useTaskStore();
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEditTaskClick = (taskId: string) => {
    navigate("/edit-task", {
      state: {
        hoveredTaskId: taskId,
      },
    });
  };

  const handleDeleteTaskClick = (taskId: string) => {
    if (taskId) deleteTask(taskId);
  };

  // You could define a function to get progress colors based on completion percentage
  const getProgressColors = (icon: string) => {
    // Example color schemes based on progress
    if (icon in iconesColorDict) {
      return iconesColorDict[icon as IconType];
    }
    return { filled: "#06D6A0", unfilled: "#D5F7EE" }; // Green theme
  };

  // SVG filter for the purple color #5F33E1
  const purpleFilter =
    "invert(25%) sepia(82%) saturate(2869%) hue-rotate(254deg) brightness(88%) contrast(92%)";

  // Helper function to get background color style
  const getBackgroundColor = (icon: string) => {
    if (icon in iconesColorDict) {
      return { backgroundColor: iconesColorDict[icon as IconType].unfilled };
    }
    return { backgroundColor: "#D5F7EE" }; // Default background color
  };

  return (
    <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
      {tasks.map((task) => {
        const progressColors = getProgressColors(task.icon);
        const bgColorStyle = getBackgroundColor(task.icon);

        return (
          <div
            key={task.id}
            className="relative w-full"
            onMouseEnter={() => setHoveredTaskId(task.id)}
            onMouseLeave={() => setHoveredTaskId(null)}
          >
            <Card
              className={`flex items-center justify-between
              px-3 py-2 relative self-stretch transition-all duration-200 ${
                isDarkMode
                  ? "bg-[#342F65] border-[#342F65]"
                  : "bg-[#FFF] border-[#FFF]"
              } rounded-xl shadow-[0px_1px_6px_0px_rgba(0,0,0,0.12)] ${
                hoveredTaskId === task.id ? "w-[calc(100%-72px)]" : "w-full"
              }`}
            >
              <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                <Checkbox
                  className={`w-6 h-6 ${
                    isDarkMode
                      ? "border-foreground-dark"
                      : "border-foreground-light"
                  }`}
                />
                <div
                  className="inline-flex items-center gap-2.5 p-1 relative flex-[0_0_auto] rounded-xl"
                  style={bgColorStyle}
                >
                  {iconDict[task.icon]}
                </div>
                <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
                  <div
                    className={`relative self-stretch mt-[-1.00px] font-regular font-[number:var(--regular-font-weight)] ${
                      isDarkMode
                        ? "text-foreground-dark"
                        : "text-foreground-light"
                    } text-[length:var(--regular-font-size)] tracking-[var(--regular-letter-spacing)] leading-[var(--regular-line-height)] [font-style:var(--regular-font-style)]`}
                  >
                    {task.category}
                  </div>
                  <div
                    className={`relative w-fit font-small font-[number:var(--small-font-weight)] ${
                      isDarkMode
                        ? "text-foreground-dark"
                        : "text-foreground-light"
                    } text-[length:var(--small-font-size)] tracking-[var(--small-letter-spacing)] leading-[var(--small-line-height)] [font-style:var(--small-font-style)]`}
                  >
                    {task.title}
                  </div>
                </div>
              </div>

              {/* Replace the percentage div with CircleProgressBar */}
              {hoveredTaskId !== task.id && (
                <div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
                  <CircleProgressBar
                    progress={task.progress}
                    size={43}
                    strokeWidth={3.2}
                    filledColor={progressColors.filled}
                    unfilledColor={progressColors.unfilled}
                    textColor={
                      isDarkMode
                        ? "var(--foreground-dark)"
                        : "var(--foreground-light)"
                    }
                    className="flex-shrink-0"
                  />
                </div>
              )}
            </Card>

            {/* Pencil and Trash Icons (positioned next to the card) */}
            {hoveredTaskId === task.id && (
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-2">
                <div
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleEditTaskClick(task.id)}
                >
                  <img
                    src={Penciel as unknown as string}
                    alt="Edit"
                    className="w-full h-full"
                    style={{ filter: purpleFilter }}
                  />
                </div>
                <div
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleDeleteTaskClick(task.id)}
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
      })}
    </div>
  );
};
