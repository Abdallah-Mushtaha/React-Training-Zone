import React, { type ComponentType } from "react";
import {
  FiSearch,
  FiUsers,
  FiShare2,
  FiTrello,
  FiLock,
  FiMessageSquare,
} from "react-icons/fi";

const helpCategories = [
  {
    title: "Community & Collaboration",
    description:
      "How to invite members, manage teams, and collaborate on shared tasks.",
    icon: FiUsers,
  },
  {
    title: "Task Boards & Workflow",
    description:
      "Setting up boards, customizing columns, and managing task statuses (To Do, In Progress, Done).",
    icon: FiTrello,
  },
  {
    title: "Sharing & Permissions",
    description:
      "Understanding roles (Admin, Member, Viewer) and setting access levels for projects.",
    icon: FiShare2,
  },
  {
    title: "Notifications & Updates",
    description:
      "Customizing notification settings and tracking real-time project updates.",
    icon: FiMessageSquare,
  },
  {
    title: "Account Security & Login",
    description:
      "Troubleshooting login issues, two-factor authentication, and password management.",
    icon: FiLock,
  },
  {
    title: "Integrations & Automation",
    description:
      "Connecting the Task Manager with other popular tools and setting up automated actions.",
    icon: FiMessageSquare,
  },
];

interface CategoryCardProps {
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ComponentType<any>;
}
const CategoryCard = ({
  title,
  description,
  icon: Icon,
}: CategoryCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 cursor-pointer flex flex-col items-start">
    <div className="p-3 bg-orange-100 rounded-full mb-4">
      <Icon className="w-6 h-6 text-orange-500" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>
);

export default function Help() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-10 font-sans">
      <header className="max-w-4xl mx-auto text-center py-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Need Help With Your Task Manager?
        </h1>

        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search for collaboration tips, board setup, or invitations..."
            className="w-full pl-5 pr-12 py-3 border-2 border-orange-500 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition duration-150 text-gray-700"
          />
          <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
        </div>

        <p className="text-gray-500 mt-4 text-sm">
          Find answers on team management, task organization, and more.
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {helpCategories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-16 p-8 text-center bg-white rounded-2xl shadow-2xl border-t-4 border-red-500">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Can't Find Your Task Solution?
        </h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Contact our specialized Community Support team for direct assistance
          with your project.
        </p>
        <button
          className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-150 transform hover:scale-105"
          onClick={() => console.log("Initiate Contact Support")}
        >
          Contact Community Support
        </button>
      </div>
    </div>
  );
}
