"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create a Context for the theme
//@ts-ignore
const ThemeContext = createContext();

// Provider component that wraps your app and makes theme available
//@ts-ignore
export const ThemeProvider = ({ children }) => {
  // Default to an empty string for light mode
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Retrieve the saved theme from localStorage on initial mount
    const savedTheme = localStorage.getItem("theme") || "";
    setTheme(savedTheme);

    // Update the DOM accordingly
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setLoading(false);
  }, []);

  const toggleTheme = () => {
    // Toggle theme between "dark" and empty string
    const newTheme = theme === "dark" ? "" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Update the DOM class for the theme
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {loading ? <div></div> : children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easy access to the ThemeContext values
export const useTheme = () => useContext(ThemeContext);
