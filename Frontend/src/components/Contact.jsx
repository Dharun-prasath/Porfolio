import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Code, FileText, Download } from 'lucide-react';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewport } from '../utils/scrollAnimations';

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div 
          className="mb-16 text-center"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.h2 
            variants={fadeUp}
            className="text-4xl md:text-5xl font-sans font-medium mb-4"
          >
            Let's <span className="font-bold text-accent-purple">Connect</span>
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="text-text-muted max-w-xl mx-auto text-lg"
          >
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Info & Resume */}
          <motion.div 
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col gap-8"
          >
            <div className="bento-card !rounded-2xl p-8">
              <h3 className="text-2xl font-medium font-sans text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <a href="mailto:dharun@example.com" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent-purple/20 group-hover:border-accent-purple/50 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm text-white/50">Email</span>
                    <span className="font-medium">dharun@example.com</span>
                  </div>
                </a>
                
                <a href="https://linkedin.com/in/dharun" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent-purple/20 group-hover:border-accent-purple/50 transition-all">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm text-white/50">LinkedIn</span>
                    <span className="font-medium">Connect with me</span>
                  </div>
                </a>

                <a href="https://github.com/dharun" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent-purple/20 group-hover:border-accent-purple/50 transition-all">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm text-white/50">GitHub</span>
                    <span className="font-medium">View my repositories</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="bento-card !rounded-2xl p-8">
              <h3 className="text-xl font-medium font-sans text-white mb-6">Resume</h3>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="glass-pill !px-6 !py-3 flex items-center gap-3 hover:bg-white/10 transition-colors">
                  <FileText className="w-4 h-4 text-accent-purple" />
                  <span className="text-sm font-medium">View Resume</span>
                </a>
                <a href="#" className="glass-pill !px-6 !py-3 flex items-center gap-3 hover:bg-white/10 transition-colors border-accent-purple/30 bg-accent-purple/10">
                  <Download className="w-4 h-4 text-accent-purple" />
                  <span className="text-sm font-medium">Download PDF</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="bento-card !rounded-2xl p-8 md:p-10"
          >
            <h3 className="text-2xl font-medium font-sans text-white mb-6">Send a Message</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Your Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-purple/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-purple/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Message</label>
                <textarea 
                  rows="4"
                  placeholder="How can I help you?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-purple/50 transition-colors resize-none"
                ></textarea>
              </div>
              <button 
                type="button" 
                className="w-full glass-pill !py-4 hover:bg-white/10 transition-colors text-white font-medium shadow-[0_0_20px_rgba(107,33,168,0.2)]"
              >
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
