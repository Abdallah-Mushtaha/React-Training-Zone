import React, { useContext, useEffect, useState } from "react";
import { StudentsContext } from "../Use_Context/hook";
import { useNavigate } from "react-router";

export function Student() {
  const Navigate = useNavigate(); // custem hook from react

  function handelUpdat(number) {
    Navigate(`/StudentUpdate/${number}`);
  }
  // ! insted  this useing useContext

  // const [Students, setStudents] = useState(
  //   JSON.parse(localStorage.getItem("Students")) || []
  // );
  // const [markes, setMarkes] = useState(
  //   JSON.parse(localStorage.getItem("markes")) || []
  // );

  const { Students, setStudents, markes, setMarkes } =
    useContext(StudentsContext);

  if (Students.lenght == 0) {
    <div>Theirs No data to veiow it Now </div>;
  }

  // بدي لمن ينعمل مونت للكمبوننت تتنفذ الستيت مره وحده
  useEffect(() => {
    setStudents(JSON.parse(localStorage.getItem("Students")));
  }, []);
  function DeleteHandele(number) {
    let NewStudents = Students.filter((std) => std.number !== number);
    setStudents(NewStudents);

    let NewMarkes = markes.filter((mark) => mark.StudentNumber !== number);

    setMarkes(NewMarkes);

    localStorage.setItem("Students", JSON.stringify(NewStudents));
    localStorage.setItem("markes", JSON.stringify(NewMarkes));
  }

  return (
    <div className="wrapper flex justify-center">
      <ul className="flex-col  justify-between item-center  container p-10  rounded-xl bg-gray-200 mb-3 mt-5">
        <h1>Vieow Student</h1>
        {Students.map((std) => {
          return (
            <li
              className="font-bold  flex justify-between  items-center text-2xl text-blue-50 bg-blue-400 mt-5 p-5 m-1 rounded-2xl"
              key={std.name}
            >
              {std.name}
              <div className="flex gap-2">
                <button
                  onClick={() => handelUpdat(std.number)}
                  className="bg-gray-400 text-2xl p-3 cursor-pointer rounded-3xl font-bold text-white"
                >
                  updating
                </button>

                <button
                  onClick={() => DeleteHandele(std.number)}
                  className="bg-red-400 text-2xl p-3 cursor-pointer rounded-3xl font-bold text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
