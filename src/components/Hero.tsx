import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText, Send, Code, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const Hero: React.FC = () => {
  return (
    <section
      id="accueil"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-mesh-gradient"
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column : Informations & Call to actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Disponible pour opportunités & alternance</span>
            </motion.div>

            {/* Main Title & Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <p className="text-slate-400 font-mono text-sm tracking-wide">
                Bonjour, je suis
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                <span className="text-gradient">Fatoumata Diarra Dabo</span>
              </h1>
              <h2 className="text-xl sm:text-2xl text-slate-200 font-semibold flex items-center justify-center lg:justify-start gap-2 pt-1">
                <span>Étudiante en Génie Informatique</span>
                <span className="text-cyan-400">&amp;</span>
                <span className="text-cyan-300">Développeuse Web</span>
              </h2>
            </motion.div>

            {/* Bio Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Passionnée par le génie logiciel et les technologies web modernes.
              Je conçois des applications web réactives, structurées et performantes en combinant 
              rigueur d'ingénierie et interfaces intuitives.
            </motion.p>

            {/* Highlights tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 text-xs font-mono"
            >
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-cyan-400" /> React & TypeScript
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-indigo-400" /> Tailwind CSS
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-purple-400" /> PHP & Python
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-blue-400" /> MySQL & Git
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
            >
              {/* Bouton Projets */}
              <a
                href="#projets"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-medium text-sm shadow-glow-primary hover:shadow-glow-cyan transition-all flex items-center gap-2 group"
              >
                <Code size={18} className="group-hover:rotate-12 transition-transform" />
                <span>Voir mes projets</span>
              </a>

              {/* Bouton Contact */}
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm border border-slate-700/80 hover:border-cyan-500/50 transition-all flex items-center gap-2"
              >
                <Send size={18} className="text-cyan-400" />
                <span>Me contacter</span>
              </a>

              {/* Bouton CV */}
              <a
                href={personalInfo.cvUrl}
                download="CURCILUM VITAL.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-300 font-medium text-sm border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
              >
                <FileText size={18} />
                <span>Télécharger mon CV</span>
              </a>
            </motion.div>

          </div>

          {/* Right Column : Code Terminal Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-lg">
              
              {/* Glowing aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow" />
              
              {/* Terminal Box */}
              <div className="relative rounded-2xl glass-panel overflow-hidden border border-slate-700/70 shadow-2xl">
                
                {/* Terminal Header */}
                <div className="px-4 py-3 bg-dark-900/90 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Terminal size={13} className="text-cyan-400" />
                    <span>fatoumata-diarra-dabo.tsx</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    UTF-8
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-slate-300 space-y-2">
                  <div>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-cyan-300">developer</span>{' '}
                    <span className="text-purple-400">=</span> {'{'}
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">nom:</span>{' '}
                    <span className="text-emerald-300">'Fatoumata Diarra Dabo'</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">formation:</span>{' '}
                    <span className="text-emerald-300">'Génie Informatique'</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">role:</span>{' '}
                    <span className="text-emerald-300">'Développeuse Web'</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">stack:</span> [
                    <span className="text-indigo-300">'React'</span>,{' '}
                    <span className="text-cyan-300">'TypeScript'</span>,{' '}
                    <span className="text-purple-300">'PHP'</span>,{' '}
                    <span className="text-amber-300">'Python'</span>,{' '}
                    <span className="text-blue-300">'MySQL'</span>],
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">passion:</span>{' '}
                    <span className="text-emerald-300">'Architecture propre &amp; UI moderne'</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">statut:</span>{' '}
                    <span className="text-cyan-400">'Prête pour de nouveaux défis 🚀'</span>
                  </div>
                  <div>{'};'}</div>
                  <div className="pt-2 text-slate-500 flex items-center gap-1">
                    <span className="text-cyan-400 font-bold">&gt;</span>
                    <span className="animate-pulse">npm run dev:ready_to_build_solutions</span>
                  </div>
                </div>

                {/* Footer status bar */}
                <div className="px-4 py-2 bg-dark-900/60 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Sparkles size={12} />
                    Clean Code &amp; Responsive
                  </span>
                  <span>v2.0</span>
                </div>

              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <div className="mt-14 text-center">
          <a
            href="#apropos"
            aria-label="Descendre vers la section à propos"
            className="inline-flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span className="text-xs font-mono">Découvrir mon profil</span>
            <ArrowDown size={16} className="animate-bounce text-cyan-400" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;
