import { useState } from 'react';
import { RewardCard } from './RewardCard';
import { VoucherModal } from './VoucherModal';
import { rewards } from './rewardsData';
import type { Reward } from './types';

export function RewardsPage() {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const handleRedeem = (reward: Reward) => {
    setSelectedReward(reward);
  };

  return (
    <div className="max-w-md mx-auto px-6 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Rewards</h1>
        <p className="text-gray-600">Turn Your Points into Real-World Benefits!</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {rewards.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            onRedeem={handleRedeem}
          />
        ))}
      </div>

      {selectedReward && (
        <VoucherModal
          reward={selectedReward}
          onClose={() => setSelectedReward(null)}
        />
      )}
    </div>
  );
}