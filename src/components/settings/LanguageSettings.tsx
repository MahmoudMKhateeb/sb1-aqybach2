import { useState } from 'react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'fr', name: 'Français' },
];

export function LanguageSettings() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <div className="w-full p-2">
      <div className="flex items-center gap-3 mb-3">
        <Globe className="w-5 h-5 text-gray-600" />
        <span>Language</span>
      </div>
      
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-200 bg-gray-50"
      >
        {languages.map(({ code, name }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}