export interface MeResponseDto {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    phone: string;
    profile_picture?: string;
    cover_picture?: string;
    resume?: string;
    skills?: string[];
    languages?: UserLanguageDto[];
    bio?: string;
    description?: string;
    address?: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
  }

  export interface UserLanguageDto {
    language: string;
    level: string;
  }
