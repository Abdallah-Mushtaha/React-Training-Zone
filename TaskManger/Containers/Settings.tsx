import React from "react";

const VisualInputBlock = () => (
  <div className="mb-4">
    <div className="h-3 w-20 bg-gray-400 rounded mb-2"></div>
    <div className="h-10 w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm"></div>
  </div>
);
export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-10">
      <header className="flex justify-between items-center pb-6">
        <div className="h-8 w-48 bg-gray-500 rounded border-b-2 border-orange-500 pb-1 inline-block"></div>

        <div className="h-4 w-16 bg-gray-300 rounded"></div>
      </header>

      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="flex items-center mb-6">
          <div className="h-16 w-16 rounded-full bg-gray-400 mr-4"></div>
          <div>
            <div className="h-5 w-24 bg-gray-500 rounded mb-1"></div>
            <div className="h-3 w-32 bg-gray-400 rounded"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <VisualInputBlock />
          <VisualInputBlock />
          <VisualInputBlock />
          <VisualInputBlock />
          <VisualInputBlock />
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 flex space-x-4">
          <div className="px-6 py-2 bg-orange-600 text-white font-medium rounded-lg shadow-md h-10 w-32"></div>
          <div className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md h-10 w-24"></div>
        </div>
      </div>
    </div>
  );
}
