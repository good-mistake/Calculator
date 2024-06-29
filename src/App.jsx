import React, { useContext } from "react";
import { useState } from "react";
import Theme from "./Theme";
import { ThemeProvider, ThemeContext } from "./Themecontext";

function App() {
  const [input, setInput] = useState("");
  const [operation, setOperation] = useState("");
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [error, setError] = useState("");

  const numberlists = [
    7,
    8,
    9,
    "DEL",
    4,
    5,
    6,
    "+",
    1,
    2,
    3,

    "-",
    ".",
    0,
    "/",
    "x",
    "Reset",
    "=",
  ];

  const handleButtonClick = (value) => {
    if (error) setError("");

    if (!operation) {
      if (value === "." && firstValue.includes(".")) return;
      setFirstValue((prev) => prev + value);
      setInput((prev) => prev + value);
    } else {
      if (value === "." && secondValue.includes(".")) return;
      setSecondValue((prev) => prev + value);
      setInput((prev) => prev + value);
    }
  };

  const handleOperationClick = (op) => {
    if (firstValue && !operation) {
      setOperation(op);
      setInput((prev) => prev + op);
    }
  };

  const handleReset = () => {
    setInput("");
    setFirstValue("");
    setSecondValue("");
    setOperation("");
    setError("");
  };

  const handleDelete = () => {
    if (error) setError("");

    if (secondValue) {
      setSecondValue((prev) => prev.slice(0, -1));
      setInput((prev) => prev.slice(0, -1));
    } else if (operation) {
      setOperation("");
      setInput((prev) => prev.slice(0, -1));
    } else {
      setFirstValue((prev) => prev.slice(0, -1));
      setInput((prev) => prev.slice(0, -1));
    }
  };

  const handleCalculate = () => {
    if (!firstValue || !secondValue || !operation) {
      setError("Incomplete expression");
      return;
    }

    try {
      const result = eval(`${firstValue}${operation}${secondValue}`);
      setInput(String(result));
      setFirstValue(String(result));
      setSecondValue("");
      setOperation("");
    } catch (error) {
      setError("Invalid expression");
    }
  };
  const formatInput = (input) => {
    return input.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`calculator theme-${theme}`}>
      <Theme />
      <div className="display">
        {error ? <span className="error">{error}</span> : formatInput(input)}
      </div>
      <div className="buttons">
        {numberlists.map((button, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (button === "Reset") handleReset();
              else if (button === "DEL") handleDelete();
              else if (button === "=") handleCalculate();
              else if (["+", "-", "*", "/"].includes(button))
                handleOperationClick(button);
              else handleButtonClick(String(button));
            }}
            className={
              button === "="
                ? "equal"
                : button === "Reset"
                ? "reset"
                : button === "DEL"
                ? "del"
                : ""
            }
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
