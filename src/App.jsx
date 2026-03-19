import { useState, useEffect, useRef } from "react";

const LOGO_SRC = "data:image/png;base64,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";

const C = {
  bg: "#070707",
  card: "rgba(255,255,255,0.045)",
  cardHov: "rgba(255,255,255,0.08)",
  border: "rgba(255,255,255,0.09)",
  accent: "#FF5A1F",
  accentBg: "rgba(255,90,31,0.14)",
  accentBorder: "rgba(255,90,31,0.35)",
  text: "#EDEAE5",
  muted: "rgba(237,234,229,0.5)",
  dim: "rgba(237,234,229,0.22)",
  green: "#22C55E",
  purple: "#8B5CF6",
  teal: "#14B8A6",
};

const STARTUPS = [
  { id:1, name:"NovaSpark AI",  tagline:"AI-powered climate intelligence",       stage:"Seed",     tags:["AI/ML","CleanTech"],      logo:"NS", color:"#FF5A1F", members:4,  openRoles:3,
    desc:"Building the intelligence layer for climate action using satellite data and IoT sensors." },
  { id:2, name:"Quillt",        tagline:"Knowledge graphs for enterprise teams",  stage:"Pre-Seed", tags:["B2B SaaS","Productivity"], logo:"QL", color:"#8B5CF6", members:2,  openRoles:5,
    desc:"Making institutional knowledge searchable with AI-powered knowledge graphs." },
  { id:3, name:"Driftless",     tagline:"Peer-to-peer micro-lending platform",    stage:"Series A", tags:["FinTech","Web3"],          logo:"DR", color:"#14B8A6", members:9,  openRoles:2,
    desc:"Decentralized credit for the underbanked — your on-chain history is your credit score." },
  { id:4, name:"Helix Health",  tagline:"Personalized genomic wellness stack",    stage:"Seed",     tags:["HealthTech","Biotech"],    logo:"HH", color:"#22C55E", members:6,  openRoles:4,
    desc:"Your genome, your wellness plan. Personalized protocols updated in real time." },
  { id:5, name:"Luminary",      tagline:"Creator monetization infrastructure",    stage:"Pre-Seed", tags:["Creator Economy"],        logo:"LM", color:"#F59E0B", members:3,  openRoles:6,
    desc:"The financial stack for independent creators — subscriptions, tipping and payouts." },
  { id:6, name:"Orbis",         tagline:"Spatial computing for retail",           stage:"Seed",     tags:["AR/VR","RetailTech"],      logo:"OR", color:"#EC4899", members:5,  openRoles:3,
    desc:"Reimagining physical retail with AR previews and personalised recommendations." },
];

const JOBS = [
  { id:1, startup:"NovaSpark AI", title:"ML Engineer",        skills:["PyTorch","Python","AWS"],       type:"Full-time", equity:"0.5–1.5%", paid:true,  posted:"2d ago", color:"#FF5A1F" },
  { id:2, startup:"Quillt",       title:"Product Designer",   skills:["Figma","UX Research"],          type:"Part-time", equity:"0.25–0.75%",paid:false, posted:"4d ago", color:"#8B5CF6" },
  { id:3, startup:"Driftless",    title:"Smart Contract Dev", skills:["Solidity","Rust","Web3.js"],    type:"Contract",  equity:"1–2%",      paid:true,  posted:"1d ago", color:"#14B8A6" },
  { id:4, startup:"Helix Health", title:"Bioinformatics Eng", skills:["R","Bioconductor"],             type:"Full-time", equity:"0.5–1%",    paid:true,  posted:"6d ago", color:"#22C55E" },
  { id:5, startup:"Luminary",     title:"Backend Engineer",   skills:["Node.js","PostgreSQL"],         type:"Full-time", equity:"0.75–2%",   paid:true,  posted:"3d ago", color:"#F59E0B" },
  { id:6, startup:"Orbis",        title:"Unity Developer",    skills:["Unity","C#","ARKit"],           type:"Part-time", equity:"0.5–1.5%",  paid:false, posted:"5d ago", color:"#EC4899" },
];

const ROLES = {
  1:[{t:"ML Engineer",type:"Full-time",eq:"0.5–1.5%"},{t:"Data Scientist",type:"Full-time",eq:"0.3–1%"},{t:"DevOps Eng",type:"Contract",eq:"0.2–0.8%"}],
  2:[{t:"Product Designer",type:"Part-time",eq:"0.25–1%"},{t:"Frontend Dev",type:"Full-time",eq:"0.5–1.5%"},{t:"Growth Lead",type:"Full-time",eq:"0.5–2%"},{t:"Backend Dev",type:"Full-time",eq:"0.75–2%"},{t:"ML Engineer",type:"Part-time",eq:"0.25–0.75%"}],
  3:[{t:"Smart Contract Dev",type:"Contract",eq:"1–2%"},{t:"Backend Eng",type:"Full-time",eq:"0.5–1.5%"}],
  4:[{t:"Bioinformatics Eng",type:"Full-time",eq:"0.5–1%"},{t:"iOS Developer",type:"Full-time",eq:"0.5–1.5%"},{t:"Data Engineer",type:"Contract",eq:"0.25–0.75%"},{t:"UX Researcher",type:"Part-time",eq:"0.25–0.5%"}],
  5:[{t:"Backend Eng",type:"Full-time",eq:"0.75–2%"},{t:"Mobile Dev",type:"Full-time",eq:"0.5–1.5%"},{t:"Product Manager",type:"Full-time",eq:"1–2.5%"},{t:"Growth Hacker",type:"Contract",eq:"0.5–1%"},{t:"Brand Designer",type:"Part-time",eq:"0.25–0.75%"},{t:"DevRel Eng",type:"Full-time",eq:"0.5–1.5%"}],
  6:[{t:"Unity Developer",type:"Part-time",eq:"0.5–1.5%"},{t:"3D Artist",type:"Contract",eq:"0.25–0.75%"},{t:"AR SDK Eng",type:"Full-time",eq:"0.75–2%"}],
};

/* ── tiny helpers ── */
const s_ = (base, hov, isHov) => ({ ...base, ...(isHov ? hov : {}) });

const Tag = ({ ch, bg = C.accentBg, color = C.accent }) => (
  <span style={{ background: bg, color, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap", fontFamily: "Outfit, sans-serif" }}>{ch}</span>
);

function Btn({ children, onClick, variant = "primary", size = "md", full, style: sx }) {
  const [h, setH] = useState(false);
  const pad = { sm: "7px 15px", md: "10px 22px", lg: "13px 30px" }[size];
  const fs = { sm: 12, md: 13, lg: 14 }[size];
  const base = {
    primary: { background: h ? "#ff7043" : C.accent, color: "#fff", border: "none" },
    ghost:   { background: h ? "rgba(255,255,255,0.07)" : "transparent", color: C.text, border: `0.5px solid ${C.border}` },
    outline: { background: h ? C.accentBg : "transparent", color: C.accent, border: `1px solid ${C.accentBorder}` },
  }[variant];
  return (
    <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={onClick}
      style={{ ...base, padding: pad, fontSize: fs, borderRadius: 10, fontFamily: "Outfit, sans-serif", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7, letterSpacing: 0.2, transition: "all .15s", width: full ? "100%" : "auto", justifyContent: full ? "center" : "flex-start", ...sx }}>
      {children}
    </button>
  );
}

/* ── Logo ── */
const Logo = ({ h = 32 }) => (
  <img src={LOGO_SRC} alt="CoBuild Solutions" style={{ height: h, width: "auto", filter: "invert(1)", display: "block", objectFit: "contain" }} />
);

/* ══════════════════════════════
   AUTH MODAL
══════════════════════════════ */
function AuthModal({ onClose, onAuth }) {
  const [mode, setMode] = useState("signin");
  const [role, setRole] = useState("Contributor");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const inp = { width: "100%", background: "rgba(255,255,255,0.05)", border: `0.5px solid ${C.border}`, borderRadius: 10, padding: "11px 14px", color: C.text, fontSize: 14, outline: "none", fontFamily: "Plus Jakarta Sans, sans-serif" };

  const submit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    onAuth({ email, full_name: name || email.split("@")[0], role });
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: "#111", border: `0.5px solid ${C.border}`, borderRadius: 18, width: "100%", maxWidth: 420, padding: 36, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>

        <div style={{ marginBottom: 24 }}><Logo h={28} /></div>

        {/* Tab toggle */}
        <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 4, marginBottom: 22 }}>
          {["signin", "signup"].map(m => (
            <button key={m} onClick={() => setMode(m)}
              style={{ flex: 1, padding: "8px 0", background: mode === m ? C.accent : "transparent", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 12, color: mode === m ? "#fff" : C.muted, transition: "all .2s" }}>
              {m === "signin" ? "Sign In" : "Join Network"}
            </button>
          ))}
        </div>

        {mode === "signup" && (
          <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 11, color: C.muted, marginBottom: 9, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>I'm joining as</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
              {[{ r: "Startup_Admin", label: "Startup Admin", sub: "Post opportunities" },
                { r: "Contributor", label: "Contributor", sub: "Join a team" }].map(({ r, label, sub }) => (
                <button key={r} onClick={() => setRole(r)}
                  style={{ padding: "12px", background: role === r ? C.accentBg : "rgba(255,255,255,0.03)", border: `1px solid ${role === r ? C.accent : C.border}`, borderRadius: 10, cursor: "pointer", textAlign: "left", transition: "all .2s" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: role === r ? C.text : C.muted, fontFamily: "Outfit, sans-serif", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 10, color: C.dim }}>{sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {mode === "signup" && <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} style={inp} />}
          <input placeholder="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} style={inp} />
          <div style={{ position: "relative" }}>
            <input placeholder="Password" type={showPw ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)} style={{ ...inp, paddingRight: 42 }} />
            <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 12 }}>
              {showPw ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>

        <Btn full onClick={submit} style={{ marginTop: 18 }}>
          {loading ? "Please wait…" : mode === "signup" ? "Create Account →" : "Sign In →"}
        </Btn>
        <p style={{ textAlign: "center", fontSize: 10, color: C.dim, marginTop: 14 }}>By continuing you agree to our Terms & Privacy Policy</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   HERO
══════════════════════════════ */
const WORDS = ["Build.", "Launch.", "Scale.", "Connect."];

function Hero({ onOpen }) {
  const [wi, setWi] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setWi(i => (i + 1) % WORDS.length); setFade(true); }, 300);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "90px 24px 80px", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #0a0300 0%, #070707 50%, #070707 100%)" }}>

      {/* Grid lines */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: "64px 64px", pointerEvents: "none" }} />

      {/* Orange glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 700, height: 400, background: "radial-gradient(ellipse, rgba(255,90,31,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Rings */}
      {[500, 720].map(s => (
        <div key={s} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: s, height: s, borderRadius: "50%", border: `1px solid rgba(255,90,31,${s === 500 ? 0.08 : 0.04})`, pointerEvents: "none" }} />
      ))}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 900, width: "100%" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: C.accentBg, border: `0.5px solid ${C.accentBorder}`, borderRadius: 20, padding: "5px 14px", marginBottom: 36 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, display: "inline-block" }} />
          <span style={{ fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: 0.8, fontFamily: "Outfit, sans-serif" }}>THE STARTUP CO-BUILDER NETWORK</span>
        </div>

        <h1 style={{ fontSize: "clamp(2.6rem,7vw,5.8rem)", fontWeight: 800, lineHeight: 1.07, letterSpacing: -2, marginBottom: 0, fontFamily: "Outfit, sans-serif" }}>
          Find your team.<br />
          <span style={{ color: C.accent, transition: "opacity .3s", opacity: fade ? 1 : 0, display: "inline-block" }}>{WORDS[wi]}</span>
          <span style={{ color: C.muted }}> Together.</span>
        </h1>

        <p style={{ fontSize: "clamp(0.95rem,2.2vw,1.12rem)", color: C.muted, maxWidth: 520, margin: "24px auto 38px", lineHeight: 1.8, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
          CoBuild connects visionary founders with world-class talent. Launch your startup, post opportunities, and build the next generation of breakout companies — together.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <Btn size="lg" onClick={onOpen}>🚀 Start Building</Btn>
          <Btn size="lg" variant="ghost" onClick={onOpen}>Explore Startups →</Btn>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 0, marginTop: 72, background: "rgba(255,255,255,0.06)", border: `0.5px solid rgba(255,255,255,0.1)`, borderRadius: 16, padding: "20px 8px", maxWidth: 520, margin: "68px auto 0", flexWrap: "wrap" }}>
          {[["1,200+", "Startups"], ["8,400+", "Contributors"], ["3,100+", "Placements"], ["$94M", "Raised"]].map(([n, l], i, arr) => (
            <div key={l} style={{ textAlign: "center", flex: 1, minWidth: 100, padding: "0 12px", borderRight: i < arr.length - 1 ? `0.5px solid rgba(255,255,255,0.1)` : "none" }}>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "Outfit, sans-serif" }}>{n}</div>
              <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 3, fontFamily: "Outfit, sans-serif" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.45 }}>
        <span style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: C.muted, fontFamily: "Outfit, sans-serif" }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)" }} />
      </div>
    </section>
  );
}

/* ══════════════════════════════
   FEATURES
══════════════════════════════ */
function Features() {
  const items = [
    { icon: "🎯", title: "Role-Matched Discovery", desc: "Algorithms surface startups and roles aligned to your unique skills and ambitions." },
    { icon: "🛡️", title: "Verified Founders",      desc: "Every Startup Admin is identity-verified so you know exactly who you're building with." },
    { icon: "📈", title: "Equity Transparency",    desc: "All listings include equity ranges upfront — no surprises after the first meeting." },
    { icon: "🌍", title: "Global Network",          desc: "Connect with founders and talent across 80+ countries in every vertical." },
  ];
  return (
    <section style={{ padding: "72px 24px", maxWidth: 1080, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <Tag ch="Platform Features" />
        <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 700, marginTop: 14, letterSpacing: -1, fontFamily: "Outfit, sans-serif" }}>Everything you need to co-build</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
        {items.map((item, i) => {
          const [h, setH] = useState(false);
          return (
            <div key={i} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
              style={{ background: h ? C.cardHov : C.card, border: `0.5px solid ${h ? "rgba(255,255,255,0.15)" : C.border}`, borderRadius: 16, padding: 26, transition: "all .2s", transform: h ? "translateY(-4px)" : "none" }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{item.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 9, fontFamily: "Outfit, sans-serif" }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ══════════════════════════════
   STARTUP CARD (Interactive)
══════════════════════════════ */
function StartupCard({ s, expanded, onExpand, onJoin }) {
  const [h, setH] = useState(false);
  const [saved, setSaved] = useState(false);
  const isExp = expanded === s.id;
  const roles = (ROLES[s.id] || []).slice(0, s.openRoles);

  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ borderRadius: 16, transition: "transform .22s, box-shadow .22s", transform: h ? "translateY(-6px)" : "none", boxShadow: h ? `0 20px 48px rgba(0,0,0,0.6), 0 0 0 1px ${s.color}28` : "none" }}>

      {/* Card face */}
      <div onClick={() => onExpand(isExp ? null : s.id)}
        style={{ background: C.card, border: `0.5px solid ${isExp ? s.color + "55" : C.border}`, borderRadius: isExp ? "16px 16px 0 0" : 16, padding: 22, position: "relative", overflow: "hidden", cursor: "pointer", transition: "border .2s" }}>

        {/* Top color line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`, opacity: h ? 1 : 0.5, transition: "opacity .25s", borderRadius: "16px 16px 0 0" }} />

        {/* Hover glow */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${s.color}10 0%, transparent 60%)`, opacity: h ? 1 : 0, transition: "opacity .3s", pointerEvents: "none" }} />

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: s.color + "22", border: `1px solid ${s.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: s.color, fontFamily: "Outfit, sans-serif", transition: "all .22s", boxShadow: h ? `0 0 14px ${s.color}30` : "none" }}>
            {s.logo}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Tag ch={s.stage} bg={s.color + "18"} color={s.color} />
            <button onClick={e => { e.stopPropagation(); setSaved(!saved); }}
              style={{ background: saved ? s.color + "22" : "rgba(255,255,255,0.05)", border: `0.5px solid ${saved ? s.color + "55" : C.border}`, borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, transition: "all .2s" }}>
              {saved ? "★" : "☆"}
            </button>
          </div>
        </div>

        <h3 style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 5, fontFamily: "Outfit, sans-serif", letterSpacing: -0.3 }}>{s.name}</h3>
        <p style={{ fontSize: 12.5, color: C.muted, marginBottom: 12, lineHeight: 1.6, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{s.tagline}</p>

        {/* Desc */}
        <p style={{ fontSize: 11.5, color: C.dim, marginBottom: 14, lineHeight: 1.6, borderLeft: `2px solid ${s.color}35`, paddingLeft: 10, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{s.desc}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
          {s.tags.map(t => <Tag key={t} ch={t} bg="rgba(255,255,255,0.05)" color={C.muted} />)}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", paddingTop: 14, borderTop: `0.5px solid ${C.border}` }}>
          <div style={{ flex: 1, fontSize: 11.5, color: C.muted, fontFamily: "Plus Jakarta Sans, sans-serif" }}>👥 {s.members} members</div>
          <div style={{ fontSize: 11.5, color: s.color, fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>💼 {s.openRoles} open roles</div>
        </div>

        {/* Expand arrow */}
        <div style={{ position: "absolute", bottom: 12, right: 14, color: isExp ? s.color : C.dim, transition: "transform .3s, color .2s", transform: isExp ? "rotate(180deg)" : "rotate(0deg)", fontSize: 12 }}>▾</div>
      </div>

      {/* Expandable drawer */}
      <div style={{ maxHeight: isExp ? 400 : 0, overflow: "hidden", transition: "max-height .38s cubic-bezier(.4,0,.2,1)", background: `linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.02) 100%)`, border: isExp ? `0.5px solid ${s.color}40` : "none", borderTop: "none", borderRadius: "0 0 16px 16px" }}>
        <div style={{ padding: "14px 18px 20px" }}>
          <p style={{ fontSize: 10.5, color: s.color, fontWeight: 700, letterSpacing: 0.7, textTransform: "uppercase", marginBottom: 12, fontFamily: "Outfit, sans-serif" }}>Open Roles at {s.name}</p>
          {roles.map((r, i) => {
            const [rh, setRh] = useState(false);
            return (
              <div key={i} onClick={onJoin} onMouseEnter={() => setRh(true)} onMouseLeave={() => setRh(false)}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: 10, marginBottom: 7, background: rh ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)", border: `0.5px solid ${C.border}`, cursor: "pointer", transition: "background .15s", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, fontFamily: "Outfit, sans-serif", marginBottom: 2 }}>{r.t}</div>
                  <div style={{ fontSize: 11, color: C.muted, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{r.type}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 12, color: s.color, fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>{r.eq}</div>
                  <div style={{ fontSize: 10, color: C.dim, marginTop: 1 }}>equity</div>
                </div>
              </div>
            );
          })}
          <button onClick={onJoin}
            style={{ width: "100%", marginTop: 8, padding: "9px 0", background: s.color + "18", border: `0.5px solid ${s.color}40`, borderRadius: 10, color: s.color, fontSize: 12.5, fontWeight: 700, fontFamily: "Outfit, sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            View Full Profile →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   JOB ROW
══════════════════════════════ */
function JobRow({ j, onJoin }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={onJoin}
      style={{ background: C.card, border: `0.5px solid ${h ? j.color + "40" : C.border}`, borderRadius: 12, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", marginBottom: 9, transform: h ? "translateX(5px)" : "none", transition: "all .18s", boxShadow: h ? `0 8px 24px rgba(0,0,0,0.3)` : "none" }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, background: j.color + "18", border: `0.5px solid ${j.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>💼</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <h4 style={{ fontSize: 13.5, fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>{j.title}</h4>
          {j.paid && <Tag ch="Paid" bg="rgba(34,197,94,0.12)" color="#22C55E" />}
        </div>
        <p style={{ fontSize: 11.5, color: C.muted, marginBottom: 6, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{j.startup}</p>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {j.skills.map(sk => <Tag key={sk} ch={sk} bg="rgba(255,255,255,0.05)" color={C.dim} />)}
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: j.color, marginBottom: 3, fontFamily: "Outfit, sans-serif" }}>{j.equity}</div>
        <div style={{ fontSize: 10.5, color: C.dim }}>{j.posted}</div>
        <div style={{ fontSize: 10.5, color: C.muted, marginTop: 1 }}>{j.type}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   SIDEBAR
══════════════════════════════ */
function Sidebar({ user, active, setActive, onSignOut }) {
  const isAdmin = user.role === "Startup_Admin";
  const items = [
    { id: "overview",  icon: "⊞",  label: "Overview" },
    { id: "startups",  icon: "🚀", label: "Startups" },
    { id: "jobs",      icon: "💼", label: "Opportunities" },
    ...(isAdmin ? [
      { id: "post",    icon: "+",  label: "Post Role" },
      { id: "launch",  icon: "⚡", label: "Launch Startup" },
    ] : []),
    { id: "settings",  icon: "⚙", label: "Settings" },
  ];
  return (
    <aside style={{ width: 210, flexShrink: 0, background: "rgba(255,255,255,0.02)", borderRight: `0.5px solid ${C.border}`, display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0, padding: "20px 12px" }}>
      <div style={{ marginBottom: 24, padding: "0 4px" }}><Logo h={26} /></div>
      {/* User pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", background: C.accentBg, borderRadius: 10, marginBottom: 20, border: `0.5px solid ${C.accentBorder}` }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
          {(user.full_name || "U")[0].toUpperCase()}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "Outfit, sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.full_name}</div>
          <div style={{ fontSize: 10, color: C.accent, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{isAdmin ? "Startup Admin" : "Contributor"}</div>
        </div>
      </div>
      <nav style={{ flex: 1 }}>
        {items.map(item => {
          const [h, setH] = useState(false);
          const isCur = active === item.id;
          return (
            <button key={item.id} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={() => setActive(item.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "9px 11px", borderRadius: 9, background: isCur ? C.accentBg : h ? "rgba(255,255,255,0.04)" : "transparent", border: `0.5px solid ${isCur ? C.accentBorder : "transparent"}`, color: isCur ? C.accent : C.muted, cursor: "pointer", marginBottom: 3, fontSize: 12.5, fontWeight: isCur ? 700 : 400, fontFamily: "Plus Jakarta Sans, sans-serif", transition: "all .15s", textAlign: "left" }}>
              <span style={{ fontSize: 14 }}>{item.icon}</span>{item.label}
            </button>
          );
        })}
      </nav>
      <button onClick={onSignOut}
        style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 11px", background: "transparent", border: `0.5px solid ${C.border}`, borderRadius: 9, color: C.muted, cursor: "pointer", fontSize: 12.5, fontFamily: "Plus Jakarta Sans, sans-serif", width: "100%" }}>
        ← Sign Out
      </button>
    </aside>
  );
}

/* ══════════════════════════════
   OVERVIEW (Dashboard home)
══════════════════════════════ */
function Overview({ user }) {
  const isAdmin = user.role === "Startup_Admin";
  const stats = isAdmin
    ? [{ l: "Total Views", v: "1,842", d: "+12%" }, { l: "Applications", v: "94", d: "+8%" }, { l: "Active Listings", v: "5", d: "" }, { l: "Saved", v: "220", d: "+3%" }]
    : [{ l: "Matches", v: "34", d: "+7" }, { l: "Applied", v: "12", d: "" }, { l: "Saved", v: "28", d: "" }, { l: "Interviews", v: "3", d: "↑" }];
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, fontFamily: "Outfit, sans-serif", marginBottom: 4 }}>Welcome back, {(user.full_name || "Builder").split(" ")[0]} 👋</h2>
      <p style={{ color: C.muted, fontSize: 13.5, marginBottom: 26, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{isAdmin ? "Here's how your startup is performing today." : "Your personalized opportunities are ready."}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 13, marginBottom: 22 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 14, padding: "17px 18px" }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 7, letterSpacing: 0.5, textTransform: "uppercase", fontWeight: 600, fontFamily: "Outfit, sans-serif" }}>{s.l}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
              <span style={{ fontSize: 24, fontWeight: 800, fontFamily: "Outfit, sans-serif" }}>{s.v}</span>
              {s.d && <span style={{ fontSize: 11, color: C.green, fontWeight: 700 }}>{s.d}</span>}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 13 }}>
        <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 14, padding: 22, gridRow: "span 2" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>Trending Startups</h3>
            <Tag ch="Hot 🔥" />
          </div>
          {STARTUPS.slice(0, 4).map((s, i) => {
            const [h, setH] = useState(false);
            return (
              <div key={s.id} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < 3 ? `0.5px solid ${C.border}` : "none", cursor: "pointer", transform: h ? "translateX(4px)" : "none", transition: "transform .15s" }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: s.color + "1f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: s.color, fontFamily: "Outfit, sans-serif", flexShrink: 0 }}>{s.logo}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: C.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "Plus Jakarta Sans, sans-serif" }}>{s.tagline}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 11, color: s.color, fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>{s.openRoles} roles</div>
                  <div style={{ fontSize: 10, color: C.dim }}>{s.stage}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ background: `linear-gradient(135deg, ${C.accentBg}, rgba(139,92,246,0.08))`, border: `0.5px solid ${C.accentBorder}`, borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 22, marginBottom: 12 }}>⚡</div>
          <h3 style={{ fontSize: 14, fontWeight: 700, fontFamily: "Outfit, sans-serif", marginBottom: 7 }}>{isAdmin ? "Post a Role" : "Quick Apply"}</h3>
          <p style={{ fontSize: 12, color: C.muted, marginBottom: 14, lineHeight: 1.6, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{isAdmin ? "Reach 8,400+ vetted contributors." : "34 open roles match your profile."}</p>
          <Btn size="sm">Get Started →</Btn>
        </div>
        <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 14, padding: 20 }}>
          <h3 style={{ fontSize: 13.5, fontWeight: 700, fontFamily: "Outfit, sans-serif", marginBottom: 12 }}>Recent Activity</h3>
          {["NovaSpark AI viewed your profile", "New match: Smart Contract Dev", "Driftless sent you a message"].map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 9, marginBottom: 9 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? C.accent : C.dim, marginTop: 4, flexShrink: 0 }} />
              <span style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.55, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   POST ROLE FORM
══════════════════════════════ */
function PostRole() {
  const [done, setDone] = useState(false);
  const [f, setF] = useState({ title: "", skills: "", equity: "", type: "Full-time", paid: false, desc: "" });
  const iS = { width: "100%", background: "rgba(255,255,255,0.05)", border: `0.5px solid ${C.border}`, borderRadius: 10, padding: "11px 13px", color: C.text, fontSize: 13.5, outline: "none", fontFamily: "Plus Jakarta Sans, sans-serif" };
  if (done) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 360, gap: 16 }}>
      <div style={{ fontSize: 56 }}>✅</div>
      <h3 style={{ fontSize: 20, fontWeight: 800, fontFamily: "Outfit, sans-serif" }}>Role Posted!</h3>
      <p style={{ color: C.muted, textAlign: "center", fontFamily: "Plus Jakarta Sans, sans-serif" }}>Your listing is live to 8,400+ contributors.</p>
      <Btn onClick={() => setDone(false)}>Post Another</Btn>
    </div>
  );
  return (
    <div style={{ maxWidth: 580 }}>
      <h2 style={{ fontSize: 21, fontWeight: 800, fontFamily: "Outfit, sans-serif", marginBottom: 5 }}>Post an Opportunity</h2>
      <p style={{ color: C.muted, fontSize: 13.5, marginBottom: 24, fontFamily: "Plus Jakarta Sans, sans-serif" }}>Reach the right co-builders. Be specific.</p>
      <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 16, padding: 26, display: "flex", flexDirection: "column", gap: 14 }}>
        <input placeholder="Role title (e.g. Full-Stack Engineer)" style={iS} value={f.title} onChange={e => setF({ ...f, title: e.target.value })} />
        <input placeholder="Required skills (comma-separated)" style={iS} value={f.skills} onChange={e => setF({ ...f, skills: e.target.value })} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <input placeholder="Equity (e.g. 0.5–1.5%)" style={iS} value={f.equity} onChange={e => setF({ ...f, equity: e.target.value })} />
          <select style={{ ...iS }} value={f.type} onChange={e => setF({ ...f, type: e.target.value })}>
            {["Full-time", "Part-time", "Contract", "Advisor"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <textarea placeholder="Describe the role and responsibilities…" rows={4} style={{ ...iS, resize: "vertical" }} value={f.desc} onChange={e => setF({ ...f, desc: e.target.value })} />
        <label style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer", fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13, color: C.muted }}>
          <input type="checkbox" checked={f.paid} onChange={e => setF({ ...f, paid: e.target.checked })} style={{ accentColor: C.accent }} />
          This is a paid position
        </label>
        <Btn onClick={() => setDone(true)} style={{ alignSelf: "flex-start" }}>🚀 Publish Listing</Btn>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   LAUNCH STARTUP
══════════════════════════════ */
function LaunchStartup() {
  const [step, setStep] = useState(1);
  const [f, setF] = useState({ name: "", tagline: "", stage: "Pre-Seed", tags: "", website: "", desc: "" });
  const iS = { width: "100%", background: "rgba(255,255,255,0.05)", border: `0.5px solid ${C.border}`, borderRadius: 10, padding: "11px 13px", color: C.text, fontSize: 13.5, outline: "none", fontFamily: "Plus Jakarta Sans, sans-serif" };
  return (
    <div style={{ maxWidth: 580 }}>
      <h2 style={{ fontSize: 21, fontWeight: 800, fontFamily: "Outfit, sans-serif", marginBottom: 5 }}>Launch Your Startup</h2>
      <p style={{ color: C.muted, fontSize: 13.5, marginBottom: 18, fontFamily: "Plus Jakarta Sans, sans-serif" }}>List your startup and attract world-class co-builders.</p>
      <div style={{ display: "flex", gap: 7, marginBottom: 26 }}>
        {[1, 2, 3].map(s => <div key={s} style={{ flex: 1, height: 3, borderRadius: 4, background: step >= s ? C.accent : C.border, transition: "background .3s" }} />)}
      </div>
      <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 16, padding: 26, display: "flex", flexDirection: "column", gap: 14 }}>
        {step === 1 && <>
          <input placeholder="Startup name" style={iS} value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />
          <input placeholder="One-line tagline" style={iS} value={f.tagline} onChange={e => setF({ ...f, tagline: e.target.value })} />
          <input placeholder="Website URL" style={iS} value={f.website} onChange={e => setF({ ...f, website: e.target.value })} />
        </>}
        {step === 2 && <>
          <div>
            <p style={{ fontSize: 11, color: C.muted, marginBottom: 9, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600, fontFamily: "Outfit, sans-serif" }}>Stage</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Pre-Seed", "Seed", "Series A", "Series B+"].map(s => (
                <button key={s} onClick={() => setF({ ...f, stage: s })
                } style={{ padding: "7px 16px", background: f.stage === s ? C.accentBg : "rgba(255,255,255,0.03)", border: `1px solid ${f.stage === s ? C.accent : C.border}`, borderRadius: 20, color: f.stage === s ? C.accent : C.muted, cursor: "pointer", fontSize: 12.5, fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>{s}</button>
              ))}
            </div>
          </div>
          <input placeholder="Tags (e.g. AI/ML, SaaS)" style={iS} value={f.tags} onChange={e => setF({ ...f, tags: e.target.value })} />
          <textarea placeholder="Describe your vision and traction…" rows={5} style={{ ...iS, resize: "vertical" }} value={f.desc} onChange={e => setF({ ...f, desc: e.target.value })} />
        </>}
        {step === 3 && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: C.accentBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", border: `1px solid ${C.accentBorder}` }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: C.accent, fontFamily: "Outfit, sans-serif" }}>{f.name ? f.name.slice(0, 2).toUpperCase() : "NS"}</span>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 800, fontFamily: "Outfit, sans-serif", marginBottom: 7 }}>{f.name || "Your Startup"}</h3>
            <p style={{ color: C.muted, marginBottom: 8, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{f.tagline || "Your tagline"}</p>
            <Tag ch={f.stage} />
            <p style={{ color: C.muted, fontSize: 12.5, marginTop: 18, lineHeight: 1.6, fontFamily: "Plus Jakarta Sans, sans-serif" }}>Your startup will be instantly visible to the CoBuild network.</p>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          {step > 1 ? <Btn variant="ghost" onClick={() => setStep(s => s - 1)}>← Back</Btn> : <span />}
          <Btn onClick={() => step < 3 ? setStep(s => s + 1) : alert("Startup launched! 🚀")}>{step === 3 ? "🚀 Launch Now" : "Next →"}</Btn>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   DASHBOARD
══════════════════════════════ */
function Dashboard({ user, onSignOut }) {
  const [active, setActive] = useState("overview");
  const [search, setSearch] = useState("");
  const [expCard, setExpCard] = useState(null);
  const [filterStage, setFilterStage] = useState("All");
  const stages = ["All", "Pre-Seed", "Seed", "Series A"];

  const filtered = STARTUPS.filter(s => {
    const ms = s.name.toLowerCase().includes(search.toLowerCase()) || s.tagline.toLowerCase().includes(search.toLowerCase());
    const mst = filterStage === "All" || s.stage === filterStage;
    return ms && mst;
  });

  const views = {
    overview: <Overview user={user} />,
    startups: (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontSize: 21, fontWeight: 800, fontFamily: "Outfit, sans-serif" }}>Explore Startups</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: `0.5px solid ${C.border}`, borderRadius: 9, padding: "7px 12px" }}>
            <span style={{ color: C.muted, fontSize: 13 }}>🔍</span>
            <input placeholder="Search startups…" value={search} onChange={e => setSearch(e.target.value)}
              style={{ background: "none", border: "none", color: C.text, fontSize: 13, outline: "none", width: 150, fontFamily: "Plus Jakarta Sans, sans-serif" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 7, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          {stages.map(st => (
            <button key={st} onClick={() => setFilterStage(st)}
              style={{ padding: "6px 16px", borderRadius: 20, border: `0.5px solid ${filterStage === st ? C.accent : C.border}`, background: filterStage === st ? C.accentBg : "transparent", color: filterStage === st ? C.accent : C.muted, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "Outfit, sans-serif", transition: "all .15s" }}>
              {st}
            </button>
          ))}
          <span style={{ marginLeft: "auto", fontSize: 12, color: C.dim, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{filtered.length} startups</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 16 }}>
          {filtered.map(s => (
            <StartupCard key={s.id} s={s} expanded={expCard} onExpand={setExpCard} onJoin={() => {}} />
          ))}
        </div>
      </div>
    ),
    jobs: (
      <div>
        <h2 style={{ fontSize: 21, fontWeight: 800, fontFamily: "Outfit, sans-serif", marginBottom: 22 }}>Open Opportunities</h2>
        {JOBS.map(j => <JobRow key={j.id} j={j} onJoin={() => {}} />)}
      </div>
    ),
    post: <PostRole />,
    launch: <LaunchStartup />,
    settings: (
      <div>
        <h2 style={{ fontSize: 21, fontWeight: 800, fontFamily: "Outfit, sans-serif", marginBottom: 22 }}>Settings</h2>
        <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 16, padding: 26 }}>
          <p style={{ color: C.muted, fontSize: 13.5, fontFamily: "Plus Jakarta Sans, sans-serif" }}>Profile settings and integrations coming soon.</p>
        </div>
      </div>
    ),
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
      <Sidebar user={user} active={active} setActive={setActive} onSignOut={onSignOut} />
      <main style={{ flex: 1, padding: "34px 38px", overflowY: "auto", minWidth: 0 }}>
        {views[active]}
      </main>
    </div>
  );
}

/* ══════════════════════════════
   LANDING PAGE
══════════════════════════════ */
function Landing({ onOpen }) {
  const [exp, setExp] = useState(null);
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 36px", height: 60, background: "rgba(7,7,7,0.92)", backdropFilter: "blur(18px)", borderBottom: `0.5px solid ${C.border}` }}>
        <Logo h={30} />
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Btn variant="ghost" size="sm" onClick={onOpen}>Sign In</Btn>
          <Btn size="sm" onClick={onOpen}>🚀 Get Started</Btn>
        </div>
      </nav>

      <Hero onOpen={onOpen} />
      <Features />

      {/* Startups section */}
      <section style={{ padding: "40px 24px 80px", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <Tag ch="Live Startups" />
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: C.green, fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, display: "inline-block" }} />
                LIVE
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 700, letterSpacing: -1, fontFamily: "Outfit, sans-serif" }}>Startups building right now</h2>
          </div>
          <Btn variant="outline" onClick={onOpen}>View All →</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 16 }}>
          {STARTUPS.map(s => (
            <StartupCard key={s.id} s={s} expanded={exp} onExpand={setExp} onJoin={onOpen} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: "0 24px 80px", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ background: "linear-gradient(135deg, rgba(255,90,31,0.07), rgba(139,92,246,0.06))", border: `0.5px solid ${C.accentBorder}`, borderRadius: 20, padding: "52px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
          <h2 style={{ fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 800, letterSpacing: -1.5, marginBottom: 14, fontFamily: "Outfit, sans-serif", position: "relative" }}>
            Ready to <span style={{ color: C.accent }}>co-build</span>?
          </h2>
          <p style={{ color: C.muted, fontSize: 15, maxWidth: 460, margin: "0 auto 28px", lineHeight: 1.75, fontFamily: "Plus Jakarta Sans, sans-serif", position: "relative" }}>
            Join 9,600+ founders and contributors shaping the next wave of startups.
          </p>
          <Btn size="lg" onClick={onOpen} style={{ position: "relative" }}>✨ Join the Network</Btn>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════
   ROOT
══════════════════════════════ */
export default function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #070707; color: #EDEAE5; font-family: 'Plus Jakarta Sans', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }
        input, select, textarea, button { font-family: inherit; }
        option { background: #111; color: #EDEAE5; }
      `}</style>

      {/* Ambient orbs */}
      <div style={{ position: "fixed", top: "-15%", left: "-8%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,90,31,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-10%", right: 0, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {user
          ? <Dashboard user={user} onSignOut={() => setUser(null)} />
          : <Landing onOpen={() => setShowAuth(true)} />}
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={u => { setUser(u); setShowAuth(false); }} />}
      </div>
    </>
  );
}
