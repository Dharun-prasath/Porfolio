import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import NetworkSkills from './components/NetworkSkills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'

function App() {
  return (
    <div className="relative min-h-screen bg-bg-dark selection:bg-accent-purple/30 selection:text-white">
      {/* Global Ambient Glow */}
      <div className="ambient-glow"></div>
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <NetworkSkills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      
      <footer className="py-8 text-center text-text-muted text-sm mt-20 border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} Dharun Prasath. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
