import React, { Fragment as ReactFragment, useContext } from "react";
import "./App.css";

import { Nave } from "../Conteners/Nave";
import { StudentsContext } from "../Conteners/Use_Context/hook";

export function App() {
  const { count, incrementCount, DecrementCount } = useContext(StudentsContext);
  return (
    <ReactFragment>
      <h1 className="text-3xl font-bold  text-green-400">
        wellcom to Student markes Application{" "}
      </h1>
      <div className="flex flex-col">
        <h3>{count}</h3>
        <button
          onClick={incrementCount}
          className=" bg-amber-200 my-7  p-3 w-50  rounded-2xl "
        >
          INcrement
        </button>
        <button
          onClick={DecrementCount}
          className=" bg-amber-200  p-3 w-50 rounded-2xl borderde-50 "
        >
          decrement
        </button>
      </div>
    </ReactFragment>
  );
}
