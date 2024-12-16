import { Bot } from 'lucide-react';
import { useChat } from './hooks/useChat';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import LoadingIndicator from './LoadingIndicator';

export function ChatPage() {
  const { messages, input, setInput, isLoading, handleSend } = useChat();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-cyan-50">
      <div className="bg-black text-white p-4 flex items-center gap-4">
        <Bot className="w-8 h-8" />
        <div>
          <h1 className="font-semibold">Financial Buddy</h1>
          <p className="text-sm text-gray-400">Always here to help</p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col pb-32">
        <ChatMessages messages={messages} />
        {isLoading && <LoadingIndicator />}
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={isLoading}
      />
    </div>
  );
}