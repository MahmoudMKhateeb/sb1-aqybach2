import { Settings } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';

export function HomePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-md mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
            alt="avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold">Hey {user?.name}</h1>
            <p className="text-gray-600 text-sm">Welcome to FinPlay</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-black text-white rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-2">Financial Pro Membership</h2>
        <p className="text-gray-300 mb-4">Unlock exclusive quizzes and redeem rewards faster.</p>
        <Button variant="secondary" className="!bg-yellow-400 !text-black !border-0">
          Upgrade
        </Button>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Points Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold">{user?.points || 0}</p>
            <p className="text-gray-600 text-sm">Points Earned</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold">{user?.quizzes_completed || 0}</p>
            <p className="text-gray-600 text-sm">Quizzes Completed</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Link Services</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="mb-4">💰</div>
            <h3 className="font-semibold mb-1">Redeem points</h3>
            <p className="text-gray-600 text-sm mb-4">Redeem the points you've earned as real money or gift cards</p>
            <button className="text-blue-600 font-medium">redeem</button>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="mb-4">🔗</div>
            <h3 className="font-semibold mb-1">Share your progress</h3>
            <p className="text-gray-600 text-sm mb-4">Share your progress with your friends</p>
            <button className="text-blue-600 font-medium">Share</button>
          </div>
        </div>
      </section>
    </div>
  );
}