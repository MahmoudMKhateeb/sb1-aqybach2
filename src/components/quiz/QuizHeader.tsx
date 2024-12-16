import { Share2, Book } from 'lucide-react';
import { Button } from '../ui/Button';

export function QuizHeader() {
  return (
    <div className="text-center mb-8">
      <p className="text-gray-600 mb-6">Track your progress and see how you performed</p>
      
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Book className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold">Quizzes Taken: 5</h3>
              <p className="text-gray-500 text-sm">Last Quiz: Today</p>
            </div>
          </div>
          <Button
            variant="secondary"
            className="!px-4 !py-2 flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share Result
          </Button>
        </div>
      </div>
    </div>
  );
}