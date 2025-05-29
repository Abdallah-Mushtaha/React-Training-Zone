import React, { useContext, useEffect, useState } from "react";
import { StudentsContext } from "../Use_Context/hook";
import { UseForm } from "../Hooks/use-form";

export function InsertMarks() {
  // ! insted  this useing useContext
  // const [markes, setMarkes] = useState(
  //   JSON.parse(localStorage.getItem("markes")) || []
  // );
  // const [Students, setStudents] = useState(
  //   JSON.parse(localStorage.getItem("Students")) || []
  // );

  const { markes, setMarkes, Students, setStudents } =
    useContext(StudentsContext);

  // ! insted of this use custem hooks
  //   const [marke, setMarke] = useState(0);
  //   const [error, setError] = useState("");
  // const [StudentNumber, setStudentNumber] = useState(0);

  // لاحظ اعطيته الانيشل فاليو  على انها اوبجيكت
  const { error, setFormError, setValue, value } = UseForm({
    StudentNumber: 0,
    marke: 0,
  });

  function handelfun(event) {
    event.preventDefault();
    console.log(value.StudentNumber, value.marke);

    if (value.StudentNumber === "no-Slect" || value.StudentNumber === 0) {
      // setError("PleaseSelect Student");
      // setMarke(0);
      // setStudentNumber(0);
      // return;  //عشان ما يكمل يدخل على الكود ال بعده
      //!insted this do
      setFormError("PleaseSelect Student");
      return;
    }

    if (markes.find((mark) => mark.StudentNumber == value.StudentNumber)) {
      setFormError("this number is exist.");
      return;
    }

    // console.log(StudentNumber, marke);
    setMarkes((prevuse) => {
      return [
        ...prevuse,
        { StudentNumber: value.StudentNumber, marke: value.marke },
      ];
    });

    setFormError("");
    return;
  }

  // useEffect(() => {
  //   localStorage.setItem("markes", JSON.stringify(markes));
  // }, [markes]);

  return (
    <div>
      <h1 className="text-3xl font-bold  text-blue-400">InsertStudentMarks</h1>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handelfun}
      >
        <select
          className="block w-lg p-4 m-4 bg-gray-400  outline-none rounded-lg"
          onChange={(event) => {
            setValue({ ...value, StudentNumber: event.target.value });
          }}
        >
          <option value="no-Slect">SelectStudent</option>
          {Students.map((student) => {
            return (
              <option key={student.name} value={student.number}>
                {student.name}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          placeholder="Markes"
          className="block w-lg p-4 m-4  bg-gray-400  outline-none rounded-lg"
          value={value.marke}
          onChange={(event) => {
            // console.log("Change");
            // setMarke(event.target.value);
            setValue({ ...value, marke: event.target.value });
          }}
        />

        <button className="block w-lg p-4 m-4 bg-slate-400  rounded-lg cursor-pointer hover:bg-slate-600 hover:text-white">
          InsertMarkes
        </button>
        {error ? <p className="text-red-400">{error}</p> : null}
      </form>
    </div>
  );
}
