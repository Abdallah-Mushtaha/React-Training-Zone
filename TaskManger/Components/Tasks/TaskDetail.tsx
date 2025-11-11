// TaskDetail.tsx
import React from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";

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

interface TaskDetailProps {
  task: Task | null;
  onDelete: (id: number) => void;
  onEdit?: (task: Task) => void;
}

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}

const DetailRow = ({ label, value, highlight }: DetailRowProps) => (
  <p className="mt-2">
    <span className="font-bold text-gray-800">{label}:</span>{" "}
    <span className={highlight ? "text-red-500 font-semibold" : ""}>
      {value}
    </span>
  </p>
);

const DetailList = ({ label, items }: { label: string; items: string[] }) => (
  <div className="mt-2">
    <p className="font-bold text-gray-800 mb-1">{label}:</p>
    <ul className="list-disc list-inside space-y-1 ml-1">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

export default function TaskDetail({
  task,
  onDelete,
  onEdit,
}: TaskDetailProps) {
  if (!task) {
    return (
      <div className="text-gray-500">
        Please select a task to view its details.
      </div>
    );
  }

  const { fullDescription, objective, notes, deadline } = {
    fullDescription:
      task.fullDescription ||
      "Detailed description is not available for this task.",
    objective: task.objective || "N/A",
    notes: Array.isArray(task.notes)
      ? task.notes
      : task.notes
      ? [task.notes]
      : ["No specific notes provided."],
    deadline: task.deadline || "N/A",
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 text-gray-800">
      <div className="mb-4 w-full h-40 flex overflow-hidden">
        <img
          src={task.imageSrc}
          alt={task.title}
          className="w-40 sm:w-65 h-40 object-cover rounded-lg"
        />
        <div className="ml-5 w-2/6 flex flex-col justify-end">
          <h2 className="text-md font-semibold text-gray-900 mb-1 break-words">
            {task.title}
          </h2>
          <div className="text-sm space-y-0.5 mb-3">
            <DetailRow label="Priority" value={task.priority} highlight />
            <DetailRow label="Status" value={task.status} highlight />
            <DetailRow label="Created on" value={task.created || "—"} />
          </div>
        </div>
      </div>

      <div className="text-sm leading-relaxed">
        <DetailRow label="Task Title" value={task.title} />
        <DetailRow label="Objective" value={objective} />
        <div className="mt-2">
          <p className="font-bold text-gray-800 mb-1">Task Description:</p>
          <p className="text-md text-gray-900 mb-1 break-words">
            {fullDescription}
          </p>
        </div>
        <DetailList label="Additional Notes" items={notes} />
        <DetailRow label="Deadline for Submission" value={deadline} highlight />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition flex items-center gap-1"
        >
          <FiTrash2 size={18} />
        </button>
        {onEdit && (
          <button
            onClick={() => onEdit(task)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition flex items-center gap-1"
          >
            <FiEdit size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
