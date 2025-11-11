import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineMoreHoriz } from "react-icons/md";

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

interface TaskCardProps {
  task: Task;
  onSelect: (task: Task) => void;
  isSelected: boolean;
  onDelete: (id: number) => void;
}

export default function TaskCard({
  task,
  onSelect,
  isSelected,
  onDelete,
}: TaskCardProps) {
  const [showOptions, setShowOptions] = useState(false);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(task.id);
    setShowOptions(false);
  };

  return (
    <div
      className={`rounded-xl p-4 shadow-md mb-4 flex relative transition duration-300 ease-in-out cursor-pointer   ${
        isSelected
          ? "bg-gray-50 border-r-4 border-pink-600"
          : "bg-white hover:shadow-lg"
      }`}
      onClick={() => onSelect(task)}
    >
      <div className="absolute top-0 right-0 text-gray-400">
        <button
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            setShowOptions((prev) => !prev);
          }}
        >
          <MdOutlineMoreHoriz className="w-5 h-5" />
        </button>

        {showOptions && (
          <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-lg shadow-md z-20">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
            >
              <FiTrash2 /> Delete
            </button>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 mr-4 mt-1">
        <div
          className={`w-3 h-3 border-2 rounded-full ${
            isSelected
              ? "bg-pink-600 border-pink-600"
              : "bg-blue-600 border-blue-600"
          }`}
        ></div>
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 w-100">
          {task.fullDescription}
        </p>
        <div className="mt-2 flex items-center text-xs">
          <span className="font-medium text-gray-600 mr-4">
            Priority:{" "}
            <span
              className={`font-bold ${
                task.priority === "Extreme" ? "text-red-600" : "text-orange-500"
              }`}
            >
              {task.priority}
            </span>
          </span>
          <span className="font-medium text-gray-600">
            Status:{" "}
            <span
              className={`font-bold ${
                task.status === "Not Started" ? "text-red-500" : "text-blue-500"
              }`}
            >
              {task.status}
            </span>
          </span>
        </div>
      </div>

      <div className="flex-shrink-0 ml-4 hidden sm:block">
        <div className="w-30 h-20 overflow-hidden">
          <img
            src={task.imageSrc}
            alt={task.title}
            className="w-full h-auto object-cover mt-2 rounded-md flex justify-end items-end"
          />
        </div>
        <span className="text-xs text-gray-600">
          Created on:{" "}
          <span className={`font-bold text-xs text-gray-600`}>
            {task.deadline}
          </span>
        </span>
      </div>
    </div>
  );
}
