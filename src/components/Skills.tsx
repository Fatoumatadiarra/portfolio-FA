import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Cpu, 
  Database, 
  Terminal, 
  Layers, 
  FileCode, 
  GitBranch, 
  Palette, 
  Wind, 
  Atom, 
  Server,
  FileSpreadsheet
} from 'lucide-react';
import type { Skill } from '../types';
import { skillService } from '../services/skillService';

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Tous');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await skillService.getAll();
        setSkills(data);
      } catch (err) {
        console.error('Erreur chargement compétences:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const categories = ['Tous', 'Frontend', 'Backend', 'Outils', 'Langages & Formats'];

  const filteredSkills = activeCategory === 'Tous'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const getSkillIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'html':
      case 'css':
        return Palette;
      case 'tailwind css':
        return Wind;
      case 'javascript':
      case 'typescript':
        return Code2;
      case 'react':
        return Atom;
      case 'php':
        return Server;
      case 'python':
        return Terminal;
      case 'jquery':
        return Layers;
      case 'mysql':
        return Database;
      case 'git':
      case 'github':
        return GitBranch;
      case 'xml':
        return FileSpreadsheet;
      default:
        return FileCode;
    }
  };

  return (
    <section id="competences" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Cpu size={13} className="text-cyan-400" />
            <span>Stack &amp; Technologies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mes <span className="text-gradient">Compétences</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Technologies maîtrisées dans le cadre de mes études en génie informatique et projets web.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* Filtres par catégories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-glow-primary'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grille des compétences */}
        {loading ? (
          <div className="text-center py-12 text-slate-400 font-mono text-sm">
            Chargement des compétences...
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredSkills.map((skill, index) => {
              const IconComp = getSkillIcon(skill.name);
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="glass-card p-5 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 border border-white/10 text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 transition-all">
                        <IconComp size={22} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-400">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-cyan-400">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Barre de progression */}
                  <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-cyan-300 h-full rounded-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default Skills;
