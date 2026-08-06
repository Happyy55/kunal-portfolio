import { createContext, useContext, useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "kj-reading-mode";
const ReadingModeContext = createContext(null);

export function ReadingModeProvider({ children }) {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (enabled) root.setAttribute("data-reading-mode", "true");
    else root.removeAttribute("data-reading-mode");
    try {
      window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
  }, [enabled]);

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  return (
    <ReadingModeContext.Provider value={{ enabled, toggle, setEnabled }}>
      {children}
    </ReadingModeContext.Provider>
  );
}

// Consumers: `enabled` tells you whether to skip mounting a Canvas/particle
// layer/marquee at all — don't just hide it with CSS, actually don't render it.
export function useReadingMode() {
  const ctx = useContext(ReadingModeContext);
  if (!ctx) {
    // Sensible default for anything rendered outside the provider (shouldn't
    // normally happen, but avoids a hard crash).
    return { enabled: false, toggle: () => {}, setEnabled: () => {} };
  }
  return ctx;
}
