import { useState } from "react";

interface EmojiInputProps {
  onEmojiSelect: (emoji: string) => void;
  selectedEmoji: string | null;
}

const commonEmojis = [
  "❤️",
  "🔥",
  "✨",
  "🎉",
  "🎁",
  "🎂",
  "🏙️",
  "💡",
  "📸",
  "📱",
  "💻",
  "📚",
  "🛒",
  "🏆",
  "📝",
  "📦",
  "📍",
  "🚀",
  "🌈",
  "🧡",
  "⭐",
];

const EmojiInput: React.FC<EmojiInputProps> = ({
  onEmojiSelect,
  selectedEmoji,
}) => {
  const [customEmoji, setCustomEmoji] = useState("");

  const handleEmojiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customEmoji.trim()) {
      onEmojiSelect(customEmoji);
    }
  };

  const handleEmojiInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.length === 0) {
      setCustomEmoji("");
      return;
    }

    const lastChar = Array.from(input).pop() || "";
    const isEmoji = lastChar.length >= 2 || lastChar.charCodeAt(0) > 127;

    if (isEmoji) {
      setCustomEmoji(lastChar);
    } else if (input.length === 1) {
      setCustomEmoji(input);
    }
  };

  return (
    <div className="app-card p-6 mb-4">
      <h2 className="section-title">Select Emoji</h2>

      <form onSubmit={handleEmojiSubmit} className="mb-6">
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Enter Emoji
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={customEmoji}
              onChange={handleEmojiInput}
              placeholder="🙂"
              className="app-input text-xl text-center w-20 h-10"
              maxLength={4}
            />
            <button
              type="submit"
              className="app-button h-10 px-2 whitespace-nowrap text-sm min-w-12 flex items-center justify-center"
            >
              Apply
            </button>
          </div>
          <p className="help-text">You can enter only one emoji</p>
        </div>
      </form>

      {selectedEmoji && (
        <div className="mb-6 text-center">
          <div className="inline-block bg-white p-4">
            <span className="text-5xl">{selectedEmoji}</span>
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-3">
          Common Emojis
        </label>
        <div className="emoji-grid">
          {commonEmojis.map((emoji, index) => (
            <button
              key={index}
              className={`emoji-button w-10 h-10 flex items-center justify-center ${
                selectedEmoji === emoji ? "selected" : ""
              }`}
              onClick={() => onEmojiSelect(emoji)}
              aria-label={`Emoji ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmojiInput;
