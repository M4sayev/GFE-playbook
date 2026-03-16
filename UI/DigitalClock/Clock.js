import { useEffect, useState } from "react";
import { classMapper, getFirstDigit } from "./config";

function ClockNumber({ number }) {
  const topClasses = classMapper[number].top;
  const bottomClasses = classMapper[number].bottom;

  return (
    <div aria-hidden="true" className="clock-number">
      <div
        className={`clock-number-square clock-number-square-top ${topClasses}`}
      ></div>
      <div
        className={`clock-number-square clock-number-square-bottom ${bottomClasses}`}
      ></div>
    </div>
  );
}

function Seperator() {
  return (
    <div aria-hidden="true" className="seperator">
      <span></span>
      <span></span>
    </div>
  );
}
export default function Clock() {
  const [timeStamp, setTimeStamp] = useState(() => new Date());
  useEffect(() => {
    const intervalID = setInterval(() => {
      const now = new Date();
      setTimeStamp(now);
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

  const hours = timeStamp.getHours();
  const minutes = timeStamp.getMinutes();
  const seconds = timeStamp.getSeconds();
  return (
    <time className="clock" dateTime={timeStamp.toLocaleTimeString("en-GB")}>
      <ClockNumber number={getFirstDigit(hours)} />
      <ClockNumber number={hours % 10} />
      <Seperator />
      <ClockNumber number={getFirstDigit(minutes)} />
      <ClockNumber number={minutes % 10} />
      <Seperator />
      <ClockNumber number={getFirstDigit(seconds)} />
      <ClockNumber number={seconds % 10} />
    </time>
  );
}
