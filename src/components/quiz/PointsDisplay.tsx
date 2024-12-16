interface PointsDisplayProps {
  points: number;
  accuracy: number;
}

export function PointsDisplay({ points, accuracy }: PointsDisplayProps) {
  return (
    <div className="fixed bottom-6 left-0 right-0 px-6">
      <div className="max-w-md mx-auto bg-white rounded-xl p-4 shadow-lg flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Current Score</p>
          <p className="text-xl font-bold text-blue-600">{points} Points</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Accuracy</p>
          <p className="text-xl font-bold text-green-600">
            {Math.round(accuracy)}%
          </p>
        </div>
      </div>
    </div>
  );
}