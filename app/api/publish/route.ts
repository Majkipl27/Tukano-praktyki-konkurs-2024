import { NextResponse } from "next/server";
import { analyzeGraph } from "../analize/route";
import { Edge, dijkstra } from "../analize/dijkstra";
import { pool } from "../lib/database";

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

    const buffer = Buffer.from(await graphImage.arrayBuffer());
    let graph = await analyzeGraph(buffer);
    if (graph && graph.includes("```json")) {
      graph = JSON.parse(graph.slice(7, graph.length - 3));
    } else {
      graph = JSON.parse(graph);
    }

    const shortestPath = dijkstra(
      graph as unknown as { nodes: string[]; edges: Edge[] },
      "S",
      "P"
    );

    let conn;
    conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO maps (data, distance, path) VALUES (?, ?, ?)",
      [
        buffer,
        JSON.stringify(shortestPath.distance),
        JSON.stringify(shortestPath.path),
      ]
    );

    return NextResponse.json({
      status: 201,
      body: {
        message: "Succesfully published graph",
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: {
        message: "Internal server error",
      },
    });
  }
}
