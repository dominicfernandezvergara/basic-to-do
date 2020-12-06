import React, { useEffect } from "react";

function UseScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

export default UseScrollToTop;
