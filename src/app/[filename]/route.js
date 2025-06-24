import { NextResponse } from "next/server";
import axios from "axios";
import { notFound } from "next/navigation";

async function getFileUrl(filename) {
	if (!filename.endsWith(".html")) return notFound();

	const res = await axios.get(`${process.env.BASE_URL}/seo-files`, {
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
