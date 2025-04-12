import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

export default function Notes() {
  // still need Refactoring to make it better , more readable and clean code
  const form_Wrraper = useRef(null);
  const show_Dashborde = useRef(null);
  const Sow_checkBox = useRef(null);
  const textare = useRef(null);
  const [btn_delete, setDelete] = useState(null);
  const [task, settask] = useState([]);
  const [checkBox, setcheckBox] = useState(false);
  const [isModify, setModify] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: false,
    themeColor: "#b03052",
    fontSize: "medium",
  });
  const [isHovered, setIsHovered] = useState(null);
  const [value, setvalue] = useState({
    title: "",
    description: [{ desc: "", checkBox: false }],
    color: "",
  });

  const Colors = [
    "#000000",
    "#FFFFFF",
    "#F28B82",
    "#FBBC04",
    "#FFF475",
    "#CCFF90",
    "#A7FFEB",
    "#CBF0F8",
    "#AECBFA",
    "#D7AEFB",
    "#FDCFE8",
    "#E8EAED",
  ];
  const Gradients = [
    "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
    "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
    "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
    "linear-gradient(to right, #ff758c, #ff7eb3)",
    "linear-gradient(45deg, #ffc3a0 0%, #ffafbd 100%)",
    "linear-gradient(rgb(122, 110, 255) 0%, rgb(83, 83, 224) 35%, rgb(0, 212, 255) 100%)",
  ];

  const navigate = useNavigate();
  const { param } = useParams();

  useEffect(() => {
    const savedSettings =
      JSON.parse(localStorage.getItem("appSettings")) || settings;
    setSettings(savedSettings);
  }, []);

  const isArabicText = (text) => /[\u0600-\u06FF]/.test(text);

  useEffect(() => {
    if (param) {
      task.forEach((item, index) => {
        if (index === Number(param)) {
          setvalue({
            title: item.title,
            description: item.description,
            color: item.color,
          });
          if (!isModify) setModify(true);
          form_Wrraper.current?.classList.toggle("show-Form");
          show_Dashborde.current?.classList.toggle("show-Dashborde");
        }
      });
    }
  }, [param, task]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        param !== undefined &&
        isModify &&
        !form_Wrraper.current?.contains(event.target)
      ) {
        navigate("/Notes");
      }
    };

    if (param !== undefined && isModify) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [param, isModify, navigate]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) settask(JSON.parse(storedTasks));
  }, []);

  function handelform(event) {
    event.preventDefault();
    if (!value.title || !value.description) {
      setvalue({
        title: "",
        description: [{ desc: "", checkBox: false }],
        color: "",
      });
      return;
    }

    if (param !== undefined) {
      settask((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks[Number(param)] = value;
        navigate("/Notes");
        return updatedTasks;
      });
    } else {
      settask((prevTask) => [...prevTask, value]);
    }

    setvalue({
      title: "",
      description: [{ desc: "", checkBox: false }],
      color: "",
    });

    if (!param) {
      form_Wrraper.current?.classList.remove("show-Form");
      show_Dashborde.current?.classList.add("show-Dashborde");
    }
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  function handelDelete(index) {
    settask(task.filter((_, i) => i !== index));
  }

  return (
    <div className="TaskeWrrapper">
      <div className="TaskHeroFlex flex justify-center items-center h-50">
        <div className="heroTask flex items-center justify-between">
          <h2
            className="text-2xl font-bold"
            style={{
              color: settings.themeColor,
            }}
          >
            Notes
          </h2>
          <button
            className="btn cursor-pointer"
            onClick={() => {
              form_Wrraper.current.classList.toggle("show-Form");
              show_Dashborde.current.classList.toggle("show-Dashborde");
            }}
            style={{
              color: settings.themeColor,
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <div className="form-Wrraper" ref={form_Wrraper}>
        <div className="formWrapper flex justify-center items-center">
          <form className="flex flex-col gap-3" onSubmit={handelform}>
            <input
              type="text"
              placeholder="Title"
              className="border p-2 rounded-md outline-none"
              style={{ color: settings.darkMode ? "#ffffff" : "#000000" }}
              value={value.title}
              onChange={(e) => {
                setvalue({ ...value, title: e.target.value });
                setModify(true);
              }}
            />
            <textarea
              ref={textare}
              rows="5"
              cols="30"
              placeholder="Description"
              className="border p-2 rounded-md outline-none overflow-hidden"
              style={{ color: settings.darkMode ? "#ffffff" : "#000000" }}
              value={value.description.map((item) => item.desc).join("\n")}
              onChange={(e) => {
                setvalue({
                  ...value,
                  description: e.target.value
                    .split("\n")
                    .map((line) => ({ desc: line, checked: false })),
                });
                setModify(true);
              }}
            />
            <div
              className="checkbox flex items-baseline gap-2"
              ref={Sow_checkBox}
            >
              <input type="checkbox" />
              <div
                contentEditable="true"
                aria-multiline="true"
                className="editable-div"
                spellCheck="false"
                style={{ color: settings.darkMode ? "#ffffff" : "#000000" }}
              >
                Will build this in the future
              </div>
            </div>
            <div className="checkkbox flex justify-end items-center">
              <button
                className="Check-Box p-2 rounded-md cursor-pointer text-white font-bold w-30"
                onClick={(e) => {
                  e.preventDefault();
                  setcheckBox(true);
                  if (checkBox) {
                    textare.current.classList.toggle("textarea_hide");
                    Sow_checkBox.current.classList.toggle("show-checkbox");
                  }
                }}
                style={{ backgroundColor: settings.themeColor }}
              >
                Check-Box
              </button>
            </div>
            <div className="chose_Color flex flex-col">
              <small
                className="font-bold mb-3"
                style={{ color: settings.darkMode ? "#ffffff" : "#000000" }}
              >
                Choose Color ::
              </small>
              <div className="colors flex gap-3 flex-wrap">
                {Colors.map((item, index) => (
                  <div
                    key={`color-${index}`}
                    className="color w-5 h-5 rounded-md cursor-pointer border-1 border-gray-500"
                    style={{ backgroundColor: item }}
                    onClick={() => setvalue({ ...value, color: item })}
                  />
                ))}
              </div>
              <div className="gradients flex gap-3 flex-wrap mt-3">
                {Gradients.map((gradient, index) => (
                  <div
                    key={`gradient-${index}`}
                    className="gradient w-5 h-5 rounded-md cursor-pointer border-1 border-gray-500"
                    style={{ background: gradient }}
                    onClick={() => setvalue({ ...value, color: gradient })}
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="form-btn text-white py-2 rounded-md outline-none cursor-pointer"
              style={{ backgroundColor: settings.themeColor }}
            >
              {param ? "Modify" : "Add"}
            </button>
          </form>
        </div>
      </div>

      <div className="Dashborde show-Dashborde" ref={show_Dashborde}>
        <div className="TaskCard flex flex-wrap flex-row items-center justify-center mt-20 gap-5 my-5">
          {task.map((item, index) => {
            const isArabic =
              isArabicText(item.title) ||
              isArabicText(item.description[0]?.desc);
            return (
              <Link
                key={index}
                to={`/Notes/${index}`}
                onDoubleClick={() =>
                  param && form_Wrraper.current.classList.remove("show-Form")
                }
              >
                <div
                  className="flex flex-col items-start justify-start gap-5 p-5 text-break w-100 h-auto rounded-md"
                  style={{
                    background: item.color,
                    color:
                      item.color === "#000000"
                        ? "white !important"
                        : settings.darkMode
                        ? "#ffffff"
                        : "#000000",
                    boxShadow: `rgb(66 66 66) 0px 5px 8px`,
                    direction: isArabic ? "rtl" : "ltr",
                    textAlign: isArabic ? "right" : "left",
                  }}
                >
                  <p
                    className="item-title font-bold text-l"
                    style={{
                      color:
                        item.color === "#000000"
                          ? "white"
                          : settings.darkMode
                          ? "#000000"
                          : "#000000",
                      borderBottom:
                        item.color === "#000000"
                          ? "1px solid white"
                          : `1px solid ${
                              settings.darkMode ? "#000000" : "#000000"
                            }`,
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="discription text-md font-light break-words"
                    style={{
                      color:
                        item.color === "#000000"
                          ? "white"
                          : settings.darkMode
                          ? "#000000"
                          : "#000000",
                    }}
                  >
                    {item.description.map((item) => item.desc + "\n")}
                  </p>
                  <div className="wrapper flex items-center justify-between w-100">
                    <button
                      type="button"
                      className="button w-80 border-1 rounded-md outline-none p-1 flex justify-center items-center cursor-pointer btn-delete"
                      style={{
                        color:
                          item.color === "#000000"
                            ? "white"
                            : isHovered === index
                            ? item.color
                            : item.color === "#FFFFFF"
                            ? "red"
                            : "black",
                        backgroundColor:
                          isHovered === index
                            ? item.color === "#000000" ||
                              item.color === "#FFFFFF"
                              ? "#ff0000bf"
                              : "#000000d6"
                            : "transparent",
                        border:
                          item.color === "#000000" || item.color === "#FFFFFF"
                            ? "1px solid gray"
                            : "1px solid black",
                        transition: "all 0.5s ease-in-out",
                        opacity: btn_delete === index ? 1 : 0,
                        visibility: btn_delete === index ? "visible" : "hidden",
                      }}
                      onMouseEnter={() => setIsHovered(index)}
                      onMouseLeave={() => setIsHovered(null)}
                      onClick={(event) => {
                        event.preventDefault();
                        handelDelete(index);
                      }}
                    >
                      <span className="button__text font-bold">Delete</span>
                    </button>

                    <button
                      className="cursor-pointer btn-ellipsis"
                      style={{
                        background:
                          item.color === "#000000" ? "white" : "#62626236",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        setDelete(btn_delete === index ? null : index);
                      }}
                    >
                      <i
                        className="fa-solid fa-ellipsis-v"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
