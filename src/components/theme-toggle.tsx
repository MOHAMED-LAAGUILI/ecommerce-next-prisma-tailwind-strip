import React from "react";
import { useTheme } from "../context/theme-context";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className=" text-2xl p-3 focus:outline-none focus:ring-2 border rounded-full shadow-2xl dark:shadow-inner transition-all duration-300 bg-slate-50 text-gray-800 dark:bg-gray-700 dark:text-white"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeToggle;
