import React, { useState, useEffect, useCallback } from "react";
import TaskCard from "./TaskCard";

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
  CurrentUser: number;
  taskType: string;
}

interface TaskListProps {
  name: string;
  onTaskSelect: (task: Task) => void;
  selectedTaskId: string;
}

export default function CompletedList({
  name,
  onTaskSelect,
  selectedTaskId,
}: TaskListProps) {
  const [taskList, setTaskList] = useState<Task[]>([]);

  const getCurrentUser = (): { id?: number } =>
    JSON.parse(localStorage.getItem("currentUser") || "{}");

  const getAllTasks = (): Task[] =>
    JSON.parse(localStorage.getItem("tasks") || "[]");

  const loadCompletedTasks = useCallback(() => {
    const currentUser = getCurrentUser();
    const allTasks = getAllTasks();

    const completedTasks = allTasks.filter(
      (task) =>
        task.CurrentUser === currentUser.id && task.status === "Completed"
    );

    setTaskList(completedTasks);
  }, []);

  useEffect(() => {
    loadCompletedTasks();
    const interval = setInterval(loadCompletedTasks, 5000);
    return () => clearInterval(interval);
  }, [loadCompletedTasks]);

  const handleDelete = (id: number) => {
    const currentUser = getCurrentUser();
    const allTasks = getAllTasks();

    const updatedTasks = allTasks.filter(
      (task) => !(task.id === id && task.CurrentUser === currentUser.id)
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    loadCompletedTasks();
  };

  return (
    <section className="w-full">
      {taskList.length === 0 ? (
        <p className="text-gray-400 text-center py-6 text-sm sm:text-base">
          No completed tasks available
        </p>
      ) : (
        <div className="flg:col-span-3p-6 ">
          {taskList.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onSelect={onTaskSelect}
              isSelected={task.id.toString() === selectedTaskId}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
