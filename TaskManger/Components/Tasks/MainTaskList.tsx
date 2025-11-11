import React from "react";
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

interface TasksContainerProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onSelect: (task: Task) => void;
}

export default function TaskList({
  tasks,
  onDelete,
  onSelect,
}: TasksContainerProps) {
  return (
    <div className="space-y-4 overflow-hidden">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onSelect={onSelect}
            isSelected={false}
            onDelete={onDelete}
          />
        ))
      ) : (
        <div className="text-center text-gray-500 py-10">
          There are no tasks currently available
        </div>
      )}
    </div>
  );
}
