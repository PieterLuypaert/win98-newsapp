import { useEffect, useState, useCallback } from "react";

export const useWindowMaximize = (win = { open: false }) => {
  const [isWindowMaximized, setIsWindowMaximized] = useState(false);

  // reset when no window is open
  useEffect(() => {
    if (!win?.open) setIsWindowMaximized(false);
  }, [win?.open]);

  const toggle = useCallback(() => {
    const allowed = ["news", "article", "category", "bookmarks"];
    if (win?.open && allowed.includes(win.type)) {
      setIsWindowMaximized((s) => !s);
    }
  }, [win]);

  const reset = useCallback(() => setIsWindowMaximized(false), []);

  return {
    isWindowMaximized,
    toggle,
    reset,
    setIsWindowMaximized,
  };
};
