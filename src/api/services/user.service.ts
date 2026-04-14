import { MeResponseDto } from "../dto/user.dto";
import { userApi } from "../modules/user.api";

export const userService = {
    async me(): Promise<MeResponseDto> {
    const response = await userApi.me() as
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
  }
};
