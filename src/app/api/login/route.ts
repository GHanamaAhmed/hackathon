// app/api/login/route.js
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request JSON body
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: "Missing username or password" },
        { status: 400 }
      );
    }

    // Forward the authentication request to the external API
    const apiResponse = await fetch(
      "https://progres.mesrs.dz/api/authentication/v1/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      return NextResponse.json(
        { error: "Authentication failed", details: errorData },
        { status: apiResponse.status }
      );
    }

    const data = await apiResponse.json();
    console.log("Authentication successful:", data);
    
    // Assuming the token is available in data.token. Adjust as needed.
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
