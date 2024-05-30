import { useCallback, useEffect } from "react";

type useKeyPressListenerProps = {
    isFocused: boolean;
    resetKey: "" | "Enter" | "Tab" | "Escape";
}

export default function useKeyPressListener( { isFocused, resetKey } : useKeyPressListenerProps) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key;

    const isAlphanumeric = /^[a-zA-Z0-9]$/.test(key);
    if (isAlphanumeric) {
      console.log(`Alphanumeric key pressed: ${key}`);
    } else if (key === "Backspace") {
      console.log(`Backspace key pressed: ${key}`);
    } else if (key === resetKey) {
      console.log(`Reset key pressed: ${key}`);
    } else {
      console.log(`Non-alphanumeric key pressed: ${key}`);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFocused, handleKeyDown]);
}
