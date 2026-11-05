import { api } from './api';
import type { Skill } from '../types';
import { initialSkills } from '../data/portfolioData';

export const skillService = {
  async getAll(): Promise<Skill[]> {
    try {
      const data = await api.get<Skill[]>('/skills');
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      return initialSkills;
    } catch {
      return initialSkills;
    }
  },

  async create(skill: Omit<Skill, 'id'>): Promise<Skill> {
    return api.post<Skill>('/skills', skill);
  },

  async update(id: number | string, skill: Partial<Skill>): Promise<Skill> {
    return api.patch<Skill>(`/skills/${id}`, skill);
  },

  async delete(id: number | string): Promise<void> {
    return api.delete<void>(`/skills/${id}`);
  },
};
