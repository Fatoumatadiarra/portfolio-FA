import type { PersonalInfo, Project, Skill, Experience, Education, Testimonial } from '../types';

export const personalInfo: PersonalInfo = {
  name: 'Fatoumata Diarra Dabo',
  role: 'Développeuse Web',
  subRole: 'Étudiante en Génie Informatique',
  bio: 'Passionnée par le génie logiciel et la création d\'applications web performantes, élégantes et intuitives.',
  description: 'Actuellement étudiante en génie informatique, je conçois des interfaces web modernes et réactives ainsi que des architectures backend fiables. Mon objectif est de combiner rigueur technique et sens du design pour bâtir des solutions numériques à fort impact.',
  email: 'fatoumatadiarradabo387@gmail.com',
  phone: '77 437 90 96',
  phoneLink: 'tel:+221774379096',
  location: 'Dakar, Sénégal',
  github: 'https://github.com/Fatoumatadiarra',
  linkedin: 'https://www.linkedin.com/in/fatoumata-diarra-dabo-5b3644415',
  cvUrl: '/CURCILUM%20VITAL.pdf',
};

export const initialSkills: Skill[] = [
  // Frontend
  { id: 1, name: 'HTML', category: 'Frontend', level: 90, icon: 'FileCode' },
  { id: 2, name: 'CSS', category: 'Frontend', level: 88, icon: 'Palette' },
  { id: 3, name: 'Tailwind CSS', category: 'Frontend', level: 85, icon: 'Wind' },
  { id: 4, name: 'JavaScript', category: 'Frontend', level: 85, icon: 'Code2' },
  { id: 5, name: 'TypeScript', category: 'Frontend', level: 80, icon: 'FileCode2' },
  { id: 6, name: 'React', category: 'Frontend', level: 82, icon: 'Atom' },
  { id: 7, name: 'jQuery', category: 'Frontend', level: 75, icon: 'Layers' },
  
  // Backend & BDD
  { id: 8, name: 'PHP', category: 'Backend', level: 78, icon: 'Server' },
  { id: 9, name: 'Python', category: 'Backend', level: 80, icon: 'Terminal' },
  { id: 10, name: 'MySQL', category: 'Backend', level: 82, icon: 'Database' },

  // Outils & Formats
  { id: 11, name: 'Git', category: 'Outils', level: 85, icon: 'GitBranch' },
  { id: 12, name: 'GitHub', category: 'Outils', level: 85, icon: 'Github' },
  { id: 13, name: 'XML', category: 'Langages & Formats', level: 75, icon: 'FileSpreadsheet' },
];

export const initialProjects: Project[] = [
  {
    id: 1,
    title: 'Plateforme E-Commerce Responsive',
    description: 'Application de boutique en ligne avec gestion de catalogue, panier dynamique et filtres interactifs.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'MySQL'],
    githubUrl: 'https://github.com/Fatoumatadiarra',
    demoUrl: 'https://example.com',
    featured: true,
    createdAt: '2026-01-15',
  },
  {
    id: 2,
    title: 'Système de Gestion de Stock & Ventes',
    description: 'Application web complète avec tableau de bord analytique, exports XML et gestion des stocks en base relationnelle.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Fatoumatadiarra',
    demoUrl: 'https://example.com',
    featured: true,
    createdAt: '2025-11-20',
  },
  {
    id: 3,
    title: 'Outil d\'Analyse de Données Python',
    description: 'Script d\'automatisation et traitement de données avec génération de rapports structurés et exports.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    technologies: ['Python', 'MySQL', 'XML'],
    githubUrl: 'https://github.com/Fatoumatadiarra',
    featured: false,
    createdAt: '2025-09-10',
  },
  {
    id: 4,
    title: 'Portail Interactif Étudiant',
    description: 'Interface étudiante interactive avec agenda, gestion de devoirs et échanges de ressources pédagogiques.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'CSS', 'JavaScript', 'PHP'],
    githubUrl: 'https://github.com/Fatoumatadiarra',
    demoUrl: 'https://example.com',
    featured: true,
    createdAt: '2025-06-05',
  },
];

export const initialExperiences: Experience[] = [
  {
    id: 1,
    title: 'Développeuse Web Stagiaire',
    entreprise: 'Entreprise Tech Solutions',
    description: 'Conception et maintenance de modules web dynamiques, intégration de maquettes responsive avec Tailwind CSS et optimisation des requêtes MySQL.',
    dateDebut: '2025-06',
    dateFin: '2025-09',
    technologies: ['React', 'JavaScript', 'PHP', 'MySQL', 'Git'],
  },
  {
    id: 2,
    title: 'Projets Académiques & Ingénierie Logicielle',
    entreprise: 'École d\'Ingénieurs',
    description: 'Développement d\'applications d\'équipe en méthode Agile : modélisation de bases relationnelles MySQL, scripts Python et interfaces web modernes.',
    dateDebut: '2024-09',
    dateFin: '2025-05',
    technologies: ['Python', 'PHP', 'HTML', 'CSS', 'Git', 'GitHub'],
  },
];

export const initialEducation: Education[] = [
  {
    id: 1,
    degree: 'Cycle Ingénieur en Génie Informatique',
    institution: 'École d\'Ingénieurs d\'Institut professionnel',
    year: '2024 – Présent',
    description: 'Spécialisation en génie logiciel, algorithmique avancée, bases de données, architectures web et systèmes distribués.',
  },
  {
    id: 2,
    degree: 'Classes Préparatoires / Licence Scientifique',
    institution: 'Université / CPGE',
    year: '2024 – Présent',
    description: 'Formation approfondie en mathématiques fondamentales, physique et initiation au développement informatique, notamment Python, C, JavaScript, HTML et CSS.',
  },
];

export const initialTestimonials: Testimonial[] = [];
