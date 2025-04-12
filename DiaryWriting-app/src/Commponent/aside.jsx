import { eachDayOfInterval, format, startOfWeek, endOfWeek } from "date-fns";
import { ar, da } from "date-fns/locale";
import { useRef } from "react";
import { Link } from "react-router";

const weekDays = eachDayOfInterval({
  start: startOfWeek(new Date(), { weekStartsOn: 6 }),
  end: endOfWeek(new Date(), { weekStartsOn: 6 }),
}).map((date) => {
  return format(date, "EEE");
});

const currentDay = new Date().getDay();

console.log(weekDays[currentDay]);

// List of weekDays
// console.log(weekDays);

export default function HomePage() {
  const asideElement = useRef(null);

  return (
    <div className="AsideComponent ">
      <div className="overlay">
        <div className="behindThem flex gap-5">
          <div className="hero flex flex-col  justify-center h-screen">
            <i class="fa-solid fa-calendar-days"></i>
            <h3 className="text-xl font-bold text-center flex justify-center items-center mb-4 text-white">
              Journal | Daily Reflection | Planning | Time Management |schedual
            </h3>
            <p className="text-gray-200 text-lg font-light text-justify px-4">
              Journaling is a powerful tool for self-reflection and
              productivity. By documenting daily experiences, thoughts, and
              goals, you gain clarity and insight into your personal and
              professional life. Combining journaling with effective time
              management techniques helps prioritize tasks, track progress, and
              maintain a balanced lifestyle. A structured approach to planning
              and reflection leads to improved focus, reduced stress, and better
              decision-making.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
