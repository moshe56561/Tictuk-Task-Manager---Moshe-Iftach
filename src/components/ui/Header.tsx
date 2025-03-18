import React from "react";
import { useTheme } from "../../store/ThemeStore";
import MoonPurple from "../../icons/MoonPurple.svg";
import MoonYellow from "../../icons/MoonYellow.svg";
import SunWhite from "../../icons/SunWhite.svg";
import SunYellow from "../../icons/SunYellow.svg";

export const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header
      className={`flex items-center justify-between px-9 py-9 w-full flex-[0_0_auto] ${
        isDarkMode
          ? "bg-bg-dark text-foreground-dark"
          : "bg-bg-light text-foreground-light"
      }`}
    >
      {/* Logo & Title */}
      <div className="inline-flex items-center justify-center gap-2">
        <img
          className="w-[38.5px] h-[35px]"
          alt="Task Manager Logo"
          src="https://c.animaapp.com/PGDh4UmZ/img/vector.svg"
        />
        <h1
          className={`font-inter ${
            isDarkMode ? "text-white" : "text-black"
          } text-xl font-bold leading-normal`}
        >
          Task Manager
        </h1>
      </div>

      {/* Theme Toggle Button */}
      <button
        className="flex w-[72px] h-9 items-center justify-center gap-2 px-3 py-2 rounded-lg shadow-md bg-[#5F33E1] transition-all"
        onClick={toggleTheme}
      >
        <img
          className={`w-5 h-5 transition-all filter`}
          alt="Light mode icon"
          src={
            isDarkMode
              ? (SunWhite as unknown as string)
              : (SunYellow as unknown as string)
          }
        />
        <img
          className={`w-5 h-5 transition-all`}
          alt="Dark mode icon"
          src={
            !isDarkMode
              ? (MoonPurple as unknown as string)
              : (MoonYellow as unknown as string)
          }
        />
      </button>
    </header>
  );
};
