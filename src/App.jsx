import { useState } from "react";
import LocationSelector from "./LocationSelector";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <LocationSelector />
      </div>
    </>
  );
}

export default App;
