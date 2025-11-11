/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  created: string;
  imageSrc: string;
  fullDescription: string;
  objective: string;
  notes: string[];
  deadline: string;
}

const DefaultTask: Task = {
  id: 85,
  title: "This is the First Notes",
  description: `kadjfsdfhksdgajfhgsdfkbsdjfknjkdsncvjknbs dfkadjfsdfhksdgajfhgsdfkbsdjfknjkdsncvjknbsdf`,
  priority: "Moderate",
  status: "Progress",
  created: "5/3/2024",
  imageSrc:
    "https://plus.unsplash.com/premium_photo-1728892768695-ebebed48ff90?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
  fullDescription: `kadjfsdfhksdgajfhgsdfkbsdjfknjkdsncvjknbs dfkadjfsdfhksdgajfhgsdfkbsdjfknjkdsncvjknbsdfkadjfs dfhksdgajfhgsdfkbsdjfknjkdsncvjknbs dfkadjfsdfhksdgajfhgsdfkbsdjfknjkdsncvjknbsdf`,
  objective: "My Task",
  notes: ["asd"],
  deadline: "12/2/2025",
};

export default function TaskPage({ name }: { name: string }) {
  const CurrentUser = JSON.parse(localStorage.getItem("CurrentUser") || "{}");
  const AllTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  const tasks: Task[] = AllTasks.filter(
    (task: any) => task.CurrentUser === CurrentUser.id && task.taskType === name
  );

  const [selectedTask, setSelectedTask] = useState<Task | null>(
    tasks.length > 0 ? tasks[0] : null
  );

  const displayedTasks = tasks.length > 0 ? tasks : [DefaultTask];

  return (
    <section className="bg-gray-100 min-h-screen p-4 overflow-hidden font-sans">
      <div className="flex flex-col lg:flex-row gap-4 max-w-7xl mx-auto h-full">
        <div className="lg:flex-[1] flex-1 bg-white rounded-2xl shadow-xl p-6 min-h-[500px] lg:min-h-full">
          <TaskList
            name={name}
            tasks={displayedTasks}
            onTaskSelect={setSelectedTask}
            selectedTaskId={selectedTask ? selectedTask.id.toString() : ""}
          />
        </div>

        <div className="lg:flex-[3] flex-1 bg-white rounded-2xl shadow-xl p-8 min-h-[500px] lg:min-h-full">
          <TaskDetail task={selectedTask} />
        </div>
      </div>
    </section>
  );
}
