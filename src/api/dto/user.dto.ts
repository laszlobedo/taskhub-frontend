import { FeedbackDto } from "./feedback.dto";

export interface DetailedUserDto {
    id: number;
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
    email_verified_at?: string;
    sent_feedbacks_count?: number;
    received_feedbacks_count?: number;
    rating_average?: number;
    sent_feedbacks?: FeedbackDto[];
    received_feedbacks?: FeedbackDto[];
  }

export interface UserLanguageDto {
    language: string;
    level: string;
}

export interface UpdateUserDto {
    _method: 'PATCH';
    first_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
    phone?: string;
    profile_picture?: string | File;
    remove_profile_picture?: boolean;
    cover_picture?: string | File;
    remove_cover_picture?: boolean;
    resume?: string | File;
    remove_resume?: boolean;
    skills?: string[];
    languages?: UserLanguageDto[];
    bio?: string;
    description?: string;
    address?: string;
}
