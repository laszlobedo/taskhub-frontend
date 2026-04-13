export interface AuthUserDto {
  id: string;
  name: string;
  username: string;
  email: string;
  is_verified: boolean;
  profile_picture?: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponseDto {
    token: string;
    token_type: string;
    user: AuthUserDto;
}

export interface RegisterResponseDto {
  message: string;
}
