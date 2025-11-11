import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { LuBellRing } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { FiMenu } from "react-icons/fi";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const today = new Date();
  const day = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.toLocaleDateString("en-US");

  return (
    <nav className="bg-[#F8F8F8] p-4 ">
      <div className="max-w-screen mx-auto flex items-center justify-between">
        <div className="logo font-bold text-2xl">
          <span className="text-[#FF6767]">Collab</span>Tasks
        </div>

        <button
          className="md:hidden text-2xl p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu />
        </button>

        <div
          className={`transition-all duration-300 absolute md:static top-16 left-0 w-full z-[1000000] bg-[#F8F8F8] p-4 md:p-0 ${
            menuOpen
              ? "flex flex-col gap-4"
              : "hidden md:flex  md:items-center md:justify-around md:gap-5"
          }`}
        >
          <div className="search w-full sm:w-1/2 flex items-center relative">
            <input
              type="text"
              name="Search"
              className="w-full p-3 bg-white rounded-md outline-0 focus:outline-0"
              placeholder="Search your task here..."
            />
            <button className="absolute end-0 bg-[#FF6767] text-white p-3 rounded-md cursor-pointer">
              <IoSearch />
            </button>
          </div>

          <div className=" flex  gap-3 mt-2 md:flex-row md:mt-0 md:gap-5 items-center">
            <div className="bg-[#FF6767] text-white p-3 rounded-md flex justify-center items-center cursor-pointer">
              <LuBellRing />
            </div>
            <div className="bg-[#FF6767] text-white p-3 rounded-md flex justify-center items-center cursor-pointer">
              <SlCalender />
            </div>
            <div className="text-center md:text-left">
              <p className="text-black font-bold">{day}</p>
              <p className="text-blue-300 font-semibold">{date}</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
