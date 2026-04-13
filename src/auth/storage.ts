import { STORAGE_KEYS } from '../api/config';
import type { AuthUserDto } from '../api/dto/auth.dto';

export interface AuthSession {
  accessToken: string;
  user: AuthUserDto;
}

export const authStorage = {
  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.accessToken);
  },

  setAccessToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.accessToken, token);
  },

  getAuthUser(): AuthUserDto | null {
    const raw = localStorage.getItem(STORAGE_KEYS.authUser);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as AuthUserDto;
    } catch {
      localStorage.removeItem(STORAGE_KEYS.authUser);
      return null;
    }
  },

  setAuthUser(user: AuthUserDto): void {
    localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(user));
  },

  setSession(session: AuthSession): void {
    this.setAccessToken(session.accessToken);
    this.setAuthUser(session.user);
  },

  clearSession(): void {
    localStorage.removeItem(STORAGE_KEYS.accessToken);
    localStorage.removeItem(STORAGE_KEYS.authUser);
  },
};
