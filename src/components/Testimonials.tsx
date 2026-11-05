import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareHeart, Clock, Sparkles } from 'lucide-react';
import { initialTestimonials } from '../data/portfolioData';

const Testimonials: React.FC = () => {
  return (
    <section id="avis" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <MessageSquareHeart size={13} className="text-cyan-400" />
            <span>Recommandations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Témoignages &amp; <span className="text-gradient">Avis</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Retours d'expérience et appréciations professionnelles.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* Contenu conditionnel : message discret si aucun témoignage personnel */}
        {initialTestimonials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-center glass-panel p-8 sm:p-10 rounded-2xl border border-white/5 space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
              <Clock size={22} />
            </div>
            <h3 className="text-lg font-semibold text-white flex items-center justify-center gap-2">
              <span>Section bientôt disponible</span>
              <Sparkles size={16} className="text-cyan-400" />
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Les avis et recommandations professionnelles de mes encadrants et collaborateurs seront publiés ici à l'issue de mes stages et projets d'ingénierie en cours.
            </p>
          </motion.div>
        ) : null}

      </div>
    </section>
  );
};

export default Testimonials;
