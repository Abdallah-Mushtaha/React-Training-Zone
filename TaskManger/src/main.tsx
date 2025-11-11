import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../Containers/layout.tsx";
import Login from "../Components/auth/login.tsx";
import SignUp from "../Components/auth/SignUp.tsx";
import HomeScreen from "../Containers/HomeScreen.tsx";
import store from "./store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />

          <Route path="/" element={<App />} />
          <Route element={<Layout />}>
            <Route path="/Home" element={<HomeScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
