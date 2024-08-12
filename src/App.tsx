import { useState } from "react";
import { Button } from "@/components/ui/button";
import DocsLink from "@/components/docs-links";
import Chart from "@/components/sample-chart";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React + Tailwind = Shacdn base with charting</h1>
      <Chart />

      <hr />
      <h2>Card and other</h2>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>
      <DocsLink />
    </>
  );
}

export default App;
