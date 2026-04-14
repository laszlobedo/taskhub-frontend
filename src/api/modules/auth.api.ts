import { apiClient } from '../client';
import { AUTH_MODE } from '../config';
import { AUTH_ENDPOINTS } from '../endpoints';
import type {
  LoginRequestDto,
  LoginResponseDto,
  RegisterResponseDto,
} from '../dto/auth.dto';

export const authApi = {
  login: (payload: LoginRequestDto) =>
    apiClient.post<LoginResponseDto, LoginRequestDto>(
      AUTH_ENDPOINTS.login,
      payload,
      { authMode: AUTH_MODE.PUBLIC },
    ),

  register: (payload: FormData) =>
    apiClient.post<RegisterResponseDto, FormData>(
      AUTH_ENDPOINTS.register,
      payload,
      { authMode: AUTH_MODE.PUBLIC },
    ),

  logout: () =>
    apiClient.post<void>(AUTH_ENDPOINTS.logout, undefined, {
      authMode: AUTH_MODE.REQUIRED,
      suppressUnauthorizedRedirect: true,
    }),
};
