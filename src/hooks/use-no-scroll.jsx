import React, { useEffect } from "react";

function UseNoScroll(open) {
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.position = "fixed";
      document.documentElement.style.width = "100%";
    } else {
      document.documentElement.style.overflow = "";
      document.documentElement.style.position = "";
      document.documentElement.style.width = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return open;
}

export default UseNoScroll;
