import React from "react";
import TaskPage from "../Components/Tasks/TaskPage";

export default function MyTaskPage({ name }: { name: string }) {
  return (
    <section className="bg-gray-100 min-h-screen p-4 overflow-hidden font-sans">
      <TaskPage name={name} />
    </section>
  );
}
