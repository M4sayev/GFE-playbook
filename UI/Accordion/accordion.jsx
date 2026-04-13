import { createContext, useContext, useState, useId, Children } from "react";

const AccordionItemContext = createContext(null);

function AccordionItemProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  const accordionHeadID = `accordion-head-${id}`;
  const accordionBodyID = `accordion-body-${id}`;

  function toggleItem() {
    setIsOpen((prev) => !prev);
  }

  const context = {
    isOpen,
    toggleItem,
    accordionBodyID,
    accordionHeadID,
  };

  return (
    <AccordionItemContext.Provider value={context}>
      {children}
    </AccordionItemContext.Provider>
  );
}

export function useAccordionItem() {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error("Accordion* accordion items must be withing Accordion");
  }

  return context;
}
export function Accordion({ children }) {
  return <ul className="accordion">{children}</ul>;
}

function AccordionItem({ children }) {
  function validate() {
    let hasTrigger = false;
    let hasBody = false;

    Children.forEach(children, (child) => {
      if (!child) return;
      if (child.type === AccordionTrigger) {
        hasTrigger = true;
      }
      if (child.type === AccordionBody) {
        hasBody = true;
      }
    });

    if (!hasTrigger) {
      throw new Error("Accordion.Item must include Accordion.Trigger");
    }

    if (!hasBody) {
      throw new Error("Accordion.Item must include Accordion.Body");
    }

    return true;
  }

  validate();
  return (
    <AccordionItemProvider>
      <li>{children}</li>
    </AccordionItemProvider>
  );
}

function AccordionTrigger({ children }) {
  const { isOpen, toggleItem, accordionBodyID, accordionHeadID } =
    useAccordionItem();
  return (
    <h3>
      <button
        aria-label={`${isOpen ? "collapse" : "view"} the content`}
        aria-controls={accordionBodyID}
        aria-expanded={isOpen}
        onClick={toggleItem}
        className="accordion__head"
        id={accordionHeadID}
      >
        {children}
        <ArrowDown
          aria-hidden={true}
          className={isOpen ? "arrow-down--rotated" : ""}
        />
      </button>
    </h3>
  );
}

function AccordionBody({ children }) {
  const { isOpen, accordionBodyID, accordionHeadID } = useAccordionItem();

  return (
    <div
      role="region"
      aria-labelledby={accordionHeadID}
      id={accordionBodyID}
      className={`accordion__body ${isOpen ? "accordion__body--active" : ""}`}
    >
      {children}
    </div>
  );
}

function ArrowDown({ ...attributes }) {
  const { className, ...props } = attributes;
  return <span {...props} className={`arrow-down ${className}`} />;
}

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Body = AccordionBody;
