import { useState, createContext, useId, useContext } from "react";

const TabContext = createContext(null);

function TabContextProvider({ initialValue, children }) {
  const [currentTab, setCurrentTab] = useState(initialValue);
  const baseId = useId();

  const context = {
    currentTab,
    setCurrentTab,
    baseId,
  };

  return <TabContext.Provider value={context}>{children}</TabContext.Provider>;
}

function useTabContext() {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error("Tabs* items must be within tabs");
  }

  return context;
}

function Tabs({ children, initialValue, className = "", ...other }) {
  return (
    <TabContextProvider initialValue={initialValue}>
      <div className={className} {...other}>
        {children}
      </div>
    </TabContextProvider>
  );
}

function TabsControls({ children, className = "", ...other }) {
  return (
    <div role="tablist" className={`tabs__btns ${className}`} {...other}>
      {children}
    </div>
  );
}

function TabTrigger({ children, className = "", value, ...other }) {
  const { baseId, currentTab, setCurrentTab } = useTabContext();
  const isActive = currentTab === value;
  const panelId = `${baseId}-panel-${value}`;
  const tabId = `${baseId}-tab-${value}`;

  const onClick = () => setCurrentTab(value);

  return (
    <button
      id={tabId}
      aria-controls={panelId}
      aria-selected={isActive}
      aria-disabled={isActive}
      role="tab"
      className={`tabs__btn ${className}`}
      onClick={onClick}
      {...other}
    >
      {children}
    </button>
  );
}
function TabPanel({ children, className = "", value, ...other }) {
  const { baseId, currentTab } = useTabContext();
  const panelId = `${baseId}-panel-${value}`;
  const tabId = `${baseId}-tab-${value}`;
  const isActive = value === currentTab;
  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      hidden={!isActive}
      {...other}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

TabsControls.Trigger = TabTrigger;

export { Tabs, TabPanel, TabsControls };
