import { useState } from "react";

function TabButton({ label, onClick, activeTab }) {
  const isActive = activeTab === label;
  const panelId = `panel-${label}`;
  const tabId = `tab-${label}`;
  return (
    <button
      id={tabId}
      aria-controls={panelId}
      aria-selected={isActive}
      aria-disabled={isActive}
      role="tab"
      className={`tabs__btn ${isActive ? "tabs__btn--active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function TabPanel({ label, activeTab, text }) {
  const panelId = `panel-${label}`;
  const tabId = `tab-${label}`;
  const isActive = label === activeTab;
  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      hidden={!isActive}
    >
      <p>{text}</p>
    </div>
  );
}
export default function Tabs({ config }) {
  const [activeTab, setActiveTab] = useState(config[0].label);

  return (
    <div>
      {/* tab buttons  */}
      <div role="tablist" className="tabs__btns">
        {config.map(({ label }) => {
          return (
            <TabButton
              key={label}
              activeTab={activeTab}
              onClick={() => setActiveTab(label)}
              label={label}
            />
          );
        })}
      </div>

      {/* tabs */}
      <div>
        {config.map(({ label, text }) => {
          return (
            <TabPanel
              key={`pabel-${label}`}
              label={label}
              text={text}
              activeTab={activeTab}
            />
          );
        })}
      </div>
    </div>
  );
}
