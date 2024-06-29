import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(0);

  useEffect(() => {
    switch (theme) {
      case 0:
        document.body.className = "light-theme";
        break;
      case 1:
        document.body.className = "dark-theme";
        break;
      case 2:
        document.body.className = "third-theme";
        break;
      default:
        document.body.className = "";
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
