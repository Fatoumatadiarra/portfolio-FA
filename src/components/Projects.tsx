import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, Sparkles, Filter } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import type { Project } from '../types';
import { projectService } from '../services/projectService';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTag, setSelectedTag] = useState<string>('Tous');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAll();
        setProjects(data);
      } catch (err) {
        console.error('Erreur chargement projets:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Extraire les tags uniques pour filtrage
  const allTags = ['Tous', ...Array.from(new Set(projects.flatMap((p) => p.technologies)))];

  const filteredProjects = selectedTag === 'Tous'
    ? projects
    : projects.filter((p) => p.technologies.includes(selectedTag));

  return (
    <section id="projets" className="py-24 relative bg-dark-900/30">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-3">
            <FolderGit2 size={13} className="text-cyan-400" />
            <span>Portfolio &amp; Réalisations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mes <span className="text-gradient">Projets</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Découvrez une sélection de projets web, backends et architectures logicielles que j'ai réalisés.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* Filtres par technologies */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mr-2">
            <Filter size={13} className="text-cyan-400" />
            <span>Filtrer :</span>
          </div>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium font-mono transition-all ${
                selectedTag === tag
                  ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-glow-cyan'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grille des projets */}
        {loading ? (
          <div className="text-center py-16 text-slate-400 font-mono text-sm">
            Chargement des projets...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/40 transition-all flex flex-col hover:shadow-glow-cyan/20"
              >
                {/* Image & overlay */}
                <div className="relative overflow-hidden h-52 bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Badge "Featured" */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-indigo-900/90 border border-indigo-400/40 text-[11px] font-mono text-indigo-200 flex items-center gap-1 backdrop-blur-sm">
                      <Sparkles size={11} className="text-cyan-300" />
                      Projet Phare
                    </div>
                  )}

                  {/* Boutons d'action au hover */}
                  <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 p-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-lg"
                      >
                        <ExternalLink size={14} />
                        Voir Démo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 transition-colors flex items-center gap-1.5"
                      >
                        <GithubIcon size={14} />
                        Code Source
                      </a>
                    )}
                  </div>
                </div>

                {/* Contenu textuel */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies tags */}
                  <div className="pt-2 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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

export default Projects;
