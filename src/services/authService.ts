import { api } from './api';

export interface AuthResponse {
  accessToken: string;
  user: {
    username: string;
    role: string;
  };
}

export const authService = {
  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { username, password });
      if (response && response.accessToken) {
        localStorage.setItem('portfolio_admin_token', response.accessToken);
        localStorage.setItem('portfolio_admin_user', JSON.stringify(response.user));
        return response;
      }
      throw new Error('Réponse invalide du serveur d\'authentification');
    } catch (error) {
      // Si le backend n'est pas démarré, permettre une connexion locale de démonstration
      if (username === 'admin' && password === 'admin123') {
        const demoAuth: AuthResponse = {
          accessToken: 'demo_jwt_token_diarra_dabo_admin',
          user: { username: 'admin', role: 'ADMIN' },
        };
        localStorage.setItem('portfolio_admin_token', demoAuth.accessToken);
        localStorage.setItem('portfolio_admin_user', JSON.stringify(demoAuth.user));
        return demoAuth;
      }
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem('portfolio_admin_token');
    localStorage.removeItem('portfolio_admin_user');
  },

  getToken(): string | null {
    return localStorage.getItem('portfolio_admin_token');
  },

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('portfolio_admin_token'));
  },

  getCurrentUser(): { username: string; role: string } | null {
    const raw = localStorage.getItem('portfolio_admin_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
};
