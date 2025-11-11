import React from "react";
import { Priority } from "./types";

interface PrioritySelectorProps {
  selected: Priority;
  onChange: (priority: Priority) => void;
}

const priorities: { label: Priority; color: string }[] = [
  { label: "Extreme", color: "red-600" },
  { label: "Moderate", color: "blue-600" },
  { label: "Low", color: "green-600" },
];

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  selected,
  onChange,
}) => (
  <div>
    <label className="block text-lg font-semibold text-gray-700">
      Priority
    </label>
    <div className="mt-2 flex gap-5 flex-wrap">
      {priorities.map(({ label, color }) => (
        <label
          key={label}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="radio"
            name="priority"
            checked={selected === label}
            onChange={() => onChange(label)}
            className={`form-radio h-4 w-4 text-${color} border-gray-300 focus:ring-${color}`}
          />
          <span className="text-gray-900 flex items-center">
            <span
              className={`inline-block h-3 w-3 rounded-full bg-${color} mr-2`}
            ></span>
            {label}
          </span>
        </label>
      ))}
    </div>
  </div>
);

export default PrioritySelector;
