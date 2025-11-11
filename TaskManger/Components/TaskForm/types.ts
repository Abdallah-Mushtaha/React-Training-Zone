export type Priority = "Extreme" | "Moderate" | "Low";
export type Status = "Not-Started" | "InProgress" | "Completed";
export type TaskType = "My Task" | "Vital Task";

export interface TaskFormState {
  title: string;
  deadline: string;
  priority: Priority;
  status: Status;
  fullDescription: string;
  objective: string;
  notes: string[];

  id: string;
  created: string;
  imageSrc: string | null;
  CurrentUser: number;
  taskType: TaskType;
}

// دالة مساعدة للحصول على القيمة من localStorage أو استخدام القيمة الافتراضية
function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored) as T;
    } catch (e) {
      console.warn(`Failed to parse localStorage key "${key}"`, e);
    }
  }
  return defaultValue;
}

// إنشاء الحالة الافتراضية مع جلب القيم من localStorage
export const defaultTaskFormState: TaskFormState = {
  title: getFromLocalStorage("title", ""),
  deadline: getFromLocalStorage("deadline", ""),
  priority: getFromLocalStorage<Priority>("priority", "Moderate"),
  status: getFromLocalStorage<Status>("status", "Not-Started"),
  fullDescription: getFromLocalStorage("fullDescription", ""),
  objective: getFromLocalStorage("objective", ""),
  notes: getFromLocalStorage<string[]>("notes", []),

  id: getFromLocalStorage("id", ""),
  created: getFromLocalStorage("created", new Date().toISOString()),
  imageSrc: getFromLocalStorage<string | null>("imageSrc", null),
  CurrentUser: getFromLocalStorage<number>("CurrentUser", 0),
  taskType: getFromLocalStorage<TaskType>("taskType", "My Task"),
};
