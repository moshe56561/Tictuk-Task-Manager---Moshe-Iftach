import React from "react";
import { Button } from "./Button";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AddNewTaskButton: React.FC = () => {
  const navigate = useNavigate();

  const handleNewTaskClick = () => {
    navigate("/new-task", {
      state: {
        newTask: true,
      },
    });
  };

  return (
    <div className="flex flex-col items-start gap-2.5 pt-7 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
      <Button
        className="flex h-9 items-center justify-center gap-2 px-3 py-2 relative self-stretch w-full bg-app-primary rounded-lg shadow-shadow [&:hover]:bg-app-primary [&:hover]:opacity-95"
        onClick={handleNewTaskClick}
      >
        <PlusIcon className="w-5 h-5" />
        <span className="relative w-fit mt-[-0.50px] font-button font-[number:var(--button-font-weight)] text-foreground-dark text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] whitespace-nowrap [font-style:var(--button-font-style)]">
          New Task
        </span>
      </Button>
    </div>
  );
};
