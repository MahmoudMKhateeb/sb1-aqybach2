import { Crown, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export function UpgradeModal({ isOpen, onClose, onUpgrade }: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-6 text-center">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>

          <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Daily Limit Reached!</h2>
          <p className="text-gray-600 mb-6">
            You've hit your daily limit of 15 questions. Upgrade to Premium to continue learning today!
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Premium Benefits:</h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li>✓ Unlimited daily questions</li>
              <li>✓ Exclusive advanced quizzes</li>
              <li>✓ Detailed performance analytics</li>
              <li>✓ Priority customer support</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button onClick={onUpgrade} className="w-full">
              Upgrade to Premium
            </Button>
            <Button 
              variant="secondary" 
              onClick={onClose}
              className="w-full"
            >
              Remind Me Tomorrow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}