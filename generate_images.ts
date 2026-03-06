import { GoogleGenAI } from "@google/genai";
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateImages() {
  // Use the high-quality image model
  const model = "gemini-3.1-flash-image-preview";
  
  const prompts = [
    "A professional, modern, high-end office desk setup for marketing strategy planning. Minimalist style, dark mood lighting, sleek laptop, notebook with 'STRATEGY' written, coffee cup. Photorealistic, 4k, cinematic. Black, white, and vibrant pink accents.",
    "A futuristic data analytics dashboard displaying colorful growth graphs and charts on a screen. Dark background, glowing neon data lines (pink and blue), professional tech atmosphere. Close up, high detail, 4k. Black, white, and vibrant pink accents."
  ];

  const images = [];

  for (const prompt of prompts) {
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
            imageConfig: {
                aspectRatio: "4:5", // Matching the aspect ratio in App.tsx (aspect-[4/5])
                imageSize: "1K"
            }
        }
      });

      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            images.push(`data:image/png;base64,${part.inlineData.data}`);
          }
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
  }

  fs.writeFileSync('images.json', JSON.stringify(images));
  console.log("Images generated and saved to images.json");
}

generateImages();
