import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Terminal, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenAdmin: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'À propos', href: '#apropos' },
    { name: 'Compétences', href: '#competences' },
    { name: 'Formation', href: '#formation' },
    { name: 'Expériences', href: '#experiences' },
    { name: 'Projets', href: '#projets' },
    { name: 'Avis', href: '#avis' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#accueil"
          className="group flex items-center gap-2.5 font-mono text-lg font-bold text-slate-100 hover:text-cyan-400 transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 p-[1px] flex items-center justify-center shadow-glow-cyan">
            <div className="w-full h-full bg-dark-900 rounded-[7px] flex items-center justify-center">
              <span className="text-cyan-400 font-mono text-sm">&lt;FDD/&gt;</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="leading-tight font-sans font-semibold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              Fatoumata Diarra Dabo
            </span>
            <span className="text-[10px] text-cyan-400/80 font-mono tracking-wider">
              GENIE.INFO
            </span>
          </div>
        </a>

        {/* Navigation Desktop */}
        <div className="hidden lg:flex items-center gap-7">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-slate-300 hover:text-cyan-400 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-indigo-500 hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            {/* Bouton Espace Admin */}
            <button
              onClick={onOpenAdmin}
              title="Administration du portfolio"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all text-xs flex items-center gap-1.5"
            >
              <Shield size={14} className="text-cyan-400" />
              <span className="font-mono text-xs">Admin</span>
            </button>

            {/* Bouton Contact rapide */}
            <a
              href="#contact"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-medium tracking-wide shadow-glow-primary transition-all flex items-center gap-1"
            >
              Me contacter
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Bouton Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenAdmin}
            aria-label="Administration"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-cyan-400 hover:bg-white/10 transition-colors"
          >
            <Shield size={18} />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu de navigation"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:text-cyan-400 transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isOpen && (
          <div className="lg:hidden fixed top-[60px] left-0 right-0 bg-dark-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-xs font-mono text-cyan-400">
              <Terminal size={14} />
              <span>Navigation interactive</span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-cyan-400 hover:pl-2 transition-all font-medium py-1.5 text-base border-b border-white/5"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="#contact"
                className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium text-sm shadow-glow-primary"
                onClick={() => setIsOpen(false)}
              >
                Discuter d'un projet
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
