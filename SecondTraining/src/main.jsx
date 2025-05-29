import React from "react";
import { App } from "./App.jsx";
import { createRoot } from "react-dom/client";
import { Layout } from "../Conteners/Layout.jsx";
import { Markes } from "../Conteners/Marks/Markes.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { Student } from "../Conteners/Students/Student.jsx";
import { InsertMarks } from "../Conteners/Marks/InsertMarks.jsx";
import { InsertesStd } from "../Conteners/Students/InsertesStd.jsx";
import { StdUpdate } from "../Conteners/Students/update.jsx";

let rootElm = document.querySelector("#root");
let creatroot = createRoot(rootElm);
creatroot.render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/Markes" element={<Markes />} />
        <Route path="/Student" element={<Student />} />
        <Route path="/InsertMarks" element={<InsertMarks />} />
        <Route path="/InsertesStd" element={<InsertesStd />} />
        <Route path="/StudentUpdate/:number" element={<StdUpdate />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
/*
/ StudentUpdate/:number => called parames
As I said, it will come to you here
id
data
value is changed
Then we notice in the reactRouter location
in the nav section
the useNavigate parameter
which is a custom hook
of the reactRouter

    
  
  */
