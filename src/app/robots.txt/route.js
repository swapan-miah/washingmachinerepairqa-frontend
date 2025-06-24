import { NextResponse } from "next/server";
import { notFound } from "next/navigation";
import axios from "axios";

async function getRobotsTxtUrl() {
	try {
		const res = await axios.get(`${process.env.BASE_URL}/seo-files`, {
			headers: { "Cache-Control": "no-store" },
		});
		return res.data.txtUrl;
	} catch (err) {
		console.error("Failed to fetch robots.txt URL:", err);
		return null;
	}
}

export async function GET() {
	const url = await getRobotsTxtUrl();

	if (!url) {
		notFound();
	}

	try {
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
	} catch (err) {
		console.error("Error fetching robots.txt content:", err);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
