import "./styles.css";

// Write your JavaScript here.

const items = [
  {
    id: 1,
    label: "HTML",
    text: `The HyperText Markup Language or HTML is the standard markup language
          for documents designed to be displayed in a web browser.`,
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
    label: "JavaScript",
    text: `JavaScript, often abbreviated as JS, is a programming language that is
          one of the core technologies of the World Wide Web, alongside HTML and
          CSS.`,
  },
];

const DEFAULT_ACCORDION_BODY_TEXT =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,";

const root = document.getElementById("root");

function createAccordionTrigger({
  headID,
  bodyID,
  label = "Lorem ipsum",
  accordionBody,
}) {
  let isExpanded = false;

  const trigger = document.createElement("h3");
  const button = document.createElement("button");

  button.textContent = label;
  button.setAttribute("class", "accordion__head");
  button.setAttribute("aria-expanded", isExpanded);
  button.setAttribute("aria-controls", bodyID);
  button.setAttribute("id", headID);

  // arrow down
  const arrowDown = document.createElement("span");
  arrowDown.setAttribute("class", "arrow-down");
  arrowDown.setAttribute("aria-hidden", true);

  button.addEventListener("click", () => {
    isExpanded = !isExpanded;

    button.setAttribute("aria-expanded", isExpanded);
    arrowDown.classList.toggle("arrow-down--rotated");

    accordionBody.classList.toggle("accordion__body--active");
  });

  button.appendChild(arrowDown);
  trigger.appendChild(button);

  return trigger;
}

function createAccordionBody({
  headID,
  bodyID,
  text = DEFAULT_ACCORDION_BODY_TEXT,
}) {
  const body = document.createElement("div");
  body.setAttribute("class", "accordion__body");
  body.setAttribute("aria-labelledby", headID);
  body.setAttribute("role", "region");
  body.setAttribute("id", bodyID);
  body.textContent = text;

  return body;
}

function createAccordionItem({ id, label, text, baseId }) {
  const headID = `${baseId}-${id}-head`;
  const bodyID = `${baseId}-${id}-body`;
  const li = document.createElement("li");
  const accordionBody = createAccordionBody({ headID, bodyID, text });
  const accordionTrigger = createAccordionTrigger({
    headID,
    bodyID,
    label,
    accordionBody,
  });

  li.append(accordionTrigger, accordionBody);
  return li;
}

function initAccordion(items) {
  if (!items || items.length < 1) return;
  const accordion = document.createElement("ul");
  const baseId = crypto.randomUUID();

  items.forEach((item) => {
    const { id, label, text } = item;
    const accordionItem = createAccordionItem({ id, label, text, baseId });
    accordion.appendChild(accordionItem);
  });
  root.appendChild(accordion);
}

initAccordion(items);
