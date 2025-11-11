import React, { useState, useEffect, type ChangeEvent } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

type CategoryCardProps = {
  title: string;
  items: string[];
  newItem: string;
  setNewItem: (value: string) => void;
  onAdd: () => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

const Categories: React.FC = () => {
  const STATUS_KEY = "task_status";
  const PRIORITY_KEY = "task_priority";

  const [taskStatus, setTaskStatus] = useState<string[]>([]);
  const [taskPriority, setTaskPriority] = useState<string[]>([]);

  const [newStatus, setNewStatus] = useState<string>("");
  const [newPriority, setNewPriority] = useState<string>("");

  const [editingStatus, setEditingStatus] = useState<number | null>(null);
  const [editingPriority, setEditingPriority] = useState<number | null>(null);

  useEffect(() => {
    const savedStatus = JSON.parse(
      localStorage.getItem(STATUS_KEY) || "[]"
    ) as string[];
    const savedPriority = JSON.parse(
      localStorage.getItem(PRIORITY_KEY) || "[]"
    ) as string[];
    setTaskStatus(savedStatus);
    setTaskPriority(savedPriority);
  }, []);

  const saveToStorage = (key: string, data: string[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleAddStatus = () => {
    if (!newStatus.trim()) return;
    if (editingStatus !== null) {
      const updated = taskStatus.map((s, i) =>
        i === editingStatus ? newStatus : s
      );
      setTaskStatus(updated);
      saveToStorage(STATUS_KEY, updated);
      setEditingStatus(null);
    } else {
      const updated = [...taskStatus, newStatus];
      setTaskStatus(updated);
      saveToStorage(STATUS_KEY, updated);
    }
    setNewStatus("");
  };

  const handleAddPriority = () => {
    if (!newPriority.trim()) return;
    if (editingPriority !== null) {
      const updated = taskPriority.map((p, i) =>
        i === editingPriority ? newPriority : p
      );
      setTaskPriority(updated);
      saveToStorage(PRIORITY_KEY, updated);
      setEditingPriority(null);
    } else {
      const updated = [...taskPriority, newPriority];
      setTaskPriority(updated);
      saveToStorage(PRIORITY_KEY, updated);
    }
    setNewPriority("");
  };

  const handleDeleteStatus = (index: number) => {
    const updated = taskStatus.filter((_, i) => i !== index);
    setTaskStatus(updated);
    saveToStorage(STATUS_KEY, updated);
  };

  const handleDeletePriority = (index: number) => {
    const updated = taskPriority.filter((_, i) => i !== index);
    setTaskPriority(updated);
    saveToStorage(PRIORITY_KEY, updated);
  };

  const handleEditStatus = (index: number) => {
    setEditingStatus(index);
    setNewStatus(taskStatus[index]);
  };

  const handleEditPriority = (index: number) => {
    setEditingPriority(index);
    setNewPriority(taskPriority[index]);
  };

  const CategoryCard: React.FC<CategoryCardProps> = ({
    title,
    items,
    newItem,
    setNewItem,
    onAdd,
    onEdit,
    onDelete,
  }) => (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full md:w-1/2 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <button
          onClick={onAdd}
          style={{ backgroundColor: "#FF6767" }}
          className="flex items-center gap-1 text-white px-3 py-1 rounded-lg transition hover:opacity-90"
        >
          <FiPlus />{" "}
          {title.includes("Status")
            ? editingStatus !== null
              ? "Update"
              : "Add"
            : editingPriority !== null
            ? "Update"
            : "Add"}
        </button>
      </div>
      <input
        type="text"
        placeholder={`Enter ${title.toLowerCase()}`}
        value={newItem}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewItem(e.target.value)
        }
        className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#FF6767]"
      />
      <ul>
        {items.map((item, i) => (
          <li
            key={i}
            className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-2 rounded mb-2 transition"
          >
            <span>
              {i + 1}. {item}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(i)}
                style={{ color: "#FF6767" }}
                className="transition hover:opacity-80"
              >
                <FiEdit />
              </button>
              <button
                onClick={() => onDelete(i)}
                style={{ color: "#FF6767" }}
                className="transition hover:opacity-80"
              >
                <FiTrash2 />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center md:flex-row md:flex-wrap md:justify-center gap-6">
      <CategoryCard
        title="Task Status"
        items={taskStatus}
        newItem={newStatus}
        setNewItem={setNewStatus}
        onAdd={handleAddStatus}
        onEdit={handleEditStatus}
        onDelete={handleDeleteStatus}
      />
      <CategoryCard
        title="Task Priority"
        items={taskPriority}
        newItem={newPriority}
        setNewItem={setNewPriority}
        onAdd={handleAddPriority}
        onEdit={handleEditPriority}
        onDelete={handleDeletePriority}
      />
    </div>
  );
};

export default Categories;
