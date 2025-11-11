import React from "react";
import { Status } from "./types";

interface StatusSelectorProps {
  selected: Status;
  onChange: (status: Status) => void;
}

const statuses: { label: Status; color: string }[] = [
  { label: "Not-Started", color: "red-600" },
  { label: "InProgress", color: "blue-600" },
  { label: "Completed", color: "green-600" },
];

const StatusSelector: React.FC<StatusSelectorProps> = ({
  selected,
  onChange,
}) => (
  <div>
    <label className="block text-lg font-semibold text-gray-700">Status</label>
    <div className="mt-2 flex gap-5 flex-wrap">
      {statuses.map(({ label, color }) => (
        <label
          key={label}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="radio"
            name="Status"
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

export default StatusSelector;
