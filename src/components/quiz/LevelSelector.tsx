interface LevelSelectorProps {
  currentLevel: string;
  onSelectLevel: () => void;
}

export function LevelSelector({ currentLevel, onSelectLevel }: LevelSelectorProps) {
  const getLevelName = (level: string) => {
    const number = level.split('_')[1];
    return `Level ${number}`;
  };

  const levels = ['Level_1', 'Level_2', 'Level_3', 'Level_4', 'Level_5'];

  return (
    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
      {levels.map((level) => (
        <button
          key={level}
          onClick={onSelectLevel}
          className={`flex-1 min-w-[4rem] py-2 px-4 rounded-full text-sm font-medium transition-colors ${
            currentLevel === level
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {getLevelName(level)}
        </button>
      ))}
    </div>
  );
}