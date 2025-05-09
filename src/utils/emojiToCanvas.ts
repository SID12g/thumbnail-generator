export const emojiToImageUrl = (
  emoji: string,
  size: number = 256,
  fontSize: number = 180,
  fontFamily: string = "Arial"
): string => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  canvas.width = size;
  canvas.height = size;

  ctx.clearRect(0, 0, size, size);

  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(emoji, size / 2, size / 2);

  return canvas.toDataURL("image/png");
};

const hslToRgb = (
  h: number,
  s: number,
  l: number
): [number, number, number] => {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

export const generateColorsFromEmoji = (emoji: string): [string, string] => {
  let seed = 0;
  for (let i = 0; i < emoji.length; i++) {
    seed += emoji.charCodeAt(i);
  }

  const hue1 = seed % 360;
  const hue2 = (hue1 + 40) % 360;

  const rgb1 = hslToRgb(hue1, 80, 65);
  const rgb2 = hslToRgb(hue2, 80, 45);

  return [
    rgbToHex(rgb1[0], rgb1[1], rgb1[2]),
    rgbToHex(rgb2[0], rgb2[1], rgb2[2]),
  ];
};
