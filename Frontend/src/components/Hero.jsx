import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroImage from '../assets/hero.png';

const Hero = () => {
  const containerRef = useRef(null);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse movements with a spring
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax transforms: image moves slightly away from mouse, text moves slightly towards mouse
  const imageX = useTransform(smoothMouseX, [-1, 1], [15, -15]);
  const imageY = useTransform(smoothMouseY, [-1, 1], [15, -15]);
  
  const textX = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const textY = useTransform(smoothMouseY, [-1, 1], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Normalize coordinates to -1 to 1 range, centered
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    // Reset back to center when mouse leaves
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 cursor-default"
    >

      {/* Abstract 3D Blob placeholder (CSS generated) */}
      <div className="absolute -bottom-[200px] right-[150px] w-[700px] h-[700px] bg-accent-purple rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob pointer-events-none z-0" />
      <div className="absolute -bottom-[100px] right-[250px] w-[500px] h-[500px] bg-accent-purple rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-blob animation-delay-2000 pointer-events-none z-0" />

      {/* Hero Image with Parallax Entrance and Continuous Floating */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl z-0 pointer-events-none flex justify-center items-end h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
          style={{ x: imageX, y: imageY }}
        >
          <motion.img
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            src={heroImage}
            alt="Dharun AI/Robotics"
            className="w-full h-full object-contain object-bottom opacity-90"
          />
        </motion.div>
      </div>

      {/* Full-width gradient fade at the bottom to blend the section into the next */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-bg-dark to-transparent pointer-events-none z-0"></div>

      {/* Text Content with Parallax */}
      <motion.div 
        className="z-10 text-center flex flex-col items-center px-4 relative"
        style={{ x: textX, y: textY }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)', y: 20 }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 text-center drop-shadow-2xl"
        >
          AI & Robotics Engineer
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-2xl md:text-3xl lg:text-4xl font-medium text-white/90 mt-4 tracking-wide"
        >
          Imagining Beyond Reality.
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="mt-10"
        >
          <a href="#projects" className="glass-pill !py-4 hover:bg-white/10 transition-all font-medium text-white shadow-[0_0_20px_rgba(107,33,168,0.25)] hover:shadow-[0_0_35px_rgba(107,33,168,0.4)] border-accent-purple/30 group inline-flex items-center gap-2">
            Explore My Work
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-white/30" />
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;
