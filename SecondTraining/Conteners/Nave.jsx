import React from "react";
import { Link } from "react-router-dom";

export function Nave() {
  /*
   Notice what will happen in this case:
Reloading the page will take a while. Why? Because we are using the
anchor link html
And I am using React Router, so I am supposed to use the
to move from one page to another
from root to root
Because I am not using the link component of the React Router.
The correct way is to use

Link
to
    */

  return (
    <div>
      <div className="nav  bg-blue-400 p-4 text-2xl sm:flex-col md:flex-row  flex gap-4 justify-between items-center">
        <h1 className="text-xl font-bold  text-white ">Student Markes</h1>

        <ul className="ul  flex gap-4 justify-between items-center px-2">
          <li>
            <Link
              to="/"
              className="hover:text-red-500 text-lg text-white font-bold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/Student"
              className="hover:text-red-500 text-lg text-white font-bold"
            >
              Student
            </Link>
          </li>
          <li>
            <Link
              to="/Markes"
              className="hover:text-red-500 text-lg text-white font-bold"
            >
              Marks
            </Link>
          </li>
          <li>
            <Link
              to="/InsertesStd"
              className="hover:text-red-500 text-lg text-white font-bold"
            >
              InsertStudent
            </Link>
          </li>
          <li>
            <Link
              to="/InsertMarks"
              className="hover:text-red-500 text-lg text-white font-bold"
            >
              InsertMarks
            </Link>
          </li>
          <li>
            <Link
              to="/StudentUpdate/StudentUpdate"
              className="hover:text-red-500 text-lg text-white font-bold"
            >
              UpdateStudent
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
