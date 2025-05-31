import Blogs from "@/components/Blogs";
import BlogsData from "../../../../lib/BlogsData";

export async function generateMetadata() {
	const data = await BlogsData();

	return {
		title: data?.title,
		description: data?.description,
		keywords: data?.keywords || "",
		robots: data?.index !== "index" ? "index, follow" : "noindex, nofollow",
		openGraph: {
			title: data?.title,
			description: data?.description,
		},
	};
}

export default function page() {
	return (
		<><Blogs showAll={true}/></>
	);
}