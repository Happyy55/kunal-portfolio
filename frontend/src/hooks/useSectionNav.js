import { useLocation, useNavigate } from "react-router-dom";

// In-page section links. On the home page they smooth-scroll; from any other
// route the section isn't rendered yet, so they route to "/#id" and Home
// scrolls once it has mounted.
export function useSectionNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";

  const hrefFor = (hash) => (onHome ? hash : `/${hash}`);

  const goTo = (e, hash) => {
    e.preventDefault();
    if (onHome) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`/${hash}`);
    }
  };

  return { onHome, hrefFor, goTo };
}
