import { Share2, Book, ArrowLeft, MoreVertical, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatisticsChart } from './StatisticsChart';
import { WeeklyStats } from './WeeklyStats';
import { QuizHeader } from './QuizHeader';
import { Button } from '../ui/Button';

export function QuizSummary() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-cyan-50 pb-20">
      <div className="p-4 flex items-center justify-between">
        <Link to="/home" className="text-gray-800">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold">Daily Quiz Summary</h1>
        <button className="text-gray-800">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-md mx-auto px-6">
        <QuizHeader />
        <WeeklyStats />
        
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-4">Statistics</h3>
          <StatisticsChart />
        </div>

        <Link to="/quiz">
          <Button className="w-full flex items-center justify-center gap-2 !bg-blue-600 hover:!bg-blue-700 transition-colors">
            <PlayCircle className="w-5 h-5" />
            Take Today's Quiz
          </Button>
        </Link>

        <p className="text-center text-sm text-gray-600 mt-4">
          Complete daily quizzes to earn more points and improve your financial knowledge!
        </p>
      </div>
    </div>
  );
}