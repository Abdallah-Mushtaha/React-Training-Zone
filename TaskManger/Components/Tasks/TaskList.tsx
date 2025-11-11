/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
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
}

interface TaskListProps {
  name: string;
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  selectedTaskId: string;
}

export default function TaskList({
  name,
  tasks,
  onTaskSelect,
  selectedTaskId,
}: TaskListProps) {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const handleDelete = (id: number) => {
    const CurrentUser = JSON.parse(localStorage.getItem("CurrentUser") || "{}");
    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const updatedTasks = allTasks.filter(
      (task: any) =>
        !(
          task.id === id &&
          task.CurrentUser === CurrentUser.id &&
          task.taskType === name
        )
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    const displayedUpdated = updatedTasks.filter(
      (task: any) =>
        task.CurrentUser === CurrentUser.id && task.taskType === name
    );
    setTaskList(displayedUpdated);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex flex-col items-start">
        {name}
        <span className="block w-10 h-1 bg-pink-600 rounded-full mr-2 mt-1"></span>
      </h2>

      {taskList.length === 0 && (
        <p className="text-gray-400 text-center py-4">No tasks available</p>
      )}

      {taskList.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onSelect={onTaskSelect}
          isSelected={task.id.toString() === selectedTaskId}
          onDelete={handleDelete}
        />
      ))}
    </>
  );
}
