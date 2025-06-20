import { NextResponse } from "next/server";
import axios from "axios";

async function getRobotsTxtUrl() {
	const res = await axios.get(`${process.env.BASE_URL}/seo-files`, {
		headers: { "Cache-Control": "no-store" },
	});
	return res.data.xmlUrl;
}

export async function GET() {
	const url = await getRobotsTxtUrl();
	const res = await axios.get(url, {
		headers: { "Cache-Control": "no-store" },
		responseType: "text",
	});

	return new NextResponse(res.data, {
		status: 200,
		headers: {
			"Content-Type": "text/plain",
		},
	});
}
