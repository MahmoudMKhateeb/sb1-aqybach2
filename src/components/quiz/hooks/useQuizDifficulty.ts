import { useState } from 'react';

const DIFFICULTY_LEVELS = ['Level_1', 'Level_2', 'Level_3', 'Level_4', 'Level_5'] as const;

export function useQuizDifficulty() {
  const [currentLevel, setCurrentLevel] = useState<typeof DIFFICULTY_LEVELS[number]>('Level_1');

  const adjustDifficulty = (correctAnswers: number, totalQuestions: number) => {
    const currentIndex = DIFFICULTY_LEVELS.indexOf(currentLevel);
    const percentage = (correctAnswers / totalQuestions) * 100;
    
    if (percentage >= 80 && currentIndex < DIFFICULTY_LEVELS.length - 1) {
      // Increase difficulty if score is 80% or higher
      setCurrentLevel(DIFFICULTY_LEVELS[currentIndex + 1]);
      return true;
    } else if (percentage <= 30 && currentIndex > 0) {
      // Decrease difficulty if score is 30% or lower
      setCurrentLevel(DIFFICULTY_LEVELS[currentIndex - 1]);
      return true;
    }
    return false;
  };

  return {
    currentLevel,
    setCurrentLevel,
    adjustDifficulty,
  };
}