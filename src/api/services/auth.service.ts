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

const buildRegisterFormData = (payload: RegisterRequestDto): FormData => {
  const formData = new FormData();

  formData.append('first_name', payload.first_name);
  formData.append('last_name', payload.last_name);
  formData.append('email', payload.email);
  formData.append('password', payload.password);
  formData.append('password_confirmation', payload.password_confirmation);
  formData.append('phone', payload.phone);
  formData.append('government_id', payload.government_id);

  if (payload.profile_picture) {
    formData.append('profile_picture', payload.profile_picture);
  }
  if (payload.cover_picture) {
    formData.append('cover_picture', payload.cover_picture);
  }
  if (payload.resume) {
    formData.append('resume', payload.resume);
  }
  if (payload.bio) {
    formData.append('bio', payload.bio);
  }
  if (payload.description) {
    formData.append('description', payload.description);
  }
  if (payload.address) {
    formData.append('address', payload.address);
  }

  payload.skills?.forEach((skill, index) => {
    formData.append(`skills[${index}]`, skill);
  });

  payload.languages?.forEach((language, index) => {
    formData.append(`languages[${index}][language]`, language.language);
    formData.append(`languages[${index}][level]`, language.level);
  });

  return formData;
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
    const formDataPayload = buildRegisterFormData(payload);
    const response = await authApi.register(formDataPayload);
    return response;
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
