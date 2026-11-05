import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen, Award } from 'lucide-react';
import { initialEducation } from '../data/portfolioData';

const Education: React.FC = () => {
  return (
    <section id="formation" className="py-24 relative bg-dark-900/30">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-3">
            <GraduationCap size={13} className="text-cyan-400" />
            <span>Parcours Académique</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ma <span className="text-gradient">Formation</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Cursus universitaire et d'ingénierie en sciences informatiques.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* Timeline formation */}
        <div className="max-w-3xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-cyan-400 before:to-transparent">
          {initialEducation.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative flex flex-col sm:flex-row gap-6 sm:gap-10 items-start ${
                index % 2 === 0 ? 'sm:flex-row-reverse text-left' : 'text-left'
              }`}
            >
              {/* Point lumineux sur la timeline */}
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-dark-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-glow-cyan z-10">
                <BookOpen size={14} />
              </div>

              {/* Contenu de la carte */}
              <div className="ml-12 sm:ml-0 sm:w-1/2">
                <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2">
                    <Calendar size={13} />
                    <span>{edu.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {edu.degree}
                  </h3>
                  <div className="flex items-center gap-1.5 text-indigo-300 text-sm font-medium mb-3">
                    <Award size={15} />
                    <span>{edu.institution}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;
