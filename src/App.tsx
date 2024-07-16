import { useState } from "react";
import { Button } from "@/components/ui/button";
import DocsLink from "@/components/docs-links";
import Chart from "@/components/sample-chart";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React + Tailwind = Shacdn base</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>

      <Chart />

      <DocsLink />
    </>
  );
}

export default App;
