export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  image?: string; // Base64 string for display
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface SendMessageParams {
  text: string;
  imageBase64?: string; // Raw base64 data without prefix for API
  mimeType?: string;
}

export interface Formula {
  id: string;
  title: string;
  subtitle: string;
  durationSeconds: number; // e.g. 210 for 3:30
  steps: string[];
  iconType: 'heart' | 'shield' | 'user' | 'users' | 'zap';
}
