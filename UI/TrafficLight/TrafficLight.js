import { useState, useEffect } from "react";

function Light({ color, isActive }) {
  return (
    <span
      aria-hidden="true"
      data-color={color}
      className={`traffic-light__light ${isActive ? "traffic-light__light--active" : ""}`}
    ></span>
  );
}

export default function TrafficLight({
  variant = "vertical",
  reverse = false,
  config,
  initialColor = "green",
}) {
  const [currentColor, setCurrentColor] = useState(initialColor);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentColor(config[currentColor].next);
    }, config[currentColor].durationMS);

    return () => clearTimeout(timeoutId);
  }, [config, currentColor]);

  return (
    <div
      aria-label="Traffic lights"
      data-variant={variant}
      data-reverse={reverse}
      className="traffic-light"
    >
      {["green", "yellow", "red"].map((color) => (
        <Light key={color} color={color} isActive={color === currentColor} />
      ))}

      <div className="visually-hidden" aria-live="polite" aria-atomic="true">
        {config[currentColor].announcement}
      </div>
    </div>
  );
}
