// Divider between sections: a hairline that draws itself left-to-right when
// it scrolls into view (driven by the shared .reveal observer).
export const ScrollTrace = () => (
  <div className="scroll-trace reveal" aria-hidden data-testid="scroll-trace">
    <span className="scroll-trace-line" />
  </div>
);

export default ScrollTrace;
