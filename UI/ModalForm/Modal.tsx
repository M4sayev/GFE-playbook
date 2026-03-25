import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  onClose: () => void | React.SetStateAction<boolean>;
  isOpen?: boolean;
}
export default function ModalDialog({
  title,
  isOpen = false,
  onClose,
  ...other
}: ModalProps) {
  const { className = "", children } = other;
  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  useTrapFocus({ container: modalRef, flag: isOpen });
  useClickOutside({ container: modalContentRef, flag: isOpen, close: onClose });
  useEscapeKey({ flag: isOpen, close: onClose });

  if (!isOpen) return null;

  return createPortal(
    <div ref={modalRef} className={`modal ${className}`}>
      <div
        className="modal__overlay"
        onClick={(e) => e.stopPropagation()}
      ></div>
      <div
        ref={modalContentRef}
        className="modal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        {...other}
      >
        <h1 id="dialog-title" className="modal__title">
          {title}
        </h1>
        {children}
        <button
          onClick={onClose}
          aria-label="Close the modal"
          className="modal__btn--close"
        >
          X
        </button>
      </div>
    </div>,
    document.body,
  );
}

const selectors =
  'button:not([tabindex="-1"]), select:not([tabindex="-1"]), input:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"]), textarea:not([tabindex="-1"])';

interface TrapFocusArgs {
  flag: boolean;
  container: React.RefObject<HTMLElement | null>;
}

function useTrapFocus({ container, flag }: TrapFocusArgs) {
  useEffect(() => {
    const root = container?.current;
    if (!root || !flag) return;

    const focusableElements =
      container.current.querySelectorAll<HTMLElement>(selectors);

    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    if (!root) {
      return;
    }

    function handleKeydown(e: KeyboardEvent) {
      if (e.key !== "Tab") {
        return;
      }

      const activeEl = document.activeElement;

      if (activeEl === firstEl && e.shiftKey) {
        e.preventDefault();
        lastEl.focus();
      } else if (activeEl === lastEl && !e.shiftKey) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  }, [flag]);
}

interface ClickOutsideArgs {
  flag: boolean;
  container: React.RefObject<HTMLElement | null>;
  close: () => void | React.SetStateAction<boolean>;
}

function useClickOutside({ container, flag, close }: ClickOutsideArgs) {
  useEffect(() => {
    const root = container?.current;

    if (!root) {
      return;
    }

    function handleClickOutside(e: MouseEvent) {
      if (root && !root.contains(e.target as HTMLElement)) {
        close();
      }
    }

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [flag, close]);
}

interface EscapeKey {
  flag: boolean;
  close: () => void | React.SetStateAction<boolean>;
}
function useEscapeKey({ flag, close }: EscapeKey) {
  useEffect(() => {
    if (!flag) {
      return;
    }

    function handleEscapeKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
      }
    }

    window.addEventListener("keydown", handleEscapeKey);

    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [flag]);
}
