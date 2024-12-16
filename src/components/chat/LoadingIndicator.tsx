export default function LoadingIndicator() {
  return (
    <div className="flex justify-start w-full max-w-[80%] animate-slide-up">
      <div className="bg-white rounded-2xl p-3">
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" />
          <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce [animation-delay:0.2s]" />
          <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
}