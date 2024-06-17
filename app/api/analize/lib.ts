import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = process.env.GEMINI_API_KEY || "";

export const samplePattern =
  '{nodes: ["A", "B", "C", "D", "E"], edges: [{ from: "A", to: "B", weight: 7 }, { from: "A", to: "E", weight: 1 }, { from: "B", to: "C", weight: 3 }, { from: "B", to: "E", weight: 8 }, { from: "C", to: "D", weight: 6 }, { from: "C", to: "E", weight: 2 }, { from: "D", to: "E", weight: 7 }, ], }';

export async function analyzeGraph(imageBuffer: Buffer) {
  const genAI = new GoogleGenerativeAI(API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Giving you a graph as an image (provided as input), convert the data from it to match the given pattern: ${samplePattern}`;

  const image = {
    inlineData: {
      data: imageBuffer.toString("base64"),
      mimeType: "image/png",
    },
  };

  try {
    const prediction = await model.generateContent([prompt, image]);
    return prediction.response.text();
  } catch (error) {
    console.error("Error during generation:", error);
    throw error;
  }
}
