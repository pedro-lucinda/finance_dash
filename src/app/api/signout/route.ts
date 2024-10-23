import { NextResponse } from "next/server";

export async function POST() {
  // Clear the email cookie by setting its expiration in the past
  const response = NextResponse.json({ success: true });
  response.cookies.set("email", "", {
    httpOnly: true,
    expires: new Date(0), // Expire the cookie immediately
    path: "/", // Ensure it clears from all paths
  });

  return response;
}
