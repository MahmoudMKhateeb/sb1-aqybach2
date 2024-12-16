import { MoreVertical } from 'lucide-react';
import { Button } from '../ui/Button';
import type { Reward } from './types';

interface RewardCardProps {
  reward: Reward;
  onRedeem: (reward: Reward) => void;
}

export function RewardCard({ reward, onRedeem }: RewardCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <img
          src={reward.logo}
          alt={reward.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <h3 className="font-semibold mb-1">{reward.name}</h3>
      <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
      <p className="text-sm font-medium text-gray-700 mb-3">
        {reward.points} Points
      </p>

      <Button
        variant="primary"
        onClick={() => onRedeem(reward)}
        className="!py-2 text-sm"
      >
        Redeem Now
      </Button>
    </div>
  );
}