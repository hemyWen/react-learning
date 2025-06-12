import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
console.log(Math.random());
createRoot(document.getElementById("root")!).render(<App />);
