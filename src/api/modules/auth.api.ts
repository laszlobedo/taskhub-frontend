import { apiClient } from '../client';
import { AUTH_MODE } from '../config';
import { AUTH_ENDPOINTS } from '../endpoints';
import type {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from '../dto/auth.dto';
import type { MeResponseDto } from '../dto/user.dto';

export const authApi = {
  login: (payload: LoginRequestDto) =>
    apiClient.post<LoginResponseDto, LoginRequestDto>(
      AUTH_ENDPOINTS.login,
      payload,
      { authMode: AUTH_MODE.PUBLIC },
    ),

  register: (payload: RegisterRequestDto) =>
    apiClient.post<RegisterResponseDto, RegisterRequestDto>(
      AUTH_ENDPOINTS.register,
      payload,
      { authMode: AUTH_MODE.PUBLIC },
    ),

  me: () =>
    apiClient.get<MeResponseDto>(AUTH_ENDPOINTS.me, {
      authMode: AUTH_MODE.REQUIRED,
    }),

  logout: () =>
    apiClient.post<void>(AUTH_ENDPOINTS.logout, undefined, {
      authMode: AUTH_MODE.REQUIRED,
    }),
};
