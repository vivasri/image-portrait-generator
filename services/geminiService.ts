
import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PROMPT = `Transform this person into a futuristic AI engineer. Add subtle technological elements like faint glowing circuit patterns on their clothes or in the background. Give them a slightly more professional and focused expression. The background should be a modern, minimalist office or a server room with soft, blue and purple ambient lighting. Keep the person's core features recognizable but enhance the image with a high-tech, polished aesthetic. Ensure the final image is photorealistic and high-quality.`;

export const generateAiImage = async (base64ImageData: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64ImageData,
                mimeType: 'image/jpeg',
              },
            },
            {
              text: PROMPT,
            },
          ],
        },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return part.inlineData.data;
        }
      }
    }
    
    return null; // Return null if no image is found
  } catch (error) {
    console.error("Error generating image with Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};
