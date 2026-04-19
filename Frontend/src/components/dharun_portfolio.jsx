import { useState, useEffect } from "react";
import previewImg from "./preview.png";

const C = {
  blue:    "#1a73e8", blue2: "#1557b0", blueL: "#e8f0fe", blueM: "#d2e3fc",
  teal:    "#00897b", tealL:  "#e0f2f1",
  green:   "#1e8e3e", greenL: "#e6f4ea",
  orange:  "#e37400", orangeL:"#fef3e2",
  red:     "#c5221f", redL:   "#fce8e6",
  gray1: "#202124", gray2: "#3c4043", gray3: "#5f6368",
  gray4: "#80868b", gray5: "#bdc1c6", gray6: "#dadce0",
  gray7: "#f1f3f4", gray8: "#f8f9fa", white: "#ffffff",
};

const NAV = ["About","Skills","Experience","Projects","Contact"];

const SKILLS = [
  { cat:"Programming",          color:C.blue,   bg:C.blueL,   items:["Python","Golang","JavaScript","C++","SQL","HTML/CSS"] },
  { cat:"AI & Machine Learning",color:C.teal,   bg:C.tealL,   items:["Deep Learning","Computer Vision","NLP","LLMs","YOLO","CNN","LSTM","AI Agents"] },
  { cat:"Frameworks & Tools",   color:C.green,  bg:C.greenL,  items:["PyTorch","TensorFlow","OpenCV","NumPy","SciPy","Pandas","PostgreSQL","Firebase"] },
  { cat:"Engineering",          color:C.orange, bg:C.orangeL, items:["Fusion 360","Ansys Fluent","NASA CEA","ISRO Pradan","Raspberry Pi","Linux"] },
];

const PROJECTS = [
  {
    tag:"Space AI",           tc:C.blue,   tb:C.blueL,
    emoji:"🌑",
    title:"LunaSurface AI",
    sub:"Planetary terrain understanding · self-supervised learning",
    desc:"AI system for crater segmentation and surface hazard analysis of the Moon using unlabeled satellite imagery—supporting future lunar landing mission planning.",
    stack:["Python","PyTorch","OpenCV","SSL"],
    href:"https://github.com/Dharun-prasath",
  },
  {
    tag:"Planetary Science",  tc:C.teal,   tb:C.tealL,
    emoji:"🪐",
    title:"Dust Dynamics Monitor",
    sub:"Extraterrestrial dust behavior monitoring system",
    desc:"Autonomous system studying dust particle motion, electrostatic charging, and transport in low-gravity planetary conditions on the Moon and Mars.",
    stack:["Python","Raspberry Pi","Edge AI","Telemetry"],
  },
  {
    tag:"Scientific Computing",tc:C.green, tb:C.greenL,
    emoji:"📡",
    title:"Numerical Modeling Sim",
    sub:"High-performance mathematical simulation platform",
    desc:"Engineering simulation platform for solving differential equations and modeling complex physical systems using numerical methods.",
    stack:["NumPy","SciPy","Python","Matplotlib"],
  },
  {
    tag:"Robotics",           tc:C.orange, tb:C.orangeL,
    emoji:"🤖",
    title:"Small Intelligent Robot",
    sub:"Multi-modal autonomous navigation robot",
    desc:"Raspberry Pi-based robot with LLM integration, computer vision, sensor fusion, and real-time control for autonomous navigation and speech interaction.",
    stack:["Raspberry Pi","LLMs","OpenCV","Python"],
  },
];

/* primitives */
function Chip({label,color=C.blue,bg=C.blueL}) {
  return (
    <span style={{display:"inline-flex",alignItems:"center",padding:"2px 10px",borderRadius:100,background:bg,color,fontWeight:600,fontSize:11.5,fontFamily:"'Google Sans',sans-serif",letterSpacing:"0.02em",whiteSpace:"nowrap"}}>
      {label}
    </span>
  );
}

function Eyebrow({label,color=C.blue}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
      <div style={{width:3,height:20,borderRadius:2,background:color}}/>
      <span style={{fontFamily:"'Google Sans',sans-serif",fontSize:11.5,fontWeight:600,color,letterSpacing:"0.1em",textTransform:"uppercase"}}>{label}</span>
    </div>
  );
}

/* nav */
function Nav() {
  const [sc,setSc]=useState(false);
  useEffect(()=>{
    const h=()=>setSc(window.scrollY>10);
    window.addEventListener("scroll",h);
    return()=>window.removeEventListener("scroll",h);
  },[]);
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:C.white,borderBottom:`1px solid ${sc?C.gray6:"transparent"}`,boxShadow:sc?"0 1px 6px rgba(60,64,67,0.08)":"none",transition:"all 0.25s"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:C.blue,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Google Sans',sans-serif",fontWeight:700,fontSize:14,color:"#fff"}}>D</div>
          <span style={{fontFamily:"'Google Sans',sans-serif",fontWeight:500,fontSize:16,color:C.gray1}}>Dharun Prasath M</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          {NAV.map(l=>(
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{fontFamily:"'Google Sans',sans-serif",fontSize:13.5,fontWeight:500,color:C.gray2,textDecoration:"none",padding:"6px 14px",borderRadius:6,transition:"all 0.15s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=C.gray7;e.currentTarget.style.color=C.blue;}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.gray2;}}
            >{l}</a>
          ))}
          <a href="mailto:dharunprasath.murugan@gmail.com"
            style={{marginLeft:12,fontFamily:"'Google Sans',sans-serif",fontSize:13.5,fontWeight:500,color:C.white,textDecoration:"none",padding:"8px 20px",borderRadius:6,background:C.blue,transition:"background 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.background=C.blue2}
            onMouseLeave={e=>e.currentTarget.style.background=C.blue}
          >Contact</a>
        </div>
      </div>
    </nav>
  );
}

/* hero */
function Hero() {
  const roles=["AI Engineer","Full Stack Developer","Space Tech Innovator","Robotics Builder"];
  const [typed,setTyped]=useState("");
  const [ri,setRi]=useState(0);
  const [ci,setCi]=useState(0);
  const [del,setDel]=useState(false);

  useEffect(()=>{
    const cur=roles[ri]; let t;
    if(!del&&ci<cur.length)        t=setTimeout(()=>{setTyped(cur.slice(0,ci+1));setCi(c=>c+1);},60);
    else if(!del&&ci===cur.length) t=setTimeout(()=>setDel(true),2000);
    else if(del&&ci>0)             t=setTimeout(()=>{setTyped(cur.slice(0,ci-1));setCi(c=>c-1);},30);
    else if(del&&ci===0)           {setDel(false);setRi(r=>(r+1)%roles.length);}
    return()=>clearTimeout(t);
  },[ci,del,ri]);

  return (
    <section style={{background:C.white,paddingTop:64}}>
      <div style={{height:4,background:"linear-gradient(90deg,#4285f4,#34a853,#fbbc04,#ea4335)"}}/>

      {/* Hero grid */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"80px 24px 64px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}>

        {/* Left: text */}
        <div>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:100,background:C.blueL,marginBottom:28}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:C.green,boxShadow:`0 0 0 2px ${C.greenL}`}}/>
            <span style={{fontFamily:"'Google Sans',sans-serif",fontSize:12,color:C.blue,fontWeight:600,letterSpacing:"0.05em"}}>Open to Opportunities</span>
          </div>
          <h1 style={{fontFamily:"'Google Sans Display',sans-serif",fontSize:"clamp(2.4rem,4.5vw,3.6rem)",fontWeight:400,lineHeight:1.1,color:C.gray1,margin:"0 0 20px",letterSpacing:"-0.02em"}}>
            Dharun Prasath M
          </h1>
          <div style={{height:48,display:"flex",alignItems:"center",marginBottom:24}}>
            <span style={{fontFamily:"'Google Sans',sans-serif",fontSize:"clamp(1.1rem,2.2vw,1.45rem)",fontWeight:400,color:C.blue}}>
              {typed}<span style={{animation:"blink 1s step-end infinite",color:C.blue}}>|</span>
            </span>
          </div>
          <p style={{fontFamily:"'Google Sans Text','DM Sans',sans-serif",fontSize:16,color:C.gray3,lineHeight:1.8,maxWidth:480,marginBottom:40}}>
            Building intelligent systems at the intersection of Artificial Intelligence, Robotics, and Space Exploration. CSE student at SRM University — CGPA 8.2.
          </p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <a href="#projects"
              style={{fontFamily:"'Google Sans',sans-serif",fontWeight:500,fontSize:14,padding:"10px 24px",borderRadius:6,background:C.blue,color:C.white,textDecoration:"none"}}
              onMouseEnter={e=>e.currentTarget.style.background=C.blue2}
              onMouseLeave={e=>e.currentTarget.style.background=C.blue}>
              View Projects
            </a>
            <a href="https://github.com/Dharun-prasath" target="_blank" rel="noreferrer"
              style={{fontFamily:"'Google Sans',sans-serif",fontWeight:500,fontSize:14,padding:"10px 24px",borderRadius:6,border:`1px solid ${C.gray6}`,background:C.white,color:C.gray2,textDecoration:"none",display:"flex",alignItems:"center",gap:8,transition:"border-color 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=C.blue}
              onMouseLeave={e=>e.currentTarget.style.borderColor=C.gray6}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill={C.gray3}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
              GitHub
            </a>
            <a href="https://linkedin.com/in/dharun-prasath" target="_blank" rel="noreferrer"
              style={{fontFamily:"'Google Sans',sans-serif",fontWeight:500,fontSize:14,padding:"10px 24px",borderRadius:6,border:`1px solid ${C.gray6}`,background:C.white,color:C.gray2,textDecoration:"none",display:"flex",alignItems:"center",gap:8,transition:"border-color 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=C.blue}
              onMouseLeave={e=>e.currentTarget.style.borderColor=C.gray6}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#0a66c2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right: profile image with animations */}
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <div style={{position:"relative",width:320,height:320,display:"flex",alignItems:"center",justifyContent:"center"}}>

            {/* Outer slow dashed spinning ring */}
            <div style={{position:"absolute",inset:0,borderRadius:"50%",border:`1.5px dashed ${C.gray6}`,animation:"spin 40s linear infinite",pointerEvents:"none"}}/>

            {/* Conic accent ring — spins fast around image */}
            <div style={{position:"absolute",inset:28,borderRadius:"50%",border:"2.5px solid transparent",background:`linear-gradient(${C.white},${C.white}) padding-box, conic-gradient(from 0deg, ${C.blue}, transparent 55%, ${C.blue}) border-box`,animation:"spin 8s linear infinite",pointerEvents:"none"}}/>

            {/* Profile image — floats */}
            <div style={{position:"relative",width:210,height:210,borderRadius:"50%",overflow:"hidden",border:`3px solid ${C.blueM}`,animation:"float 6s ease-in-out infinite",flexShrink:0}}>
              <img
                src={previewImg}
                alt="Dharun Prasath"
                style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%",animation:"fadeIn 1s ease-in"}}
              />
            </div>

          </div>
        </div>

      </div>{/* end hero grid */}

      {/* Stats bar */}
      <div style={{background:C.gray8,borderTop:`1px solid ${C.gray6}`}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"flex"}}>
          {[
            {n:"8.2",  u:"/10", l:"Academic CGPA"},
            {n:"4+",   u:"",    l:"Space AI Projects"},
            {n:"2",    u:"",    l:"Research Domains"},
            {n:"NIT-T",u:"",    l:"Industry Intern"},
          ].map((s,i)=>(
            <div key={i} style={{flex:1,padding:"24px 0 24px 32px",borderLeft:i===0?"none":`1px solid ${C.gray6}`}}>
              <div style={{fontFamily:"'Google Sans Display',sans-serif",fontSize:26,fontWeight:400,color:C.gray1}}>
                {s.n}<span style={{color:C.blue,fontSize:16}}>{s.u}</span>
              </div>
              <div style={{fontFamily:"'Google Sans Text',sans-serif",fontSize:12.5,color:C.gray3,marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

/* about */
function About() {
  return (
    <section id="about" style={{background:C.white,padding:"80px 24px",borderTop:`1px solid ${C.gray6}`}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:80,alignItems:"start"}}>
        <div>
          <Eyebrow label="About"/>
          <h2 style={{fontFamily:"'Google Sans Display',sans-serif",fontSize:"clamp(1.8rem,3vw,2.5rem)",fontWeight:400,color:C.gray1,margin:"0 0 24px",letterSpacing:"-0.01em",lineHeight:1.2}}>
            Pushing the boundaries of AI and space technology
          </h2>
          <p style={{fontFamily:"'Google Sans Text',sans-serif",fontSize:16,color:C.gray3,lineHeight:1.85,marginBottom:20}}>
            I am a Computer Science and Engineering student at SRM University with strong interests in Artificial Intelligence, Machine Learning, Computer Vision, Robotics, Aerospace Systems, and Planetary Technologies.
          </p>
          <p style={{fontFamily:"'Google Sans Text',sans-serif",fontSize:16,color:C.gray3,lineHeight:1.85,marginBottom:36}}>
            My goal is to create futuristic systems that solve real-world challenges—from autonomous robots and advanced simulations to intelligent space exploration technologies that expand human capability on Earth and beyond.
          </p>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {["Strong AI + Engineering combination","Space-tech innovation mindset","Full Stack + Hardware capability","Research-oriented builder"].map(t=>(
              <div key={t} style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:20,height:20,borderRadius:"50%",background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke={C.blue} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{fontFamily:"'Google Sans Text',sans-serif",fontSize:14,color:C.gray2}}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{padding:24,borderRadius:12,border:`1px solid ${C.gray6}`,background:C.white,boxShadow:"0 1px 3px rgba(60,64,67,0.06)"}}>
            <div style={{fontFamily:"'Google Sans',sans-serif",fontSize:11.5,color:C.gray4,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:16,fontWeight:600}}>Education</div>
            <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
              <div style={{width:44,height:44,borderRadius:10,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🎓</div>
              <div>
                <div style={{fontFamily:"'Google Sans',sans-serif",fontSize:15,fontWeight:600,color:C.gray1,marginBottom:3}}>SRM University</div>
                <div style={{fontFamily:"'Google Sans Text',sans-serif",fontSize:13,color:C.gray3,marginBottom:10}}>B.Tech in Computer Science & Engineering</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <Chip label="Batch 2027" color={C.blue}  bg={C.blueL}/>
                  <Chip label="CGPA 8.2"   color={C.green} bg={C.greenL}/>
                </div>
              </div>
            </div>
          </div>
          <div style={{padding:24,borderRadius:12,border:`1px solid ${C.gray6}`,background:C.white,boxShadow:"0 1px 3px rgba(60,64,67,0.06)"}}>
            <div style={{fontFamily:"'Google Sans',sans-serif",fontSize:11.5,color:C.gray4,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:16,fontWeight:600}}>Certifications</div>
            {["Python Programming","Machine Learning Specialization","Deep Learning Specialization","Data Visualization"].map((c,i,arr)=>(
              <div key={c} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:i<arr.length-1?`1px solid ${C.gray7}`:"none"}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:C.blue,flexShrink:0}}/>
                <span style={{fontFamily:"'Google Sans Text',sans-serif",fontSize:13.5,color:C.gray2}}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* skills */
function Skills() {
  return (
    <section id="skills" style={{background:C.gray8,padding:"80px 24px",borderTop:`1px solid ${C.gray6}`,borderBottom:`1px solid ${C.gray6}`}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <Eyebrow label="Technical Skills" color={C.teal}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40}}>
          <h2 style={{fontFamily:"'Google Sans Display',sans-serif",fontSize:"clamp(1.8rem,3vw,2.4rem)",fontWeight:400,color:C.gray1,margin:0,letterSpacing:"-0.01em"}}>Core Competencies</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
          {SKILLS.map(s=>(
            <div key={s.cat}
              style={{background:C.white,borderRadius:12,border:`1px solid ${C.gray6}`,padding:24,transition:"all 0.2s",cursor:"default"}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 20px rgba(60,64,67,0.1)";e.currentTarget.style.borderColor=s.color+"60";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=C.gray6;}}
            >
              <div style={{width:36,height:36,borderRadius:8,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
                <div style={{width:14,height:14,borderRadius:"50%",background:s.color}}/>
              </div>
              <div style={{fontFamily:"'Google Sans',sans-serif",fontSize:13.5,fontWeight:600,color:C.gray1,marginBottom:16}}>{s.cat}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {s.items.map(i=>(
                  <span key={i} style={{fontFamily:"'Google Sans Text',sans-serif",fontSize:12,fontWeight:500,padding:"3px 10px",borderRadius:4,background:s.bg,color:s.color}}>{i}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* experience */
function Experience() {
  return (
    <section id="experience" style={{background:C.white,padding:"80px 24px",borderBottom:`1px solid ${C.gray6}`}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <Eyebrow label="Experience" color={C.green}/>
        <h2 style={{fontFamily:"'Google Sans Display',sans-serif",fontSize:"clamp(1.8rem,3vw,2.4rem)",fontWeight:400,color:C.gray1,margin:"0 0 40px",letterSpacing:"-0.01em"}}>Professional Experience</h2>
        <div style={{borderRadius:12,border:`1px solid ${C.gray6}`,overflow:"hidden",background:C.white,boxShadow:"0 1px 3px rgba(60,64,67,0.06)"}}>
          <div style={{height:4,background:`linear-gradient(90deg,${C.blue},${C.teal})`}}/>
          <div style={{padding:"32px",display:"grid",gridTemplateColumns:"1fr auto",gap:24,alignItems:"start"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
                <div style={{width:52,height:52,borderRadius:12,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>🏛️</div>
                <div>
                  <h3 style={{fontFamily:"'Google Sans',sans-serif",fontSize:18,fontWeight:600,color:C.gray1,margin:0}}>Full Stack Developer Intern</h3>
                  <div style={{fontFamily:"'Google Sans',sans-serif",fontSize:14,color:C.blue,marginTop:3}}>National Institute of Technology Tiruchirappalli</div>
                </div>
              </div>
              <p style={{fontFamily:"'Google Sans Text',sans-serif",fontSize:14.5,color:C.gray3,lineHeight:1.7,marginBottom:24}}>
                Worked on <strong style={{color:C.gray1,fontWeight:600}}>ThirumathiKart</strong>, a full-featured e-commerce platform—contributing across the full technology stack from database design to frontend implementation.
              </p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
                {[
                  {icon:"⚡",tech:"Golang",                  desc:"High-performance REST APIs"},
                  {icon:"🎨",tech:"React.js + Tailwind CSS", desc:"Responsive UI components"},
                  {icon:"🗄️",tech:"PostgreSQL",              desc:"Schema design & optimization"},
                  {icon:"🔒",tech:"Real-time Integrations",  desc:"Secure payment & auth"},
                ].map(it=>(
                  <div key={it.tech} style={{padding:"14px 16px",borderRadius:8,background:C.gray8,border:`1px solid ${C.gray6}`,display:"flex",gap:12,alignItems:"flex-start"}}>
                    <span style={{fontSize:18,flexShrink:0}}>{it.icon}</span>
                    <div>
                      <div style={{fontFamily:"'Google Sans',sans-serif",fontSize:12.5,fontWeight:600,color:C.gray1}}>{it.tech}</div>
                      <div style={{fontFamily:"'Google Sans Text',sans-serif",fontSize:12,color:C.gray4,marginTop:1}}>{it.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end"}}>
              <Chip label="May – Jun 2025" color={C.blue}  bg={C.blueL}/>
              <Chip label="✓ Completed"   color={C.green} bg={C.greenL}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* projects */
function PCard({p}) {
  const [hov,setHov]=useState(false);
  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{borderRadius:12,border:`1px solid ${hov?p.tc+"50":C.gray6}`,background:C.white,overflow:"hidden",boxShadow:hov?"0 8px 28px rgba(60,64,67,0.12)":"0 1px 3px rgba(60,64,67,0.06)",transition:"all 0.25s ease",transform:hov?"translateY(-4px)":"none",display:"flex",flexDirection:"column"}}
    >
      <div style={{padding:"24px 24px 0"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16}}>
          <Chip label={p.tag} color={p.tc} bg={p.tb}/>
          <span style={{fontSize:28}}>{p.emoji}</span>
        </div>
        <h3 style={{fontFamily:"'Google Sans',sans-serif",fontSize:16.5,fontWeight:600,color:C.gray1,margin:"0 0 5px"}}>{p.title}</h3>
        <div style={{fontFamily:"'Google Sans Text',sans-serif",fontSize:12.5,color:C.gray4,marginBottom:12}}>{p.sub}</div>
        <p style={{fontFamily:"'Google Sans Text',sans-serif",fontSize:13.5,color:C.gray3,lineHeight:1.7,margin:0}}>{p.desc}</p>
      </div>
      <div style={{flex:1}}/>
      <div style={{padding:"16px 24px",borderTop:`1px solid ${C.gray7}`,marginTop:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {p.stack.map(s=><span key={s} style={{fontFamily:"'Google Sans Text',sans-serif",fontSize:11.5,fontWeight:500,padding:"3px 10px",borderRadius:4,background:C.gray7,color:C.gray2}}>{s}</span>)}
        </div>
        {p.href&&<a href={p.href} target="_blank" rel="noreferrer" style={{fontFamily:"'Google Sans',sans-serif",fontSize:12.5,fontWeight:600,color:C.blue,textDecoration:"none",flexShrink:0,marginLeft:12}}>View →</a>}
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" style={{background:C.gray8,padding:"80px 24px",borderBottom:`1px solid ${C.gray6}`}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <Eyebrow label="Projects" color={C.orange}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40}}>
          <h2 style={{fontFamily:"'Google Sans Display',sans-serif",fontSize:"clamp(1.8rem,3vw,2.4rem)",fontWeight:400,color:C.gray1,margin:0,letterSpacing:"-0.01em"}}>Featured Work</h2>
          <a href="https://github.com/Dharun-prasath" target="_blank" rel="noreferrer" style={{fontFamily:"'Google Sans',sans-serif",fontSize:13.5,color:C.blue,textDecoration:"none",fontWeight:500}}>See all on GitHub →</a>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16}}>
          {PROJECTS.map(p=><PCard key={p.title} p={p}/>)}
        </div>
      </div>
    </section>
  );
}

/* vision banner */
function Vision() {
  return (
    <section style={{background:C.blue,padding:"72px 24px"}}>
      <div style={{maxWidth:900,margin:"0 auto",textAlign:"center"}}>
        <div style={{fontFamily:"'Google Sans',sans-serif",fontSize:11.5,color:"rgba(255,255,255,0.65)",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:20,fontWeight:600}}>Vision Statement</div>
        <blockquote style={{fontFamily:"'Google Sans Display',sans-serif",fontSize:"clamp(1.25rem,2.5vw,1.85rem)",fontWeight:400,color:"#fff",lineHeight:1.6,margin:"0 0 36px"}}>
          "To engineer intelligent technologies that expand human capability on Earth and beyond—through AI, robotics, and space systems."
        </blockquote>
        <div style={{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap"}}>
          {["Engineer by Curiosity","Builder by Passion","Innovator by Vision","Space by Destiny"].map(t=>(
            <span key={t} style={{fontFamily:"'Google Sans',sans-serif",fontSize:12.5,fontWeight:500,padding:"6px 16px",borderRadius:100,background:"rgba(255,255,255,0.15)",color:"#fff",border:"1px solid rgba(255,255,255,0.25)"}}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* contact */
function Contact() {
  const links=[
    {icon:"✉️",label:"Email",    val:"dharunprasath.murugan@gmail.com", href:"mailto:dharunprasath.murugan@gmail.com"},
    {icon:"📱",label:"Phone",    val:"+91 76049 04493",                  href:"tel:+917604904493"},
    {icon:"💼",label:"LinkedIn", val:"linkedin.com/in/dharun-prasath",   href:"https://linkedin.com/in/dharun-prasath"},
    {icon:"🐙",label:"GitHub",   val:"github.com/Dharun-prasath",        href:"https://github.com/Dharun-prasath"},
  ];
  return (
    <section id="contact" style={{background:C.white,padding:"80px 24px",borderTop:`1px solid ${C.gray6}`}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
        <div>
          <Eyebrow label="Contact" color={C.red}/>
          <h2 style={{fontFamily:"'Google Sans Display',sans-serif",fontSize:"clamp(1.8rem,3vw,2.5rem)",fontWeight:400,color:C.gray1,margin:"0 0 20px",letterSpacing:"-0.01em",lineHeight:1.2}}>
            Let's build something extraordinary
          </h2>
          <p style={{fontFamily:"'Google Sans Text',sans-serif",fontSize:15.5,color:C.gray3,lineHeight:1.8,marginBottom:32}}>
            Open to internships, research collaborations, and exciting projects at the frontier of AI, robotics, and space technology. Let's connect.
          </p>
          <a href="mailto:dharunprasath.murugan@gmail.com"
            style={{display:"inline-block",fontFamily:"'Google Sans',sans-serif",fontWeight:500,fontSize:14,padding:"11px 28px",borderRadius:6,background:C.blue,color:"#fff",textDecoration:"none"}}
            onMouseEnter={e=>e.currentTarget.style.background=C.blue2}
            onMouseLeave={e=>e.currentTarget.style.background=C.blue}>
            Send a Message
          </a>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {links.map(l=>(
            <a key={l.label} href={l.href}
              target={l.href.startsWith("http")?"_blank":undefined}
              rel="noreferrer"
              style={{display:"flex",flexDirection:"column",gap:8,padding:20,borderRadius:12,border:`1px solid ${C.gray6}`,textDecoration:"none",background:C.white,transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.blue;e.currentTarget.style.boxShadow="0 2px 12px rgba(26,115,232,0.1)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.gray6;e.currentTarget.style.boxShadow="none";}}>
              <span style={{fontSize:22}}>{l.icon}</span>
              <div>
                <div style={{fontFamily:"'Google Sans',sans-serif",fontSize:11,color:C.gray4,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:3}}>{l.label}</div>
                <div style={{fontFamily:"'Google Sans Text',sans-serif",fontSize:12.5,color:C.gray2,wordBreak:"break-all"}}>{l.val}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* footer */
function Footer() {
  return (
    <footer style={{background:C.gray8,borderTop:`1px solid ${C.gray6}`,padding:"24px"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <span style={{fontFamily:"'Google Sans',sans-serif",fontSize:13,color:C.gray4}}>© 2025 Dharun Prasath M</span>
        <div style={{display:"flex",gap:24}}>
          {NAV.map(l=>(
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{fontFamily:"'Google Sans',sans-serif",fontSize:12.5,color:C.gray4,textDecoration:"none"}}
              onMouseEnter={e=>e.currentTarget.style.color=C.blue}
              onMouseLeave={e=>e.currentTarget.style.color=C.gray4}>
              {l}
            </a>
          ))}
        </div>
        <span style={{fontFamily:"'Google Sans',sans-serif",fontSize:12,color:C.gray5}}>SRM University · CSE · 2027</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Google+Sans+Display:wght@400;500;700&family=Google+Sans+Text:wght@400;500&family=DM+Sans:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#f8f9fa;color:#202124;overflow-x:hidden;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes float{
          0%,100%{transform:translateY(0px);box-shadow:0 0 0 8px rgba(26,115,232,0.06),0 8px 32px rgba(26,115,232,0.12);}
          50%{transform:translateY(-10px);box-shadow:0 0 0 8px rgba(26,115,232,0.1),0 20px 48px rgba(26,115,232,0.18);}
        }
        @keyframes fadeIn{from{opacity:0;transform:scale(0.9);}to{opacity:1;transform:scale(1);}}
        ::-webkit-scrollbar{width:6px;}
        ::-webkit-scrollbar-track{background:#f1f3f4;}
        ::-webkit-scrollbar-thumb{background:#dadce0;border-radius:3px;}
      `}</style>
      <Nav/>
      <Hero/>
      <About/>
      <Skills/>
      <Experience/>
      <Projects/>
      <Vision/>
      <Contact/>
      <Footer/>
    </>
  );
}