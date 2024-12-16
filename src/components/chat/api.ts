import type { ChatResponse, ChatError } from './types';

const API_URL = 'http://127.0.0.1:8080/ai';

export async function sendMessage(query: string): Promise<ChatResponse> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const error = await response.json() as ChatError;
      throw new Error(error.message || 'API request failed');
    }

    const data = await response.json() as ChatResponse;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to connect to the AI service. Please try again.');
  }
}