import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuiz } from './hooks/useQuiz';
import { QuizQuestion } from './QuizQuestion';
import { QuizComplete } from './QuizComplete';
import { LevelSelector } from './LevelSelector';
import { ProgressBar } from './ProgressBar';
import { PointsDisplay } from './PointsDisplay';
import { UpgradeModal } from '../subscription/UpgradeModal';
import { useAuthStore } from '../../store/authStore';

export function QuizPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    state, 
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    stats,
    handleAnswer,
    resetQuiz,
    loading,
    error,
    showUpgradeModal,
    setShowUpgradeModal
  } = useQuiz();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-cyan-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-cyan-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl p-6 text-center max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Quiz</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-blue-600 hover:underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion || state.isComplete) {
    return (
      <QuizComplete
        level={state.currentLevel}
        stats={stats}
        onTryAnotherLevel={resetQuiz}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-cyan-50 pb-20">
      <div className="p-4 flex items-center justify-between">
        <Link to="/home" className="text-gray-800">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold">{user?.points || 0} pts</span>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6">
        <div className="mb-6">
          <LevelSelector
            currentLevel={state.currentLevel}
            onSelectLevel={resetQuiz}
          />
          <ProgressBar
            current={state.currentQuestion + 1}
            total={totalQuestions}
          />
        </div>

        <QuizQuestion
          question={currentQuestion}
          onAnswer={handleAnswer}
          questionIndex={currentQuestionIndex}
        />

        <PointsDisplay
          points={stats.pointsEarned}
          accuracy={stats.accuracyScore}
        />
      </div>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={() => {
          setShowUpgradeModal(false);
          navigate('/subscription');
        }}
      />
    </div>
  );
}