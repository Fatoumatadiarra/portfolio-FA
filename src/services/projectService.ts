import { api } from './api';
import type { Project } from '../types';
import { initialProjects } from '../data/portfolioData';

export const projectService = {
  async getAll(): Promise<Project[]> {
    try {
      const data = await api.get<Project[]>('/projects');
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      return initialProjects;
    } catch {
      // Si le backend n'est pas encore démarré, retourner les données locales
      return initialProjects;
    }
  },

  async getById(id: number | string): Promise<Project> {
    return api.get<Project>(`/projects/${id}`);
  },

  async create(project: Omit<Project, 'id'>): Promise<Project> {
    return api.post<Project>('/projects', project);
  },

  async update(id: number | string, project: Partial<Project>): Promise<Project> {
    return api.patch<Project>(`/projects/${id}`, project);
  },

  async delete(id: number | string): Promise<void> {
    return api.delete<void>(`/projects/${id}`);
  },
};
