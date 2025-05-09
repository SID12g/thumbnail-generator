import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import { downloadImage, generateImage } from "@/utils/imageGenerator";

interface ImagePreviewProps {
  imageUrl: string | null;
  isGenerating: boolean;
  emojiUrl?: string | null;
  colors?: [string, string];
  gradientAngle?: number;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  isGenerating,
  emojiUrl,
  colors,
  gradientAngle,
}) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      if (emojiUrl && colors && gradientAngle !== undefined) {
        const highResImageUrl = await generateImage(
          emojiUrl,
          colors,
          gradientAngle
        );
        downloadImage(highResImageUrl, "thumbnail.png");
      } else {
        if (!previewRef.current) return;

        const dataUrl = await htmlToImage.toPng(previewRef.current, {
          quality: 1.0,
          pixelRatio: 2,
          width: 1920,
          height: 1080,
        });
        downloadImage(dataUrl, "thumbnail.png");
      }
    } catch (error) {
      console.error("Image download failed:", error);
      alert("Failed to download image. Please try again.");
    }
  };

  return (
    <div className="app-card p-6 mb-4">
      <h2 className="section-title">Preview</h2>

      <div className="flex flex-col items-center">
        {isGenerating ? (
          <div className="w-full aspect-video bg-gray-50 rounded-md flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-6 w-6 border border-gray-300 border-t-black mb-3"></div>
              <p className="text-xs text-gray-500">Generating...</p>
            </div>
          </div>
        ) : imageUrl ? (
          <div className="w-full mb-6" ref={previewRef}>
            <div className="relative w-full overflow-hidden border border-gray-200 rounded-md">
              <div className="aspect-video">
                <img
                  src={imageUrl}
                  alt="Thumbnail preview"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">1920 × 1080</p>
              <div className="flex-grow"></div>
              <div className="text-xs font-mono text-gray-500">
                {colors && colors.join(" → ")}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full aspect-video bg-gray-50 rounded-md flex items-center justify-center mb-6">
            <div className="text-center p-6">
              <svg
                className="w-8 h-8 mx-auto mb-2 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xs text-gray-500">
                Select an emoji to generate a thumbnail
              </p>
            </div>
          </div>
        )}

        <button
          className={`app-button w-full ${
            !imageUrl
              ? "app-button-secondary opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={handleDownload}
          disabled={!imageUrl}
        >
          <div className="flex items-center justify-center space-x-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span className="text-sm">Download</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
