// Minimal route-transition fallback shown while a lazy-loaded page chunk fetches.
// Uses only existing design tokens/classes (index.css) — no new styling added.
export default function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      data-testid="page-loader"
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "var(--bg)" }}
    >
      <div className="flex flex-col items-center gap-4">
        <span
          aria-hidden
          className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{ borderColor: "var(--rule-strong)", borderTopColor: "var(--cyan)" }}
        />
        <span className="eyebrow">Loading</span>
      </div>
    </div>
  );
}
