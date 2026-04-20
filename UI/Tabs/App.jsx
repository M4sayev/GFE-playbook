import { Tabs, TabPanel, TabsControls } from "./Tabs";

export const config = [
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

export default function App() {
  return (
    <Tabs initialValue={config[0].label}>
      {/* tab buttons  */}
      <TabsControls role="tablist" className="tabs__btns">
        {config.map(({ label }) => {
          return (
            <TabsControls.Trigger key={label} value={label}>
              {label}
            </TabsControls.Trigger>
          );
        })}
      </TabsControls>

      {/* tabs */}

      {config.map(({ label, text }) => {
        return (
          <TabPanel key={`panel-${label}`} value={label}>
            {text}
          </TabPanel>
        );
      })}
    </Tabs>
  );
}
