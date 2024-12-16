import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LevelProgress {
  completed: boolean;
  questionsAnswered: number;
  correctAnswers: number;
  highestScore: number;
}

interface ProgressState {
  levels: Record<string, LevelProgress>;
  updateProgress: (level: string, isCorrect: boolean, score: number) => void;
  getLevelProgress: (level: string) => number;
  isLevelUnlocked: (level: string) => boolean;
}

const QUESTIONS_TO_COMPLETE = 10;

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      levels: {
        Level_1: { completed: false, questionsAnswered: 0, correctAnswers: 0, highestScore: 0 },
        Level_2: { completed: false, questionsAnswered: 0, correctAnswers: 0, highestScore: 0 },
        Level_3: { completed: false, questionsAnswered: 0, correctAnswers: 0, highestScore: 0 },
        Level_4: { completed: false, questionsAnswered: 0, correctAnswers: 0, highestScore: 0 },
        Level_5: { completed: false, questionsAnswered: 0, correctAnswers: 0, highestScore: 0 },
      },
      
      updateProgress: (level, isCorrect, score) => {
        set(state => {
          const levelProgress = state.levels[level] || {
            completed: false,
            questionsAnswered: 0,
            correctAnswers: 0,
            highestScore: 0,
          };

          const newProgress = {
            ...levelProgress,
            questionsAnswered: levelProgress.questionsAnswered + 1,
            correctAnswers: levelProgress.correctAnswers + (isCorrect ? 1 : 0),
            highestScore: Math.max(levelProgress.highestScore, score),
            completed: levelProgress.questionsAnswered + 1 >= QUESTIONS_TO_COMPLETE,
          };

          return {
            levels: {
              ...state.levels,
              [level]: newProgress,
            },
          };
        });
      },

      getLevelProgress: (level) => {
        const progress = get().levels[level];
        if (!progress) return 0;
        return (progress.questionsAnswered / QUESTIONS_TO_COMPLETE) * 100;
      },

      isLevelUnlocked: (level) => {
        const levels = ['Level_1', 'Level_2', 'Level_3', 'Level_4', 'Level_5'];
        const levelIndex = levels.indexOf(level);
        if (levelIndex === 0) return true;
        
        const previousLevel = levels[levelIndex - 1];
        return get().levels[previousLevel]?.completed || false;
      },
    }),
    {
      name: 'progress-storage',
    }
  )
);