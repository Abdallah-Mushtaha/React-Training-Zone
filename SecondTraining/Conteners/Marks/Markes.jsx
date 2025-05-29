import React, { useContext, useEffect, useState } from "react";
import { StudentsContext } from "../Use_Context/hook";

export function Markes() {
  // const [markes, setMarkes] = useState(0);
  // const [name, setName] = useState("");

  /*

  It will render once as soon as I visit the page, but the code doesn't work. Let's say I have more than one data array of objects, for example, to store other variables. It doesn't make sense for me to be able to add more than one
  student 

  */
  // useEffect(() => {
  //   let value = localStorage.getItem("Abood");
  //   setName("Abood");
  //   setMarkes(value);
  // }, []);
  // ! insted  this useing useContext
  // const [Markes, setMarkes] = useState(
  //   JSON.parse(localStorage.getItem("markes")) || []
  // );
  // const [Students, setStudents] = useState(
  //   JSON.parse(localStorage.getItem("Students")) || []
  // );

  const { Students, setStudents, markes, setMarkes } =
    useContext(StudentsContext);

  return (
    <ul>
      <h1 className="text-3xl font-bold  text-blue-400">Vieow Markes</h1>
      <div className="flex flex-col justify-center items-center">
        {markes.map((mark) => (
          <li
            key={mark.StudentNumber}
            className={
              mark.marke <= 50
                ? "bg-red-400 flex justify-between item-center text-center container p-5 rounded-xl text-white  mb-3 mt-5 backdrop-blur-xl"
                : "bg-green-400 flex justify-between item-center text-center container p-5 rounded-xl  text-white mb-3 mt-5  backdrop-blur-xl "
            }
          >
            <span>
              {Students.find((std) => std.number === mark.StudentNumber)?.name}
            </span>
            <span
              className={
                mark.marke <= 50
                  ? "text-[rgba(0,0,0,0.41)] text-2xl font-bold"
                  : "text-[rgba(0,0,0,0.41)] text-2xl font-bold"
              }
            >
              {mark.marke}
            </span>
          </li>
        ))}
      </div>
    </ul>
  );
}

/*
We said that the local storage 
is js => dom, which means sideEffects.
 This means I will use useEffect.

*/
