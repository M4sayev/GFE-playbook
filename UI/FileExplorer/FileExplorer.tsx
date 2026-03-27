import type { Item } from "./App";
import { useExplorer } from "./App";

function Directory({ item }: { item: Item }) {
  const { ids, toggleId } = useExplorer();

  const isOpen = ids.get(item.id);
  const directoryID = `directory-${item.id}`;

  return (
    <>
      <button
        aria-pressed={isOpen}
        aria-controls={directoryID}
        aria-label={
          isOpen
            ? `collapse the ${item.name} folder`
            : `uncollapse the ${item.name} folder`
        }
        onClick={() => toggleId(item.id, item.children)}
        className="directory-btn"
      >{`${item.name} [${isOpen ? "-" : "+"}]`}</button>
      <ul id="directoryID" data-collapsed={isOpen} className="directory">
        <FileExplorer data={item.children!} />
      </ul>
    </>
  );
}

function File({ item }: { item: Item }) {
  return <li className="file">{item.name}</li>;
}

// function File({ item });

export default function FileExplorer({ data }: { data: Item[] }) {
  return (
    <div className="file-explorer">
      {data?.map((item) => {
        if (item.children) {
          return <Directory key={item.id} item={item} />;
        }
        return <File key={item.id} item={item} />;
      })}
    </div>
  );
}
