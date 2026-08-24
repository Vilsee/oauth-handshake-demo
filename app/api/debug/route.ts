import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    has_google_client_id: !!process.env.GOOGLE_CLIENT_ID,
    has_google_client_secret: !!process.env.GOOGLE_CLIENT_SECRET,
    has_auth_secret: !!process.env.AUTH_SECRET,
    has_nextauth_secret: !!process.env.NEXTAUTH_SECRET,
    has_nextauth_url: !!process.env.NEXTAUTH_URL,
    google_client_id_length: process.env.GOOGLE_CLIENT_ID?.length || 0,
    google_client_secret_length: process.env.GOOGLE_CLIENT_SECRET?.length || 0,
    auth_secret_length: process.env.AUTH_SECRET?.length || 0,
    nextauth_secret_length: process.env.NEXTAUTH_SECRET?.length || 0,
    node_env: process.env.NODE_ENV,
  });
}
export const dynamic = "force-dynamic";
