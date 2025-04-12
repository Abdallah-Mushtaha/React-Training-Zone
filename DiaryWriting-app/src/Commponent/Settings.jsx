import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";

export default function AppSettings() {
  const navigate = useNavigate();
  const { settings, applySettings } = useOutletContext();
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    localStorage.setItem("appSettings", JSON.stringify(newSettings));
    applySettings(newSettings);
    window.dispatchEvent(new Event("storage"));
  };

  const exportData = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const blob = new Blob([JSON.stringify(tasks)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dynamic-notes-backup.json";
    link.click();
  };

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        localStorage.setItem("tasks", JSON.stringify(data));
        alert("Data imported successfully!");
      } catch (error) {
        alert("Invalid import file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      className={`container mx-auto p-4 ${
        localSettings.darkMode ? "dark-mode" : ""
      }`}
    >
      <h1 className="text-3xl font-bold mb-8 text-center">App Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div
          className={`p-6 rounded-lg shadow ${
            localSettings.darkMode ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Appearance
          </h2>

          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => handleSettingChange("darkMode", false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                !localSettings.darkMode
                  ? "bg-yellow-400 text-gray-800"
                  : "bg-gray-600 text-gray-300"
              }`}
            >
              <span className="text-xl">☀️</span>
              <span>Light</span>
            </button>

            <button
              onClick={() => handleSettingChange("darkMode", true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                localSettings.darkMode
                  ? "bg-purple-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              <span className="text-xl">🌙</span>
              <span>Dark</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Theme Color</label>
              <div className="flex gap-2">
                {["#b03052", "#3b82f6", "#10b981", "#f59e0b"].map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                      localSettings.themeColor === color
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleSettingChange("themeColor", color)}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2">Font Size</label>
              <select
                className={`w-full p-2 border rounded ${
                  localSettings.darkMode ? "bg-gray-700 text-white" : "bg-white"
                }`}
                value={localSettings.fontSize}
                onChange={(e) =>
                  handleSettingChange("fontSize", e.target.value)
                }
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>

        <div
          className={`p-6 rounded-lg shadow ${
            localSettings.darkMode ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Data Management
          </h2>

          <div className="space-y-4">
            <button
              className={`w-full p-3 rounded flex items-center justify-center gap-2 ${
                localSettings.darkMode
                  ? "bg-blue-900 text-blue-100"
                  : "bg-blue-100 text-blue-800"
              }`}
              onClick={exportData}
            >
              <i className="fas fa-file-export"></i>
              Export Notes
            </button>

            <div>
              <input
                type="file"
                id="importFile"
                className="hidden p-2 my-2 rounded"
                accept=".json"
                onChange={handleFileImport}
              />
              <label
                htmlFor="importFile"
                className={`w-full block p-3 rounded flex items-center justify-center gap-2 cursor-pointer ${
                  localSettings.darkMode
                    ? "bg-green-900 text-green-100"
                    : "bg-green-100 text-green-800"
                }`}
              >
                <i className="fas fa-file-import"></i>
                Import Data
              </label>
            </div>
          </div>
        </div>

        <div
          className={`p-6 rounded-lg shadow ${
            localSettings.darkMode ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Language</h2>

          <select
            className={`w-full p-2 border rounded ${
              localSettings.darkMode ? "bg-gray-700 text-white" : "bg-white"
            }`}
            value={localSettings.language}
            onChange={(e) => handleSettingChange("language", e.target.value)}
          >
            <option value="ar">Arabic</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate(-1)}
          className={`px-6 py-2 rounded-lg ${
            localSettings.darkMode
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-[var(--primary-color)] hover:bg-opacity-80"
          } text-white`}
        >
          Back
        </button>
      </div>
    </div>
  );
}
