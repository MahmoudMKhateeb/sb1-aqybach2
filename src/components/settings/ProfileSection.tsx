import { UserCircle, Share2, Camera } from 'lucide-react';
import { Button } from '../ui/Button';
import type { User } from '../../lib/auth';

interface ProfileSectionProps {
  user: User | null;
}

export function ProfileSection({ user }: ProfileSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
            alt="Profile"
            className="w-24 h-24 rounded-full bg-pink-100"
          />
          <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white">
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="font-semibold">{user?.name}</h2>
        <p className="text-gray-600 text-sm">{user?.email}</p>
      </div>

      <div className="flex gap-4">
        <Button
          variant="secondary"
          className="flex-1 !py-2 flex items-center justify-center gap-2"
        >
          <UserCircle className="w-5 h-5" />
          Edit Profile
        </Button>
        <Button
          variant="secondary"
          className="flex-1 !py-2 flex items-center justify-center gap-2"
        >
          <Share2 className="w-5 h-5" />
          Share Profile
        </Button>
      </div>
    </div>
  );
}