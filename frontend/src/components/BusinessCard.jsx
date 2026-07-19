import { useEffect, useRef } from "react";

const CSS = `

  .biz3d{
    --bg-0:#070709;
    --bg-1:#0c0d12;
    --ink:#f4f6fb;
    --ink-dim:#9aa3b4;
    --line:rgba(255,255,255,.08);
    --line-2:rgba(255,255,255,.14);
    --blue:#3b82ff;
    --cyan:#22e6ff;
    --violet:#8b5cf6;
    --magenta:#d946ef;
    --card-w:560px;
    --card-h:340px; /* close to 3.5x2 ratio scaled */
  }
  
  
  

  .biz3d /* ───── header bar ───── */
  
  
  

  /* ───── stage ───── */
  .stage{
    width:min(1200px,100%);
    display:grid;grid-template-columns:1fr 1fr;gap:64px;
    place-items:center;
    perspective:1800px;
    padding:48px 0;
    position:relative;
  }
  .biz3d .stage::after{
    /* reflective floor */
    content:"";
    position:absolute;left:50%;bottom:-12px;transform:translateX(-50%);
    width:90%;height:120px;
    background:radial-gradient(ellipse at center, rgba(34,230,255,.07), rgba(139,92,246,.04) 40%, transparent 70%);
    filter:blur(20px);
    pointer-events:none;
  }
  .biz3d .label{
    position:absolute;top:8px;
    font-family:'JetBrains Mono',ui-monospace,monospace;
    font-size:10px;letter-spacing:.22em;color:var(--ink-dim);text-transform:uppercase;
  }
  .biz3d .col{position:relative;display:flex;justify-content:center;align-items:center;width:100%;min-height:420px}
  .biz3d .col.front .label{left:0}
  .biz3d .col.back .label{right:0}

  .biz3d /* ───── card shell ───── */
  .card{
    width:var(--card-w);height:var(--card-h);
    border-radius:22px;
    position:relative;
    background:
      radial-gradient(120% 80% at 0% 0%, rgba(59,130,255,.18), transparent 55%),
      radial-gradient(120% 80% at 100% 100%, rgba(139,92,246,.18), transparent 55%),
      linear-gradient(160deg, #14151b 0%, #0a0b10 50%, #0e0f15 100%);
    box-shadow:
      0 1px 0 rgba(255,255,255,.06) inset,
      0 0 0 1px rgba(255,255,255,.04) inset,
      0 30px 60px -20px rgba(0,0,0,.7),
      0 60px 120px -30px rgba(59,130,255,.18),
      0 60px 120px -30px rgba(139,92,246,.18);
    transform:rotateX(var(--rx,8deg)) rotateY(var(--ry,-10deg)) rotateZ(var(--rz,-1deg)) scale(var(--s,1));
    transform-style:preserve-3d;
    will-change:transform;
  }
  .biz3d .col.front .card{--rx:8deg;--ry:-10deg;--rz:-1deg}
  .biz3d .col.back .card{--rx:8deg;--ry:10deg;--rz:1deg}

  .biz3d /* edge highlight */
  .card::before{
    content:"";position:absolute;inset:0;border-radius:22px;pointer-events:none;
    background:
      linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,0) 22%),
      linear-gradient(0deg, rgba(0,0,0,.35), transparent 30%);
    mix-blend-mode:screen;
  }
  .biz3d /* hairline border */
  .card::after{
    content:"";position:absolute;inset:0;border-radius:22px;pointer-events:none;
    border:1px solid rgba(255,255,255,.07);
    box-shadow:0 0 0 1px rgba(0,0,0,.4) inset;
  }

  .biz3d /* grid overlay */
  .grid-overlay{
    position:absolute;inset:0;border-radius:22px;pointer-events:none;
    background-image:
      linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
    background-size:32px 32px;
    mask-image:radial-gradient(80% 80% at 60% 40%, #000 30%, transparent 80%);
  }

  .biz3d /* glow blobs */
  .blob{position:absolute;border-radius:50%;filter:blur(40px);opacity:.55;pointer-events:none}
  .biz3d .blob.b1{width:240px;height:240px;left:-60px;top:-80px;background:radial-gradient(circle, #3b82ff, transparent 60%)}
  .biz3d .blob.b2{width:260px;height:260px;right:-80px;bottom:-90px;background:radial-gradient(circle, #8b5cf6, transparent 60%)}
  .biz3d .blob.b3{width:160px;height:160px;right:30%;top:40%;background:radial-gradient(circle, #22e6ff, transparent 60%);opacity:.35}

  .biz3d /* circuit pattern */
  .circuit{position:absolute;inset:0;pointer-events:none;opacity:.5}
  .biz3d .circuit path,.biz3d .circuit line{stroke:rgba(255,255,255,.18);stroke-width:1;fill:none}
  .biz3d .circuit .glow{stroke:url(#bc-wire);stroke-width:1.2;filter:drop-shadow(0 0 4px rgba(34,230,255,.6))}
  .biz3d .circuit circle.node{fill:#0a0b10;stroke:rgba(34,230,255,.7);stroke-width:1}
  .biz3d .circuit circle.dot{fill:#22e6ff;filter:drop-shadow(0 0 4px #22e6ff)}

  .biz3d /* ───── 3D SYSTEM ───── */
  .card-float{transform-style:preserve-3d;animation:bc-floaty 7s ease-in-out infinite}
  .biz3d .col.back .card-float{animation-delay:-3.5s}
  @keyframes bc-floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @media (prefers-reduced-motion: reduce){.biz3d .card-float{animation:none}}

  .biz3d .card-bg{position:absolute;inset:0;border-radius:22px;overflow:hidden;transform:translateZ(1px)}

  .biz3d .glare{position:absolute;inset:0;border-radius:22px;pointer-events:none;z-index:9;
    background:radial-gradient(420px 300px at var(--gx,30%) var(--gy,20%), rgba(255,255,255,.18), rgba(255,255,255,.05) 35%, transparent 62%);
    mix-blend-mode:screen;opacity:var(--go,.45)}

  .biz3d .front-content,.biz3d .back-content,.biz3d .front-top,.biz3d .id-block,.biz3d .front-bottom,.biz3d .back-body,.biz3d .contact{transform-style:preserve-3d}
  .biz3d .monogram{transform:translateZ(46px)}
  .biz3d .status{transform:translateZ(36px)}
  .biz3d .name{transform:translateZ(60px)}
  .biz3d .role{transform:translateZ(40px)}
  .biz3d .site{transform:translateZ(30px)}
  .biz3d .signal{transform:translateZ(26px)}
  .biz3d .back-top{transform:translateZ(34px)}
  .biz3d .divider{transform:translateZ(20px)}
  .biz3d .contact .row{transform:translateZ(34px)}
  .biz3d .qr-wrap{transform:translateZ(54px)}
  .biz3d .back-foot{transform:translateZ(24px)}
  .biz3d .bracket{transform:translateZ(14px)}

  .biz3d /* ───── FRONT ───── */
  .front-content{
    position:absolute;inset:0;padding:34px 36px 30px;display:flex;flex-direction:column;justify-content:space-between;
  }
  .biz3d .front-top{display:flex;justify-content:space-between;align-items:flex-start}
  .biz3d .mono{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-dim)}
  .biz3d .mono .accent{color:var(--cyan)}
  .biz3d .status{display:inline-flex;align-items:center;gap:8px;padding:6px 10px;border-radius:999px;
    background:rgba(255,255,255,.04);border:1px solid var(--line);
    font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-dim)}
  .biz3d .status .pulse{width:6px;height:6px;border-radius:50%;background:#22e6ff;box-shadow:0 0 0 0 rgba(34,230,255,.6);animation:bc-pulse 1.6s infinite}
  @keyframes bc-pulse{0%{box-shadow:0 0 0 0 rgba(34,230,255,.5)}70%{box-shadow:0 0 0 8px rgba(34,230,255,0)}100%{box-shadow:0 0 0 0 rgba(34,230,255,0)}}

  .biz3d /* monogram */
  .monogram{
    width:54px;height:54px;border-radius:14px;position:relative;
    background:
      linear-gradient(135deg, rgba(59,130,255,.4), rgba(139,92,246,.4));
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,.25),
      inset 0 0 0 1px rgba(255,255,255,.08),
      0 8px 20px -8px rgba(59,130,255,.6),
      0 8px 20px -8px rgba(139,92,246,.6);
    display:flex;align-items:center;justify-content:center;
    font-weight:800;letter-spacing:-.02em;font-size:22px;color:#fff;
    font-family:'Inter',sans-serif;
  }
  .biz3d .monogram::after{
    content:"";position:absolute;inset:0;border-radius:14px;
    background:linear-gradient(135deg, rgba(255,255,255,.18), transparent 40%, rgba(255,255,255,.05) 60%, transparent 80%);
    mix-blend-mode:overlay;pointer-events:none;
  }

  .biz3d .name{
    font-size:52px;font-weight:700;letter-spacing:-.035em;line-height:.95;margin:0;
    background:linear-gradient(180deg,#ffffff 0%, #cdd4e5 100%);
    -webkit-background-clip:text;background-clip:text;color:transparent;
  }
  .biz3d .role{
    margin-top:2px;font-size:13px;letter-spacing:.02em;color:var(--ink-dim);font-weight:400;
  }
  .biz3d .role b{color:#eef2fb;font-weight:500;letter-spacing:-.005em}

  .biz3d .front-bottom{display:flex;justify-content:space-between;align-items:flex-end}
  .biz3d .signal{display:flex;align-items:flex-end;gap:3px;height:18px}
  .biz3d .signal span{width:3px;background:linear-gradient(180deg,#22e6ff,#3b82ff);border-radius:2px;box-shadow:0 0 6px rgba(34,230,255,.5)}
  .biz3d .signal span:nth-child(1){height:30%}
  .biz3d .signal span:nth-child(2){height:55%}
  .biz3d .signal span:nth-child(3){height:80%}
  .biz3d .signal span:nth-child(4){height:100%}

  .biz3d .id-block{display:flex;flex-direction:column;gap:14px}
  .biz3d .bc-eyebrow{
    font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.28em;
    text-transform:uppercase;color:var(--ink-dim);
    display:inline-flex;align-items:center;gap:8px;
  }
  .biz3d .bc-eyebrow::before{
    content:"";width:18px;height:1px;background:linear-gradient(90deg,var(--cyan),transparent);
  }

  .biz3d .site{
    display:inline-flex;align-items:center;gap:10px;
    font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.06em;
    color:#e8ecf5;font-weight:400;
  }
  .biz3d .site .site-mark{
    display:inline-flex;align-items:center;justify-content:center;
    width:22px;height:22px;border-radius:7px;
    background:linear-gradient(160deg,rgba(59,130,255,.25),rgba(139,92,246,.25));
    border:1px solid rgba(255,255,255,.12);
    color:#fff;font-size:11px;
    box-shadow:0 0 12px -2px rgba(59,130,255,.5);
  }

  .biz3d /* gradient stroke for SVG */
  .defs{position:absolute;width:0;height:0;overflow:hidden}

  .biz3d /* ───── BACK ───── */
  .back-content{position:absolute;inset:0;padding:30px 34px;display:flex;flex-direction:column;gap:18px}
  .biz3d .back-top{display:flex;justify-content:space-between;align-items:center}
  .biz3d .back-title{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--ink-dim);font-family:'JetBrains Mono',monospace}
  .biz3d .back-title .slash{color:var(--cyan);margin:0 6px}
  .biz3d .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);position:relative}
  .biz3d .divider::after{content:"";position:absolute;left:30%;top:-1px;width:30%;height:3px;background:linear-gradient(90deg,transparent,rgba(34,230,255,.6),transparent);filter:blur(2px)}

  .biz3d .back-body{display:grid;grid-template-columns:1fr 110px;gap:24px;flex:1}
  .biz3d .contact{display:flex;flex-direction:column;gap:14px;justify-content:center}
  .biz3d .row{display:flex;align-items:center;gap:14px}
  .biz3d .ico{
    width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;
    background:linear-gradient(160deg,rgba(255,255,255,.06),rgba(255,255,255,.02));
    border:1px solid var(--line-2);
    box-shadow:inset 0 1px 0 rgba(255,255,255,.06);
    flex:none;
  }
  .biz3d .ico svg{width:16px;height:16px;color:#cfd6e6}
  .biz3d .row .meta-label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:#6c7585;margin-bottom:2px;display:block}
  .biz3d .row .val{font-size:13.5px;color:#e8ecf5;letter-spacing:-.005em;font-weight:500}
  .biz3d .row .val.mono-val{font-family:'JetBrains Mono',monospace;font-size:12.5px;font-weight:400}

  .biz3d /* QR */
  .qr-wrap{
    width:110px;display:flex;flex-direction:column;align-items:center;gap:8px;align-self:center;
  }
  .biz3d .qr{
    width:110px;height:110px;border-radius:12px;padding:8px;
    background:linear-gradient(160deg,#f7f9ff,#dfe5f2);
    box-shadow:0 0 0 1px rgba(255,255,255,.1), 0 10px 24px -8px rgba(0,0,0,.6), 0 0 30px -4px rgba(59,130,255,.35);
    position:relative;
  }
  .biz3d .qr svg{width:100%;height:100%;display:block}
  .biz3d .qr::after{content:"";position:absolute;inset:0;border-radius:12px;background:linear-gradient(135deg,rgba(255,255,255,.5),transparent 40%);mix-blend-mode:overlay;pointer-events:none}
  .biz3d .qr-cap{font-family:'JetBrains Mono',monospace;font-size:8.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--ink-dim);text-align:center;line-height:1.4}
  .biz3d .qr-cap b{color:#e8ecf5;font-weight:500}

  .biz3d .back-foot{display:flex;justify-content:space-between;align-items:center;margin-top:auto}
  .biz3d .seal{width:26px;height:26px;opacity:.9;filter:drop-shadow(0 0 4px rgba(59,130,255,.4))}
  .biz3d .sig{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:#6c7585}
  .biz3d .sig .accent{color:var(--cyan)}

  .biz3d /* holo strip back */
  .holo{
    position:absolute;left:0;right:0;bottom:0;height:6px;
    background:linear-gradient(90deg,#22e6ff,#3b82ff 30%,#8b5cf6 60%,#d946ef 80%,#22e6ff);
    filter:blur(.4px);opacity:.85;
  }
  .biz3d .holo::after{
    content:"";position:absolute;inset:-12px 0;
    background:linear-gradient(90deg,#22e6ff,#3b82ff,#8b5cf6,#d946ef,#22e6ff);
    filter:blur(14px);opacity:.45;
  }

  .biz3d /* corner brackets */
  .bracket{position:absolute;width:14px;height:14px;border:1px solid rgba(255,255,255,.25)}
  .biz3d .bracket.tl{top:12px;left:12px;border-right:none;border-bottom:none}
  .biz3d .bracket.tr{top:12px;right:12px;border-left:none;border-bottom:none}
  .biz3d .bracket.bl{bottom:12px;left:12px;border-right:none;border-top:none}
  .biz3d .bracket.br{bottom:12px;right:12px;border-left:none;border-top:none}

  .biz3d /* footer caption */
  
  
  

  @media (max-width: 1000px){
    .stage{grid-template-columns:1fr;gap:80px}
    .biz3d{--card-w:480px;--card-h:292px}
  }
  @media (max-width: 560px){
    .biz3d{--card-w:340px;--card-h:208px}
    .biz3d .name{font-size:32px}
    .biz3d .monogram{width:44px;height:44px;font-size:18px;border-radius:12px}
    .biz3d .front-content,.biz3d .back-content{padding:22px}
    .biz3d .qr{width:84px;height:84px}
    .biz3d .qr-wrap{width:84px}
  }

.biz3d{padding:96px 0 64px}
.biz3d .stage{padding-top:16px}
`;

const MARKUP = `
<svg class="defs" aria-hidden="true">
  <defs>
    <linearGradient id="bc-wire" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#22e6ff"/>
      <stop offset="50%" stop-color="#3b82ff"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
    <linearGradient id="bc-holo" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#22e6ff"/>
      <stop offset="40%" stop-color="#3b82ff"/>
      <stop offset="70%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#d946ef"/>
    </linearGradient>
  </defs>
</svg>
<section class="stage">

  <!-- ════════════════ FRONT ════════════════ -->
  <div class="col front">
    <span class="label">◇ FRONT</span>

    <div class="card-float">
    <article class="card" aria-label="Business card front">
      <div class="card-bg">
      <div class="blob b1"></div>
      <div class="blob b2"></div>
      <div class="blob b3"></div>
      <div class="grid-overlay"></div>

      <!-- circuit pattern -->
      <svg class="circuit" viewBox="0 0 560 340" preserveAspectRatio="none" aria-hidden="true">
        <g>
          <path class="glow" d="M0,240 L120,240 L150,210 L260,210 L290,180 L400,180 L430,210 L560,210"/>
          <path d="M0,270 L80,270 L100,250 L200,250"/>
          <path d="M340,90 L400,90 L420,110 L520,110 L540,90 L560,90"/>
          <path d="M30,30 L60,30 L80,50 L80,130"/>
          <line x1="80" y1="130" x2="160" y2="130"/>
          <line x1="160" y1="130" x2="200" y2="170"/>
          <circle class="node" cx="120" cy="240" r="3"/>
          <circle class="node" cx="290" cy="180" r="3"/>
          <circle class="node" cx="430" cy="210" r="3"/>
          <circle class="dot" cx="80" cy="130" r="2"/>
          <circle class="dot" cx="540" cy="90" r="2"/>
          <circle class="node" cx="200" cy="250" r="3"/>
        </g>
      </svg>
      </div>

      <div class="bracket tl"></div>
      <div class="bracket tr"></div>
      <div class="bracket bl"></div>
      <div class="bracket br"></div>

      <div class="front-content">
        <div class="front-top">
          <div class="monogram" aria-label="KJ monogram">KJ</div>
          <div class="status"><span class="pulse"></span>Available · Remote</div>
        </div>

        <div class="id-block">
          <h1 class="name">Kunal Jain</h1>
          <div class="role"><b>Full Stack Developer</b></div>
        </div>

        <div class="front-bottom">
          <div class="site"><span class="site-mark">→</span> www.kjcreator.com</div>
          <div class="signal" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
        </div>
      </div>
      <div class="glare"></div>
    </article>
    </div>
  </div>

  <!-- ════════════════ BACK ════════════════ -->
  <div class="col back">
    <span class="label">◇ BACK</span>

    <div class="card-float">
    <article class="card" aria-label="Business card back">
      <div class="card-bg">
      <div class="blob b1" style="background:radial-gradient(circle,#8b5cf6,transparent 60%);left:auto;right:-60px;top:-80px;opacity:.4"></div>
      <div class="blob b2" style="background:radial-gradient(circle,#3b82ff,transparent 60%);left:-80px;right:auto;bottom:-90px;opacity:.45"></div>
      <div class="grid-overlay"></div>

      <svg class="circuit" viewBox="0 0 560 340" preserveAspectRatio="none" aria-hidden="true">
        <g>
          <path class="glow" d="M0,40 L120,40 L150,70 L420,70"/>
          <path d="M0,300 L200,300 L230,270 L340,270"/>
          <line x1="500" y1="40" x2="540" y2="40"/>
          <circle class="dot" cx="540" cy="40" r="2"/>
          <circle class="node" cx="150" cy="70" r="3"/>
          <circle class="node" cx="230" cy="270" r="3"/>
        </g>
      </svg>
      </div>

      <div class="bracket tl"></div>
      <div class="bracket tr"></div>
      <div class="bracket bl"></div>
      <div class="bracket br"></div>

      <div class="back-content">
        <div class="back-top">
          <div class="back-title">Contact <span class="slash">//</span> kj.studio</div>
          <div class="monogram" style="width:34px;height:34px;font-size:13px;border-radius:10px">KJ</div>
        </div>

        <div class="divider"></div>

        <div class="back-body">
          <div class="contact">
            <div class="row">
              <div class="ico" aria-hidden="true">
                <!-- phone -->
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <span class="meta-label">Phone</span>
                <div class="val mono-val">+91 63536 33045</div>
              </div>
            </div>

            <div class="row">
              <div class="ico" aria-hidden="true">
                <!-- mail -->
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6 9 7 9-7"/></svg>
              </div>
              <div>
                <span class="meta-label">Email</span>
                <div class="val mono-val">Kunalsethia73800@gmail.com</div>
              </div>
            </div>

            <div class="row">
              <div class="ico" aria-hidden="true">
                <!-- globe / website -->
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></svg>
              </div>
              <div>
                <span class="meta-label">Website</span>
                <div class="val mono-val">www.kjcreator.com</div>
              </div>
            </div>

            <div class="row">
              <div class="ico" aria-hidden="true">
                <!-- linkedin -->
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
              </div>
              <div>
                <span class="meta-label">LinkedIn</span>
                <div class="val mono-val">linkedin.com/in/kunaljain</div>
              </div>
            </div>
          </div>

          <div class="qr-wrap">
            <div class="qr" aria-label="QR code placeholder">
              <!-- generated dot-grid QR placeholder -->
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <rect width="100" height="100" fill="none"/>
                <!-- finder patterns -->
                <g fill="#0a0b10">
                  <rect x="6" y="6" width="22" height="22" rx="3"/>
                  <rect x="72" y="6" width="22" height="22" rx="3"/>
                  <rect x="6" y="72" width="22" height="22" rx="3"/>
                </g>
                <g fill="#f7f9ff">
                  <rect x="10" y="10" width="14" height="14" rx="1.5"/>
                  <rect x="76" y="10" width="14" height="14" rx="1.5"/>
                  <rect x="10" y="76" width="14" height="14" rx="1.5"/>
                </g>
                <g fill="#0a0b10">
                  <rect x="14" y="14" width="6" height="6" rx=".5"/>
                  <rect x="80" y="14" width="6" height="6" rx=".5"/>
                  <rect x="14" y="80" width="6" height="6" rx=".5"/>
                </g>
                <!-- random-ish data modules -->
                <g fill="#0a0b10" id="bc-qr-data"></g>
              </svg>
            </div>
            <div class="qr-cap">Scan for<br/><b>Portfolio</b></div>
          </div>
        </div>

        <div class="back-foot">
          <div class="sig"><span class="accent">●</span> Kunal Jain Studio</div>
          <svg class="seal" viewBox="0 0 40 40" aria-hidden="true">
            <circle cx="20" cy="20" r="18" fill="none" stroke="url(#bc-wire)" stroke-width="1" opacity="0.55"/>
            <circle cx="20" cy="20" r="12.5" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="0.6"/>
            <path d="M20 8 L20 32 M8 20 L32 20" stroke="rgba(255,255,255,.12)" stroke-width="0.6"/>
            <text x="20" y="24" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="700" fill="url(#bc-wire)">KJ</text>
          </svg>
        </div>
      </div>

      <div class="holo"></div>
      <div class="glare"></div>
    </article>
    </div>
  </div>
</section>
`;

export default function BusinessCard() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // ── decorative QR dot grid ──
    const g = root.querySelector("#bc-qr-data");
    if (g && !g.childElementCount) {
      let s = 1337;
      const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
      const cell = 100 / 25, ox = 2, oy = 2;
      for (let y = 0; y < 21; y++) {
        for (let x = 0; x < 21; x++) {
          if ((x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)) continue;
          if (rnd() < 0.48) {
            const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            r.setAttribute("x", ox + x * cell);
            r.setAttribute("y", oy + y * cell);
            r.setAttribute("width", cell * 0.85);
            r.setAttribute("height", cell * 0.85);
            r.setAttribute("rx", 0.4);
            g.appendChild(r);
          }
        }
      }
    }

    // ── 3D tilt engine ──
    const cards = root.querySelectorAll(".card");
    const supportsHover = window.matchMedia("(hover: hover)").matches;
    const cleanups = [];

    cards.forEach((card) => {
      const col = card.closest(".col");
      const isBack = col.classList.contains("back");
      const rest = { rx: 8, ry: isBack ? 10 : -10, rz: isBack ? 1 : -1 };
      const cur = { rx: rest.rx, ry: rest.ry, rz: rest.rz, gx: 30, gy: 20, go: 0.45, s: 1 };
      const tgt = { ...cur };
      let raf = null;

      const tick = () => {
        const k = 0.12;
        let done = true;
        for (const p in tgt) {
          cur[p] += (tgt[p] - cur[p]) * k;
          if (Math.abs(tgt[p] - cur[p]) > 0.015) done = false;
        }
        card.style.setProperty("--rx", cur.rx.toFixed(2) + "deg");
        card.style.setProperty("--ry", cur.ry.toFixed(2) + "deg");
        card.style.setProperty("--rz", cur.rz.toFixed(2) + "deg");
        card.style.setProperty("--gx", cur.gx.toFixed(1) + "%");
        card.style.setProperty("--gy", cur.gy.toFixed(1) + "%");
        card.style.setProperty("--go", cur.go.toFixed(2));
        card.style.setProperty("--s", cur.s.toFixed(3));
        raf = done ? null : requestAnimationFrame(tick);
      };
      const ensure = () => { if (!raf) raf = requestAnimationFrame(tick); };

      if (supportsHover) {
        const move = (e) => {
          const r = card.getBoundingClientRect();
          let px = (e.clientX - r.left) / r.width;
          let py = (e.clientY - r.top) / r.height;
          px = Math.max(-0.15, Math.min(1.15, px));
          py = Math.max(-0.15, Math.min(1.15, py));
          tgt.ry = (px - 0.5) * 26;
          tgt.rx = (py - 0.5) * -22;
          tgt.rz = 0;
          tgt.gx = px * 100;
          tgt.gy = py * 100;
          tgt.go = 0.8;
          ensure();
        };
        const leave = () => {
          Object.assign(tgt, { rx: rest.rx, ry: rest.ry, rz: rest.rz, gx: 30, gy: 20, go: 0.45, s: 1 });
          ensure();
        };
        const down = () => { tgt.s = 0.97; ensure(); };
        const up = () => { tgt.s = 1; ensure(); };
        col.addEventListener("pointermove", move);
        col.addEventListener("pointerleave", leave);
        card.addEventListener("pointerdown", down);
        window.addEventListener("pointerup", up);
        cleanups.push(() => {
          col.removeEventListener("pointermove", move);
          col.removeEventListener("pointerleave", leave);
          card.removeEventListener("pointerdown", down);
          window.removeEventListener("pointerup", up);
          if (raf) cancelAnimationFrame(raf);
        });
      } else {
        card._gyro = (rx, ry) => {
          Object.assign(tgt, { rx, ry, rz: 0, gx: 50 + ry * 2.2, gy: 50 + rx * -2.2, go: 0.65 });
          ensure();
        };
        cleanups.push(() => { if (raf) cancelAnimationFrame(raf); });
      }
    });

    if (!supportsHover && window.DeviceOrientationEvent) {
      const onOrient = (e) => {
        if (e.beta === null || e.gamma === null) return;
        const rx = Math.max(-18, Math.min(18, (e.beta - 45) * -0.5));
        const ry = Math.max(-18, Math.min(18, e.gamma * 0.6));
        cards.forEach((c) => { if (c._gyro) c._gyro(rx, ry); });
      };
      const attach = () => window.addEventListener("deviceorientation", onOrient);
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        const once = () => {
          DeviceOrientationEvent.requestPermission().then((s) => { if (s === "granted") attach(); });
          document.body.removeEventListener("click", once);
        };
        document.body.addEventListener("click", once);
      } else attach();
      cleanups.push(() => window.removeEventListener("deviceorientation", onOrient));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section id="card" className="biz3d border-t border-[var(--rule)] relative z-10" data-testid="business-card-section">
      <style>{CSS}</style>
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="section-mark mb-4 reveal">The card</div>
        <h2 className="font-tight text-[32px] sm:text-[48px] leading-[1.04] text-[var(--ink)] max-w-[16ch] reveal">
          Take one with you.
        </h2>
        <div className="reveal" dangerouslySetInnerHTML={{ __html: MARKUP }} />
      </div>
    </section>
  );
}
