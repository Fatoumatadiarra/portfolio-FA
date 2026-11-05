import { Mail, Phone, Heart, ArrowUp, Shield } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';

interface FooterProps {
  onOpenAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-dark-950 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Logo & Identité */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2 font-mono text-lg font-bold text-white">
              <span className="text-cyan-400">&lt;FDD/&gt;</span>
              <span>Fatoumata Diarra Dabo</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Étudiante en Génie Informatique &amp; Développeuse Web
            </p>
          </div>

          {/* Liens réseaux sociaux */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil GitHub"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil LinkedIn"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Envoyer un email"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <Mail size={18} />
            </a>
            <a
              href={personalInfo.phoneLink || "tel:+221774379096"}
              aria-label="Appeler au téléphone"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <Phone size={18} />
            </a>
          </div>

          {/* Bouton retour en haut */}
          <button
            onClick={scrollToTop}
            aria-label="Retour en haut de page"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-xs font-mono"
          >
            <span>Haut</span>
            <ArrowUp size={15} />
          </button>
        </div>

        {/* Sous-footer avec copyright et lien admin */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Fatoumata Diarra Dabo. Fait avec{' '}
            <Heart size={13} className="text-rose-500 fill-rose-500" /> et passion pour le web.
          </p>

          <div className="flex items-center gap-4">
            <span>React • TypeScript • Tailwind CSS</span>
            <button
              onClick={onOpenAdmin}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-[11px]"
            >
              <Shield size={12} />
              <span>Espace Admin</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
