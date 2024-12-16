import { useState, useEffect } from 'react';
import { quizQuestions } from '../data/questions';
import type { QuizLevel } from '../types';

export function useQuestions() {
  const [questions, setQuestions] = useState<QuizLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setQuestions(quizQuestions);
      setError(null);
    } catch (err) {
      setError('Failed to load questions');
    } finally {
      setLoading(false);
    }
  }, []);

  return { questions, loading, error };
}