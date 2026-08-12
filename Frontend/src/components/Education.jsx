import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { fadeLeft, fadeRight, fadeUp, scaleUp, staggerContainer, viewport } from '../utils/scrollAnimations';

const certifications = [
  {
    title: "Deep Learning Specialization",
    issuer: "Coursera",
    date: "Aug 2023"
  },
  {
    title: "ROS 2 Basics in 5 Days",
    issuer: "The Construct",
    date: "June 2023"
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Jan 2024"
  },
  {
    title: "Neural Networks and Deep Learning",
    issuer: "Coursera",
    date: "July 2023"
  }
];

const coursework = [
  "Data Structures & Algorithms", 
  "Machine Learning", 
  "Operating Systems", 
  "Database Management Systems", 
  "Robotics & Control",
  "Computer Vision"
];

const Education = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-[#060608]/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Education Column */}
          <div>
            <motion.div 
              className="mb-12"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <h2 className="text-3xl md:text-4xl font-sans font-medium text-left">Education</h2>
            </motion.div>

            <motion.div 
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="bento-card group !rounded-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold font-sans text-white mb-2 group-hover:text-white transition-colors">B.Tech Computer Science</h3>
                  <p className="text-accent-purple/80 font-medium text-base">SRM Institute of Science and Technology (SRMIST)</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm text-white/50 font-medium mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent-purple" />
                  <span>2020 - 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent-purple" />
                  <span>Chennai, India</span>
                </div>
              </div>

              <div className="flex gap-8 mb-8 pb-8 border-b border-white/10">
                <div>
                  <div className="text-sm font-medium text-white/50 uppercase tracking-wider mb-1">CGPA</div>
                  <div className="text-3xl font-bold text-white">8.9<span className="text-lg text-white/30">/10</span></div>
                </div>
              </div>
              
              <div>
                <strong className="text-white font-medium block mb-4 text-sm uppercase tracking-wider">Relevant Coursework</strong>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((course, index) => (
                    <span key={index} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-white/70 hover:border-accent-purple/30 hover:text-white transition-colors cursor-default">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Certifications Column */}
          <div>
            <motion.div 
              className="mb-12"
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <h2 className="text-3xl md:text-4xl font-sans font-medium text-left">Certifications</h2>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={scaleUp}
                  className="bg-card-bg rounded-2xl border border-white/5 p-6 relative overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-accent-purple/50 hover:shadow-[0_0_25px_rgba(107,33,168,0.15)] group cursor-pointer flex flex-col justify-between min-h-[140px]"
                >
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-accent-purple/5 rounded-full blur-xl group-hover:bg-accent-purple/20 transition-colors duration-500"></div>
                  
                  <div>
                    <h3 className="text-white font-bold font-sans text-base leading-tight mb-2 pr-4">{cert.title}</h3>
                    <p className="text-white/50 text-xs font-medium uppercase tracking-wider">{cert.issuer}</p>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <span className="text-accent-purple text-xs font-bold">{cert.date}</span>
                    <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Decorative background element */}
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-8 p-6 bg-gradient-to-br from-accent-purple/10 to-transparent border border-white/10 rounded-2xl flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-accent-purple/20 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-accent-purple" />
              </div>
              <p className="text-sm text-white/70 font-light">
                Continuously expanding my skill set through industry-recognized certifications and intensive bootcamps.
              </p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;
