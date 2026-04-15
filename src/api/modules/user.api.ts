import { apiClient } from "../client";
import { AUTH_MODE } from "../config";
import { AUTH_ENDPOINTS, USER_ENDPOINTS } from "../endpoints";
import type { DetailedUserDto, UpdateUserDto } from "../dto/user.dto";

export const userApi = {
    me: () =>
        apiClient.get<DetailedUserDto>(USER_ENDPOINTS.me, {
          authMode: AUTH_MODE.REQUIRED,
        }),
    update: (payload: FormData) =>
        apiClient.post<DetailedUserDto, FormData>(USER_ENDPOINTS.update, payload, {
          authMode: AUTH_MODE.REQUIRED,
        }),
}
