interface GradientControlProps {
  colors: [string, string];
  angle: number;
  onAngleChange: (angle: number) => void;
  onColorChange: (index: 0 | 1, color: string) => void;
}

const GradientControl: React.FC<GradientControlProps> = ({
  colors,
  angle,
  onAngleChange,
  onColorChange,
}) => {
  const gradientStyle = {
    background: `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]})`,
  };

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAngleChange(parseInt(e.target.value, 10));
  };

  const handleColorChange =
    (index: 0 | 1) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onColorChange(index, e.target.value);
    };

  const getDirectionLabel = (angle: number): string => {
    if (angle >= 337.5 || angle < 22.5) return "→";
    if (angle >= 22.5 && angle < 67.5) return "↗";
    if (angle >= 67.5 && angle < 112.5) return "↑";
    if (angle >= 112.5 && angle < 157.5) return "↖";
    if (angle >= 157.5 && angle < 202.5) return "←";
    if (angle >= 202.5 && angle < 247.5) return "↙";
    if (angle >= 247.5 && angle < 292.5) return "↓";
    return "↘";
  };

  return (
    <div className="app-card p-6 mb-4">
      <h2 className="section-title">Gradient Settings</h2>

      <div className="space-y-6">
        <div
          className="gradient-preview max-w-[300px] mx-auto"
          style={gradientStyle}
        ></div>

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">
              Start Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={colors[0]}
                onChange={handleColorChange(0)}
                aria-label="Select start color"
              />
              <input
                type="text"
                value={colors[0].toUpperCase()}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                    onColorChange(0, value);
                  }
                }}
                className="app-input font-mono text-xs"
                placeholder="#RRGGBB"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">
              End Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={colors[1]}
                onChange={handleColorChange(1)}
                aria-label="Select end color"
              />
              <input
                type="text"
                value={colors[1].toUpperCase()}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                    onColorChange(1, value);
                  }
                }}
                className="app-input font-mono text-xs"
                placeholder="#RRGGBB"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-medium text-gray-700">
              Gradient Angle
            </label>
            <div className="flex items-center space-x-1">
              <span className="text-sm">{getDirectionLabel(angle)}</span>
              <span className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded">
                {angle}°
              </span>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={angle}
            onChange={handleAngleChange}
            className="w-full"
            aria-label="Adjust gradient angle"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>0°</span>
            <span>90°</span>
            <span>180°</span>
            <span>270°</span>
            <span>360°</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-700">
            Quick Angle Selection
          </label>
          <div className="flex flex-wrap gap-2">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((presetAngle) => (
              <button
                key={presetAngle}
                className={`p-1.5 border rounded min-w-[28px] text-sm transition-all ${
                  angle === presetAngle
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                onClick={() => onAngleChange(presetAngle)}
              >
                {getDirectionLabel(presetAngle)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientControl;
