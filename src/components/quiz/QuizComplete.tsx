import { Trophy, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import type { QuizStats } from './types';

interface QuizCompleteProps {
  level: string;
  stats: QuizStats;
  onTryAnotherLevel: () => void;
}

export function QuizComplete({ level, stats, onTryAnotherLevel }: QuizCompleteProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-cyan-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl p-8 shadow-lg max-w-md w-full text-center">
        <div className="mb-6">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-gray-600">
            You've completed Level {level}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-2xl font-bold text-blue-600">
              {stats.pointsEarned}
            </p>
            <p className="text-sm text-gray-600">Points Earned</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl">
            <p className="text-2xl font-bold text-green-600">
              {Math.round(stats.accuracyScore)}%
            </p>
            <p className="text-sm text-gray-600">Accuracy</p>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onTryAnotherLevel}
            className="w-full flex items-center justify-center gap-2"
          >
            Try Another Level
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}