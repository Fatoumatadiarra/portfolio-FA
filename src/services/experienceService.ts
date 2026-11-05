import { api } from './api';
import type { Experience } from '../types';
import { initialExperiences } from '../data/portfolioData';

export const experienceService = {
  async getAll(): Promise<Experience[]> {
    try {
      const data = await api.get<Experience[]>('/experiences');
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      return initialExperiences;
    } catch {
      return initialExperiences;
    }
  },

  async create(experience: Omit<Experience, 'id'>): Promise<Experience> {
    return api.post<Experience>('/experiences', experience);
  },

  async update(id: number | string, experience: Partial<Experience>): Promise<Experience> {
    return api.patch<Experience>(`/experiences/${id}`, experience);
  },

  async delete(id: number | string): Promise<void> {
    return api.delete<void>(`/experiences/${id}`);
  },
};
