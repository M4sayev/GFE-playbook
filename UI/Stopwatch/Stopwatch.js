import { useState, useEffect, useRef } from "react";
function Button({ variant = "vanilla", children, ...props }) {
  return (
    <button className={`std-button std-button--${variant}`} {...props}>
      {children}
    </button>
  );
}

function formatTimeSection(section) {
  return section.toString().padStart(2, "0");
}

export default function Stopwatch() {
  const [isGoing, setIsGoing] = useState(false);
  const [diff, setDiff] = useState(0);

  const [announcement, setAnnouncement] = useState("");
  const startTime = useRef(0);

  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (60 * 1000));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);
  let ms = Math.floor((diff % 1000) / 10);
  const time = `${formatTimeSection(minutes)}:${formatTimeSection(seconds)}:${formatTimeSection(ms)}`;

  function handleStart() {
    if (!isGoing) {
      startTime.current = Date.now() - diff;
    }
    setAnnouncement(isGoing ? `stopped at ${time}` : "stopwatch started");
    setIsGoing((prev) => !prev);
  }

  function handleReset() {
    setIsGoing(false);
    setDiff(0);
    setAnnouncement("stopwatch reset");
  }

  useEffect(() => {
    if (!isGoing) return;
    const intervalID = setInterval(() => {
      setDiff(() => Date.now() - startTime.current);
    }, 10);
    return () => clearInterval(intervalID);
  }, [isGoing]);

  return (
    <div className="stopwatch">
      <div className="display-wrapper">
        <div
          aria-hidden="true"
          className={`stopwatch__display ${isGoing ? "stopwatch__display--animate" : ""}`}
        ></div>
        <button
          id="display"
          onClick={handleStart}
          aria-label={isGoing ? "stop the stopwatch" : "start the stopwatch"}
        >
          {time}
        </button>
        {/* to announce screen readers the time only on stop or start or reset
         as they don't need to get the update for every millisecond */}
        <div aria-live="polite" aria-atomic="true" className="visually-hidden">
          {announcement}
        </div>
      </div>
      <div className="controls">
        <Button onClick={handleStart} aria-controls="display">
          {isGoing ? "Stop" : "Start"}
        </Button>
        <Button
          variant="secondary"
          onClick={handleReset}
          aria-controls="display"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
