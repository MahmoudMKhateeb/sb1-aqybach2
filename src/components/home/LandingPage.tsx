import { Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-cyan-50">
      <div className="max-w-md mx-auto px-6 py-12 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-4">FinPlay</h1>
        
        <div className="my-8 animate-bounce">
          <Bot className="w-24 h-24 text-yellow-400" />
        </div>

        <h2 className="text-3xl font-bold mb-4">
          Learn Finance, Earn Rewards.
        </h2>
        
        <p className="text-gray-600 mb-8">
          Your go-to app for mastering financial skills, earning rewards, and managing money better
        </p>

        <div className="w-full space-y-4">
          <Button onClick={() => navigate('/auth')} variant="primary">
            Get Started
          </Button>
          <Button onClick={() => navigate('/auth')} variant="secondary">
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}