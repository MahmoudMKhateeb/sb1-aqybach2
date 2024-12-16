import type { QuizLevel } from '../types';

export async function loadQuestions(): Promise<QuizLevel[]> {
  try {
    const response = await fetch('/src/components/quiz/data/questions.txt');
    const text = await response.text();
    
    try {
      const data = JSON.parse(text);
      return data.questions;
    } catch (parseError) {
      console.error('Failed to parse questions:', parseError);
      throw new Error('Invalid question format');
    }
  } catch (error) {
    console.error('Failed to load questions:', error);
    throw new Error('Failed to load questions');
  }
}