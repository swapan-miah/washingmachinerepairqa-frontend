import { NextResponse } from "next/server";

async function getRobotsTxtUrl() {
  const res = await fetch("http://localhost:3112/seo-files", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.txtUrl;
}

export async function GET() {
  const url = await getRobotsTxtUrl();
  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();

  return new NextResponse(text, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
