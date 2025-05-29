import React, { useContext, useEffect, useState } from "react";
import { StudentsContext } from "../Use_Context/hook";
import { UseForm } from "../Hooks/use-form";

export function InsertesStd() {
  // ! insted  this useing useContext
  // const [Students, setStudents] = useState(
  //   JSON.parse(localStorage.getItem("Students")) || []
  // );

  const { Students, setStudents } = useContext(StudentsContext);
// Now I want to write the 3. I don't have to keep writing them in every component.
// I know them once and don't use them on another page. We will use the ..
  // ! .. custem hook
  // const [name, setName] = useState("");
  // const [number, setnumber] = useState(0);
  // const [error, setError] = useState("");

  const { error, setFormError, value, setValue } = UseForm({
    name: "",
    number: 0,
  });

  function handelfun(event) {
    // console.log(event);
    // localStorage.setItem(name, number);
    // console.log("form is submitted");

    event.preventDefault();
    console.log(value.name, value.number); // Abood 20

    if (value.name == "" || value.number == 0) {
      FormError("Please enter name and number");
      return;
    }
    if (Students.find((student) => student.number == value.number)) {
      setFormError("this number is exist.");
      return;
    }
    setStudents((prev) => {
      return [...prev, { name: value.name, number: value.number }];
    });
    // !insted of this
    // setError("");
    // setName("");
    // setnumber(0);
    setFormError("");
    return;
  }
  // ! you can use it  in useContext hooks nested her
  // useEffect(() => {
  //   localStorage.setItem("Students", JSON.stringify(Students));
  // }, [Students]);

  return (
    <div>
      <h1 className="text-3xl font-bold  text-blue-400">
        Insertes Student information{" "}
      </h1>

      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handelfun}
      >
        <input
          type="text"
          placeholder="number"
          className="block w-lg p-4 m-4  bg-gray-400  outline-none rounded-lg"
          value={value.number}
          onChange={(event) => {
            // console.log("Change");
            // setnumber(event.target.value);
            setValue({ ...value, number: event.target.value });
          }}
        />
        <input
          type="text"
          placeholder="name"
          className="block w-lg p-4 m-4  bg-gray-400  outline-none rounded-lg"
          value={value.name}
          onChange={(event) => {
            // console.log("Change");
            // setName(event.target.value);
            setValue({ ...value, name: event.target.value });
          }}
        />

        <button className="block w-lg p-4 m-4 bg-slate-400  rounded-lg cursor-pointer hover:bg-slate-600 hover:text-white">
          Insert
        </button>
        {error ? <p className="text-red-400">{error}</p> : null}
      </form>
    </div>
  );
}

{
  /*  
  Note :: 
  Any button inside a form that is deferred is
submit
and the
form
bydeferred when we submit will create a get or
post on a specific
endpoint
point that you specify through the
action.
How do we cancel it?
Important information: Every
event takes a
callback function
The access is on the first parameter, which is the
event object
through which you express the property
and method to deal with
this
event

event.preventDefault() =>
It means that the deferred action is not on the element that the event is on

event.target => the element that the event is on

popular Events
onSubmit
onChange
onClick
onBlur
      */
}
