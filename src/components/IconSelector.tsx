type IconItem = {
  id: string;
  name: string;
  url: string;
};

interface IconSelectorProps {
  icons: IconItem[];
  selectedIcon: IconItem | null;
  onSelectIcon: (icon: IconItem) => void;
  isLoading: boolean;
}

const IconSelector: React.FC<IconSelectorProps> = ({
  icons,
  selectedIcon,
  onSelectIcon,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Select</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {icons.map((icon) => (
          <div
            key={icon.id}
            className={`border-2 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-all ${
              selectedIcon?.id === icon.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            }`}
            onClick={() => onSelectIcon(icon)}
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src={icon.url}
                  alt={icon.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <span className="mt-2 text-sm text-center">{icon.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconSelector;
