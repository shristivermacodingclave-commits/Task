import { useEffect } from "react";

export default function usePreventBackExit(onTrigger) {
  useEffect(() => {
    const handleBack = (e) => {
      e.preventDefault();
      onTrigger(); // Show modal
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [onTrigger]);
}
