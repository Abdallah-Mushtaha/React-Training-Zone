
import { TaskFormState } from "./types";

// storage.ts
export const saveTaskToLocalStorage = (task: TaskFormState) => {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  const existingIndex = tasks.findIndex((t: TaskFormState) => t.id === task.id);

  if (existingIndex !== -1) {
    tasks[existingIndex] = task; 
  } else {
    tasks.push(task);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

