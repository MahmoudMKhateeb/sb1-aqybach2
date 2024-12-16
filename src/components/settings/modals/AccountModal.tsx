import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../ui/Button';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">Manage Account</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <Button variant="secondary" className="w-full">
            Change Password
          </Button>

          {!showDeleteConfirm ? (
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full !bg-red-50 !text-red-600 !border-red-200"
            >
              Delete Account
            </Button>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-red-600">
                Are you sure? This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1 !bg-red-600 !text-white !border-0"
                >
                  Confirm Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}