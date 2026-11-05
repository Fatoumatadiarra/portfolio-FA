import { api } from './api';
import type { ContactMessage } from '../types';

export const contactService = {
  async sendMessage(data: { nom: string; email: string; sujet?: string; message: string }): Promise<{ success: boolean; message: string }> {
    return api.post<{ success: boolean; message: string }>('/contact', data);
  },

  async getAllMessages(): Promise<ContactMessage[]> {
    return api.get<ContactMessage[]>('/contact/messages');
  },

  async updateStatus(id: number | string, statut: 'NON_LU' | 'LU' | 'ARCHIVE'): Promise<ContactMessage> {
    return api.patch<ContactMessage>(`/contact/messages/${id}`, { statut });
  },

  async deleteMessage(id: number | string): Promise<void> {
    return api.delete<void>(`/contact/messages/${id}`);
  },
};
