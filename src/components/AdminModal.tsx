import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  FolderPlus, 
  Cpu, 
  Briefcase, 
  Mail, 
  Trash2, 
  Edit3, 
  Plus, 
  LogOut, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { authService } from '../services/authService';
import { projectService } from '../services/projectService';
import { skillService } from '../services/skillService';
import { experienceService } from '../services/experienceService';
import { contactService } from '../services/contactService';
import type { Project, Skill, Experience, ContactMessage } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'projects' | 'skills' | 'experiences' | 'messages';

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState<string>('');
  
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Formulaires d'édition / création
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, [isOpen]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, activeTab]);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const loadData = async () => {
    try {
      if (activeTab === 'projects') {
        const p = await projectService.getAll();
        setProjects(p);
      } else if (activeTab === 'skills') {
        const s = await skillService.getAll();
        setSkills(s);
      } else if (activeTab === 'experiences') {
        const e = await experienceService.getAll();
        setExperiences(e);
      } else if (activeTab === 'messages') {
        try {
          const m = await contactService.getAllMessages();
          setMessages(m);
        } catch {
          setMessages([]);
        }
      }
    } catch {
      // Ignorer
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      await authService.login(username, password);
      setIsAuthenticated(true);
      showNotification('Connexion réussie !');
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : 'Identifiants incorrects');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  // --- ACTIONS PROJETS ---
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject.description) return;

    try {
      const payload = {
        title: editingProject.title,
        description: editingProject.description,
        image: editingProject.image || 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
        technologies: Array.isArray(editingProject.technologies)
          ? editingProject.technologies
          : (editingProject.technologies as unknown as string).split(',').map((t) => t.trim()),
        githubUrl: editingProject.githubUrl || '',
        demoUrl: editingProject.demoUrl || '',
        featured: Boolean(editingProject.featured),
      };

      if (editingProject.id) {
        await projectService.update(editingProject.id, payload);
        showNotification('Projet mis à jour avec succès');
      } else {
        await projectService.create(payload);
        showNotification('Projet créé avec succès');
      }
      setEditingProject(null);
      loadData();
    } catch (err: unknown) {
      showNotification(err instanceof Error ? err.message : 'Erreur sauvegarde projet', 'error');
    }
  };

  const handleDeleteProject = async (id: number | string) => {
    if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
      try {
        await projectService.delete(id);
        showNotification('Projet supprimé');
        loadData();
      } catch {
        setProjects(projects.filter((p) => p.id !== id));
        showNotification('Projet retiré');
      }
    }
  };

  // --- ACTIONS COMPETENCES ---
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill?.name) return;

    try {
      const payload = {
        name: editingSkill.name,
        category: editingSkill.category || 'Frontend',
        level: Number(editingSkill.level) || 80,
      };

      if (editingSkill.id) {
        await skillService.update(editingSkill.id, payload);
        showNotification('Compétence mise à jour');
      } else {
        await skillService.create(payload);
        showNotification('Compétence ajoutée');
      }
      setEditingSkill(null);
      loadData();
    } catch (err: unknown) {
      showNotification(err instanceof Error ? err.message : 'Erreur sauvegarde compétence', 'error');
    }
  };

  const handleDeleteSkill = async (id: number | string) => {
    if (confirm('Supprimer cette compétence ?')) {
      try {
        await skillService.delete(id);
        showNotification('Compétence supprimée');
        loadData();
      } catch {
        setSkills(skills.filter((s) => s.id !== id));
        showNotification('Compétence retirée');
      }
    }
  };

  // --- ACTIONS EXPERIENCES ---
  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp?.title || !editingExp.entreprise) return;

    try {
      const payload = {
        title: editingExp.title,
        entreprise: editingExp.entreprise,
        description: editingExp.description || '',
        dateDebut: editingExp.dateDebut || '2025-01',
        dateFin: editingExp.dateFin || 'Présent',
        technologies: Array.isArray(editingExp.technologies)
          ? editingExp.technologies
          : (editingExp.technologies as unknown as string).split(',').map((t) => t.trim()),
      };

      if (editingExp.id) {
        await experienceService.update(editingExp.id, payload);
        showNotification('Expérience mise à jour');
      } else {
        await experienceService.create(payload);
        showNotification('Expérience ajoutée');
      }
      setEditingExp(null);
      loadData();
    } catch (err: unknown) {
      showNotification(err instanceof Error ? err.message : 'Erreur sauvegarde expérience', 'error');
    }
  };

  const handleDeleteExp = async (id: number | string) => {
    if (confirm('Supprimer cette expérience ?')) {
      try {
        await experienceService.delete(id);
        showNotification('Expérience supprimée');
        loadData();
      } catch {
        setExperiences(experiences.filter((e) => e.id !== id));
        showNotification('Expérience retirée');
      }
    }
  };

  // --- ACTIONS MESSAGES ---
  const handleDeleteMessage = async (id: number | string) => {
    if (confirm('Supprimer ce message ?')) {
      try {
        await contactService.deleteMessage(id);
      } catch {
        // fallback
      }
      setMessages(messages.filter((m) => m.id !== id));
      showNotification('Message supprimé');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Modal */}
        <div className="p-4 sm:p-6 bg-dark-900/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Lock size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Espace Administration</span>
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Dashboard
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Gestion dynamique des contenus et messages
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                title="Se déconnecter"
                className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors text-xs flex items-center gap-1.5"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline font-mono">Quitter</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Notifications toast */}
        {notification && (
          <div className={`px-4 py-2 text-xs font-mono flex items-center gap-2 ${
            notification.type === 'success' ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
          }`}>
            {notification.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
            <span>{notification.text}</span>
          </div>
        )}

        {/* Corps modal */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isAuthenticated ? (
            /* Formulaire Login Admin */
            <div className="max-w-md mx-auto py-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-3">
                  <Lock size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Connexion Administrateur</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Accédez à la gestion des projets, compétences et messages.
                </p>
              </div>

              {loginError && (
                <div className="mb-4 p-3 rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Identifiant
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-dark-900 rounded-xl border border-white/10 text-white text-sm outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-dark-900 rounded-xl border border-white/10 text-white text-sm outline-none focus:border-cyan-400"
                  />
                  <p className="text-[11px] font-mono text-slate-500 mt-1">
                    Compte par défaut : admin / admin123
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium text-sm shadow-glow-primary hover:from-indigo-500 hover:to-cyan-500 transition-all cursor-pointer"
                >
                  Se connecter
                </button>
              </form>
            </div>
          ) : (
            /* Dashboard connecté */
            <div className="space-y-6">
              {/* Onglets navigation */}
              <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
                <button
                  onClick={() => { setActiveTab('projects'); setEditingProject(null); }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono flex items-center gap-2 transition-all ${
                    activeTab === 'projects'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                      : 'text-slate-400 hover:bg-white/5'
                  }`}
                >
                  <FolderPlus size={16} />
                  <span>Projets ({projects.length})</span>
                </button>

                <button
                  onClick={() => { setActiveTab('skills'); setEditingSkill(null); }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono flex items-center gap-2 transition-all ${
                    activeTab === 'skills'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                      : 'text-slate-400 hover:bg-white/5'
                  }`}
                >
                  <Cpu size={16} />
                  <span>Compétences ({skills.length})</span>
                </button>

                <button
                  onClick={() => { setActiveTab('experiences'); setEditingExp(null); }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono flex items-center gap-2 transition-all ${
                    activeTab === 'experiences'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                      : 'text-slate-400 hover:bg-white/5'
                  }`}
                >
                  <Briefcase size={16} />
                  <span>Expériences ({experiences.length})</span>
                </button>

                <button
                  onClick={() => { setActiveTab('messages'); }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono flex items-center gap-2 transition-all ${
                    activeTab === 'messages'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                      : 'text-slate-400 hover:bg-white/5'
                  }`}
                >
                  <Mail size={16} />
                  <span>Messages ({messages.length})</span>
                </button>
              </div>

              {/* Contenu Onglet : Projets */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">Gestion des Projets</h3>
                    {!editingProject && (
                      <button
                        onClick={() => setEditingProject({ title: '', description: '', technologies: ['React'], featured: false })}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-mono flex items-center gap-1.5 hover:bg-cyan-500/30"
                      >
                        <Plus size={14} /> Nouveau projet
                      </button>
                    )}
                  </div>

                  {editingProject ? (
                    <form onSubmit={handleSaveProject} className="p-4 rounded-xl bg-dark-900 border border-white/10 space-y-3">
                      <h4 className="text-sm font-bold text-cyan-300">
                        {editingProject.id ? 'Modifier le projet' : 'Ajouter un nouveau projet'}
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Titre du projet"
                          required
                          value={editingProject.title || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="px-3 py-2 bg-dark-950 rounded-lg border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Technologies (séparées par des virgules)"
                          required
                          value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(', ') : editingProject.technologies || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value.split(',').map((t) => t.trim()) })}
                          className="px-3 py-2 bg-dark-950 rounded-lg border border-white/10 text-xs text-white"
                        />
                      </div>
                      <textarea
                        placeholder="Description détaillée du projet"
                        required
                        rows={3}
                        value={editingProject.description || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full px-3 py-2 bg-dark-950 rounded-lg border border-white/10 text-xs text-white"
                      />
                      <div className="grid sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="URL Image (ex: https://...)"
                          value={editingProject.image || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                          className="px-3 py-2 bg-dark-950 rounded-lg border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Lien GitHub"
                          value={editingProject.githubUrl || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                          className="px-3 py-2 bg-dark-950 rounded-lg border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(editingProject.featured)}
                            onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                          />
                          <span>Mettre en avant (Featured)</span>
                        </label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingProject(null)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-300"
                          >
                            Annuler
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1.5 rounded-lg bg-cyan-600 text-xs text-white font-medium"
                          >
                            Enregistrer
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-2">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-4"
                        >
                          <div>
                            <h4 className="text-sm font-semibold text-white">{proj.title}</h4>
                            <p className="text-xs text-slate-400 line-clamp-1">{proj.description}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => setEditingProject(proj)}
                              className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-cyan-400"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => proj.id && handleDeleteProject(proj.id)}
                              className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-rose-400"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Contenu Onglet : Compétences */}
              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">Gestion des Compétences</h3>
                    {!editingSkill && (
                      <button
                        onClick={() => setEditingSkill({ name: '', category: 'Frontend', level: 80 })}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-mono flex items-center gap-1.5 hover:bg-cyan-500/30"
                      >
                        <Plus size={14} /> Nouvelle compétence
                      </button>
                    )}
                  </div>

                  {editingSkill ? (
                    <form onSubmit={handleSaveSkill} className="p-4 rounded-xl bg-dark-900 border border-white/10 space-y-3">
                      <div className="grid sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Nom (ex: React, Python)"
                          required
                          value={editingSkill.name || ''}
                          onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                          className="px-3 py-2 bg-dark-950 rounded-lg border border-white/10 text-xs text-white"
                        />
                        <select
                          value={editingSkill.category || 'Frontend'}
                          onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as Skill['category'] })}
                          className="px-3 py-2 bg-dark-950 rounded-lg border border-white/10 text-xs text-white"
                        >
                          <option value="Frontend">Frontend</option>
                          <option value="Backend">Backend</option>
                          <option value="Outils">Outils</option>
                          <option value="Langages & Formats">Langages &amp; Formats</option>
                        </select>
                        <input
                          type="number"
                          min="10"
                          max="100"
                          placeholder="Niveau %"
                          value={editingSkill.level || 80}
                          onChange={(e) => setEditingSkill({ ...editingSkill, level: Number(e.target.value) })}
                          className="px-3 py-2 bg-dark-950 rounded-lg border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingSkill(null)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-300"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-cyan-600 text-xs text-white font-medium"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-2">
                      {skills.map((s) => (
                        <div
                          key={s.id || s.name}
                          className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between"
                        >
                          <div>
                            <span className="text-sm font-semibold text-white">{s.name}</span>
                            <span className="block text-[11px] font-mono text-slate-400">
                              {s.category} • {s.level}%
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setEditingSkill(s)}
                              className="p-1.5 text-slate-400 hover:text-cyan-400"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => s.id && handleDeleteSkill(s.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-400"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Contenu Onglet : Expériences */}
              {activeTab === 'experiences' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">Gestion des Expériences</h3>
                    {!editingExp && (
                      <button
                        onClick={() => setEditingExp({ title: '', entreprise: '', technologies: ['React'], dateDebut: '2025-01' })}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-mono flex items-center gap-1.5 hover:bg-cyan-500/30"
                      >
                        <Plus size={14} /> Nouvelle expérience
                      </button>
                    )}
                  </div>

                  {editingExp ? (
                    <form onSubmit={handleSaveExp} className="p-4 rounded-xl bg-dark-900 border border-white/10 space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Intitulé du poste / projet"
                          required
                          value={editingExp.title || ''}
                          onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                          className="px-3 py-2 bg-dark-950 rounded-lg border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Entreprise / Organisation"
                          required
                          value={editingExp.entreprise || ''}
                          onChange={(e) => setEditingExp({ ...editingExp, entreprise: e.target.value })}
                          className="px-3 py-2 bg-dark-950 rounded-lg border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Date début (ex: 2025-06)"
                          value={editingExp.dateDebut || ''}
                          onChange={(e) => setEditingExp({ ...editingExp, dateDebut: e.target.value })}
                          className="px-3 py-2 bg-dark-950 rounded-lg border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Date fin (ex: 2025-09 ou Présent)"
                          value={editingExp.dateFin || ''}
                          onChange={(e) => setEditingExp({ ...editingExp, dateFin: e.target.value })}
                          className="px-3 py-2 bg-dark-950 rounded-lg border border-white/10 text-xs text-white"
                        />
                      </div>
                      <textarea
                        placeholder="Description des missions"
                        rows={3}
                        value={editingExp.description || ''}
                        onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                        className="w-full px-3 py-2 bg-dark-950 rounded-lg border border-white/10 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Technologies (ex: React, PHP, MySQL)"
                        value={Array.isArray(editingExp.technologies) ? editingExp.technologies.join(', ') : editingExp.technologies || ''}
                        onChange={(e) => setEditingExp({ ...editingExp, technologies: e.target.value.split(',').map((t) => t.trim()) })}
                        className="w-full px-3 py-2 bg-dark-950 rounded-lg border border-white/10 text-xs text-white"
                      />
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingExp(null)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-300"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-cyan-600 text-xs text-white font-medium"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-2">
                      {experiences.map((exp) => (
                        <div
                          key={exp.id}
                          className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between"
                        >
                          <div>
                            <h4 className="text-sm font-semibold text-white">{exp.title} — {exp.entreprise}</h4>
                            <span className="text-xs text-cyan-400 font-mono">{exp.dateDebut} - {exp.dateFin || 'Présent'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingExp(exp)}
                              className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-cyan-400"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => exp.id && handleDeleteExp(exp.id)}
                              className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-rose-400"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Contenu Onglet : Messages */}
              {activeTab === 'messages' && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white mb-2">
                    Boîte de Réception ({messages.length})
                  </h3>
                  {messages.length === 0 ? (
                    <p className="text-xs text-slate-400 font-mono py-8 text-center">
                      Aucun message reçu pour le moment.
                    </p>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-sm text-white">{msg.nom}</span>
                            <span className="text-xs text-cyan-400 font-mono ml-2">({msg.email})</span>
                          </div>
                          <button
                            onClick={() => msg.id && handleDeleteMessage(msg.id)}
                            className="text-slate-400 hover:text-rose-400 p-1"
                            title="Supprimer le message"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        {msg.sujet && (
                          <div className="text-xs font-mono text-indigo-300">
                            Sujet: {msg.sujet}
                          </div>
                        )}
                        <p className="text-xs text-slate-300 leading-relaxed bg-dark-900/60 p-3 rounded-lg border border-white/5">
                          {msg.message}
                        </p>
                        <div className="text-[10px] text-slate-500 font-mono">
                          Reçu le : {msg.createdAt ? new Date(msg.createdAt).toLocaleString('fr-FR') : 'Récemment'}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminModal;
