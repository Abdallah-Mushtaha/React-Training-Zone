import { useState } from "react";

import "./App.css";
import { useSelector, useDispatch } from "react-redux";

import { mult, Divi, sum, Sub } from "./features/calcSlice";
function App() {
  const result = useSelector((state) => {
    return state.calculation.value;
  });
  let dispatch = useDispatch();
  const [firstNumberInput, setFirstNumberInput] = useState(null);
  const [secondNumberInput, setSecondNumberInput] = useState(null);

  // EVENT HANDLERS
  function handleSumClick() {
    dispatch(
      sum({
        Fnum: firstNumberInput,
        Snum: secondNumberInput,
      })
    );
  }

  function handleSubClick() {
    dispatch(
      Sub({
        Fnum: firstNumberInput,
        Snum: secondNumberInput,
      })
    );
  }

  function handleMultClick() {
    dispatch(
      mult({
        Fnum: firstNumberInput,
        Snum: secondNumberInput,
      })
    );
  }

  function handleDivClick() {
    dispatch(
      Divi({
        Fnum: firstNumberInput,
        Snum: secondNumberInput,
      })
    );
  }

  const handleClear = () => {
    setFirstNumberInput("");
    setSecondNumberInput("");
  };

  return (
    <div className="App">
      {/* The main calculator card container */}
      <div className="calculator-card">
        <h1 className="text-3xl font-extrabold text-[#34495E] mb-2">
          Professional Calculator
        </h1>

        {/* First Number Input */}
        <label>First Number</label>
        <input
          type="number"
          placeholder="Enter first value"
          value={firstNumberInput}
          onChange={(e) => setFirstNumberInput(e.target.value)}
        />

        {/* Second Number Input */}
        <label>Second Number</label>
        <input
          type="number"
          placeholder="Enter second value"
          value={secondNumberInput}
          onChange={(e) => setSecondNumberInput(e.target.value)}
        />

        {/* Operation Buttons Grid */}
        <div className="buttons-grid">
          <button onClick={() => handleSumClick("sum")}>Sum</button>
          <button onClick={() => handleSubClick("subtract")}>Subtract</button>
          <button onClick={() => handleMultClick("multiply")}>Multiply</button>
          <button onClick={() => handleDivClick("divide")}>Divide</button>
        </div>

        {/* Clear Button */}
        <button onClick={handleClear} className="clear-button">
          Clear All
        </button>

        {/* Separator Line */}
        <div className="separator"></div>

        {/* Result Display Area */}
        <div className="result-box">
          <p>Calculation Result</p>
          <h2 style={{ width: "100%" }}>{result}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
