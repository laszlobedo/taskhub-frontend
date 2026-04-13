import type {
  AuthUserDto,
  LoginRequestDto,
  RegisterResponseDto,
  RegisterRequestDto,
} from '../dto/auth.dto';
import type { MeResponseDto } from '../dto/user.dto';
import { authApi } from '../modules/auth.api';
import { authStorage } from '../../auth/storage';
import { setIgnoreUnauthorizedRedirect } from '../client';

const getTokenFromResponse = (response: { token: string; token_type: string }): string => {
  if (!response.token || response.token.trim().length === 0) {
    throw new Error('Auth token missing from response.');
  }

  // token_type can be used for validation/logging if needed later.
  return response.token;
};

export const authService = {
  async login(payload: LoginRequestDto): Promise<AuthUserDto> {
    const response = await authApi.login(payload);

    authStorage.setSession({
      accessToken: getTokenFromResponse(response),
      user: response.user,
    });

    return response.user;
  },

  async register(payload: RegisterRequestDto): Promise<RegisterResponseDto> {
    const response = await authApi.register(payload);
    return response;
  },

  async me(): Promise<MeResponseDto> {
    const response = await authApi.me() as
      | MeResponseDto
      | { data: MeResponseDto }
      | { user: MeResponseDto }
      | { data: { user: MeResponseDto } };

    if (response && typeof response === 'object') {
      if ('data' in response && response.data) {
        const data = response.data as MeResponseDto | { user: MeResponseDto };
        if (data && typeof data === 'object' && 'user' in data && data.user) {
          return data.user;
        }
        return data as MeResponseDto;
      }

      if ('user' in response && response.user) {
        return response.user;
      }
    }

    return response as MeResponseDto;
  },

  async logout(): Promise<void> {
    setIgnoreUnauthorizedRedirect(true);
    try {
      await authApi.logout();
    } catch {
      // Ignore logout endpoint failures; client session clear is source of truth.
    } finally {
      // Always clear local session, even if backend logout fails.
      authStorage.clearSession();
      // Delay re-enabling to avoid late in-flight 401 race after logout click.
      window.setTimeout(() => {
        setIgnoreUnauthorizedRedirect(false);
      }, 0);
    }
  },

  getStoredUser(): AuthUserDto | null {
    return authStorage.getAuthUser();
  },

  getAccessToken(): string | null {
    return authStorage.getAccessToken();
  },

  isAuthenticated(): boolean {
    return Boolean(authStorage.getAccessToken());
  },
};
