import React from "react";
import "./App.css";
const App = () => {
  const test = 12;
  const arr = [1, 2, 3, 4, 5];

  return (
    <div className="App">
      <h1>Welcome</h1>
      {arr.map((item) => (
        <p key={item}>{item}</p>
      ))}
      <p>test</p>
    </div>
  );
};

export default App;
