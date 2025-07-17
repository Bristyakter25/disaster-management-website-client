// components/ThemeToggle.jsx
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    // get theme from localStorage or system preference
    if (typeof window !== "undefined") {
      return localStorage.theme === "dark" || 
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white  top-4 right-4 z-50"
      onClick={() => setDarkMode(!darkMode)}
      title="Toggle Theme"
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}
