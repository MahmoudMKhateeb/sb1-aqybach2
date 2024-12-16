export interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
  points: number;
}

export interface QuizLevel {
  level: string;
  questions: QuizQuestion[];
}

export interface QuizState {
  currentLevel: string;
  currentQuestion: number;
  score: number;
  answers: { questionId: number; isCorrect: boolean }[];
  isComplete: boolean;
  correctAnswersCount: number;
  answeredQuestions: Set<number>; // Track which questions have been answered
}

export interface QuizStats {
  pointsEarned: number;
  accuracyScore: number;
  questionsAnswered: number;
  level: string;
}