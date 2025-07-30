// app/components/DarkModeToggle.tsx
import React from "react";
import { useDarkMode } from "./DarkModeContext";
import {FaMoon, FaSun} from "react-icons/fa";

export function DarkModeToggle() {
    const { darkMode, setDarkMode } = useDarkMode();

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-5 right-5 px-4 py-2 rounded-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
        >
            {darkMode ? <FaSun /> : <FaMoon />}
        </button>
    );
}
