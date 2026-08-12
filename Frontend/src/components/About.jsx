import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Eye, Code } from 'lucide-react';
import { fadeUp, staggerContainer, viewport } from '../utils/scrollAnimations';

const About = () => {
  return (
    <section id="about" className="py-24 container mx-auto px-6 max-w-6xl">
      <motion.div
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        {/* Left Column: Text */}
        <div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-sans font-medium mb-8"
          >
            About <span className="font-bold text-accent-purple">Me</span>
          </motion.h2>

          <div className="space-y-6 text-white/70 text-lg leading-relaxed font-light">
            <motion.p variants={fadeUp}>
              I am <span className="font-semibold text-white">Dharun Prasath</span>, an <span className="font-semibold text-white">AI & Robotics Engineer</span> driven by the challenge of bridging the gap between <span className="font-semibold text-white">intelligent software and physical execution</span>. I specialize in building systems that can perceive, reason, and act in complex environments.
            </motion.p>
            <motion.p variants={fadeUp}>
              My engineering background is deeply rooted in both <span className="font-semibold text-white">theoretical machine learning</span> and <span className="font-semibold text-white">hands-on robotics</span>. I thrive in developing <span className="font-semibold text-white">end-to-end solutions</span>—from training custom <span className="font-semibold text-white">computer vision models</span> to deploying them on <span className="font-semibold text-white">edge hardware</span> for real-time control.
            </motion.p>
            <motion.p variants={fadeUp}>
              I have a strong technical interest in <span className="font-semibold text-white">Artificial Intelligence, Machine Learning, Computer Vision, Software Development, and Robotics.</span> Whether it's crafting a robust API backend or tuning sensor fusion algorithms, I approach every project with a <span className="font-semibold text-white">performance-first mindset</span>.
            </motion.p>
          </div>
        </div>

        {/* Right Column: 4 Cards with Vertical Line Mapping */}
        <motion.div
          variants={fadeUp}
          className="relative lg:pl-16 w-full mt-12 lg:mt-0"
        >
          {/* Vertical Line & Center Mapping (Desktop only) */}
          <div className="hidden lg:block absolute left-0 top-[5%] bottom-[5%] w-[2px] bg-accent-purple/20 z-0">

          </div>

          {/* Main Network Connector (Desktop only) */}
          <div className="hidden lg:block absolute top-0 bottom-0 right-0 pointer-events-none z-10" style={{ left: '64px' }}>

            {/* 1. Main Vertical Line (Timeline) */}
            <div className="absolute top-[5%] bottom-[5%] w-[2px] bg-accent-purple/20 transform -translate-x-1/2" style={{ left: '-64px' }} />

            {/* 2. Single Main Horizontal Line (Timeline to Right Branch) */}
            <div className="absolute top-1/2 h-[2px] bg-accent-purple/30 transform -translate-y-1/2" style={{ left: '-64px', width: 'calc(75% + 8px + 64px)' }} />

            {/* 3. Central Hub */}
            <div className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full bg-[#0a0a0c] border-2 border-accent-purple shadow-[0_0_15px_rgba(107,33,168,0.6)] transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
              <div className="w-2 h-2 bg-accent-purple rounded-full" />
            </div>

            {/* 4. Vertical Branches (Connecting horizontal trunk to cards) */}
            {/* Left Vertical Branch (Connects Top-Left and Bottom-Left Cards) */}
            <div className="absolute w-[2px] bg-accent-purple/30 transform -translate-x-1/2" style={{ left: 'calc(25% - 8px)', top: 'calc(50% - 16px)', height: '32px' }} />

            {/* Right Vertical Branch (Connects Top-Right and Bottom-Right Cards) */}
            <div className="absolute w-[2px] bg-accent-purple/30 transform -translate-x-1/2" style={{ left: 'calc(75% + 8px)', top: 'calc(50% - 16px)', height: '32px' }} />

            {/* 5. Contact Nodes (Where lines touch the cards) */}
            {/* Top-Left (Bottom Center of Card) */}
            <div className="absolute w-2 h-2 bg-accent-purple rounded-full shadow-[0_0_8px_#6B21A8] transform -translate-x-1/2 -translate-y-1/2" style={{ left: 'calc(25% - 8px)', top: 'calc(50% - 16px)' }} />
            {/* Top-Right (Bottom Center of Card) */}
            <div className="absolute w-2 h-2 bg-accent-purple rounded-full shadow-[0_0_8px_#6B21A8] transform -translate-x-1/2 -translate-y-1/2" style={{ left: 'calc(75% + 8px)', top: 'calc(50% - 16px)' }} />
            {/* Bottom-Left (Top Center of Card) */}
            <div className="absolute w-2 h-2 bg-accent-purple rounded-full shadow-[0_0_8px_#6B21A8] transform -translate-x-1/2 -translate-y-1/2" style={{ left: 'calc(25% - 8px)', top: 'calc(50% + 16px)' }} />
            {/* Bottom-Right (Top Center of Card) */}
            <div className="absolute w-2 h-2 bg-accent-purple rounded-full shadow-[0_0_8px_#6B21A8] transform -translate-x-1/2 -translate-y-1/2" style={{ left: 'calc(75% + 8px)', top: 'calc(50% + 16px)' }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 relative z-30">
            {[
              { title: "Artificial Intelligence", icon: Brain, desc: "Building intelligent predictive models" },
              { title: "Robotics Systems", icon: Cpu, desc: "Hardware & complex control algorithms" },
              { title: "Computer Vision", icon: Eye, desc: "Advanced perception & visual processing" },
              { title: "Software Engineering", icon: Code, desc: "Scalable backends & robust systems" },
            ].map((card, idx) => (
              <div key={idx} className="bento-card group hover:-translate-y-1 cursor-default p-5 flex flex-col justify-center min-h-[140px] bg-card-bg/80 backdrop-blur-sm border-white/5 hover:border-accent-purple/30 shadow-lg relative overflow-hidden">
                <h3 className="text-base font-medium text-white mb-1.5 relative z-10">{card.title}</h3>
                <p className="text-xs text-white/50 relative z-10">{card.desc}</p>

                {/* Internal abstract glow on hover */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-accent-purple/10 rounded-full blur-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;

