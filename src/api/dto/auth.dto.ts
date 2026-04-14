import { UserLanguageDto } from "./user.dto";

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

export interface LoginResponseDto {
    token: string;
    token_type: string;
    user: AuthUserDto;
}

export interface RegisterResponseDto {
  message: string;
}

export interface RegisterRequestDto {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    government_id: File;
    profile_picture?: File;
    cover_picture?: File;
    resume?: File;
    bio?: string;
    description?: string;
    address?: string;
    skills?: string[];
    languages?: UserLanguageDto[];
  }
