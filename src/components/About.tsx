import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Mail, Phone, GraduationCap, Code, Database, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const About: React.FC = () => {
  const qualities = [
    {
      icon: GraduationCap,
      title: 'Formation d\'Ingénieur',
      description: 'Solides bases en algorithmique, structures de données, modélisation objet et méthodes agiles.',
    },
    {
      icon: Code,
      title: 'Développement Web Moderne',
      description: 'Interfaces réactives et soignées avec React, TypeScript et Tailwind CSS, centrées sur l\'expérience utilisateur.',
    },
    {
      icon: Database,
      title: 'Gestion de Données Relationnelles',
      description: 'Conception de schémas relationnels avec MySQL et interfaçage backend fluide en PHP/Python.',
    },
    {
      icon: Sparkles,
      title: 'Rigueur & Esprit d\'Équipe',
      description: 'Gestion de versions collaborative sous Git/GitHub, écriture de code propre et soif constante d\'apprendre.',
    },
  ];

  return (
    <section id="apropos" className="py-24 relative bg-dark-900/40">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-3">
            <User size={13} className="text-cyan-400" />
            <span>Présentation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            À propos de <span className="text-gradient">moi</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-3 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Bio textuelle & Coordonnées */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="glass-panel p-8 rounded-2xl border border-white/5 space-y-5">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>Fatoumata Diarra Dabo</span>
                <span className="text-xs font-mono font-normal px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Élève-Ingénieure
                </span>
              </h3>

              <p className="text-slate-300 leading-relaxed text-base">
                {personalInfo.description}
              </p>

              <p className="text-slate-400 text-sm leading-relaxed">
                Mon parcours en génie informatique me permet d'aborder chaque projet avec une double vision : 
                la rigueur architecturale côté logique et base de données, et l'exigence esthétique côté interface utilisateur.
              </p>

              {/* Informations de contact */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-sm">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-cyan-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-mono">Localisation</span>
                    <span className="font-medium">{personalInfo.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-indigo-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-mono">Email</span>
                    <a href={`mailto:${personalInfo.email}`} className="font-medium hover:text-cyan-400 transition-colors">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-purple-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-mono">Téléphone</span>
                    <a href={personalInfo.phoneLink || "tel:+221774379096"} className="font-medium hover:text-cyan-400 transition-colors">
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-emerald-400">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-mono">Statut</span>
                    <span className="font-medium">Étudiante active</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Qualités & Piliers */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-6 grid sm:grid-cols-2 gap-4"
          >
            {qualities.map((item) => (
              <div
                key={item.title}
                className="glass-card p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <item.icon size={22} />
                </div>
                <h4 className="text-white font-semibold text-lg mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
