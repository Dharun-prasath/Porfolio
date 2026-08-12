import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';
import { fadeUp, fadeRight, staggerContainer, viewport } from '../utils/scrollAnimations';

const projects = [
  {
    title: "LunaSurface AI",
    subtitle: "Computer vision / segmentation project",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=800&q=80",
    problem: "Identifying safe landing zones and topographical anomalies on lunar surfaces requires highly accurate, automated crater and boulder detection.",
    approach: "Developed a custom image segmentation pipeline to process satellite imagery, creating masks for craters and hazardous terrain.",
    technology: ["Python", "PyTorch", "OpenCV", "U-Net", "AWS"],
    result: "Achieved 94% IoU on test datasets, reducing manual annotation time by 80%.",
    github: "#",
    demo: "#"
  },
  {
    title: "AI Robotic Dog",
    subtitle: "Vision + voice + autonomous robotics",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    problem: "Quadruped robots often lack intuitive human-robot interaction and require complex manual controls for navigation.",
    approach: "Integrated local LLMs for voice command interpretation and stereo vision for obstacle avoidance, creating a fully autonomous patrol loop.",
    technology: ["ROS 2", "C++", "Python", "Whisper", "YOLOv8"],
    result: "Enabled zero-shot voice navigation and real-time dynamic obstacle avoidance.",
    github: "#",
    demo: "#"
  },
  {
    title: "Drone Dust Dynamics",
    subtitle: "Drone-based sensing and data analysis",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
    problem: "Monitoring particulate matter and dust dynamics in large-scale industrial sites is slow and hazardous for ground crews.",
    approach: "Built a drone-mounted sensing array connected to an edge-processing unit that maps dust density in 3D space.",
    technology: ["Raspberry Pi", "Sensors", "Python", "Data Visualization"],
    result: "Successfully generated 3D heatmap overlays of active industrial sites in real-time.",
    github: "#",
    demo: "#"
  },
  {
    title: "External Brain AI",
    subtitle: "Personal memory / RAG assistant",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    problem: "Cloud-based AI assistants compromise data privacy and lack long-term contextual memory of user-specific desktop activities.",
    approach: "Deployed a local LLM augmented with Retrieval-Augmented Generation (RAG) to process and recall local files, integrated with a voice interface.",
    technology: ["LangChain", "Llama 3", "ChromaDB", "FastAPI"],
    result: "Created a completely private, voice-activated assistant with instant recall of local documents.",
    github: "#",
    demo: "#"
  },
  {
    title: "Software & Tooling",
    subtitle: "Continuous experimentation",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
    problem: "Exploring varied domains from NLP to web infrastructure.",
    approach: "Built various microservices, web apps, and machine learning scripts to automate tasks and test new frameworks.",
    technology: ["Docker", "Firebase", "Node.js", "Scikit-learn"],
    result: "A diverse GitHub portfolio demonstrating full-stack and ML capabilities.",
    github: "#",
    demo: "#"
  }
];

const Projects = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    let animationFrameId;
    const container = scrollRef.current;

    const step = () => {
      if (container && !isHovered) {
        container.scrollLeft += 1.5; // Auto-scroll speed
        
        // Loop back to start smoothly
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  // Handle manual wrap-around if user scrolls wildly
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    
    if (container.scrollLeft >= container.scrollWidth / 2) {
      container.scrollLeft = 0;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft = container.scrollWidth / 2;
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div>
            <motion.h2 
              variants={fadeUp}
              className="text-4xl md:text-5xl font-sans font-medium mb-4"
            >
              Featured <span className="font-bold text-accent-purple">Projects</span>
            </motion.h2>
            <motion.p 
              variants={fadeUp}
              className="text-text-muted max-w-xl text-lg"
            >
              A selection of my work in robotics, computer vision, and software engineering.
            </motion.p>
          </div>
        </motion.div>

        {/* Infinite Auto-Scroll & Manual Scroll Container */}
        <div className="relative -mx-6 px-6 overflow-hidden group">
          <div 
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            onScroll={handleScroll}
            className="flex gap-6 pb-12 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {[...projects, ...projects].map((project, index) => (
              <div 
                key={index}
                className="bg-card-bg rounded-[2rem] border border-white/5 relative overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-accent-purple/40 hover:shadow-[0_0_30px_rgba(107,33,168,0.15)] flex flex-col min-w-[320px] md:min-w-[400px] w-[320px] md:w-[400px] flex-none"
              >
                {/* Image Section (Top Half) */}
                <div className="w-full h-32 md:h-40 relative overflow-hidden bg-white/5 flex-shrink-0 group/img">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110 opacity-70 group-hover/img:opacity-100" 
                  />
                  {/* Subtle gradient to blend image into background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card-bg to-transparent opacity-90"></div>
                </div>

                {/* Content Section (Bottom Half) */}
                <div className="p-5 pt-4 flex flex-col h-full relative z-10">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold font-sans text-white mb-0.5 transition-colors truncate">{project.title}</h3>
                    <p className="text-accent-purple/70 font-medium text-[12px] truncate">{project.subtitle}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technology.map((tech, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-white/70 font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2.5 text-white/70 font-light leading-relaxed text-[12px] flex-grow">
                    <div className="line-clamp-2">
                      <strong className="text-white font-medium mr-1.5">Problem:</strong>
                      <span>{project.problem}</span>
                    </div>
                    <div className="line-clamp-2">
                      <strong className="text-white font-medium mr-1.5">Approach:</strong>
                      <span>{project.approach}</span>
                    </div>
                    <div className="line-clamp-2">
                      <strong className="text-accent-purple font-medium mr-1.5">Result:</strong>
                      <span className="text-white/90">{project.result}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-4 pt-3 border-t border-white/10">
                    <a href={project.github} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
                      <Code className="w-4 h-4" /> Code
                    </a>
                    <a href={project.demo} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Fade gradients to smooth the edges */}
          <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-bg-main to-transparent pointer-events-none z-20"></div>
          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-bg-main to-transparent pointer-events-none z-20"></div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
