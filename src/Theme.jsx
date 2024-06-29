import React, { useContext } from "react";
import { ThemeContext } from "./Themecontext";
const Theme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleSliderChange = (event) => {
    setTheme(parseInt(event.target.value, 10));
  };

  return (
    <div className="theme-slider-container">
      <h1>calc</h1>
      <div>
        {" "}
        <div className="theme-labels">
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>
        <div>
          {" "}
          <span className="theme-label">THEME</span>{" "}
          <input
            type="range"
            min="0"
            max="2"
            value={theme}
            onChange={handleSliderChange}
            className="theme-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default Theme;
