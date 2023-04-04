import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useDocumentTitle() {
  const location = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const h3 = document.querySelector("h3");
    const hideTitle = window.innerWidth < 768; // md breakpoint in Tailwind CSS

    if (h3) {
      const titleText = h3.textContent;
      document.title = titleText;
      setTitle(titleText);

      const isHidden = h3.classList?.contains("hidden");
      if (hideTitle && !isHidden && titleText !== "Home") {
        h3.classList.toggle("hidden");
      }
    } else if (location?.pathname !== "/" && location?.pathname !== "/login") {
      document.title = "E-Bank | Everything You Need";
      setTitle("");
    } else if (location?.pathname === "/") {
      document.title = "Home";
    }
  }, [location]);

  return title;
}
