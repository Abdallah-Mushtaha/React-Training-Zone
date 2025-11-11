/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsList } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { IoIosSettings, IoIosHelpCircle, IoIosLogOut } from "react-icons/io";
import { GoTasklist } from "react-icons/go";
import { PiExclamationMarkBold } from "react-icons/pi";
import Dashboard from "./Dashboard";
import VitalTask from "./VitalTask";
import Categories from "./Categories";
import Help from "./Help";
import Settings from "./Settings";
import MyTask from "./MyTask";
import { useNavigate } from "react-router";

interface PageItem {
  icon: React.ElementType;
  text: string;
  page: string;
}

const sidebarItems: PageItem[] = [
  { icon: MdDashboard, text: "Dashboard", page: "Dashboard" },
  { icon: PiExclamationMarkBold, text: "Vital Task", page: "VitalTask" },
  { icon: GoTasklist, text: "My Task", page: "MyTask" },
  { icon: BsList, text: "Task Categories", page: "TaskCategories" },
  { icon: IoIosSettings, text: "Settings", page: "Settings" },
  { icon: IoIosHelpCircle, text: "Help", page: "Help" },
  { icon: IoIosLogOut, text: "Logout", page: "Logout" },
];

export default function HomeScreen() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");
  const navigation = useNavigate();
  const user = JSON.parse(localStorage.getItem("CurrentUser") || "{}");

  const toggleSidebar = () => setIsExpanded((prev) => !prev);
  const handleBackToProducts = () => setActivePage("Products");

  return (
    <div className="flex max-h-screen max-w-screen overflow-hidden ">
      <aside
        className={`bg-[#F8F8F8] border-r border-gray-200 shadow-lg transition-all duration-300 flex-shrink-0 flex flex-col relative h-screen hidden md:flex`}
        style={{ width: isExpanded ? "16rem" : "5rem" }}
      >
        <div className="flex flex-col items-center gap-2 p-4 border-b border-gray-200">
          <img
            src="./images/person.jpg"
            alt="User Avatar"
            className={`rounded-full ${
              isExpanded ? "w-20 h-20" : "w-10 h-10"
            }  object-cover transition-all duration-300`}
          />
          {isExpanded && (
            <div className="text-center">
              <p className="text-black font-medium text-md">{user.Username}</p>
              <p className="text-gray-500 font-light text-sm">{user.Email}</p>
            </div>
          )}
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul>
            {sidebarItems.map((item) => (
              <li key={item.page} className="mt-2">
                <button
                  className={`flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full ${
                    isExpanded ? "justify-start" : "justify-center"
                  } ${activePage ? "focus:bg-gray-200" : "focus:bg-none"} ${
                    item.text.includes("Logout") ? "mt-32 cursor-pointer" : ""
                  }`}
                  onClick={() => {
                    if (item.text.includes("Logout")) {
                      navigation("/Login");
                      localStorage.setItem("CurrentUser", JSON.stringify(null));
                    } else {
                      setActivePage(item.page);
                    }
                  }}
                >
                  <item.icon
                    className={`w-5 h-5 ${isExpanded ? "mr-3" : ""}`}
                  />
                  {isExpanded && <span>{item.text}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={toggleSidebar}
          className="absolute top-6 right-0 translate-x-1/2 bg-[#FF6767] cursor-pointer text-white p-1 rounded-full shadow-lg hover:bg-[#f85f5f]"
        >
          {isExpanded ? (
            <FiChevronLeft className="w-5 h-5" />
          ) : (
            <FiChevronRight className="w-5 h-5" />
          )}
        </button>
      </aside>

      <div className="flex-1 flex flex-col h-screen">
        <main className="flex-1">
          <div className="h-screen overflow-y-auto scrollbar-hide ">
            <div className="h-auto max-w-screen ">
              {activePage === "Dashboard" && <Dashboard />}
              {activePage === "VitalTask" && <VitalTask name={"Vital Task"} />}
              {activePage === "MyTask" && <MyTask name={"My Task"} />}
              {activePage === "TaskCategories" && <Categories />}
              {activePage === "Settings" && <Settings />}
              {activePage === "Help" && <Help />}
            </div>
          </div>
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#F8F8F8] border-t border-gray-200 shadow-inner flex justify-around items-center py-2 md:hidden">
        {sidebarItems
          .filter((item) => !item.text.includes("Logout"))
          .map((item) => (
            <button
              key={item.page}
              onClick={() => setActivePage(item.page)}
              className={`flex flex-col items-center text-gray-700 ${
                activePage === item.page ? "text-[#FF6767]" : "text-gray-500"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px]">{item.text.split(" ")[0]}</span>
            </button>
          ))}
      </nav>
    </div>
  );
}
