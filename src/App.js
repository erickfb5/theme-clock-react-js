import { useState, useEffect } from "react";

import "./App.css";
import { days } from "./days";
import { months } from "./months";

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    document.querySelector("html").classList.toggle("dark", isDark);
    return () => clearInterval(intervalId);
  }, [isDark]);

  const hours = time.getHours();
  const hoursForClock = hours >= 13 ? hours % 12 : hours;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();

  const scale = (num, in_min, in_max, out_min, out_max) =>
    ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

  return (
    <div>
      <button className="toggle" onClick={() => setIsDark(!isDark)}>
        {isDark ? "Light mode" : "Dark mode"}
      </button>

      <div className={`clock-container ${isDark ? "dark" : ""}`}>
        <div className="clock">
          <div
            className="needle hour"
            style={{
              transform: `translate(-50%, -100%) rotate(${scale(
                hoursForClock,
                0,
                12,
                0,
                360
              )}deg)`,
            }}
          ></div>
          <div
            className="needle minute"
            style={{
              transform: `translate(-50%, -100%) rotate(${scale(
                minutes,
                0,
                60,
                0,
                360
              )}deg)`,
            }}
          ></div>
          <div
            className="needle second"
            style={{
              transform: `translate(-50%, -100%) rotate(${scale(
                seconds,
                0,
                60,
                0,
                360
              )}deg)`,
            }}
          ></div>
          <div className="center-point"></div>
        </div>

        <div className="time">{`${hoursForClock}:${
          minutes < 10 ? `0${minutes}` : minutes
        } ${ampm}`}</div>
        <div className="date">
          {`${days[day]}, ${months[month]}`}
          <span class="circle">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
