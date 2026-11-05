import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building2, CheckCircle } from 'lucide-react';
import type { Experience } from '../types';
import { experienceService } from '../services/experienceService';

const ExperienceSection: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const data = await experienceService.getAll();
        setExperiences(data);
      } catch (err) {
        console.error('Erreur chargement expériences:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExp();
  }, []);

  return (
    <section id="experiences" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Briefcase size={13} className="text-cyan-400" />
            <span>Parcours Professionnel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mes <span className="text-gradient">Expériences</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Stages, projets concrets et réalisations en environnement d'équipe.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-3 rounded-full" />
        </motion.div>

        {loading ? (
          <div className="text-center py-12 text-slate-400 font-mono text-sm">
            Chargement des expériences...
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all relative group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-indigo-300 text-sm font-medium mt-1">
                      <Building2 size={16} />
                      <span>{exp.entreprise}</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs w-fit">
                    <Calendar size={13} />
                    <span>
                      {exp.dateDebut} — {exp.dateFin || 'Présent'}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Tags technologies */}
                <div>
                  <span className="block text-xs font-mono text-slate-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-cyan-400" /> Technologies mises en œuvre :
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-indigo-950/50 border border-indigo-500/20 text-indigo-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ExperienceSection;
