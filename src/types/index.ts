export interface Project {
  id?: number | string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  createdAt?: string;
}

export interface Skill {
  id?: number | string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Outils' | 'Langages & Formats';
  level: number; // 0 à 100
  icon?: string;
}

export interface Experience {
  id?: number | string;
  title: string;
  entreprise: string;
  description: string;
  dateDebut: string;
  dateFin?: string;
  technologies: string[];
}

export interface Education {
  id?: number | string;
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface ContactMessage {
  id?: number | string;
  nom: string;
  email: string;
  sujet?: string;
  message: string;
  createdAt?: string;
  statut?: 'NON_LU' | 'LU' | 'ARCHIVE';
}

export interface Testimonial {
  id: number | string;
  name: string;
  role: string;
  avatar: string;
  content: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  subRole: string;
  bio: string;
  description: string;
  email: string;
  phone: string;
  phoneLink?: string;
  location: string;
  github: string;
  linkedin: string;
  cvUrl: string;
}
