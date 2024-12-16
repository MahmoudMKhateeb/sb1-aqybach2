import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '../../lib/utils';
import { TTSService } from '../../lib/tts';
import type { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const { text, isBot } = message;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const tts = TTSService.getInstance();

  const handleSpeak = () => {
    if (isSpeaking) {
      tts.stop();
      setIsSpeaking(false);
    } else {
      tts.speak(text);
      setIsSpeaking(true);

      // Update speaking state when speech ends
      const checkSpeaking = setInterval(() => {
        if (!tts.isSpeaking()) {
          setIsSpeaking(false);
          clearInterval(checkSpeaking);
        }
      }, 100);
    }
  };

  return (
    <div
      className={cn(
        'flex w-full max-w-[80%] animate-slide-up',
        isBot ? 'justify-start' : 'justify-end ml-auto'
      )}
    >
      <div
        className={cn(
          'rounded-2xl p-3',
          isBot
            ? 'bg-white text-black'
            : 'bg-blue-600 text-white'
        )}
      >
        <p className="break-words">{text}</p>
        {isBot && (
          <button
            onClick={handleSpeak}
            className={cn(
              "mt-2 p-1 rounded-full transition-colors",
              isSpeaking 
                ? "text-blue-600 hover:text-blue-700 bg-blue-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            )}
          >
            {isSpeaking ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}