import FileExplorer from "./FileExplorer";
import { createContext, useState, useContext } from "react";

const data = [
  {
    id: 1,
    name: "README.md",
  },
  {
    id: 2,
    name: "Documents",
    children: [
      {
        id: 3,
        name: "Word.doc",
      },
      {
        id: 4,
        name: "Powerpoint.ppt",
      },
    ],
  },
  {
    id: 5,
    name: "Downloads",
    children: [
      {
        id: 6,
        name: "unnamed.txt",
      },
      {
        id: 7,
        name: "Misc",
        children: [
          {
            id: 8,
            name: "foo.txt",
          },
          {
            id: 9,
            name: "bar.txt",
          },
        ],
      },
    ],
  },
];

export type Item = {
  id: number;
  name: string;
  children?: Item[];
};

type ContextValues = {
  ids: Map<number, boolean>;
  toggleId: (id: Item["id"], children?: Item["children"]) => void;
  setIds: React.Dispatch<React.SetStateAction<Map<number, boolean>>>;
};

const ExplorerContext = createContext<null | ContextValues>(null);

function getIds(data: Item[], map = new Map<number, boolean>()) {
  for (const item of data) {
    if (item.children) {
      map.set(item.id, false);
      getIds(item.children, map);
    }
  }

  return map;
}

function sortExplorer(data: Item[]): Item[] {
  return data
    .map((item) =>
      item.children ? { ...item, children: sortExplorer(item.children) } : item,
    )
    .sort((itemOne, itemTwo) => {
      const oneIsFolder = itemOne.children;
      const twoIsFolder = itemTwo.children;

      if (oneIsFolder && !twoIsFolder) return -1;
      if (!oneIsFolder && twoIsFolder) return 1;

      return itemOne.name.localeCompare(itemTwo.name);
    });
}

export function useExplorer() {
  const context = useContext(ExplorerContext);

  if (context === null) {
    throw new Error("Context must be wrapper in a context provider!!!");
  }

  return context;
}

const sortedData = sortExplorer(data);

export default function App() {
  const [ids, setIds] = useState(() => getIds(sortedData));

  const toggleId = (id: Item["id"], children?: Item["children"]) => {
    setIds((prev) => {
      const newMap = new Map(prev);

      const isCurrentlyOpen = newMap.get(id);

      newMap.set(id, !isCurrentlyOpen);

      if (isCurrentlyOpen && children) {
        const collapseAll = (items: Item[]) => {
          for (const item of items) {
            if (item.children) {
              newMap.set(item.id, false);
              collapseAll(item.children);
            }
          }
        };
        collapseAll(children);
      }

      return newMap;
    });
  };

  const values: ContextValues = {
    ids,
    setIds,
    toggleId,
  };

  return (
    <ExplorerContext.Provider value={values}>
      <FileExplorer data={sortedData} />
    </ExplorerContext.Provider>
  );
}
