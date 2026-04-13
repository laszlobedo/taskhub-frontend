export interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: any;
  isUnlocked: boolean;
  progress: number;
  total: number;
  reward: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  expiry?: string;
  brand?: string;
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  location: string;
  rating: number;
  reviews: number;
  joinedDate: string;
  isVerified: boolean;
  completedTasks: number;
  bio: string;
  skills: string[];
  cvUrl?: string;
}

export interface Task {
  id: string;
  title: string;
  category: string;
  price: number;
  location: string;
  timeEstimate: string;
  datePosted: string;
  jobDate?: string;
  isBoosted?: boolean;
  description: string;
  requirements?: string[];
  images?: string[];
  author: {
    name: string;
    avatar: string;
    rating: number;
    isVerified?: boolean;
    completedTasks: number;
    bio?: string;
    joinedDate?: string;
    reviewsCount?: number;
    skills?: string[];
  };
}

export interface Message {
  id: string;
  sender: 'me' | 'other';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  unreadCount: number;
  isActive: boolean;
  messages: Message[];
}

export type ViewState = 'landing' | 'register' | 'dashboard' | 'find-job' | 'post-job' | 'messages' | 'profile' | 'calendar' | 'settings' | 'my-jobs' | 'adds' | 'preview';

export interface UserProfileViewProps {
    profile: Task['author'];
    onClose?: () => void;
    isStatic?: boolean;
    onContact?: () => void;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR'
}

