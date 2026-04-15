export interface FeedbackDto {
    id: number;
    sender: FeedbackUserDto;
    receiver: FeedbackUserDto;
    rating: number;
    overview?: string;
    created_at: string;
    updated_at: string;
}

export interface FeedbackUserDto {
    id: number;
    name: string;
    username: string;
    profile_picture?: string;
}
