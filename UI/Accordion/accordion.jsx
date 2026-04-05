import { useState } from "react";
const items = [
  {
    id: 1,
    label: "HTML",
    description: `The HyperText Markup Language or HTML is the standard markup language
          for documents designed to be displayed in a web browser.`,
  },
  {
    id: 2,
    label: "CSS",
    description: `Cascading Style Sheets is a style sheet language used for describing
          the presentation of a document written in a markup language such as
          HTML or XML.`,
  },
  {
    id: 3,
    label: "JavaScript",
    description: `JavaScript, often abbreviated as JS, is a programming language that is
          one of the core technologies of the World Wide Web, alongside HTML and
          CSS.`,
  },
];
export default function Accordion() {
  return (
    <ul className="accordion">
      {items.map((item) => {
        return <AccordionItem key={item.id} {...item} />;
      })}
    </ul>
  );
}

function AccordionItem({ id, label, description }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function handleHeadClick() {
    setIsCollapsed((prev) => !prev);
  }

  const accordionBodyID = `accordion-body-${id}`;
  const accordionHeadID = `accordion-head-${id}`;
  return (
    <li>
      <h3>
        <button
          aria-label={`${isCollapsed ? "view" : "collapse"} the content of ${label}`}
          aria-controls={accordionBodyID}
          aria-expanded={!isCollapsed}
          onClick={handleHeadClick}
          className="accordion__head"
          id={accordionHeadID}
        >
          {label}
          <ArrowDown
            aria-hidden={true}
            className={!isCollapsed ? "arrow-down--rotated" : ""}
          />
        </button>
      </h3>
      <div
        role="region"
        aria-labelledby={accordionHeadID}
        id={accordionBodyID}
        className={`accordion__body ${!isCollapsed ? "accordion__body--active" : ""}`}
      >
        {description}
      </div>
    </li>
  );
}

function ArrowDown({ ...attributes }) {
  const { className, ...props } = attributes;
  return <span {...props} className={`arrow-down ${className}`} />;
}
