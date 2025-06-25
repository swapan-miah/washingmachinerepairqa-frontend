import { NextResponse } from "next/server";
import axios from "axios";

async function getFileUrl(filename) {
	if (!filename.endsWith(".html")) return null;

	const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/seo-files`, {
		headers: { "Cache-Control": "no-store" },
	});

	return res.data.htmlUrl || null;
}

export async function GET(req, { params }) {
	const { filename } = params;

	const fileUrl = await getFileUrl(filename);

	const fileRes = await axios.get(fileUrl, { responseType: "text" });

	return new NextResponse(fileRes.data, {
		status: 200,
		headers: {
			"Content-Type": "text/html",
		},
	});
}
