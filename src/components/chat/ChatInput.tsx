import { Send } from 'lucide-react';
import { Button } from '../ui/Button';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSend();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg"
    >
      <div className="max-w-md mx-auto flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me about finance in Egypt..."
          disabled={disabled}
          className="flex-1 rounded-full px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <Button
          type="submit"
          disabled={!value.trim() || disabled}
          className="!rounded-full !w-auto !p-3 !bg-blue-600 hover:!bg-blue-700 disabled:!bg-gray-300 transition-colors"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
}