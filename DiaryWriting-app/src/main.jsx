import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Notes from "./Commponent/Notes";
import Layout from "./Commponent/Layout";
import Settings from "./Commponent/Settings";

const root = document.getElementById("root");
const RootElement = createRoot(root);
RootElement.render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />}></Route>
        <Route path="/Notes" element={<Notes />}></Route>
        <Route path="/Notes/:param" element={<Notes />}></Route>
        <Route path="/Settings" element={<Settings />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
