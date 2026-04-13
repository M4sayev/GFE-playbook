import { Accordion } from "./accordion";

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

export default function App() {
  return (
    <Accordion>
      {items.map((item) => {
        return (
          <Accordion.Item key={item.id}>
            <Accordion.Trigger>{item.label}</Accordion.Trigger>
            <Accordion.Body>{item.description}</Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}
