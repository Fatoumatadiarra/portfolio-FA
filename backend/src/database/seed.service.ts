import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../modules/projects/entities/project.entity';
import { Skill } from '../modules/skills/entities/skill.entity';
import { Experience } from '../modules/experiences/entities/experience.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(Skill)
    private readonly skillRepo: Repository<Skill>,
    @InjectRepository(Experience)
    private readonly experienceRepo: Repository<Experience>,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.seedSkills();
      await this.seedProjects();
      await this.seedExperiences();
    } catch (err: unknown) {
      this.logger.warn(`Initialisation automatique reportée : ${err instanceof Error ? err.message : err}`);
    }
  }

  private async seedSkills() {
    const count = await this.skillRepo.count();
    if (count > 0) return;

    const initialSkills = [
      { name: 'HTML', category: 'Frontend', level: 90, icon: 'FileCode' },
      { name: 'CSS', category: 'Frontend', level: 88, icon: 'Palette' },
      { name: 'Tailwind CSS', category: 'Frontend', level: 85, icon: 'Wind' },
      { name: 'JavaScript', category: 'Frontend', level: 85, icon: 'Code2' },
      { name: 'TypeScript', category: 'Frontend', level: 80, icon: 'FileCode2' },
      { name: 'React', category: 'Frontend', level: 82, icon: 'Atom' },
      { name: 'jQuery', category: 'Frontend', level: 75, icon: 'Layers' },
      { name: 'PHP', category: 'Backend', level: 78, icon: 'Server' },
      { name: 'Python', category: 'Backend', level: 80, icon: 'Terminal' },
      { name: 'MySQL', category: 'Backend', level: 82, icon: 'Database' },
      { name: 'Git', category: 'Outils', level: 85, icon: 'GitBranch' },
      { name: 'GitHub', category: 'Outils', level: 85, icon: 'Github' },
      { name: 'XML', category: 'Langages & Formats', level: 75, icon: 'FileSpreadsheet' },
    ];

    await this.skillRepo.save(initialSkills);
    this.logger.log(`[Seed] ${initialSkills.length} compétences initialisées`);
  }

  private async seedProjects() {
    const count = await this.projectRepo.count();
    if (count > 0) return;

    const initialProjects = [
      {
        title: 'Plateforme E-Commerce Responsive',
        description: 'Application de boutique en ligne avec gestion de catalogue, panier dynamique et filtres interactifs.',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'MySQL'],
        githubUrl: 'https://github.com/Fatoumatadiarra',
        demoUrl: 'https://example.com',
        featured: true,
      },
      {
        title: 'Système de Gestion de Stock & Ventes',
        description: 'Application web complète avec tableau de bord analytique, exports XML et gestion des stocks en base relationnelle.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        technologies: ['PHP', 'MySQL', 'JavaScript', 'Tailwind CSS'],
        githubUrl: 'https://github.com/Fatoumatadiarra',
        demoUrl: 'https://example.com',
        featured: true,
      },
      {
        title: 'Outil d\'Analyse de Données Python',
        description: 'Script d\'automatisation et traitement de données avec génération de rapports structurés et exports.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        technologies: ['Python', 'MySQL', 'XML'],
        githubUrl: 'https://github.com/Fatoumatadiarra',
        featured: false,
      },
      {
        title: 'Portail Interactif Étudiant',
        description: 'Interface étudiante interactive avec agenda, gestion de devoirs et échanges de ressources pédagogiques.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
        technologies: ['React', 'CSS', 'JavaScript', 'PHP'],
        githubUrl: 'https://github.com/Fatoumatadiarra',
        demoUrl: 'https://example.com',
        featured: true,
      },
    ];

    await this.projectRepo.save(initialProjects);
    this.logger.log(`[Seed] ${initialProjects.length} projets initialisés`);
  }

  private async seedExperiences() {
    const count = await this.experienceRepo.count();
    if (count > 0) return;

    const initialExperiences = [
      {
        title: 'Développeuse Web Stagiaire',
        entreprise: 'Entreprise Tech Solutions',
        description: 'Conception et maintenance de modules web dynamiques, intégration de maquettes responsive avec Tailwind CSS et optimisation des requêtes MySQL.',
        dateDebut: '2025-06',
        dateFin: '2025-09',
        technologies: ['React', 'JavaScript', 'PHP', 'MySQL', 'Git'],
      },
      {
        title: 'Projets Académiques & Ingénierie Logicielle',
        entreprise: 'École d\'Ingénieurs',
        description: 'Développement d\'applications d\'équipe en méthode Agile : modélisation de bases relationnelles MySQL, scripts Python et interfaces web modernes.',
        dateDebut: '2024-09',
        dateFin: '2025-05',
        technologies: ['Python', 'PHP', 'HTML', 'CSS', 'Git', 'GitHub'],
      },
    ];

    await this.experienceRepo.save(initialExperiences);
    this.logger.log(`[Seed] ${initialExperiences.length} expériences initialisées`);
  }
}
