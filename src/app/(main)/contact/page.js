import Contact from "@/components/Contact";
import Map from "@/components/Map";
import ContactData from "../../../../lib/ContactData";
import SchemaScript from "@/components/SchemaScript";
import LiveDataListener from "@/components/LiveDataListener";

export async function generateMetadata() {
	const data = await ContactData();

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
	const data = await ContactData();

	return (
		<>
			{data?.schema && <SchemaScript schema={data.schema} id="contact" />}
			<Contact />
			<Map />
			<LiveDataListener eventName="seo-updated"/>
		</>
	);
}
