"use client";

import { useState } from "react";
import EmojiInput from "@/components/EmojiInput";
import GradientControl from "@/components/GradientControl";
import ImagePreview from "@/components/ImagePreview";
import {
  generateColorsFromEmoji,
  emojiToImageUrl,
} from "@/utils/emojiToCanvas";
import { generateImage } from "@/utils/imageGenerator";
import Link from "next/link";

export default function Home() {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [colors, setColors] = useState<[string, string]>([
    "#3498db",
    "#2980b9",
  ]);
  const [gradientAngle, setGradientAngle] = useState<number>(45);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [emojiImageUrl, setEmojiImageUrl] = useState<string | null>(null);

  const handleEmojiSelect = async (emoji: string) => {
    setSelectedEmoji(emoji);
    setIsGenerating(true);

    try {
      const extractedColors = generateColorsFromEmoji(emoji);
      setColors(extractedColors);

      const newEmojiImageUrl = emojiToImageUrl(emoji);
      setEmojiImageUrl(newEmojiImageUrl);

      const newImageUrl = await generateImage(
        newEmojiImageUrl,
        extractedColors,
        gradientAngle
      );
      setImageUrl(newImageUrl);
    } catch (error) {
      console.error("Failed to generate image from emoji:", error);
      alert(
        "Failed to generate image from emoji. Please try again with a different emoji."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAngleChange = async (newAngle: number) => {
    setGradientAngle(newAngle);
    setIsGenerating(true);

    try {
      if (emojiImageUrl) {
        const newImageUrl = await generateImage(
          emojiImageUrl,
          colors,
          newAngle
        );
        setImageUrl(newImageUrl);
      }
    } catch (error) {
      console.error("Failed to update gradient angle:", error);
      alert("Failed to update gradient angle. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleColorChange = async (index: number, newColor: string) => {
    const newColors: [string, string] = [...colors] as [string, string];
    newColors[index] = newColor;
    setColors(newColors);
    setIsGenerating(true);

    try {
      if (emojiImageUrl) {
        const newImageUrl = await generateImage(
          emojiImageUrl,
          newColors,
          gradientAngle
        );
        setImageUrl(newImageUrl);
      }
    } catch (error) {
      console.error("Failed to update gradient color:", error);
      alert(
        "Failed to update gradient color. Please try again with a different color."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Thumbnail Generator</h1>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Enter an emoji and adjust the gradient to create a
            <span className="inline-flex items-center mx-1 font-mono">
              1920×1080
            </span>
            thumbnail
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <EmojiInput
              onEmojiSelect={handleEmojiSelect}
              selectedEmoji={selectedEmoji}
            />

            {selectedEmoji && (
              <GradientControl
                colors={colors}
                angle={gradientAngle}
                onAngleChange={handleAngleChange}
                onColorChange={handleColorChange}
              />
            )}
          </div>

          <div className="space-y-4">
            <ImagePreview
              imageUrl={imageUrl}
              isGenerating={isGenerating}
              emojiUrl={emojiImageUrl}
              colors={colors}
              gradientAngle={gradientAngle}
            />

            {imageUrl && (
              <div className="app-card p-4">
                <h3 className="text-xs font-medium uppercase mb-2 tracking-wide">
                  Thumbnail Info
                </h3>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <span className="w-16 text-gray-500">Resolution:</span>
                    <span className="font-mono">1920 × 1080</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-16 text-gray-500">Format:</span>
                    <span className="font-mono">PNG</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-16 text-gray-500">Emoji:</span>
                    <span>{selectedEmoji}</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-12 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          <p>
            Copyright ⓒ 2025{" "}
            <Link href="https://github.com/SID12g/thumbnail-generator">
              sid12g
            </Link>{" "}
            All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
