import { Crown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useSubscriptionStore } from '../../store/subscriptionStore';

export function SubscriptionPage() {
  const navigate = useNavigate();
  const { setPremium } = useSubscriptionStore();

  const handleUpgrade = () => {
    setPremium(true);
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-cyan-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-gray-600">Unlock your full learning potential with Premium</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Free Plan</h2>
              <p className="text-gray-600">Basic access to financial education</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <span>15 questions per day</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <span>Access to basic quizzes</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <span>Basic progress tracking</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold mb-6">Free</p>
              <Button variant="secondary" onClick={() => navigate('/quiz')} className="w-full">
                Continue Free
              </Button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-black text-white rounded-xl p-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Crown className="w-8 h-8 text-yellow-400" />
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Premium Plan</h2>
              <p className="text-gray-400">Enhanced learning experience</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-400 mt-0.5" />
                <span>Unlimited daily questions</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-400 mt-0.5" />
                <span>Access to advanced quizzes</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-400 mt-0.5" />
                <span>Detailed performance analytics</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-400 mt-0.5" />
                <span>Priority customer support</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-400 mt-0.5" />
                <span>Exclusive learning materials</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold mb-2">$9.99/month</p>
              <p className="text-sm text-gray-400 mb-6">Cancel anytime</p>
              <Button onClick={handleUpgrade} className="w-full !bg-yellow-400 !text-black">
                Upgrade to Premium
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}