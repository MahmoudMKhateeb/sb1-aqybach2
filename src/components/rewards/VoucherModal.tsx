import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import type { Reward } from './types';

interface VoucherModalProps {
  reward: Reward;
  onClose: () => void;
}

export function VoucherModal({ reward, onClose }: VoucherModalProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(reward.voucherCode || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <img
              src={reward.logo}
              alt={reward.name}
              className="w-16 h-16 rounded-lg object-cover mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{reward.name}</h3>
            <p className="text-gray-600">{reward.description}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Your voucher code:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xl font-mono font-bold text-blue-600 bg-white p-3 rounded-lg border border-gray-200">
                {reward.voucherCode}
              </code>
              <Button
                onClick={copyToClipboard}
                variant="secondary"
                className="!p-3 !w-auto group relative"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
                <span className="absolute -top-8 right-0 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {copied ? 'Copied!' : 'Copy code'}
                </span>
              </Button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p className="mb-2">Instructions:</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Copy the voucher code</li>
              <li>Visit {reward.name}'s website</li>
              <li>Apply the code at checkout</li>
              <li>Enjoy your reward!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}