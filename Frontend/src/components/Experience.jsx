import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { fadeLeft, staggerContainer, viewport } from '../utils/scrollAnimations';

const experiences = [
  {
    id: 1,
    role: "Research Intern",
    company: "NIT Trichy",
    period: "May 2023 - Aug 2023",
    description: "Worked on advanced robotics research, focusing on computer vision and control systems. Developed algorithms for autonomous navigation and object detection in dynamic environments. Orchestrated sensor fusion pipelines for real-time edge processing.",
    color: "bg-accent-purple" // primary
  },
  {
    id: 2,
    role: "Software Engineering Intern",
    company: "Previous Company",
    period: "Jan 2023 - April 2023",
    description: "Contributed to backend API development using FastAPI and PostgreSQL. Optimized database queries, implemented Redis caching, and deployed microservices using Docker on AWS EC2 instances.",
    color: "bg-white/20"
  },
  {
    id: 3,
    role: "Hackathons & Competitions",
    company: "Various Events",
    period: "2021 - Present",
    description: "Participated in multiple national-level hackathons focusing on AI and hardware integration, building rapid prototypes under strict time constraints. Led a team of 4 to win the Smart India Hackathon.",
    color: "bg-white/20"
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          className="mb-16"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <h2 className="text-3xl md:text-5xl font-sans font-medium text-left">
            Professional <span className="font-bold text-accent-purple">Experience</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="space-y-16 border-l border-white/10 ml-6 pl-8 md:pl-12 relative"
            variants={staggerContainer(0.15, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            
            {experiences.map((exp) => (
              <motion.div 
                key={exp.id}
                variants={fadeLeft}
                className="relative group"
              >
                <div className={`absolute -left-[41px] md:-left-[57px] top-1 w-5 h-5 rounded-full border-4 border-bg-dark transition-all duration-300 group-hover:bg-accent-purple group-hover:shadow-[0_0_15px_#6B21A8] ${exp.color}`}></div>
                <h3 className="text-2xl font-medium font-sans text-white mb-2 group-hover:text-white transition-colors">{exp.role}</h3>
                <p className="text-accent-purple font-medium text-sm md:text-base mb-6">
                  {exp.company} <span className="text-white/30 mx-2">•</span> {exp.period}
                </p>
                <p className="text-white/70 font-light text-sm md:text-base leading-relaxed max-w-2xl group-hover:text-white transition-colors">
                  {exp.description}
                </p>
              </motion.div>
            ))}

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
