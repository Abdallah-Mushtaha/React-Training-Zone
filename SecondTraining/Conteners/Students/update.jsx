import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { StudentsContext } from "../Use_Context/hook";
import { UseForm } from "../Hooks/use-form";

export function StdUpdate() {
  const navigator = useNavigate();
  const { number } = useParams();
  const { Students, setStudents } = useContext(StudentsContext);
  const student = Students.find((std) => std.number === number);
  const { value, setValue, error, setFormError } = UseForm({
    name: student?.name,
    number: number,
  });

  if (!Students) {
    return <div>their is no Students </div>;
  }
  function handelfun(event) {
    event.preventDefault();

    if (value.name === "") {
      setFormError("Please enter name");
      return;
    }
    if (!value.number) {
      navigator("/Students/InsertesStd");
    }

    setStudents((previous) => {
      return previous.map((std) => {
        if (std.number === number) {
          return { number, name: value.name };
        }
        return std;
      });
    });

    navigator("/Student");
    setFormError("");
  }
  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={handelfun}
    >
      <h1>Update {value.name} Information </h1>

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
        Insert {value.name}
      </button>
      {error ? <p className="text-red-400">{error}</p> : null}
    </form>
  );
}

/*
Excellent project so far. This is a crud project using localStorge, not API.
--------------------------
Now, we need the old data on this page, meaning we need a unique prorarty to retrieve the old data, such as the id.
In our example,
-----------------------------
I can do this, but only if
<Link
to={`/StudentUpdate/${std.number}`}
onClick={() => handelUpdate()}
className="bg-gray-400 text-2xl p-3 cursor-pointer rounded-3xl font-bold text-white"
>
updating
</Link>
Okay, but suppose there's a function, I can't use the link

! insted of this =>

const Navigate = useNavigate(); // custom hook from react

function handleUpdat(number) {
Navigate(`/StudentUpdate/${number}`);

}

useParams => React hooks
will return the object
with the number inside it that you sent with the
Route

useParams =>
This is considered a
state




*/
