import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity } from 'lucide-react';
import { fadeUp, staggerContainer, viewport } from '../utils/scrollAnimations';

const TextSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center py-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/20 via-bg-dark to-bg-dark" />
      
      <div className="z-10 container mx-auto px-6 text-center">
        <motion.div 
          variants={staggerContainer(0.18, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center gap-6 md:gap-8 text-4xl md:text-6xl lg:text-7xl font-sans"
        >
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <span>Engineer</span>
            <div className="glass-pill !px-4 !py-2 md:!px-8 md:!py-3 flex items-center justify-center">
              <Cpu className="w-8 h-8 md:w-12 md:h-12 text-white/50" />
            </div>
            <span>Your</span>
          </motion.div>
          
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <span>Vision</span>
            <div className="glass-pill !px-4 !py-2 md:!px-8 md:!py-3 flex items-center justify-center">
              <Zap className="w-8 h-8 md:w-12 md:h-12 text-white/50" />
            </div>
            <span className="font-serif italic text-accent-purple px-2">Manifest</span>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <span>The</span>
            <div className="glass-pill !px-4 !py-2 md:!px-8 md:!py-3 flex items-center justify-center">
              <Activity className="w-8 h-8 md:w-12 md:h-12 text-white/50" />
            </div>
            <span className="font-serif italic text-accent-purple">Future</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TextSection;
