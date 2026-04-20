import "./styles.css";

// Write your JavaScript here.

const config = [
  {
    id: 1,
    label: "HTML",
    text: `The HyperText Markup Language or HTML is the
          standard markup language for documents designed to
          be displayed in a web browser.`,
  },
  {
    id: 2,
    label: "CSS",
    text: `Cascading Style Sheets is a style sheet language used for describing
          the presentation of a document written in a markup language such as
          HTML or XML.`,
  },
  {
    id: 3,
    label: "JS",
    text: `JavaScript, often abbreviated as JS, is a programming language that is
          one of the core technologies of the World Wide Web, alongside HTML and
          CSS.`,
  },
];

const state = {
  currentTab: null,
  baseId: null,
};

const tabs = document.getElementById("tabs");

function initTabs(config) {
  state.currentTab = config[0].label;

  const tabControls = document.createElement("div");
  tabControls.setAttribute("id", "tabControls");
  tabControls.setAttribute("role", "tablist");

  const tabPanels = document.createElement("div");
  tabPanels.setAttribute("id", "tabPanels");

  state.baseId = crypto.randomUUID();

  config.forEach(({ label, text }) => {
    const tabId = `${state.baseId}-tab-${label}`;
    const panelId = `${state.baseId}-panel-${label}`;
    const isSelected = state.currentTab === label;
    console.log(isSelected);
    const tabTrigger = document.createElement("button");
    tabTrigger.textContent = label;
    tabTrigger.setAttribute("id", tabId);
    tabTrigger.setAttribute("aria-controls", panelId);
    tabTrigger.setAttribute("aria-selected", isSelected);
    tabTrigger.setAttribute("role", "tab");
    tabTrigger.setAttribute("class", "tabs__btn");

    tabTrigger.addEventListener("click", () => updateTab(label));

    tabControls.appendChild(tabTrigger);

    const tabPanel = document.createElement("div");
    tabPanel.setAttribute("role", "tabpanel");
    tabPanel.setAttribute("id", panelId);
    tabPanel.setAttribute("aria-labelledby", tabId);
    tabPanel.tabIndex = 0;
    tabPanel.hidden = !isSelected;
    tabPanel.textContent = text;

    tabPanels.appendChild(tabPanel);
  });

  tabs.appendChild(tabControls);
  tabs.appendChild(tabPanels);
}

function updateTab(label) {
  const tabControls = document.getElementById("tabControls");
  const tabPanels = document.getElementById("tabPanels");
  state.currentTab = label;
  const tabId = `${state.baseId}-tab-${label}`;
  for (const child of tabControls.children) {
    child.setAttribute("aria-selected", child.id === tabId);
  }

  const panelId = `${state.baseId}-panel-${label}`;
  for (const child of tabPanels.children) {
    child.hidden = child.id !== panelId;
  }
}

initTabs(config);
