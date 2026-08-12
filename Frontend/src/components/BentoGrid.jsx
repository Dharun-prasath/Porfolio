import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Database, Eye, Wrench, MessageSquare } from 'lucide-react';
import { fadeUp, scaleUp, staggerContainer, viewport } from '../utils/scrollAnimations';

const bentoItems = [
  {
    title: "AI / ML",
    description: "Python, PyTorch, TensorFlow, Scikit-learn",
    icon: <Brain className="w-8 h-8 text-accent-purple" />,
    colSpan: "md:col-span-2",
  },
  {
    title: "Computer Vision",
    description: "OpenCV, YOLO, Image Segmentation",
    icon: <Eye className="w-8 h-8 text-accent-purple" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "Generative AI",
    description: "RAG, LLMs, LangChain, Embeddings",
    icon: <MessageSquare className="w-8 h-8 text-accent-purple" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "Robotics",
    description: "ROS 2, Sensors, Control Systems, Simulation",
    icon: <Cpu className="w-8 h-8 text-accent-purple" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "Software Dev",
    description: "FastAPI, React, PostgreSQL, Firebase",
    icon: <Database className="w-8 h-8 text-accent-purple" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "Tools & CAD",
    description: "Git, Docker, Fusion 360, ANSYS, OpenFOAM",
    icon: <Wrench className="w-8 h-8 text-accent-purple" />,
    colSpan: "md:col-span-3",
  },
];

const BentoGrid = () => {
  return (
    <section id="skills" className="py-24 container mx-auto px-6 max-w-6xl">
      <motion.div 
        className="mb-16"
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.h2 
          variants={fadeUp}
          className="text-4xl md:text-5xl font-sans font-medium mb-4"
        >
          Technical <span className="font-bold text-accent-purple">Skills</span>
        </motion.h2>
        <motion.p 
          variants={fadeUp}
          className="text-text-muted max-w-xl text-lg"
        >
          An organized overview of my core engineering capabilities and the tools I use to build.
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]"
        variants={staggerContainer(0.08, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {bentoItems.map((item, index) => (
          <motion.div
            key={index}
            variants={scaleUp}
            className={`bento-card flex flex-col justify-between group ${item.colSpan}`}
          >
            <div className="mb-8">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent-purple/20 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-medium font-sans mb-3 text-white">{item.title}</h3>
              <p className="text-white/60 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
            
            {/* Abstract visual element inside card */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-purple/10 rounded-full blur-[40px] group-hover:bg-accent-purple/30 transition-colors duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BentoGrid;
