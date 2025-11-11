import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Task = {
  title: string;
  status: string;
  CurrentUser: number;
};

type User = {
  id: number;
  Fname: string;
  Secname: string;
  Email: string;
  Username: string;
  hashedPassword: string;
};

const TaskStatusCard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [statusCounts, setStatusCounts] = useState<{ [key: string]: number }>(
    {}
  );

  const loadData = () => {
    const userData = localStorage.getItem("currentUser");
    let currentUser: User;

    if (userData) {
      currentUser = JSON.parse(userData);
    } else {
      currentUser = {
        id: 0.04758439166207662,
        Fname: "Incidunt sed eos ea",
        Secname: "Culpa eos quia et in",
        Email: "sivicewit@mailinator.com",
        Username: "admin",
        hashedPassword:
          "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
      };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
    setUser(currentUser);

    const tasksData = localStorage.getItem("tasks");
    let allTasks: Task[];

    if (tasksData) {
      allTasks = JSON.parse(tasksData);
    } else {
      allTasks = [
        {
          title: "Quis reprehenderit",
          status: "InProgress",
          CurrentUser: 0.04758439166207662,
        },
        {
          title: "Illo tempore et rem",
          status: "Not-Started",
          CurrentUser: 0.04758439166207662,
        },
        {
          title: "Ex beatae architecto",
          status: "InProgress",
          CurrentUser: 0.04758439166207662,
        },
        {
          title: "Ea dolorum omnis dol",
          status: "Not-Started",
          CurrentUser: 0.04758439166207662,
        },
        {
          title: "Quis ullam rerum lab",
          status: "Completed",
          CurrentUser: 0.04758439166207662,
        },
      ];
      localStorage.setItem("tasks", JSON.stringify(allTasks));
    }

    const userTasks = allTasks.filter((t) => t.CurrentUser === currentUser.id);
    setTasks(userTasks);

    const counts: { [key: string]: number } = {};
    userTasks.forEach((task) => {
      counts[task.status] = (counts[task.status] || 0) + 1;
    });
    setStatusCounts(counts);
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalTasks = tasks.length || 1;

  const taskStatuses = ["Completed", "InProgress", "Not-Started"].map(
    (status) => ({
      status,
      percentage: Math.round(((statusCounts[status] || 0) / totalTasks) * 100),
      color:
        status === "Completed"
          ? "#4CAF50"
          : status === "Not-Started"
          ? "#F87171"
          : "#FBBF24",
      dotColor:
        status === "Completed"
          ? "bg-green-500"
          : status === "Not-Started"
          ? "bg-red-500"
          : "bg-yellow-400",
    })
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full w-full">
      <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Task Status
      </h3>

      <div className="flex flex-col sm:flex-row justify-around items-center gap-6 sm:gap-4 pt-4 pb-4 w-full">
        {taskStatuses.map((item) => (
          <div
            key={item.status}
            className="flex flex-col items-center w-full sm:w-auto"
          >
            <div className="w-24 h-24 mb-3 sm:w-28 sm:h-28 md:w-32 md:h-32">
              <CircularProgressbar
                value={item.percentage}
                text={`${item.percentage}%`}
                strokeWidth={6}
                styles={buildStyles({
                  textColor: "#1f2937",
                  pathColor: item.color,
                  trailColor: "#eee",
                  textSize: "24px",
                })}
              />
            </div>
            <div className="flex items-center text-sm font-medium text-gray-600">
              <span
                className={`h-2 w-2 rounded-full ${item.dotColor} mr-2`}
              ></span>
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusCard;
