import { useState, useCallback, useEffect } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { useSubscriptionStore } from '../../../store/subscriptionStore';
import { useProgressStore } from '../../../store/progressStore';
import { useQuestions } from './useQuestions';
import { useQuizDifficulty } from './useQuizDifficulty';
import { shuffle } from '../utils/shuffle';
import type { QuizState, QuizStats, QuizQuestion } from '../types';

export function useQuiz() {
  const { user, updatePoints } = useAuthStore();
  const { currentLevel, adjustDifficulty } = useQuizDifficulty();
  const { questions, loading, error } = useQuestions();
  const subscription = useSubscriptionStore();
  const progress = useProgressStore();
  
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [state, setState] = useState<QuizState>(() => ({
    currentLevel,
    currentQuestion: 0,
    score: 0,
    answers: [],
    isComplete: false,
    correctAnswersCount: 0,
    answeredQuestions: new Set<number>(),
  }));

  // Check daily reset on mount
  useEffect(() => {
    subscription.checkDailyReset();
  }, []);

  // Reset state when level changes
  useEffect(() => {
    resetQuiz();
  }, [currentLevel]);

  const getCurrentLevelQuestions = useCallback(() => {
    if (!questions.length) return [];
    const levelData = questions.find(q => q.level === currentLevel);
    return levelData?.questions || [];
  }, [currentLevel, questions]);

  const shuffleQuestions = useCallback(() => {
    const questions = getCurrentLevelQuestions();
    setShuffledQuestions(shuffle(questions));
    setCurrentQuestionIndex(0);
  }, [getCurrentLevelQuestions]);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const totalQuestions = shuffledQuestions.length;

  const getStats = useCallback((): QuizStats => ({
    pointsEarned: state.score,
    accuracyScore: state.answers.length 
      ? (state.correctAnswersCount / state.answers.length) * 100 
      : 0,
    questionsAnswered: state.answers.length,
    level: currentLevel,
  }), [state.score, state.answers.length, state.correctAnswersCount, currentLevel]);

  const handleAnswer = useCallback(async (answer: string) => {
    if (!user || !currentQuestion) return;

    // Check daily limit
    if (!subscription.incrementDailyCount()) {
      setShowUpgradeModal(true);
      return;
    }

    const isCorrect = answer === currentQuestion.correct_answer;
    const points = isCorrect ? currentQuestion.points : -5;

    setState(prev => {
      const newAnsweredQuestions = new Set(prev.answeredQuestions);
      newAnsweredQuestions.add(currentQuestionIndex);

      const newCorrectCount = isCorrect ? prev.correctAnswersCount + 1 : prev.correctAnswersCount;
      const isComplete = currentQuestionIndex === totalQuestions - 1;

      if (isComplete) {
        adjustDifficulty(newCorrectCount, totalQuestions);
      }

      return {
        ...prev,
        score: prev.score + points,
        correctAnswersCount: newCorrectCount,
        answers: [...prev.answers, { questionId: currentQuestionIndex, isCorrect }],
        answeredQuestions: newAnsweredQuestions,
        isComplete,
      };
    });

    // Update progress
    progress.updateProgress(currentLevel, isCorrect, state.score + points);

    // Move to next question
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }

    try {
      await updatePoints(user.id, points);
    } catch (error) {
      console.error('Failed to update points:', error);
    }
  }, [user, currentQuestion, currentQuestionIndex, totalQuestions, adjustDifficulty, updatePoints, subscription, progress, currentLevel, state.score]);

  const resetQuiz = useCallback(() => {
    setState({
      currentLevel,
      currentQuestion: 0,
      score: 0,
      answers: [],
      isComplete: false,
      correctAnswersCount: 0,
      answeredQuestions: new Set(),
    });
    setCurrentQuestionIndex(0);
    shuffleQuestions();
  }, [currentLevel, shuffleQuestions]);

  // Initialize questions on mount
  useEffect(() => {
    if (!loading && questions.length > 0) {
      shuffleQuestions();
    }
  }, [loading, questions, shuffleQuestions]);

  return {
    state,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    stats: getStats(),
    handleAnswer,
    resetQuiz,
    loading,
    error,
    showUpgradeModal,
    setShowUpgradeModal,
  };
}