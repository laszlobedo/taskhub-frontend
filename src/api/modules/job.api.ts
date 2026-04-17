import { apiClient } from "../client";
import { AUTH_MODE } from "../config";
import { JOB_ENDPOINTS } from "../endpoints";

export const jobApi = {
    list: () => apiClient.get(JOB_ENDPOINTS.list, {
        authMode: AUTH_MODE.REQUIRED,
    }),
}
