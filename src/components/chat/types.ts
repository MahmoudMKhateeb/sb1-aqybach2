export interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  answer: string;
}

export interface ChatError {
  error: string;
  message?: string;
}