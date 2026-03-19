import { useState, useEffect, useRef } from "react";
function Button({ variant = "vanilla", children, ...props }) {
  return (
    <button className={`std-button std-button--${variant}`} {...props}>
      {children}
    </button>
  );
}

export default function Stopwatch() {
  const [isGoing, setIsGoing] = useState(false);
  const [diff, setDiff] = useState(0);
  const startTime = useRef(0);

  function handleStart() {
    if (!isGoing) {
      startTime.current = Date.now() - diff;
    }
    setIsGoing((prev) => !prev);
  }

  function handleReset() {
    setIsGoing(false);
    setDiff(0);
  }

  useEffect(() => {
    if (!isGoing) return;
    const intervalID = setInterval(() => {
      setDiff(() => Date.now() - startTime.current);
    }, 10);
    return () => clearInterval(intervalID);
  }, [isGoing]);

  function display() {
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (60 * 1000));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);
    let ms = Math.floor((diff % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${ms.toString().padStart(2, "0")}`;
  }

  return (
    <div className="stopwatch">
      <div className="display-wrapper">
        <div
          aria-hidden="true"
          className={`stopwatch__display ${isGoing ? "stopwatch__display--animate" : ""}`}
        ></div>
        <button
          onClick={handleStart}
          aria-label={isGoing ? "stop the stopwatch" : "start the stopwatch"}
        >
          {display()}
        </button>
      </div>
      <div className="controls">
        <Button
          onClick={handleStart}
          aria-controls="display"
          aria-live="polite"
        >
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
