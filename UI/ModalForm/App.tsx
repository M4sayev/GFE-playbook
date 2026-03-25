import { useState, useCallback } from "react";

import ModalDialog from "./ModalDialog";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = useCallback(() => setIsModalOpen(false), []);
  return (
    <div>
      <button aria-controls="modal" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>
      <ModalDialog
        id="modal"
        title={"Dialog"}
        isOpen={isModalOpen}
        onClose={onClose}
      >
        One morning, when Gregor Samsa woke from troubled dreams, he found
        himself transformed in his bed into a horrible vermin. He lay on his
        armour-like back, and if he lifted his head a little he could see his
        brown belly, slightly domed and divided by arches into stiff sections.
      </ModalDialog>
    </div>
  );
}
