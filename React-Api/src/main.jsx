import App from "./App";
import { createRoot } from "react-dom/client";

let rootElement = document.getElementById("root");
let createroot = createRoot(rootElement);
createroot.render(<App />);
