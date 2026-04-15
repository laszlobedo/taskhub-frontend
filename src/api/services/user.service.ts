import type { DetailedUserDto, UpdateUserDto } from "../dto/user.dto";
import { userApi } from "../modules/user.api";

export const userService = {
    async me(): Promise<DetailedUserDto> {
    const response = await userApi.me() as
      | DetailedUserDto
      | { data: DetailedUserDto }
      | { user: DetailedUserDto }
      | { data: { user: DetailedUserDto } };

    if (response && typeof response === 'object') {
      if ('data' in response && response.data) {
        const data = response.data as DetailedUserDto | { user: DetailedUserDto };
        if (data && typeof data === 'object' && 'user' in data && data.user) {
          return data.user;
        }
        return data as DetailedUserDto;
      }

      if ('user' in response && response.user) {
        return response.user;
      }
    }

    return response as DetailedUserDto;
  },

  async update(payload: UpdateUserDto): Promise<DetailedUserDto> {
    const formData = new FormData();
    formData.append('_method', 'PATCH');

    Object.entries(payload).forEach(([key, value]) => {
      if (key === '_method' || value === undefined || value === null) {
        return;
      }

      if (typeof value === 'string' && value.trim() === '') {
        return;
      }

      if (Array.isArray(value)) {
        if (value.length === 0) {
          return;
        }
        formData.append(key, JSON.stringify(value));
        return;
      }

      if (value instanceof Blob) {
        formData.append(key, value);
        return;
      }

      if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
        return;
      }

      formData.append(key, String(value));
    });

    const response = await userApi.update(formData) as
    | DetailedUserDto
    | { data: DetailedUserDto }
    | { user: DetailedUserDto }
    | { data: { user: DetailedUserDto } };

    if (response && typeof response === 'object') {
      if ('data' in response && response.data) {
        return response.data as DetailedUserDto;
      }
      if ('user' in response && response.user) {
        return response.user;
      }
    }

    return response as DetailedUserDto;
  }
};
