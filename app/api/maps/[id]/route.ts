import { NextResponse } from "next/server";
import { pool } from "../../lib/database";

export async function GET(req: Request, context: { params: { id: number } }) {
  try {
    const id = context.params.id;
    let conn;
    conn = await pool.getConnection();
    const maps = await conn.query("SELECT * FROM maps where id=?;", [id]);

    return NextResponse.json({
      status: 200,
      body: {
        maps: maps,
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
