import { useRef, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Link } from "react-router";

export default function Layout() {
  const asideElement = useRef(null);
  const Common_layout = useRef(null);
  const location = useLocation();
  const [active, setActive] = useState(null);
  const [settings, setSettings] = useState({
    darkMode: false,
    themeColor: "#b03052",
    fontSize: "medium",
  });

  useEffect(() => {
    const savedSettings =
      JSON.parse(localStorage.getItem("appSettings")) || settings;
    setSettings(savedSettings);
    applySettings(savedSettings);

    const handleStorageChange = () => {
      const updatedSettings =
        JSON.parse(localStorage.getItem("appSettings")) || settings;
      setSettings(updatedSettings);
      applySettings(updatedSettings);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const applySettings = (currentSettings) => {
    const layout = Common_layout.current;
    if (!layout) return;

    if (currentSettings.darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }

    document.documentElement.style.setProperty(
      "--primary-color",
      currentSettings.themeColor
    );

    const fontSizeMap = {
      small: "14px",
      medium: "16px",
      large: "18px",
    };
    document.body.style.fontSize = fontSizeMap[currentSettings.fontSize];
  };

  useEffect(() => {
    if (location.pathname === "/Notes") {
      setActive("Notes");
    } else {
      setActive("Home");
    }
  }, [location.pathname]);

  return (
    <div className="Common_layout" ref={Common_layout}>
      <div className="Common_aside">
        <div className="toggle py-3">
          <Link
            className="m-3 text-2xl w-20 mb-4 font-bold rounded-md w-10 h-10 flex items-center justify-center bg-[var(--primary-color)] text-white outline-none"
            onClick={() => asideElement.current.classList.toggle("show-Aside")}
          >
            <i className="fa-solid fa-list-ul" aria-hidden="true"></i>
          </Link>
          <aside
            ref={asideElement}
            className="aside w-30 h-auto bg-gray-100 dark-mode:bg-gray-800 text-white flex flex-col items-center p-4"
          >
            <div className="flex flex-col p-3 items-center h-100">
              <Link
                to="/Notes"
                className="text-2xl w-20 mb-4 font-bold rounded-md w-10 h-10 flex items-center justify-center bg-gray-100 dark-mode:bg-gray-700 text-white outline-none"
                style={
                  active === "Notes"
                    ? { background: "var(--primary-color)" }
                    : null
                }
                onClick={() =>
                  asideElement.current.classList.remove("show-Aside")
                }
              >
                Notes
              </Link>
              <Link
                to="/"
                className="text-2xl w-20 mb-4 font-bold rounded-md w-10 h-10 flex items-center justify-center bg-gray-100 dark-mode:bg-gray-700 text-white outline-none"
                style={
                  active === "Home"
                    ? { background: "var(--primary-color)" }
                    : null
                }
                onClick={() =>
                  asideElement.current.classList.remove("show-Aside")
                }
              >
                Home
              </Link>
              <Link
                to="/Settings"
                className="setting w-10 h-10 bg-gray-100 dark-mode:bg-gray-700 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-600 transition-all"
                onClick={() =>
                  asideElement.current.classList.remove("show-Aside")
                }
              >
                <i className="fa-solid fa-gear flex items-center justify-center"></i>
              </Link>
            </div>
          </aside>
        </div>
      </div>
      <Outlet context={{ settings, applySettings }} />
    </div>
  );
}
