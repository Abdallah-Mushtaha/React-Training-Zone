import React from "react";
import { TaskType } from "./types";

interface TaskTypeSelectorProps {
  selected: TaskType;
  onChange: (type: TaskType) => void;
}

const TaskTypeSelector: React.FC<TaskTypeSelectorProps> = ({
  selected,
  onChange,
}) => (
  <div>
    <label className="block text-lg font-semibold text-gray-700">
      Task Type
    </label>
    <div className="mt-2 flex space-x-6">
      {["My Task", "Vital Task"].map((type) => (
        <label
          key={type}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="radio"
            name="taskType"
            value={type}
            checked={selected === type}
            onChange={() => onChange(type as TaskType)}
            className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
          />
          <span className="text-gray-900">{type}</span>
        </label>
      ))}
    </div>
  </div>
);

export default TaskTypeSelector;
