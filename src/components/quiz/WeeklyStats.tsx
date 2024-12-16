export function WeeklyStats() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">Weekly Report</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold">250</p>
          <p className="text-gray-600 text-sm">Points Earned</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold">85%</p>
          <p className="text-gray-600 text-sm">Accuracy Score</p>
        </div>
      </div>
    </div>
  );
}