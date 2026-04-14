import { apiClient } from "../client";
import { AUTH_MODE } from "../config";
import { AUTH_ENDPOINTS } from "../endpoints";
import type { MeResponseDto } from "../dto/user.dto";

export const userApi = {
    me: () =>
        apiClient.get<MeResponseDto>(AUTH_ENDPOINTS.me, {
          authMode: AUTH_MODE.REQUIRED,
        }),
}
