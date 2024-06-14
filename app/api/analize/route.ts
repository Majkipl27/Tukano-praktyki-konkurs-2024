import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Edge, dijkstra, validateGraph } from "./dijkstra";
import { samplePattern } from "./lib";

const API_KEY = process.env.GEMINI_API_KEY || "";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const graphImage = (formData.get("graph") as File) || null;

    if (!graphImage) {
      return NextResponse.json({
        status: 400,
        body: {
          message: "No graph image provided",
        },
      });
    }

    const buffer = Buffer.from(await graphImage.arrayBuffer());

    let graph = await analyzeGraph(buffer);
    graph = JSON.parse(graph.slice(7, graph.length - 3));

    const isValid: boolean | string = validateGraph(
      graph as unknown as { nodes: string[]; edges: Edge[] },
      "S",
      "P"
    );

    if (typeof isValid === "string") {
      return NextResponse.json({
        status: 400,
        body: {
          message: isValid,
        },
      });
    }

    const shortestPath = dijkstra(
      graph as unknown as { nodes: string[]; edges: Edge[] },
      "S",
      "P"
    );

    return NextResponse.json({
      status: 200,
      body: {
        message: shortestPath,
      },
    });
  } catch (error) {
    console.error("Error during POST:", error);
    return NextResponse.json({
      status: 500,
      body: {
        message: "Internal server error",
      },
    });
  }
}

async function analyzeGraph(imageBuffer: Buffer) {
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
