import Blogs from "@/components/Blogs";
import BlogsData from "../../../../lib/BlogsData";
import SchemaScript from "@/components/SchemaScript";
import LiveDataListener from "@/components/LiveDataListener";

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

export default async function page() {

	const data = await BlogsData();

	return (
		<>
			{data?.schema && <SchemaScript schema={data.schema} id="blogs" />}
			<Blogs showAll={true}/>
			<LiveDataListener eventName="seo-updated"/>
		</>
	);
}