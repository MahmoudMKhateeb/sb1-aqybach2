import { X } from 'lucide-react';
import { Button } from '../../ui/Button';

interface ConfirmLogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmLogoutModal({ isOpen, onClose, onConfirm }: ConfirmLogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">Confirm Logout</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <p className="text-gray-600 mb-4">
            Are you sure you want to log out?
          </p>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}