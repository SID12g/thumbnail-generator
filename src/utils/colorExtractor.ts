export const extractMainColors = async (
  imageUrl: string
): Promise<[string, string]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        canvas.width = 50;
        canvas.height = 50;
        ctx.drawImage(img, 0, 0, 50, 50);

        const imageData = ctx.getImageData(0, 0, 50, 50).data;

        const pixelCount = imageData.length / 4;
        const pixels: [number, number, number][] = [];

        for (let i = 0; i < pixelCount; i++) {
          const offset = i * 4;

          if (imageData[offset + 3] >= 128) {
            pixels.push([
              imageData[offset],
              imageData[offset + 1],
              imageData[offset + 2],
            ]);
          }
        }

        if (pixels.length === 0) {
          resolve(["#3498db", "#2980b9"]);
          return;
        }

        pixels.sort((a, b) => {
          const brightnessA = a[0] + a[1] + a[2];
          const brightnessB = b[0] + b[1] + b[2];
          return brightnessB - brightnessA;
        });

        const topQuartile = Math.floor(pixels.length * 0.25);
        const brightPixels = pixels.slice(0, topQuartile);
        const darkPixels = pixels.slice(-topQuartile);

        const brightColor = calculateAverageColor(brightPixels);
        const darkColor = calculateAverageColor(darkPixels);

        if (isColorSimilar(brightColor, darkColor)) {
          resolve([
            rgbToHex(adjustBrightness(brightColor, 1.2)),
            rgbToHex(adjustBrightness(darkColor, 0.8)),
          ]);
        } else {
          resolve([rgbToHex(brightColor), rgbToHex(darkColor)]);
        }
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = imageUrl;
  });
};

const calculateAverageColor = (
  pixels: [number, number, number][]
): [number, number, number] => {
  if (pixels.length === 0) return [0, 0, 0];

  const sum = pixels.reduce(
    (acc, pixel) => {
      acc[0] += pixel[0];
      acc[1] += pixel[1];
      acc[2] += pixel[2];
      return acc;
    },
    [0, 0, 0]
  );

  return [
    Math.round(sum[0] / pixels.length),
    Math.round(sum[1] / pixels.length),
    Math.round(sum[2] / pixels.length),
  ];
};

const isColorSimilar = (
  color1: [number, number, number],
  color2: [number, number, number]
): boolean => {
  const diff =
    Math.abs(color1[0] - color2[0]) +
    Math.abs(color1[1] - color2[1]) +
    Math.abs(color1[2] - color2[2]);

  return diff < 150;
};

const adjustBrightness = (
  color: [number, number, number],
  factor: number
): [number, number, number] => {
  return [
    Math.min(255, Math.max(0, Math.round(color[0] * factor))),
    Math.min(255, Math.max(0, Math.round(color[1] * factor))),
    Math.min(255, Math.max(0, Math.round(color[2] * factor))),
  ];
};

const rgbToHex = (rgb: [number, number, number]): string => {
  return (
    "#" +
    rgb
      .map((c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};
