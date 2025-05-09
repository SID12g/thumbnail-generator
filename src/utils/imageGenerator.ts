export const generateImage = (
  iconUrl: string,
  colors: [string, string],
  gradientAngle: number = 45
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      canvas.width = 1920;
      canvas.height = 1080;

      const gradient = createGradient(
        ctx,
        colors,
        gradientAngle,
        canvas.width,
        canvas.height
      );

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      img.crossOrigin = "Anonymous";

      img.onload = () => {
        const iconSize = 256;
        const x = (canvas.width - iconSize) / 2;
        const y = (canvas.height - iconSize) / 2;

        ctx.drawImage(img, x, y, iconSize, iconSize);

        const imageUrl = canvas.toDataURL("image/png");
        resolve(imageUrl);
      };

      img.onerror = () => {
        reject(new Error("Failed to load icon image"));
      };

      img.src = iconUrl;
    } catch (error) {
      reject(error);
    }
  });
};

const createGradient = (
  ctx: CanvasRenderingContext2D,
  colors: [string, string],
  angle: number,
  width: number,
  height: number
): CanvasGradient => {
  const angleInRadians = (angle * Math.PI) / 180;

  const diagonal = Math.sqrt(width * width + height * height);
  const halfDiagonal = diagonal / 2;

  const centerX = width / 2;
  const centerY = height / 2;

  const startX = centerX - Math.cos(angleInRadians) * halfDiagonal;
  const startY = centerY - Math.sin(angleInRadians) * halfDiagonal;
  const endX = centerX + Math.cos(angleInRadians) * halfDiagonal;
  const endY = centerY + Math.sin(angleInRadians) * halfDiagonal;

  const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);

  return gradient;
};

export const downloadImage = (
  dataUrl: string,
  filename: string = "thumbnail.png"
): void => {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
