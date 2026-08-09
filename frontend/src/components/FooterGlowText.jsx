import { useState } from "react";

// Bookends the Hero headline — keep these two in sync.
const LINES = ["I turn ideas", "into experiences.", "You remember the feeling."];

export const FooterGlowText = () => {
  const [activeLine, setActiveLine] = useState(null);

  return (
    <div className="footer-glow-wordmark select-none" aria-hidden>
      {LINES.map((line, idx) => (
        <div
          key={line}
          className={`footer-glow-line ${activeLine === idx ? "is-active" : ""}`}
          onMouseEnter={() => setActiveLine(idx)}
          onMouseLeave={() => setActiveLine((cur) => (cur === idx ? null : cur))}
        >
          <span className="footer-glow-base">{line}</span>
          <span className="footer-glow-shine">{line}</span>
        </div>
      ))}
    </div>
  );
};

export default FooterGlowText;
