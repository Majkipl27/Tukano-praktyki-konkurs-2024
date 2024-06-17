import { NextResponse } from "next/server";
import { Edge, dijkstra, validateGraph } from "./dijkstra";
import { analyzeGraph } from "./lib";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const graphImage = (formData.get("graph") as Blob) || null;

    if (!graphImage) {
      return NextResponse.json({
        status: 400,
        body: {
          message: "No graph image provided",
        },
      });
    }

    if (
      !graphImage.type.startsWith("image") ||
      graphImage.size > 3 * 1024 * 1024
    ) {
      return NextResponse.json({
        status: 400,
        body: {
          message: "Provided file is not an image",
        },
      });
    }

    const buffer = Buffer.from(await graphImage.arrayBuffer());

    let graph = await analyzeGraph(buffer);
    if (graph && graph.includes("```json")) {
      graph = JSON.parse(graph.slice(7, graph.length - 3));
    } else {
      graph = JSON.parse(graph);
    }

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
    return NextResponse.error();
  }
}
