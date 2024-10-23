import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jsonFilePath = path.join(process.cwd(), "transactions.json");

    // Read the file contents
    const data = await fs.readFile(jsonFilePath, "utf-8");

    const jsonData = JSON.parse(data);

    return NextResponse.json(jsonData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
