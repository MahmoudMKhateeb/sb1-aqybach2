import { useState } from 'react';
import { sendMessage } from '../api';
import type { Message } from '../types';

const INITIAL_MESSAGE: Message = {
  id: 1,
  text: "Welcome! Ask Me Anything About Managing Your Finances in Egypt, From Loans To Savings!",
  isBot: true,
  timestamp: new Date()
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (text: string, isBot: boolean) => {
    const message: Message = {
      id: messages.length + 1,
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
    return message;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = addMessage(input, false);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage(userMessage.text);
      addMessage(response.answer, true);
    } catch (error) {
      addMessage(
        error instanceof Error 
          ? error.message 
          : "Something went wrong. Please try again.",
        true
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    handleSend
  };
}