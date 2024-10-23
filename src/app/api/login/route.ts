import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Set the email cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set("email", email, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/", // Cookie accessible across the app
  });

  return response;
}
