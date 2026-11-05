import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import ExperienceSection from './components/Experience';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Barre de navigation fixe */}
      <Header onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Sections du portfolio */}
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Education />
        <ExperienceSection />
        <Projects />
        <Testimonials />
        <Contact />
      </main>

      {/* Pied de page */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Modal d'administration */}
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default App;