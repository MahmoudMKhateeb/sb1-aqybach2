import { useState } from 'react';
import { Bell } from 'lucide-react';

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    quizReminders: true,
    rewardAlerts: true,
    progressUpdates: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-full p-2">
      <div className="flex items-center gap-3 mb-3">
        <Bell className="w-5 h-5 text-gray-600" />
        <span>Notifications</span>
      </div>
      
      <div className="space-y-3 pl-8">
        {Object.entries(notifications).map(([key, enabled]) => (
          <label key={key} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <button
              onClick={() => toggleNotification(key as keyof typeof notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${
                enabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                  enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        ))}
      </div>
    </div>
  );
}