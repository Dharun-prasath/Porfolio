import { useState, useEffect, useRef } from "react";
import previewImg from "./preview.png";

/* ─── THEME ─────────────────────────────────────────────── */
const LIGHT = {
  bg:"#ffffff", bgAlt:"#f8f9fa", bgCard:"#ffffff",
  border:"#dadce0", borderHov:"rgba(26,115,232,0.4)",
  text1:"#202124", text2:"#3c4043", text3:"#5f6368", text4:"#80868b", text5:"#bdc1c6",
  navBg:"rgba(255,255,255,0.92)", navBorder:"#dadce0",
  particleColor:"rgba(26,115,232,0.2)", particleStroke:"rgba(26,115,232,0.08)",
  scrollbar:"#dadce0", scrollbarHov:"#bdc1c6", scrollbarTrack:"#f1f3f4",
};
const DARK = {
  bg:"#0f1117", bgAlt:"#161b22", bgCard:"#1c2128",
  border:"#30363d", borderHov:"rgba(88,166,255,0.5)",
  text1:"#e6edf3", text2:"#cdd9e5", text3:"#8b949e", text4:"#6e7681", text5:"#484f58",
  navBg:"rgba(15,17,23,0.92)", navBorder:"#30363d",
  particleColor:"rgba(88,166,255,0.25)", particleStroke:"rgba(88,166,255,0.07)",
  scrollbar:"#30363d", scrollbarHov:"#484f58", scrollbarTrack:"#0f1117",
};

/* ─── COLOR TOKENS ─────────────────────────────────────── */
const C = {
  blue:"#1a73e8",blue2:"#1557b0",blue3:"#0d47a1",blueL:"#e8f0fe",blueM:"#d2e3fc",
  blueDark:"#58a6ff", blueLDark:"rgba(88,166,255,0.12)", blueMDark:"rgba(88,166,255,0.2)",
  teal:"#00897b",tealL:"#e0f2f1",
  tealDark:"#2dd4bf", tealLDark:"rgba(45,212,191,0.12)",
  green:"#1e8e3e",greenL:"#e6f4ea",
  greenDark:"#3fb950", greenLDark:"rgba(63,185,80,0.12)",
  orange:"#e37400",orangeL:"#fef3e2",
  orangeDark:"#f0883e", orangeLDark:"rgba(240,136,62,0.12)",
  red:"#c5221f",redL:"#fce8e6",
  redDark:"#ff7b72", redLDark:"rgba(255,123,114,0.12)",
};

/* ─── DATA ──────────────────────────────────────────────── */
const NAV = ["About","Skills","Experience","Projects","Contact"];

const SKILLS = [
  { cat:"Programming",          items:["Python","Golang","JavaScript","C++","SQL","HTML/CSS"] },
  { cat:"AI & Machine Learning",items:["Deep Learning","Computer Vision","NLP","LLMs","YOLO","CNN","LSTM","AI Agents"] },
  { cat:"Frameworks & Tools",   items:["PyTorch","TensorFlow","OpenCV","NumPy","SciPy","Pandas","PostgreSQL","Firebase"] },
  { cat:"Engineering",          items:["Fusion 360","Ansys Fluent","NASA CEA","ISRO Pradan","Raspberry Pi","Linux"] },
];

const PROJECTS = [
  {
    tag:"Space AI",
    icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
    title:"LunaSurface AI",
    sub:"Planetary terrain understanding · self-supervised learning",
    desc:"AI system for crater segmentation and surface hazard analysis of the Moon using unlabeled satellite imagery—supporting future lunar landing mission planning.",
    stack:["Python","PyTorch","OpenCV","SSL"],
    href:"https://github.com/Dharun-prasath",
    colorKey:"blue",
  },
  {
    tag:"Planetary Science",
    icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-20 12 12)"/><circle cx="12" cy="12" r="2"/></svg>,
    title:"Dust Dynamics Monitor",
    sub:"Extraterrestrial dust behavior monitoring system",
    desc:"Autonomous system studying dust particle motion, electrostatic charging, and transport in low-gravity planetary conditions on the Moon and Mars.",
    stack:["Python","Raspberry Pi","Edge AI","Telemetry"],
    colorKey:"teal",
  },
  {
    tag:"Scientific Computing",
    icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    title:"Numerical Modeling Sim",
    sub:"High-performance mathematical simulation platform",
    desc:"Engineering simulation platform for solving differential equations and modeling complex physical systems using numerical methods.",
    stack:["NumPy","SciPy","Python","Matplotlib"],
    colorKey:"green",
  },
  {
    tag:"Robotics",
    icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><circle cx="8.5" cy="14" r="1.5"/><circle cx="15.5" cy="14" r="1.5"/><path d="M12 11v3"/></svg>,
    title:"Small Intelligent Robot",
    sub:"Multi-modal autonomous navigation robot",
    desc:"Raspberry Pi-based robot with LLM integration, computer vision, sensor fusion, and real-time control for autonomous navigation and speech interaction.",
    stack:["Raspberry Pi","LLMs","OpenCV","Python"],
    colorKey:"orange",
  },
];

/* ─── HOOKS ─────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCounter(target, inView, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return val;
}

/* ─── THEME HELPERS ─────────────────────────────────────── */
function tc(dark, colorKey) {
  const map = { blue: dark ? C.blueDark : C.blue, teal: dark ? C.tealDark : C.teal, green: dark ? C.greenDark : C.green, orange: dark ? C.orangeDark : C.orange, red: dark ? C.redDark : C.red };
  return map[colorKey] || (dark ? C.blueDark : C.blue);
}
function tb(dark, colorKey) {
  const map = { blue: dark ? C.blueLDark : C.blueL, teal: dark ? C.tealLDark : C.tealL, green: dark ? C.greenLDark : C.greenL, orange: dark ? C.orangeLDark : C.orangeL, red: dark ? C.redLDark : C.redL };
  return map[colorKey] || (dark ? C.blueLDark : C.blueL);
}

/* ─── PRIMITIVES ────────────────────────────────────────── */
function Chip({ label, color, bg }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", padding:"3px 11px", borderRadius:100, background:bg, color, fontWeight:600, fontSize:11.5, fontFamily:"'Google Sans',sans-serif", letterSpacing:"0.02em", whiteSpace:"nowrap" }}>
      {label}
    </span>
  );
}

function Eyebrow({ label, color }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
      <div style={{ width:3, height:20, borderRadius:2, background:color }} />
      <span style={{ fontFamily:"'Google Sans',sans-serif", fontSize:11.5, fontWeight:600, color, letterSpacing:"0.12em", textTransform:"uppercase" }}>{label}</span>
    </div>
  );
}

/* ─── THEME TOGGLE ──────────────────────────────────────── */
function ThemeToggle({ dark, setDark }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={() => setDark(d => !d)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title={dark ? "Switch to Light" : "Switch to Dark"}
      style={{
        position:"relative", width:56, height:28, borderRadius:100,
        background: dark
          ? "linear-gradient(135deg,#1c2128,#0f1117)"
          : "linear-gradient(135deg,#e8f0fe,#d2e3fc)",
        border: dark ? "1.5px solid #30363d" : "1.5px solid #c5d8ff",
        cursor:"pointer", outline:"none",
        boxShadow: hov
          ? dark ? "0 0 0 3px rgba(88,166,255,0.2)" : "0 0 0 3px rgba(26,115,232,0.15)"
          : "none",
        transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)",
        flexShrink:0,
        overflow:"hidden",
      }}>

      {/* Stars (dark mode only) */}
      {dark && [
        { x:10, y:7, s:1.5 }, { x:18, y:12, s:1 }, { x:8, y:17, s:1 }, { x:22, y:6, s:1.2 },
      ].map((star, i) => (
        <div key={i} style={{
          position:"absolute", left:star.x, top:star.y,
          width:star.s, height:star.s, borderRadius:"50%",
          background:"rgba(255,255,255,0.7)",
          transition:"opacity 0.3s", opacity: dark ? 1 : 0,
        }} />
      ))}

      {/* Sun rays (light mode only) */}
      {!dark && [0,45,90,135,180,225,270,315].map((deg, i) => (
        <div key={i} style={{
          position:"absolute",
          left:14, top:8,
          width:12, height:1,
          background:"rgba(26,115,232,0.4)",
          borderRadius:1,
          transformOrigin:"left center",
          transform:`rotate(${deg}deg) translateX(8px)`,
          opacity: hov ? 1 : 0.6,
          transition:"all 0.4s",
        }} />
      ))}

      {/* Knob */}
      <div style={{
        position:"absolute",
        top:3, left: dark ? 31 : 3,
        width:20, height:20, borderRadius:"50%",
        background: dark
          ? "linear-gradient(135deg,#c6d4f0,#e8eeff)"
          : "linear-gradient(135deg,#fbbc04,#f9a800)",
        boxShadow: dark
          ? "0 1px 4px rgba(0,0,0,0.5), inset -2px -2px 4px rgba(180,200,255,0.3)"
          : "0 1px 6px rgba(251,188,4,0.5), 0 0 10px rgba(251,188,4,0.3)",
        transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)",
        display:"flex", alignItems:"center", justifyContent:"center",
        overflow:"hidden",
      }}>
        {/* Moon crater detail (dark) */}
        {dark && <>
          <div style={{ position:"absolute", width:4, height:4, borderRadius:"50%", background:"rgba(100,120,180,0.3)", top:4, left:5 }} />
          <div style={{ position:"absolute", width:2.5, height:2.5, borderRadius:"50%", background:"rgba(100,120,180,0.2)", bottom:5, right:4 }} />
        </>}
        {/* Sun glare (light) */}
        {!dark && <div style={{ position:"absolute", width:6, height:6, borderRadius:"50%", background:"rgba(255,255,255,0.5)", top:3, left:4 }} />}
      </div>
    </button>
  );
}

/* ─── CURSOR SPOTLIGHT ──────────────────────────────────── */
function CursorSpotlight({ dark }) {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div style={{
      position:"fixed", pointerEvents:"none", zIndex:0,
      left: pos.x - 300, top: pos.y - 300,
      width:600, height:600, borderRadius:"50%",
      background: dark
        ? "radial-gradient(circle, rgba(88,166,255,0.05) 0%, transparent 70%)"
        : "radial-gradient(circle, rgba(26,115,232,0.04) 0%, transparent 70%)",
      transition:"left 0.15s ease, top 0.15s ease",
    }} />
  );
}

/* ─── PARTICLES ─────────────────────────────────────────── */
function Particles({ dark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    const dots = Array.from({ length: 40 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const pColor = dark ? "rgba(88,166,255,0.25)" : "rgba(26,115,232,0.2)";
      const lColor = (a) => dark ? `rgba(88,166,255,${a * 0.07})` : `rgba(26,115,232,${a * 0.08})`;
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = pColor;
        ctx.fill();
      });
      dots.forEach((a, i) => dots.slice(i + 1).forEach(b => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = lColor(1 - dist / 120);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [dark]);
  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, opacity:0.6 }} />;
}

/* ─── SCROLL PROGRESS ───────────────────────────────────── */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:999, height:3, background:"transparent" }}>
      <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#4285f4,#34a853,#fbbc04,#ea4335)", transition:"width 0.1s linear" }} />
    </div>
  );
}

/* ─── NAV ───────────────────────────────────────────────── */
function Nav({ dark, setDark, T }) {
  const [sc, setSc] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const h = () => setSc(window.scrollY > 10);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:200,
      background: sc ? T.navBg : "transparent",
      backdropFilter: sc ? "blur(12px)" : "none",
      borderBottom:`1px solid ${sc ? T.navBorder : "transparent"}`,
      boxShadow: sc ? (dark ? "0 1px 8px rgba(0,0,0,0.4)" : "0 1px 8px rgba(60,64,67,0.1)") : "none",
      transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)",
    }}>
      <div style={{
        maxWidth:1200, margin:"0 auto", padding:"0 24px", height:64,
        display:"flex", alignItems:"center", justifyContent:"center",
        position:"relative",
      }}>
        {/* Centered nav links */}
        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
          {NAV.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={() => setActive(l)}
              style={{ position:"relative", fontFamily:"'Google Sans',sans-serif", fontSize:13.5, fontWeight:500, color: active === l ? (dark ? C.blueDark : C.blue) : T.text2, textDecoration:"none", padding:"6px 14px", borderRadius:6, transition:"all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = dark ? "rgba(88,166,255,0.08)" : "#f1f3f4"; e.currentTarget.style.color = dark ? C.blueDark : C.blue; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = active === l ? (dark ? C.blueDark : C.blue) : T.text2; }}>
              {l}
              {active === l && <span style={{ position:"absolute", bottom:2, left:"50%", transform:"translateX(-50%)", width:16, height:2, borderRadius:1, background: dark ? C.blueDark : C.blue, animation:"slideIn 0.2s ease" }} />}
            </a>
          ))}
        </div>

        {/* Theme toggle — absolutely right */}
        <div style={{ position:"absolute", right:24, top:"50%", transform:"translateY(-50%)", display:"flex", alignItems:"center", gap:8 }}>
          <ThemeToggle dark={dark} setDark={setDark} />
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO ──────────────────────────────────────────────── */
function Hero({ dark, T }) {
  const roles = ["AI Engineer","Full Stack Developer","Space Tech Innovator","Robotics Builder","Deep Learning Researcher"];
  const [typed, setTyped] = useState("");
  const [ri, setRi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  useEffect(() => {
    const cur = roles[ri]; let t;
    if (!del && ci < cur.length) t = setTimeout(() => { setTyped(cur.slice(0, ci + 1)); setCi(c => c + 1); }, 65);
    else if (!del && ci === cur.length) t = setTimeout(() => setDel(true), 2200);
    else if (del && ci > 0) t = setTimeout(() => { setTyped(cur.slice(0, ci - 1)); setCi(c => c - 1); }, 32);
    else if (del && ci === 0) { setDel(false); setRi(r => (r + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [ci, del, ri]);

  const [statsRef, statsInView] = useInView();
  const cgpa = useCounter(82, statsInView, 1600);
  const projects = useCounter(4, statsInView, 1200);

  const blue = dark ? C.blueDark : C.blue;
  const blueL = dark ? C.blueLDark : C.blueL;
  const blueM = dark ? C.blueMDark : C.blueM;
  const greenL = dark ? C.greenLDark : C.greenL;
  const green = dark ? C.greenDark : C.green;

  return (
    <section style={{ background:T.bg, paddingTop:64, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }}>
        <div style={{ position:"absolute", top:-200, right:-200, width:600, height:600, borderRadius:"50%", background: dark ? "radial-gradient(circle,rgba(88,166,255,0.07) 0%,transparent 70%)" : "radial-gradient(circle,rgba(26,115,232,0.06) 0%,transparent 70%)", animation:"breathe 8s ease-in-out infinite" }} />
        <div style={{ position:"absolute", bottom:-100, left:-100, width:400, height:400, borderRadius:"50%", background: dark ? "radial-gradient(circle,rgba(45,212,191,0.06) 0%,transparent 70%)" : "radial-gradient(circle,rgba(0,137,123,0.05) 0%,transparent 70%)", animation:"breathe 10s ease-in-out infinite reverse" }} />
      </div>

      <div style={{ height:4, background:"linear-gradient(90deg,#4285f4,#34a853,#fbbc04,#ea4335)", position:"relative", zIndex:1 }} />

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"80px 24px 64px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center", position:"relative", zIndex:1 }}>
        <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(30px)", transition:"all 0.8s cubic-bezier(0.4,0,0.2,1)" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:100, background:blueL, marginBottom:28, animation:"pulse 3s ease-in-out infinite" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:green, boxShadow:`0 0 0 3px ${greenL}`, animation:"ping 2s ease-in-out infinite" }} />
            <span style={{ fontFamily:"'Google Sans',sans-serif", fontSize:12, color:blue, fontWeight:600, letterSpacing:"0.05em" }}>Open to Opportunities</span>
          </div>

          <h1 style={{ fontFamily:"'Google Sans Display',sans-serif", fontSize:"clamp(2.4rem,4.5vw,3.6rem)", fontWeight:400, lineHeight:1.1, color:T.text1, margin:"0 0 20px", letterSpacing:"-0.02em" }}>
            Dharun Prasath M
          </h1>

          <div style={{ height:52, display:"flex", alignItems:"center", marginBottom:24, overflow:"hidden" }}>
            <span style={{ fontFamily:"'Google Sans',sans-serif", fontSize:"clamp(1.1rem,2.2vw,1.45rem)", fontWeight:400, color:blue }}>
              {typed}
              <span style={{ animation:"blink 1s step-end infinite", color:blue, opacity:0.7 }}>|</span>
            </span>
          </div>

          <p style={{ fontFamily:"'Google Sans Text','DM Sans',sans-serif", fontSize:16, color:T.text3, lineHeight:1.85, maxWidth:480, marginBottom:40 }}>
            Building intelligent systems at the intersection of Artificial Intelligence, Robotics, and Space Exploration. CSE student at SRM University — CGPA 8.2.
          </p>

          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            {[
              { label:"View Projects", href:"#projects", primary:true },
              { label:"GitHub", href:"https://github.com/Dharun-prasath", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill={T.text3}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg> },
              { label:"LinkedIn", href:"https://linkedin.com/in/dharun-prasath", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="#0a66c2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
            ].map((btn, i) => (
              <a key={btn.label} href={btn.href} target={btn.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                style={{ fontFamily:"'Google Sans',sans-serif", fontWeight:500, fontSize:14, padding:"11px 24px", borderRadius:8, background: btn.primary ? blue : T.bgCard, color: btn.primary ? "#ffffff" : T.text2, textDecoration:"none", border: btn.primary ? "none" : `1px solid ${T.border}`, display:"flex", alignItems:"center", gap:8, transition:"all 0.2s cubic-bezier(0.4,0,0.2,1)", boxShadow: btn.primary ? `0 2px 8px ${blue}50` : "none" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = btn.primary ? `0 6px 20px ${blue}60` : `0 4px 12px rgba(0,0,0,0.15)`; if (btn.primary) e.currentTarget.style.background = dark ? "#4090e8" : C.blue2; else e.currentTarget.style.borderColor = blue; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = btn.primary ? `0 2px 8px ${blue}50` : "none"; if (btn.primary) e.currentTarget.style.background = blue; else e.currentTarget.style.borderColor = T.border; }}>
                {btn.icon}{btn.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Profile */}
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(30px)", transition:"all 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s" }}>
          <div style={{ position:"relative", width:320, height:320, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:`1.5px dashed ${T.border}`, animation:"spin 40s linear infinite", pointerEvents:"none" }} />
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <div key={i} style={{ position:"absolute", width:"100%", height:"100%", transform:`rotate(${deg}deg)`, animation:`spin ${20 + i * 3}s linear infinite`, pointerEvents:"none" }}>
                <div style={{ position:"absolute", top:"2%", left:"50%", width: i % 2 === 0 ? 6 : 4, height: i % 2 === 0 ? 6 : 4, borderRadius:"50%", background: i % 3 === 0 ? blue : i % 3 === 1 ? (dark ? C.tealDark : C.teal) : (dark ? C.orangeDark : C.orange), opacity:0.65, transform:"translateX(-50%)", boxShadow:`0 0 4px ${i % 3 === 0 ? blue : "#aaa"}60` }} />
              </div>
            ))}
            <div style={{ position:"absolute", inset:28, borderRadius:"50%", border:"2.5px solid transparent", background:`linear-gradient(${T.bg},${T.bg}) padding-box, conic-gradient(from 0deg, ${blue}, transparent 55%, ${blue}) border-box`, animation:"spin 8s linear infinite", pointerEvents:"none" }} />
            <div style={{ position:"relative", width:210, height:210, borderRadius:"50%", overflow:"hidden", border:`3px solid ${blueM}`, animation:"float 6s ease-in-out infinite", flexShrink:0, boxShadow:`0 8px 40px ${blue}30` }}>
              <img src={previewImg} alt="Dharun Prasath" style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%", animation:"fadeIn 1s ease-in" }} />
            </div>
            {[
              { label:"AI", colorKey:"blue", angle:-42, r:158 },
              { label:"Space", colorKey:"teal", angle:42, r:153 },
              { label:"Robotics", colorKey:"orange", angle:143, r:151 },
              { label:"ML", colorKey:"green", angle:222, r:153 },
            ].map((b, i) => {
              const rad = (b.angle * Math.PI) / 180;
              const x = Math.cos(rad) * b.r;
              const y = Math.sin(rad) * b.r;
              const bColor = tc(dark, b.colorKey);
              const bBg = tb(dark, b.colorKey);
              return (
                <div key={b.label} style={{ position:"absolute", left:`calc(50% + ${x}px)`, top:`calc(50% + ${y}px)`, transform:"translate(-50%,-50%)", background:bBg, color:bColor, fontFamily:"'Google Sans',sans-serif", fontWeight:700, fontSize:11, padding:"5px 12px", borderRadius:100, border:`1px solid ${bColor}30`, whiteSpace:"nowrap", animation:`floatBadge ${4 + i * 0.7}s ease-in-out infinite ${i * 0.5}s`, boxShadow:`0 2px 8px ${bColor}20`, pointerEvents:"none" }}>
                  {b.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div ref={statsRef} style={{ background:T.bgAlt, borderTop:`1px solid ${T.border}`, position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex" }}>
          {[
            { n: statsInView ? (cgpa / 10).toFixed(1) : "0.0", u:"/10", l:"Academic CGPA", colorKey:"blue" },
            { n: statsInView ? projects + "+" : "0+", u:"", l:"Space AI Projects", colorKey:"teal" },
            { n:"2", u:"", l:"Research Domains", colorKey:"green" },
            { n:"NIT-T", u:"", l:"Industry Intern", colorKey:"orange" },
          ].map((s, i) => (
            <div key={i} style={{ flex:1, padding:"28px 0 28px 32px", borderLeft: i === 0 ? "none" : `1px solid ${T.border}`, transition:"all 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background = T.bgCard}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div style={{ fontFamily:"'Google Sans Display',sans-serif", fontSize:28, fontWeight:400, color: tc(dark, s.colorKey), transition:"all 0.3s" }}>
                {s.n}<span style={{ fontSize:16, color:T.text4 }}>{s.u}</span>
              </div>
              <div style={{ fontFamily:"'Google Sans Text',sans-serif", fontSize:12.5, color:T.text3, marginTop:3 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ─────────────────────────────────────────────── */
function About({ dark, T }) {
  const [ref, inView] = useInView();
  const blue = dark ? C.blueDark : C.blue;
  const blueL = dark ? C.blueLDark : C.blueL;
  return (
    <section id="about" ref={ref} style={{ background:T.bg, padding:"100px 24px", borderTop:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:80, alignItems:"start", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition:"all 0.8s cubic-bezier(0.4,0,0.2,1)" }}>
        <div>
          <Eyebrow label="About" color={blue} />
          <h2 style={{ fontFamily:"'Google Sans Display',sans-serif", fontSize:"clamp(1.8rem,3vw,2.6rem)", fontWeight:400, color:T.text1, margin:"0 0 24px", letterSpacing:"-0.01em", lineHeight:1.2 }}>
            Pushing the boundaries of<br /><span style={{ color:blue }}>AI and space technology</span>
          </h2>
          <p style={{ fontFamily:"'Google Sans Text',sans-serif", fontSize:16, color:T.text3, lineHeight:1.9, marginBottom:20 }}>
            I am a Computer Science and Engineering student at SRM University with strong interests in Artificial Intelligence, Machine Learning, Computer Vision, Robotics, Aerospace Systems, and Planetary Technologies.
          </p>
          <p style={{ fontFamily:"'Google Sans Text',sans-serif", fontSize:16, color:T.text3, lineHeight:1.9, marginBottom:40 }}>
            My goal is to create futuristic systems that solve real-world challenges—from autonomous robots and advanced simulations to intelligent space exploration technologies that expand human capability on Earth and beyond.
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {[
              { t:"Strong AI + Engineering combination", colorKey:"blue" },
              { t:"Space-tech innovation mindset", colorKey:"teal" },
              { t:"Full Stack + Hardware capability", colorKey:"green" },
              { t:"Research-oriented builder", colorKey:"orange" },
            ].map(({ t, colorKey }, i) => {
              const color = tc(dark, colorKey);
              const bgColor = tb(dark, colorKey);
              return (
                <div key={t} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", borderRadius:10, border:`1px solid ${T.border}`, background:T.bgAlt, transition:"all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = color + "40"; e.currentTarget.style.background = T.bgCard; e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.boxShadow = `0 2px 12px ${color}15`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.bgAlt; e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", background: color + "20", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5 5.5-5.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span style={{ fontFamily:"'Google Sans Text',sans-serif", fontSize:14, color:T.text2, fontWeight:500 }}>{t}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div style={{ padding:24, borderRadius:14, border:`1px solid ${T.border}`, background:T.bgCard, boxShadow: dark ? "0 1px 6px rgba(0,0,0,0.3)" : "0 1px 6px rgba(60,64,67,0.06)", transition:"all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = dark ? "0 8px 30px rgba(0,0,0,0.5)" : "0 8px 30px rgba(60,64,67,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = dark ? "0 1px 6px rgba(0,0,0,0.3)" : "0 1px 6px rgba(60,64,67,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ fontFamily:"'Google Sans',sans-serif", fontSize:11.5, color:T.text4, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:16, fontWeight:600 }}>Education</div>
            <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
              <div style={{ width:46, height:46, borderRadius:12, background:blueL, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={blue} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <div>
                <div style={{ fontFamily:"'Google Sans',sans-serif", fontSize:15, fontWeight:600, color:T.text1, marginBottom:3 }}>SRM University</div>
                <div style={{ fontFamily:"'Google Sans Text',sans-serif", fontSize:13, color:T.text3, marginBottom:12 }}>B.Tech in Computer Science & Engineering</div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  <Chip label="Batch 2027" color={blue} bg={blueL} />
                  <Chip label="CGPA 8.2" color={tc(dark,"green")} bg={tb(dark,"green")} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding:24, borderRadius:14, border:`1px solid ${T.border}`, background:T.bgCard, boxShadow: dark ? "0 1px 6px rgba(0,0,0,0.3)" : "0 1px 6px rgba(60,64,67,0.06)", transition:"all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = dark ? "0 8px 30px rgba(0,0,0,0.5)" : "0 8px 30px rgba(60,64,67,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = dark ? "0 1px 6px rgba(0,0,0,0.3)" : "0 1px 6px rgba(60,64,67,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ fontFamily:"'Google Sans',sans-serif", fontSize:11.5, color:T.text4, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:16, fontWeight:600 }}>Certifications</div>
            {["Python Programming","Machine Learning Specialization","Deep Learning Specialization","Data Visualization"].map((cert, i, arr) => (
              <div key={cert} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none", transition:"all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.paddingLeft = "6px"}
                onMouseLeave={e => e.currentTarget.style.paddingLeft = "0"}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:blue, flexShrink:0 }} />
                <span style={{ fontFamily:"'Google Sans Text',sans-serif", fontSize:13.5, color:T.text2 }}>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ────────────────────────────────────────────── */
const skillColorKeys = ["blue","teal","green","orange"];
const skillIcons = [
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 8v4l3 3"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
];

function Skills({ dark, T }) {
  const [ref, inView] = useInView();
  const teal = dark ? C.tealDark : C.teal;
  return (
    <section id="skills" style={{ background:T.bgAlt, padding:"100px 24px", borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}` }}>
      <div ref={ref} style={{ maxWidth:1200, margin:"0 auto", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition:"all 0.8s cubic-bezier(0.4,0,0.2,1)" }}>
        <Eyebrow label="Technical Skills" color={teal} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48 }}>
          <h2 style={{ fontFamily:"'Google Sans Display',sans-serif", fontSize:"clamp(1.8rem,3vw,2.4rem)", fontWeight:400, color:T.text1, margin:0, letterSpacing:"-0.01em" }}>Core Competencies</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
          {SKILLS.map((s, si) => {
            const color = tc(dark, skillColorKeys[si]);
            const bg = tb(dark, skillColorKeys[si]);
            return (
              <div key={s.cat}
                style={{ background:T.bgCard, borderRadius:14, border:`1px solid ${T.border}`, padding:26, transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)", cursor:"default", transitionDelay:`${si * 0.05}s` }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px ${color}25`; e.currentTarget.style.borderColor = color + "50"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width:38, height:38, borderRadius:10, background:bg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18, color }}>
                  {skillIcons[si]}
                </div>
                <div style={{ fontFamily:"'Google Sans',sans-serif", fontSize:13.5, fontWeight:600, color:T.text1, marginBottom:18 }}>{s.cat}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {s.items.map(item => (
                    <span key={item} style={{ fontFamily:"'Google Sans Text',sans-serif", fontSize:12, fontWeight:500, padding:"3px 10px", borderRadius:4, background: color + "15", color, transition:"all 0.2s", cursor:"default" }}
                      onMouseEnter={e => { e.currentTarget.style.background = color + "30"; e.currentTarget.style.transform = "scale(1.05)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = color + "15"; e.currentTarget.style.transform = "scale(1)"; }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE ────────────────────────────────────────── */
function Experience({ dark, T }) {
  const [ref, inView] = useInView();
  const blue = dark ? C.blueDark : C.blue;
  const blueL = dark ? C.blueLDark : C.blueL;
  const workItems = [
    { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={blue} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, tech:"Golang", desc:"High-performance REST APIs" },
    { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tc(dark,"teal")} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>, tech:"React.js + Tailwind CSS", desc:"Responsive UI components" },
    { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tc(dark,"green")} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>, tech:"PostgreSQL", desc:"Schema design & optimization" },
    { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tc(dark,"orange")} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, tech:"Real-time Integrations", desc:"Secure payment & auth" },
  ];
  return (
    <section id="experience" style={{ background:T.bg, padding:"100px 24px", borderBottom:`1px solid ${T.border}` }}>
      <div ref={ref} style={{ maxWidth:1200, margin:"0 auto", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition:"all 0.8s cubic-bezier(0.4,0,0.2,1)" }}>
        <Eyebrow label="Experience" color={tc(dark,"green")} />
        <h2 style={{ fontFamily:"'Google Sans Display',sans-serif", fontSize:"clamp(1.8rem,3vw,2.4rem)", fontWeight:400, color:T.text1, margin:"0 0 40px", letterSpacing:"-0.01em" }}>Professional Experience</h2>

        <div style={{ borderRadius:16, border:`1px solid ${T.border}`, overflow:"hidden", background:T.bgCard, boxShadow: dark ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(60,64,67,0.08)", transition:"all 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = dark ? "0 12px 40px rgba(0,0,0,0.6)" : "0 12px 40px rgba(60,64,67,0.14)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = dark ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(60,64,67,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
          <div style={{ height:4, background:`linear-gradient(90deg,${blue},${tc(dark,"teal")},${tc(dark,"green")})` }} />
          <div style={{ padding:"36px", display:"grid", gridTemplateColumns:"1fr auto", gap:24, alignItems:"start" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:22 }}>
                <div style={{ width:54, height:54, borderRadius:14, background:blueL, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={blue} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="1.5"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
                </div>
                <div>
                  <h3 style={{ fontFamily:"'Google Sans',sans-serif", fontSize:18, fontWeight:600, color:T.text1, margin:0 }}>Full Stack Developer Intern</h3>
                  <div style={{ fontFamily:"'Google Sans',sans-serif", fontSize:14, color:blue, marginTop:4 }}>National Institute of Technology Tiruchirappalli</div>
                </div>
              </div>
              <p style={{ fontFamily:"'Google Sans Text',sans-serif", fontSize:14.5, color:T.text3, lineHeight:1.75, marginBottom:24 }}>
                Worked on <strong style={{ color:T.text1, fontWeight:600 }}>ThirumathiKart</strong>, a full-featured e-commerce platform—contributing across the full technology stack from database design to frontend implementation.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
                {workItems.map(it => (
                  <div key={it.tech} style={{ padding:"14px 16px", borderRadius:10, background:T.bgAlt, border:`1px solid ${T.border}`, display:"flex", gap:12, alignItems:"flex-start", transition:"all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = T.bgCard; e.currentTarget.style.borderColor = blue + "40"; e.currentTarget.style.transform = "scale(1.02)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = T.bgAlt; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "scale(1)"; }}>
                    <div style={{ flexShrink:0, marginTop:1 }}>{it.icon}</div>
                    <div>
                      <div style={{ fontFamily:"'Google Sans',sans-serif", fontSize:12.5, fontWeight:600, color:T.text1 }}>{it.tech}</div>
                      <div style={{ fontFamily:"'Google Sans Text',sans-serif", fontSize:12, color:T.text4, marginTop:1 }}>{it.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8, alignItems:"flex-end" }}>
              <Chip label="May – Jun 2025" color={blue} bg={blueL} />
              <Chip label="✓ Completed" color={tc(dark,"green")} bg={tb(dark,"green")} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECT CARD ──────────────────────────────────────── */
function PCard({ p, idx, dark, T }) {
  const [hov, setHov] = useState(false);
  const [ref, inView] = useInView(0.1);
  const color = tc(dark, p.colorKey);
  const bg = tb(dark, p.colorKey);
  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ borderRadius:14, border:`1px solid ${hov ? color + "60" : T.border}`, background:T.bgCard, overflow:"hidden", boxShadow: hov ? `0 16px 48px ${color}25` : dark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(60,64,67,0.06)", transition:"all 0.35s cubic-bezier(0.4,0,0.2,1)", transform: hov ? "translateY(-6px)" : inView ? "translateY(0)" : "translateY(30px)", opacity: inView ? 1 : 0, transitionDelay:`${idx * 0.1}s`, display:"flex", flexDirection:"column" }}>
      <div style={{ height:3, background:`linear-gradient(90deg,${color},${color}80)`, transform:`scaleX(${hov ? 1 : 0})`, transformOrigin:"left", transition:"transform 0.4s cubic-bezier(0.4,0,0.2,1)" }} />
      <div style={{ padding:"24px 24px 0" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:18 }}>
          <Chip label={p.tag} color={color} bg={bg} />
          <div style={{ color, opacity: hov ? 1 : 0.7, transition:"all 0.3s", transform: hov ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0)" }}>{p.icon}</div>
        </div>
        <h3 style={{ fontFamily:"'Google Sans',sans-serif", fontSize:17, fontWeight:600, color:T.text1, margin:"0 0 5px" }}>{p.title}</h3>
        <div style={{ fontFamily:"'Google Sans Text',sans-serif", fontSize:12.5, color:T.text4, marginBottom:14 }}>{p.sub}</div>
        <p style={{ fontFamily:"'Google Sans Text',sans-serif", fontSize:13.5, color:T.text3, lineHeight:1.75, margin:0 }}>{p.desc}</p>
      </div>
      <div style={{ flex:1 }} />
      <div style={{ padding:"16px 24px", borderTop:`1px solid ${T.border}`, marginTop:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {p.stack.map(s => (
            <span key={s} style={{ fontFamily:"'Google Sans Text',sans-serif", fontSize:11.5, fontWeight:500, padding:"3px 10px", borderRadius:4, background: dark ? "rgba(255,255,255,0.06)" : "#f1f3f4", color:T.text2, transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = bg; e.currentTarget.style.color = color; }}
              onMouseLeave={e => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.06)" : "#f1f3f4"; e.currentTarget.style.color = T.text2; }}>
              {s}
            </span>
          ))}
        </div>
        {p.href && (
          <a href={p.href} target="_blank" rel="noreferrer" style={{ fontFamily:"'Google Sans',sans-serif", fontSize:12.5, fontWeight:600, color, textDecoration:"none", flexShrink:0, marginLeft:12, display:"flex", alignItems:"center", gap:4, transition:"gap 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.gap = "8px"}
            onMouseLeave={e => e.currentTarget.style.gap = "4px"}>
            View
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        )}
      </div>
    </div>
  );
}

function Projects({ dark, T }) {
  const [ref, inView] = useInView();
  const blue = dark ? C.blueDark : C.blue;
  const orange = dark ? C.orangeDark : C.orange;
  return (
    <section id="projects" style={{ background:T.bgAlt, padding:"100px 24px", borderBottom:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition:"all 0.7s cubic-bezier(0.4,0,0.2,1)" }}>
          <Eyebrow label="Projects" color={orange} />
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48 }}>
            <h2 style={{ fontFamily:"'Google Sans Display',sans-serif", fontSize:"clamp(1.8rem,3vw,2.4rem)", fontWeight:400, color:T.text1, margin:0, letterSpacing:"-0.01em" }}>Featured Work</h2>
            <a href="https://github.com/Dharun-prasath" target="_blank" rel="noreferrer" style={{ fontFamily:"'Google Sans',sans-serif", fontSize:13.5, color:blue, textDecoration:"none", fontWeight:500, display:"flex", alignItems:"center", gap:4, transition:"gap 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.gap = "8px"}
              onMouseLeave={e => e.currentTarget.style.gap = "4px"}>
              See all on GitHub
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:18 }}>
          {PROJECTS.map((p, i) => <PCard key={p.title} p={p} idx={i} dark={dark} T={T} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── VISION BANNER ─────────────────────────────────────── */
function Vision({ dark }) {
  const [ref, inView] = useInView();
  const blue = dark ? C.blueDark : C.blue;
  const bg = dark ? "#0d1929" : C.blue;
  const tags = ["Engineer by Curiosity","Builder by Passion","Innovator by Vision","Space by Destiny"];
  return (
    <section ref={ref} style={{ background:bg, padding:"88px 24px", position:"relative", overflow:"hidden" }}>
      {[1.2, 1.6, 2.1].map((s, i) => (
        <div key={i} style={{ position:"absolute", top:"50%", left:"50%", width:300, height:300, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.08)", transform:`translate(-50%,-50%) scale(${s})`, animation:`ripple ${4 + i * 1.5}s ease-in-out infinite ${i * 0.8}s`, pointerEvents:"none" }} />
      ))}
      <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition:"all 0.8s cubic-bezier(0.4,0,0.2,1)" }}>
        <div style={{ fontFamily:"'Google Sans',sans-serif", fontSize:11.5, color:"rgba(255,255,255,0.6)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:20, fontWeight:600 }}>Vision Statement</div>
        <blockquote style={{ fontFamily:"'Google Sans Display',sans-serif", fontSize:"clamp(1.25rem,2.5vw,1.85rem)", fontWeight:400, color:"#fff", lineHeight:1.65, margin:"0 0 40px" }}>
          "To engineer intelligent technologies that expand human capability on Earth and beyond—through AI, robotics, and space systems."
        </blockquote>
        <div style={{ display:"flex", justifyContent:"center", gap:10, flexWrap:"wrap" }}>
          {tags.map((t, i) => (
            <span key={t} style={{ fontFamily:"'Google Sans',sans-serif", fontSize:12.5, fontWeight:500, padding:"8px 18px", borderRadius:100, background:"rgba(255,255,255,0.12)", color:"#fff", border:"1px solid rgba(255,255,255,0.2)", cursor:"default", transition:"all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.25)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ───────────────────────────────────────────── */
function Contact({ dark, T }) {
  const [ref, inView] = useInView();
  const blue = dark ? C.blueDark : C.blue;
  const blueL = dark ? C.blueLDark : C.blueL;
  const links = [
    { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>, label:"Email", val:"dharunprasath.murugan@gmail.com", href:"mailto:dharunprasath.murugan@gmail.com", colorKey:"blue" },
    { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>, label:"Phone", val:"+91 76049 04493", href:"tel:+917604904493", colorKey:"teal" },
    { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="#0a66c2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, label:"LinkedIn", val:"linkedin.com/in/dharun-prasath", href:"https://linkedin.com/in/dharun-prasath", colorKey:"blue" },
    { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill={T.text2}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>, label:"GitHub", val:"github.com/Dharun-prasath", href:"https://github.com/Dharun-prasath", colorKey:"orange" },
  ];
  return (
    <section id="contact" style={{ background:T.bg, padding:"100px 24px", borderTop:`1px solid ${T.border}` }}>
      <div ref={ref} style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition:"all 0.8s cubic-bezier(0.4,0,0.2,1)" }}>
        <div>
          <Eyebrow label="Contact" color={tc(dark,"red")} />
          <h2 style={{ fontFamily:"'Google Sans Display',sans-serif", fontSize:"clamp(1.8rem,3vw,2.5rem)", fontWeight:400, color:T.text1, margin:"0 0 20px", letterSpacing:"-0.01em", lineHeight:1.2 }}>
            Let's build something<br /><span style={{ color:blue }}>extraordinary</span>
          </h2>
          <p style={{ fontFamily:"'Google Sans Text',sans-serif", fontSize:15.5, color:T.text3, lineHeight:1.85, marginBottom:36 }}>
            Open to internships, research collaborations, and exciting projects at the frontier of AI, robotics, and space technology. Let's connect.
          </p>
          <a href="mailto:dharunprasath.murugan@gmail.com"
            style={{ display:"inline-flex", alignItems:"center", gap:8, fontFamily:"'Google Sans',sans-serif", fontWeight:500, fontSize:14, padding:"13px 30px", borderRadius:8, background:blue, color:"#fff", textDecoration:"none", boxShadow:`0 4px 14px ${blue}55`, transition:"all 0.2s cubic-bezier(0.4,0,0.2,1)" }}
            onMouseEnter={e => { e.currentTarget.style.background = dark ? "#4090e8" : C.blue2; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${blue}70`; }}
            onMouseLeave={e => { e.currentTarget.style.background = blue; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 14px ${blue}55`; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            Send a Message
          </a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {links.map((l, i) => {
            const color = l.label === "LinkedIn" ? "#0a66c2" : tc(dark, l.colorKey);
            return (
              <a key={l.label} href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                style={{ display:"flex", flexDirection:"column", gap:10, padding:22, borderRadius:14, border:`1px solid ${T.border}`, textDecoration:"none", background:T.bgCard, transition:"all 0.25s cubic-bezier(0.4,0,0.2,1)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color + "50"; e.currentTarget.style.boxShadow = `0 8px 24px ${color}20`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <span style={{ color }}>{l.icon}</span>
                <div>
                  <div style={{ fontFamily:"'Google Sans',sans-serif", fontSize:11, color:T.text4, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:4 }}>{l.label}</div>
                  <div style={{ fontFamily:"'Google Sans Text',sans-serif", fontSize:12.5, color:T.text2, wordBreak:"break-all" }}>{l.val}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────── */
function Footer({ dark, T }) {
  const blue = dark ? C.blueDark : C.blue;
  const teal = dark ? C.tealDark : C.teal;
  return (
    <footer style={{ background:T.bgAlt, borderTop:`1px solid ${T.border}`, padding:"28px 24px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:24, height:24, borderRadius:"50%", background:`linear-gradient(135deg,${blue},${teal})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Google Sans',sans-serif", fontWeight:700, fontSize:10, color:"#fff" }}>D</div>
          <span style={{ fontFamily:"'Google Sans',sans-serif", fontSize:13, color:T.text4 }}>© 2025 Dharun Prasath M</span>
        </div>
        <div style={{ display:"flex", gap:24 }}>
          {NAV.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily:"'Google Sans',sans-serif", fontSize:12.5, color:T.text4, textDecoration:"none", transition:"color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color = blue}
              onMouseLeave={e => e.currentTarget.style.color = T.text4}>
              {l}
            </a>
          ))}
        </div>
        <span style={{ fontFamily:"'Google Sans',sans-serif", fontSize:12, color:T.text5 }}>SRM University · CSE · 2027</span>
      </div>
    </footer>
  );
}

/* ─── APP ───────────────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(false);
  const T = dark ? DARK : LIGHT;

  // Apply bg to body
  useEffect(() => {
    document.body.style.background = T.bg;
    document.body.style.color = T.text1;
    document.body.style.transition = "background 0.4s ease, color 0.4s ease";
  }, [dark, T]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Google+Sans+Display:wght@400;500;700&family=Google+Sans+Text:wght@400;500&family=DM+Sans:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:${T.bg};color:${T.text1};overflow-x:hidden;transition:background 0.4s ease,color 0.4s ease;}

        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes float{0%,100%{transform:translateY(0px);}50%{transform:translateY(-12px);}}
        @keyframes floatBadge{0%,100%{transform:translate(-50%,-50%) translateY(0px);}50%{transform:translate(-50%,-50%) translateY(-6px);}}
        @keyframes breathe{0%,100%{transform:scale(1);opacity:0.6;}50%{transform:scale(1.08);opacity:1;}}
        @keyframes ping{0%,100%{box-shadow:0 0 0 3px rgba(30,142,62,0.2);}50%{box-shadow:0 0 0 6px rgba(30,142,62,0.05);}}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(26,115,232,0);}50%{box-shadow:0 0 0 6px rgba(26,115,232,0.08);}}
        @keyframes ripple{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.6;}50%{transform:translate(-50%,-50%) scale(1.06);opacity:1;}}
        @keyframes slideIn{from{width:0}to{width:16px}}
        @keyframes fadeIn{from{opacity:0;transform:scale(0.96);}to{opacity:1;transform:scale(1);}}

        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:${T.scrollbarTrack};}
        ::-webkit-scrollbar-thumb{background:${T.scrollbar};border-radius:3px;}
        ::-webkit-scrollbar-thumb:hover{background:${T.scrollbarHov};}

        ::selection{background:rgba(26,115,232,0.15);color:#1a73e8;}
      `}</style>
      <ScrollProgress />
      <CursorSpotlight dark={dark} />
      <Particles dark={dark} key={dark ? "dark" : "light"} />
      <div style={{ position:"relative", zIndex:1, transition:"background 0.4s ease" }}>
        <Nav dark={dark} setDark={setDark} T={T} />
        <Hero dark={dark} T={T} />
        <About dark={dark} T={T} />
        <Skills dark={dark} T={T} />
        <Experience dark={dark} T={T} />
        <Projects dark={dark} T={T} />
        <Vision dark={dark} />
        <Contact dark={dark} T={T} />
        <Footer dark={dark} T={T} />
      </div>
    </>
  );
}