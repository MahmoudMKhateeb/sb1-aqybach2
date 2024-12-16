import { useState, useEffect, useCallback } from 'react';
import { Timer } from 'lucide-react';

interface QuizTimerProps {
  duration: number;
  onTimeUp: () => void;
  isActive: boolean;
  questionIndex: number; // Add questionIndex prop
}

export function QuizTimer({ duration, onTimeUp, isActive, questionIndex }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset timer when question changes
  useEffect(() => {
    if (isActive) {
      setTimeLeft(duration);
    }
  }, [duration, questionIndex, isActive]);

  useEffect(() => {
    if (!isActive || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, onTimeUp]);

  return (
    <div className="flex items-center gap-2 text-gray-600">
      <Timer className="w-5 h-5" />
      <span>{timeLeft}s</span>
    </div>
  );
}