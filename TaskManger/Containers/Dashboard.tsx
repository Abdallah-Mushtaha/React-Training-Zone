/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import TaskStatusCard from "../Components/Dashbord/TaskStatusCard";
import UserInviteBar from "../Components/Dashbord/UserInviteBar";
import { TbCheckupList } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import TaskForm from "../Components/TaskForm/TaskForm";
import TaskList from "../Components/Tasks/MainTaskList";
import CompletedList from "../Components/Tasks/CompletedList";
import TaskDetail from "../Components/Tasks/TaskDetail";

export default function Dashboard() {
  const [showTaskManager, setShowTaskManager] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [tasks, setTasks] = useState(() => {
    const CurrentUser = JSON.parse(localStorage.getItem("CurrentUser") || "{}");
    const AllTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    return AllTasks.filter((task: any) => task.CurrentUser === CurrentUser.id);
  });

  const [taskStatus, setTaskStatus] = useState<string[]>([]);
  const [taskPriority, setTaskPriority] = useState<string[]>([]);

  useEffect(() => {
    const savedStatus = JSON.parse(localStorage.getItem("task_status") || "[]");
    const savedPriority = JSON.parse(
      localStorage.getItem("task_priority") || "[]"
    );
    setTaskStatus(savedStatus);
    setTaskPriority(savedPriority);
  }, []);

  const handleDelete = (id: number) => {
    const updatedTasks = tasks.filter((task: any) => task.id !== id);
    setTasks(updatedTasks);

    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const remaining = allTasks.filter((t: any) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(remaining));
  };

  const handleAddTask = () => setShowTaskManager(true);

  return (
    <section className="max-w-screen min-h-screen p-6 bg-gray-50">
      {showTaskManager && (
        <div className="fixed z-[100000000] top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <TaskForm setShowTaskManager={setShowTaskManager} />
          </div>
        </div>
      )}

      <div className="text-lg sm:text-3xl font-light mb-6 text-gray-700 flex justify-between">
        <p>
          Welcome back, <span className="font-medium">Emanuel</span> 👋
        </p>
        <UserInviteBar
          users={[
            "https://randomuser.me/api/portraits/men/32.jpg",
            "https://randomuser.me/api/portraits/men/30.jpg",
            "https://randomuser.me/api/portraits/men/35.jpg",
            "https://randomuser.me/api/portraits/men/34.jpg",
          ]}
          totalCount={4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <TbCheckupList className="text-gray-400" />
              <span className="text-[#FF6767] font-semibold text-md">
                To-Do
              </span>
            </h2>
            <button
              onClick={handleAddTask}
              className="flex items-center gap-3 cursor-pointer text-md text-gray-400"
            >
              <FaPlus className="text-[#FF6767]" />
              Add Task
            </button>
          </div>

          <TaskList
            tasks={tasks}
            onDelete={handleDelete}
            onSelect={(task) => setSelectedTask(task)}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          {selectedTask ? (
            <div className="h-auto bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Task Details
                </h2>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-sm text-[#FF6767] border border-[#FF6767] px-3 py-1 rounded-lg hover:bg-[#FF6767] hover:text-white transition"
                >
                  ← Back
                </button>
              </div>
              <TaskDetail task={selectedTask} onDelete={handleDelete} />
            </div>
          ) : (
            <>
              <div className="h-auto">
                <TaskStatusCard
                  taskStatus={taskStatus}
                  taskPriority={taskPriority}
                />
              </div>

              <div className="h-auto bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Completed Tasks
                </h2>

                <CompletedList
                  name="Completed Tasks"
                  onTaskSelect={(task) => setSelectedTask(task)}
                  selectedTaskId={selectedTask?.id?.toString() || ""}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
