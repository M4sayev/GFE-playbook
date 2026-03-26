import { useState } from "react";

const INITIAL_LEFT = [
  { id: 1, label: "HTML" },
  { id: 2, label: "JavaScript" },
  { id: 3, label: "CSS" },
  { id: 4, label: "TypeScript" },
];

const INITIAL_RIGHT = [
  { id: 5, label: "React" },
  { id: 6, label: "Angular" },
  { id: 7, label: "Vue" },
  { id: 8, label: "Svelte" },
];

function ItemList({ title, list, onToggle }) {
  return (
    <fieldset className="checkboxes" id="leftList">
      <legend className="sr-only">{title}</legend>
      {list.map((item) => (
        <label key={item.id}>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => onToggle(item.id)}
            name={item.label.toLocaleLowerCase()}
          />
          {item.label}
        </label>
      ))}
    </fieldset>
  );
}

function ControlBtn({ className, label, onClick, ...attributes }) {
  return (
    <button {...attributes} onClick={onClick}>
      {label}
    </button>
  );
}

function useTransferList(initial) {
  const [items, setItems] = useState(
    initial.map((item) => ({ ...item, checked: false })),
  );

  const removeAll = () => {
    const removed = items;
    setItems([]);
    return removed;
  };

  const removeSelected = () => {
    const selected = items.filter((item) => item.checked);
    setItems((prev) => prev.filter((item) => !item.checked));
    return selected;
  };

  const toggle = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const add = (incoming) => {
    setItems((prev) => [...prev, ...incoming]);
  };

  const hasSelected = items.some((item) => item.checked);

  return { removeAll, removeSelected, toggle, add, hasSelected, items };
}

export default function App() {
  const left = useTransferList(INITIAL_LEFT);
  const right = useTransferList(INITIAL_RIGHT);

  const moveAllRight = () => right.add(left.removeAll());
  const moveAllLeft = () => left.add(right.removeAll());
  const moveSelectedLeft = () => left.add(right.removeSelected());
  const moveSelectedRight = () => right.add(left.removeSelected());

  return (
    <div className="transfer-list">
      <ItemList title="List one" onToggle={left.toggle} list={left.items} />
      <div className="controls">
        <ControlBtn
          aria-label="move all items from second list to first"
          label="<<"
          disabled={right.items.length === 0}
          onClick={moveAllLeft}
        />
        <ControlBtn
          aria-label="move selected items from second list to first"
          label="<"
          disabled={!right.hasSelected}
          onClick={moveSelectedLeft}
        />
        <ControlBtn
          aria-label="move selected items from first list to second"
          label=">"
          disabled={!left.hasSelected}
          onClick={moveSelectedRight}
        />
        <ControlBtn
          aria-label="move all items from first list to second"
          label=">>"
          disabled={left.items.length === 0}
          onClick={moveAllRight}
        />
      </div>

      <ItemList title="List Two" onToggle={right.toggle} list={right.items} />
    </div>
  );
}
