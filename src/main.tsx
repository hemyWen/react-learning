import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
console.log("Hello World");
const a = 1;
const b = 2;
const c = a + b;
console.log(c);
createRoot(document.getElementById("root")!).render(<App />);
