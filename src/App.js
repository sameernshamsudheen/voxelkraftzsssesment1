import logo from "./logo.svg";
import "./App.css";
import GroceryApp from "./components/GroceryApp";
import { useState } from "react";

function App() {
  const [fruitData, setFruitData] = useState([
    {
      name: "Oranges",
      votes: 0,
    },
    { name: "Bananas", votes: 0 },
  ]);
  return <GroceryApp fruitData={fruitData} setFruitData={setFruitData} />;
}

export default App;
