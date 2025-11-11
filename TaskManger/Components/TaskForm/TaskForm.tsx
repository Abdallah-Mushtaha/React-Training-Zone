import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { saveTaskToLocalStorage } from "./storage";
import PrioritySelector from "./PrioritySelector";
import StatusSelector from "./StatusSelector";
import ImagePicker from "./ImagePicker";
import TaskTypeSelector from "./TaskTypeSelector";
import { type TaskFormState } from "./types";

interface TaskFormProps {
  setShowTaskManager: (show: boolean) => void;
  existingTask?: TaskFormState;
}

const TextInput: React.FC<{
  label: string;
  name: keyof TaskFormState;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (name: keyof TaskFormState, value: string) => void;
}> = ({ label, name, value, placeholder, type = "text", onChange }) => (
  <div>
    <label className="block text-lg font-semibold text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm p-3 border focus:border-indigo-500 focus:ring-indigo-500"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(name, e.target.value)}
    />
  </div>
);

const TextAreaInput: React.FC<{
  label: string;
  name: keyof TaskFormState;
  value: string | string[];
  rows?: number;
  placeholder?: string;
  onChange: (name: keyof TaskFormState, value: string | string[]) => void;
}> = ({ label, name, value, rows = 3, placeholder, onChange }) => (
  <div>
    <label className="block text-lg font-semibold text-gray-700">{label}</label>
    <textarea
      name={name}
      rows={rows}
      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm p-3 border focus:border-indigo-500 focus:ring-indigo-500 resize-none"
      placeholder={placeholder}
      value={Array.isArray(value) ? value.join("\n") : value}
      onChange={(e) =>
        onChange(
          name,
          name === "notes" ? e.target.value.split("\n") : e.target.value
        )
      }
    />
  </div>
);

const TaskForm: React.FC<TaskFormProps> = ({
  setShowTaskManager,
  existingTask,
}) => {
  const CurrentUser = JSON.parse(localStorage.getItem("CurrentUser") || "{}");

  const [formData, setFormData] = useState<TaskFormState>(
    existingTask || {
      title: "",
      deadline: "",
      priority: "Moderate",
      status: "Not-Started",
      fullDescription: "",
      objective: "",
      notes: [],
      created: new Date().toISOString(),
      id: Date.now().toString(),
      imageSrc: null,
      CurrentUser: CurrentUser?.id || 0,
      taskType: "My Task",
    }
  );

  const handleChange = (
    name: keyof TaskFormState,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveTaskToLocalStorage(formData);
    setShowTaskManager(false);
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl w-full relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={() => setShowTaskManager(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-10 bg-white p-1 rounded-full"
          aria-label="Close"
        >
          <FiX size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {existingTask ? "Edit Task" : "Create New Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextAreaInput
            label="Task Description"
            name="fullDescription"
            rows={4}
            value={formData.fullDescription}
            placeholder="Start writing here...."
            onChange={handleChange}
          />

          <PrioritySelector
            selected={formData.priority}
            onChange={(priority) =>
              setFormData((prev) => ({ ...prev, priority }))
            }
          />

          <StatusSelector
            selected={formData.status}
            onChange={(status) => setFormData((prev) => ({ ...prev, status }))}
          />

          <TextInput
            label="Date"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
          />

          <TaskTypeSelector
            selected={formData.taskType}
            onChange={(type) =>
              setFormData((prev) => ({ ...prev, taskType: type }))
            }
          />

          <TextInput
            label="Objective"
            name="objective"
            value={formData.objective}
            onChange={handleChange}
          />

          <TextAreaInput
            label="Additional Notes"
            name="notes"
            rows={3}
            value={formData.notes}
            placeholder="Any extra notes..."
            onChange={handleChange}
          />

          <ImagePicker
            imageUrl={formData.imageSrc}
            onChange={(url) =>
              setFormData((prev) => ({ ...prev, imageSrc: url }))
            }
          />

          <div className="pt-4">
            <button
              type="submit"
              className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Done (Save)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
