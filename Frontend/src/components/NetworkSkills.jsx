import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Cpu, Code, Wrench, Eye, Database, Globe, Box, Server, Compass, Layers, Activity } from 'lucide-react';
import { fadeUp, staggerContainer, viewport } from '../utils/scrollAnimations';

const NetworkSkills = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  // viewBox dimensions
  const width = 1600;
  const height = 800;
  // Center cx perfectly
  const cx = width / 2;
  const cy = height / 2;

  const rightNodes = [
    { id: 'ai', label: 'AI / Machine Learning', y: 150 },
    { id: 'cv', label: 'Computer Vision', y: 275 },
    { id: 'genai', label: 'Generative AI', y: 400 },
    { id: 'robotics', label: 'Robotics', y: 525 },
    { id: 'software', label: 'Software & Tools', y: 650 },
  ];

  const allSkills = {
    ai: [
      { id: 'python', label: 'Python', icon: Code },
      { id: 'pytorch', label: 'PyTorch', icon: BrainCircuit },
      { id: 'tf', label: 'TensorFlow', icon: Cpu },
      { id: 'scikit', label: 'Scikit-learn', icon: Box },
    ],
    cv: [
      { id: 'opencv', label: 'OpenCV', icon: Eye },
      { id: 'yolo', label: 'YOLO', icon: Compass },
      { id: 'segment', label: 'Segmentation', icon: Layers },
    ],
    genai: [
      { id: 'rag', label: 'RAG', icon: Database },
      { id: 'llm', label: 'LLMs', icon: BrainCircuit },
      { id: 'langchain', label: 'LangChain', icon: Layers },
      { id: 'embed', label: 'Embeddings', icon: Server },
    ],
    robotics: [
      { id: 'ros2', label: 'ROS 2', icon: Cpu },
      { id: 'sensors', label: 'Sensors', icon: Activity },
      { id: 'control', label: 'Control Systems', icon: Wrench },
      { id: 'sim', label: 'Simulation', icon: Box },
    ],
    software: [
      { id: 'fastapi', label: 'FastAPI', icon: Server },
      { id: 'react', label: 'React', icon: Globe },
      { id: 'postgres', label: 'PostgreSQL', icon: Database },
      { id: 'firebase', label: 'Firebase', icon: Server },
      { id: 'git', label: 'Git', icon: Code },
      { id: 'docker', label: 'Docker', icon: Wrench },
      { id: 'fusion', label: 'Fusion 360', icon: Box },
      { id: 'ansys', label: 'ANSYS', icon: Cpu },
      { id: 'openfoam', label: 'OpenFOAM', icon: Box },
    ]
  };

  const defaultSkills = [
    { id: 'd-python', label: 'Python', icon: Code },
    { id: 'd-pytorch', label: 'PyTorch', icon: BrainCircuit },
    { id: 'd-opencv', label: 'OpenCV', icon: Eye },
    { id: 'd-langchain', label: 'LangChain', icon: Layers },
    { id: 'd-ros2', label: 'ROS 2', icon: Cpu },
    { id: 'd-react', label: 'React', icon: Globe },
    { id: 'd-docker', label: 'Docker', icon: Wrench },
    { id: 'd-fusion', label: 'Fusion 360', icon: Box },
  ];

  const currentSkillsData = activeCategory ? allSkills[activeCategory] : defaultSkills;

  // Calculate left nodes positions in an elliptical arc to stretch horizontally
  const radiusX = 700;
  const radiusY = 350;
  const leftNodes = currentSkillsData.map((node, index) => {
    // Spread evenly between 110 and 250 degrees
    const startAngle = 110;
    const endAngle = 250;
    
    // Handle single node edge case
    let angleDeg = 180;
    if (currentSkillsData.length > 1) {
      angleDeg = startAngle + (endAngle - startAngle) * (index / (currentSkillsData.length - 1));
    }
    
    const angleRad = (angleDeg * Math.PI) / 180;
    
    return {
      ...node,
      x: cx + radiusX * Math.cos(angleRad),
      y: cy + radiusY * Math.sin(angleRad),
    };
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-bg-dark">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="text-center mb-16 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, x: -100, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Technical <span className="text-accent-purple">Skills</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-white/50 text-sm max-w-xl mx-auto"
          >
            Click or hover over a category to see its specific technologies.
          </motion.p>
        </div>

        {/* The SVG and Interactive Layer */}
        <motion.div 
          className="relative w-full max-w-7xl aspect-[2/1] mx-auto hidden md:block" 
          onMouseLeave={() => setActiveCategory(null)}
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          
          <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" className="w-full h-full absolute inset-0 pointer-events-none">
            
            {/* Lines to Right Nodes */}
            {rightNodes.map((node) => {
              const isActive = activeCategory === node.id;
              const isDimmed = activeCategory && !isActive;
              return (
                <path
                  key={`line-right-${node.id}`}
                  d={`M ${cx} ${cy} C ${cx + 150} ${cy}, ${cx + 300} ${node.y}, ${cx + 450} ${node.y}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={isActive ? 2 : 1}
                  className="transition-all duration-300 ease-in-out"
                  style={{ opacity: isDimmed ? 0.2 : 1 }}
                />
              );
            })}

            {/* Lines to Left Nodes */}
            <AnimatePresence>
              {leftNodes.map((node) => (
                <motion.path
                  key={`line-left-${node.id}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  d={`M ${cx} ${cy} C ${cx - 200} ${cy}, ${node.x + 150} ${node.y}, ${node.x} ${node.y}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth={activeCategory ? 2 : 1}
                />
              ))}
            </AnimatePresence>

            {/* Center Node SVG Halo */}
            <circle cx={cx} cy={cy} r="50" fill="rgba(107,33,168,0.2)" />
            <circle cx={cx} cy={cy} r="70" fill="none" stroke="rgba(216,180,254,0.4)" strokeWidth="2" strokeDasharray="4 4" className="animate-[spin_10s_linear_infinite] transform-origin-center" style={{ transformOrigin: `${cx}px ${cy}px` }} />
            <circle cx={cx} cy={cy} r="90" fill="none" stroke="rgba(216,180,254,0.1)" strokeWidth="1" />
          </svg>

          {/* HTML Overlay for Nodes */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            
            {/* Center Node (Skills) */}
            <div 
              className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center group"
              style={{ left: `${(cx / width) * 100}%`, top: `${(cy / height) * 100}%` }}
            >
              {/* Outer radar pulse */}
              <div className="absolute inset-[-20px] rounded-full border border-accent-purple/50 animate-ping opacity-30" style={{ animationDuration: '3s' }} />
              
              {/* Main Core */}
              <div className="w-24 h-24 rounded-full bg-accent-purple/20 border border-accent-purple/50 flex flex-col items-center justify-center backdrop-blur-xl shadow-[inset_0_0_20px_rgba(107,33,168,0.5),0_0_30px_rgba(107,33,168,0.6)] transition-all duration-500 group-hover:bg-accent-purple/30 group-hover:shadow-[inset_0_0_30px_rgba(107,33,168,0.8),0_0_50px_rgba(107,33,168,0.9)] group-hover:border-accent-purple">
                <span className="text-white font-bold text-[11px] tracking-[0.25em] uppercase transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]">skills</span>
              </div>
            </div>

            {/* Right Nodes */}
            {rightNodes.map((node) => {
              const isActive = activeCategory === node.id;
              const isDimmed = activeCategory && !isActive;
              return (
                <div
                  key={`html-right-${node.id}`}
                  className="absolute pointer-events-auto transform -translate-y-1/2 flex items-center transition-all duration-300 cursor-pointer group z-10"
                  style={{ 
                    left: `${((cx + 450) / width) * 100}%`, 
                    top: `${(node.y / height) * 100}%`,
                    opacity: isDimmed ? 0.3 : 1 
                  }}
                  onMouseEnter={() => setActiveCategory(node.id)}
                  onClick={() => setActiveCategory(node.id)}
                >
                  <div className={`w-4 h-4 rounded-full mr-4 transition-colors ${isActive ? 'bg-accent-purple' : 'bg-accent-purple/30'}`} />
                  <div className={`glass-pill !py-3 !px-6 whitespace-nowrap transition-all ${isActive ? 'border-accent-purple bg-accent-purple/20 text-white font-bold' : 'border-accent-purple/10 text-white/70'}`}>
                    {node.label}
                  </div>
                </div>
              );
            })}

            {/* Left Nodes */}
            <AnimatePresence>
              {leftNodes.map((node) => {
                const Icon = node.icon;
                return (
                  <motion.div
                    key={`html-left-${node.id}`}
                    initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
                    animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                    exit={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
                    transition={{ duration: 0.3 }}
                    className="absolute pointer-events-auto flex justify-center items-center z-10"
                    style={{ 
                      left: `${(node.x / width) * 100}%`, 
                      top: `${(node.y / height) * 100}%`,
                      width: '56px',
                      height: '56px',
                    }}
                  >
                    <div className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border transition-all bg-accent-purple/10 border-accent-purple/40 text-accent-purple shadow-[0_0_15px_rgba(107,33,168,0.2)]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="absolute top-[120%] text-sm font-bold whitespace-nowrap text-white/90">
                      {node.label}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mobile Fallback */}
        <motion.div 
          className="md:hidden space-y-6 relative z-10"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {rightNodes.map((category) => (
            <motion.div key={category.id} variants={fadeUp} className="bento-card p-6 border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">{category.label}</h3>
              <div className="flex flex-wrap gap-3">
                {allSkills[category.id].map(node => {
                  const Icon = node.icon;
                  return (
                    <div key={node.id} className="glass-pill !py-2 !px-4 flex items-center gap-2 border-white/10">
                      <Icon className="w-4 h-4 text-accent-purple" />
                      <span className="text-sm font-bold">{node.label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default NetworkSkills;
