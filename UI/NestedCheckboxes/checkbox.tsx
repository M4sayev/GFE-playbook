import { useState, useEffect, useRef } from "react";

type ChildrenType = CheckboxItem[];
type CheckedType = boolean | "indeterminate";
type CheckboxItem = {
  id: number;
  name: string;
  checked: CheckedType;
  children?: ChildrenType;
};

function getNodeState(children: ChildrenType): CheckedType {
  if (!children || children.length === 0) return false;

  let anyChecked = false;
  let allChecked = true;

  for (const child of children) {
    if (child.checked === "indeterminate") {
      return "indeterminate";
    }
    if (child.checked) {
      anyChecked = true;
    } else {
      allChecked = false;
    }
  }

  if (allChecked) return true;
  if (anyChecked) return "indeterminate";
  return false;
}

function setAllChildren(
  checked: CheckedType,
  children?: ChildrenType,
): ChildrenType | undefined {
  return children?.map((child) => ({
    ...child,
    children: setAllChildren(checked, child.children),
    checked,
  }));
}

function updateNode(
  items: ChildrenType,
  id: number,
  checked: CheckedType,
): ChildrenType {
  return items.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        checked,
        children: setAllChildren(checked, item.children),
      };
    }

    if (item.children) {
      const updatedChildren = updateNode(item.children, id, checked);
      const derivedState = getNodeState(updatedChildren);

      return {
        ...item,
        children: updatedChildren,
        checked: derivedState,
      };
    }

    return item;
  });
}

export default function CheckboxTree({
  defaultCheckboxData,
}: {
  defaultCheckboxData: CheckboxItem[];
}) {
  const [items, setitems] = useState<CheckboxItem[]>(defaultCheckboxData);

  function handleChange(checked: CheckedType, id: number) {
    setitems((prev) => updateNode(prev, id, checked));
  }

  return <Checkboxes items={items} onChange={handleChange} />;
}

function Checkboxes({
  items,
  onChange,
}: {
  items: CheckboxItem[];
  onChange: (checked: CheckedType, id: number) => void;
}) {
  return (
    <div>
      {items?.map((item) => (
        <CheckboxItem key={item.id} item={item} onChange={onChange} />
      ))}
    </div>
  );
}

function CheckboxItem({
  item,
  onChange,
}: {
  item: CheckboxItem;
  onChange: (checked: CheckedType, id: number) => void;
}) {
  const ref = useRef<HTMLInputElement | null>(null);
  const { id, children, checked, name } = item;

  const isIndeterminate = checked === "indeterminate";

  useEffect(() => {
    if (!ref.current) return;

    ref.current.indeterminate = checked === "indeterminate";
  }, [checked]);

  return (
    <div className="checkboxes">
      <div className="checkboxes__item">
        <input
          ref={ref}
          checked={isIndeterminate ? false : checked}
          id={`${id}`}
          onChange={(e) => onChange(e.target.checked, id)}
          type="checkbox"
          aria-checked={isIndeterminate ? "mixed" : checked}
        />
        <label htmlFor={`${id}`}>{name}</label>
      </div>
      <div role="group" aria-label={`${name} options`}>
        {children && children.length && (
          <Checkboxes items={children} onChange={onChange} />
        )}
      </div>
    </div>
  );
}
