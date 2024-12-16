import { useState, useCallback, useEffect } from 'react';
import type { QuizQuestion as QuestionType } from './types';
import { QuizTimer } from './QuizTimer';

interface QuizQuestionProps {
  question: QuestionType;
  onAnswer: (answer: string) => void;
  questionIndex: number;
}

export function QuizQuestion({ question, onAnswer, questionIndex }: QuizQuestionProps) {
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    setIsTimerActive(true);
  }, [questionIndex]);

  const handleTimeUp = useCallback(() => {
    if (isTimerActive) {
      setIsTimerActive(false);
      onAnswer('');
    }
  }, [onAnswer, isTimerActive]);

  const handleOptionClick = useCallback((option: string) => {
    if (isTimerActive) {
      setIsTimerActive(false);
      onAnswer(option);
    }
  }, [onAnswer, isTimerActive]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6 animate-slide-up">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-blue-600 flex-1">
          {question.question}
        </h2>
        <QuizTimer 
          duration={30}
          onTimeUp={handleTimeUp}
          isActive={isTimerActive}
          questionIndex={questionIndex}
        />
      </div>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            disabled={!isTimerActive}
            className={`w-full p-4 rounded-xl text-left transition-colors ${
              isTimerActive
                ? 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                : 'bg-gray-50 text-gray-500 cursor-not-allowed'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}