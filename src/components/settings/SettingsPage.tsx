import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, ChevronRight, UserCircle, Share2, UserCog, Clock, RefreshCw, Globe, Bell, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { ProfileSection } from './ProfileSection';
import { AccountModal } from './modals/AccountModal';
import { ConfirmLogoutModal } from './modals/ConfirmLogoutModal';
import { NotificationSettings } from './NotificationSettings';
import { LanguageSettings } from './LanguageSettings';

export function SettingsPage() {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-cyan-50 pb-20">
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <ProfileSection user={user} />

        <div className="bg-white rounded-xl p-4 mb-6">
          <h2 className="font-semibold mb-4">Basic Settings</h2>
          <div className="space-y-4">
            <button 
              onClick={() => setShowAccountModal(true)}
              className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <UserCog className="w-5 h-5 text-gray-600" />
                <span>Manage Account</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <NotificationSettings />
            <LanguageSettings />

            <button className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-600" />
                <span>Change Response Time</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="bg-black text-white rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Crown className="w-6 h-6 text-yellow-400" />
            <h3 className="font-bold">Financial Pro Membership</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Unlock exclusive quizzes and redeem rewards faster.
          </p>
          <Button
            variant="secondary"
            className="!bg-yellow-400 !text-black !border-0 w-full"
          >
            Upgrade
          </Button>
        </div>

        <Button
          variant="secondary"
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center justify-center gap-2 !bg-red-50 !text-red-600 !border-red-200"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>

      <AccountModal 
        isOpen={showAccountModal} 
        onClose={() => setShowAccountModal(false)} 
      />

      <ConfirmLogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}