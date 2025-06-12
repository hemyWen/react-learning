import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";
const a = 1;
const b = 2;
const c = 3;
console.log(a + b + c);
createRoot(document.getElementById("root")!).render(<App />);
