import { useCallback, useEffect } from "react";

type useKeyPressListenerProps = {
    isFocused: boolean;
    resetKey: "" | "Enter" | "Tab" | "Escape";
    onKeyPress: (key: string) => void;
}

export default function useKeyPressListener( { isFocused, resetKey, onKeyPress } : useKeyPressListenerProps) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key;

    const isAlphanumeric = /^[a-zA-Z0-9]$/.test(key);
    if (isAlphanumeric || key === "Backspace" || key === resetKey || key === " ") {
      onKeyPress(key);
    }
  }, [onKeyPress, resetKey]);

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
