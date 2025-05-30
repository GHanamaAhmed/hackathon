"use client";
import { useState, useEffect } from "react";

export const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
        if (isDarkMode) {
            document.documentElement.classList.add("dark-mode");
        } else {
            document.documentElement.classList.remove("dark-mode");
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        //@ts-ignore
        setIsDarkMode((prevMode) => !prevMode);
    };

    return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
