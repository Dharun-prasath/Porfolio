import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, BrainCircuit, FolderGit2, Briefcase, GraduationCap, Mail } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger when scrolled past ~80vh (halfway into About section usually)
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: BrainCircuit },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <>
      {/* Top Navbar */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-8 left-0 right-0 z-50 flex justify-center w-full pointer-events-none px-6 md:px-12"
          >
            {/* Top Left Logo & Name */}
            <a href="#home" className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 pointer-events-auto flex items-center gap-3 group">
              <img 
                src="/logo.png" 
                alt="Dharun Logo" 
                className="w-12 h-12 md:w-14 md:h-14 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-normal text-xl md:text-2xl tracking-wide text-white group-hover:text-white transition-colors leading-none pt-[4px]">
                Dharun
              </span>
            </a>

            {/* Centered Navigation Pill */}
            <div className="glass-pill pointer-events-auto hidden lg:flex items-center">
              <nav className="flex items-center gap-8 text-sm font-medium text-white/70">
                {navLinks.map((link) => (
                  <a key={`top-${link.id}`} href={`#${link.id}`} className="hover:text-white transition-colors">{link.label}</a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Sidebar Navbar */}
      <AnimatePresence>
        {isScrolled && (
          <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass-pill !p-2 flex flex-col gap-4 border-white/10 bg-[#060608]/40 backdrop-blur-xl">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a 
                      key={`side-${link.id}`} 
                      href={`#${link.id}`}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all group relative"
                    >
                      <Icon className="w-[18px] h-[18px]" />
                      {/* Tooltip on hover */}
                      <span className="absolute right-[120%] px-3 py-1.5 bg-[#0a0a0c] border border-white/10 rounded-md text-[11px] uppercase tracking-wider font-bold text-white/90 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        {link.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
