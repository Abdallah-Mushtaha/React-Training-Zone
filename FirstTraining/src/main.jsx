import { createRoot } from "react-dom/client"; //react-dom=> الوسيط بين رياكت والدوم
import { App } from "./App";
import { Provider } from "./App";
let rootElm = document.querySelector("#root");
let creatroot = createRoot(rootElm);
creatroot.render(
  <Provider>
    <App />
  </Provider>
);
