import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";
console.log("Hello world!");
const a = 1;
const b = 2;
const c = a * b;
console.log(c);

createRoot(document.getElementById("root")!).render(<App />);
