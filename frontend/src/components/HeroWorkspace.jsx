import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// One studio window with three panes that work together: the code types
// itself, the preview builds from it, and the pipeline walks a project from
// brand to launch. Motion is CSS (see .ws-* in index.css); each element's
// start time is passed as --d.

const CODE = [
  [["kw", "const "], ["", "brand = "], ["fn", "createBrand"], ["", "("], ["str", '"KJ"'], ["", ");"]],
  [],
  [["kw", "export default function "], ["fn", "Launch"], ["", "() {"]],
  [["", "  "], ["kw", "return"], ["", " ("]],
  [["", "    "], ["tag", "<Site"], ["attr", " brand"], ["", "={brand}"]],
  [["", "      "], ["attr", "motion"], ["", "="], ["str", '"smooth"']],
  [["", "      "], ["attr", "speed"], ["", "="], ["str", '"fast"'], ["tag", " />"]],
  [["", "  );"]],
  [["", "}"]],
];

const STEPS = ["Brand", "Design", "Build", "Launch"];

const CodePane = () => (
  <div className="ws-pane ws-code">
    <div className="ws-tabs">
      <span>brand.ts</span>
      <span className="is-active">launch.jsx</span>
    </div>
    <pre>
      {CODE.map((tokens, i) => (
        <span key={i} className="ws-line" style={{ "--d": `${0.2 + i * 0.32}s` }}>
          {tokens.length
            ? tokens.map(([kind, text], j) => <span key={j} className={kind ? `c-${kind}` : undefined}>{text}</span>)
            : " "}
        </span>
      ))}
      <span className="ws-caret" />
    </pre>
  </div>
);

const PreviewPane = () => (
  <div className="ws-pane ws-preview">
    <div className="ws-url">
      <span className="ws-url-dot" />
      kjcreator.com
    </div>
    <div className="ws-site">
      <div className="ws-site-nav ws-pop" style={{ "--d": "0.5s" }}>
        <span className="ws-site-logo" />
        <span className="ws-bar" style={{ width: 18 }} />
        <span className="ws-bar" style={{ width: 18 }} />
        <span className="ws-bar" style={{ width: 18 }} />
      </div>
      <span className="ws-bar ws-bar--title ws-pop" style={{ "--d": "1.6s", width: "86%" }} />
      <span className="ws-bar ws-bar--title ws-pop" style={{ "--d": "1.8s", width: "62%" }} />
      <span className="ws-bar ws-pop" style={{ "--d": "2.1s", width: "70%" }} />
      <span className="ws-site-btn ws-pop" style={{ "--d": "2.5s" }} />
      <span className="ws-site-hero ws-pop" style={{ "--d": "2.7s" }} />
      <div className="ws-site-cards">
        <span className="ws-pop" style={{ "--d": "2.9s" }} />
        <span className="ws-pop" style={{ "--d": "3.1s" }} />
        <span className="ws-pop" style={{ "--d": "3.3s" }} />
      </div>
    </div>
  </div>
);

const PipelinePane = () => (
  <div className="ws-pane ws-pipeline">
    <div className="ws-track">
      <span className="ws-track-fill" />
    </div>
    <ol className="ws-steps">
      {STEPS.map((s, i) => (
        <li key={s} className="ws-step" style={{ "--d": `${0.1 + i * 2.4}s` }}>
          <span className="ws-step-dot" />
          {s}
        </li>
      ))}
    </ol>
  </div>
);

const CYCLE_MS = 10500; // keep in sync with --cycle in index.css

// Remounting the run every cycle restarts every pane's animation at once,
// so the code, preview and pipeline never drift out of step.
function useCycle(enabled) {
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const t = setInterval(() => setRun((r) => r + 1), CYCLE_MS);
    return () => clearInterval(t);
  }, [enabled]);
  return run;
}

const Workspace = ({ compact = false, run }) => (
  <div className={`ws ${compact ? "ws--compact" : ""}`}>
    <div className="ws-glow" />
    <div className="ws-titlebar">
      <span className="ws-dot" style={{ background: "var(--cyan)" }} />
      <span className="ws-dot" style={{ background: "var(--violet)" }} />
      <span className="ws-dot" style={{ background: "var(--gold)" }} />
      <span className="ws-title">kj-studio / new-project</span>
      <span className="ws-status" key={`s${run}`}>
        <span className="ws-status-building">Building</span>
        <span className="ws-status-live">Live</span>
      </span>
    </div>
    <div className="ws-run" key={run}>
      <div className="ws-body">
        <CodePane />
        {!compact && <PreviewPane />}
      </div>
      <PipelinePane />
    </div>
  </div>
);

// Floating cards outside the window: the brand kit the build starts from,
// and the deploy result it ends on. They share the window's run timing.
const BrandKit = () => (
  <div className="ws-sat ws-sat--brand ws-pop" style={{ "--d": "0.3s" }}>
    <div className="ws-pane-label">brand kit</div>
    <div className="ws-kit">
      <span className="ws-kit-type">Aa</span>
      <div>
        <div className="ws-kit-swatches">
          <span style={{ background: "var(--cyan)" }} />
          <span style={{ background: "var(--violet)" }} />
          <span style={{ background: "var(--gold)" }} />
          <span style={{ background: "var(--ink)" }} />
        </div>
        <div className="ws-kit-font">Geist · 800</div>
      </div>
    </div>
  </div>
);

const DeployToast = () => (
  <div className="ws-sat ws-sat--deploy ws-pop" style={{ "--d": "7.4s" }}>
    <svg className="ws-ring" viewBox="0 0 36 36" aria-hidden>
      <circle cx="18" cy="18" r="15" />
      <circle cx="18" cy="18" r="15" className="ws-ring-fill" />
      <text x="18" y="22" textAnchor="middle">100</text>
    </svg>
    <div>
      <div className="ws-deploy-title">Deployed</div>
      <div className="ws-deploy-sub">Performance 100</div>
    </div>
  </div>
);

export const HeroWorkspace = ({ reduce }) => {
  const run = useCycle(!reduce);
  return (
    <>
      <div className="ws-anchor hidden lg:block" aria-hidden>
        <motion.div
          className="relative"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Workspace run={run} />
          <div className="ws-run ws-sats hidden xl:block" key={`sat${run}`}>
            <BrandKit />
            <DeployToast />
          </div>
        </motion.div>
      </div>
      <div className="ws-mobile lg:hidden" aria-hidden>
        <Workspace compact run={run} />
      </div>
    </>
  );
};

export default HeroWorkspace;
