import ServiceDetails from "@/components/ServicesDetails";
import axios from "axios";
import LiveDataListener from "@/components/LiveDataListener";

export async function generateMetadata({ params }) {
	const { id } = params;
	try {
		const { data: services } = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/services-skills`,
		);
		const currentService = services.find((item) => item.slug === id);
		if (!currentService) {
			return { title: "Service Not Found" };
		}
		return {
			title: currentService?.metaTitle,
			description: currentService?.metaDescription,
			keywords: currentService?.metaKeywords || "",
			robots:
				currentService?.robotMeta === "index"
					? "index, follow"
					: "noindex, nofollow",
			openGraph: {
				title: currentService?.metaTitle,
				description: currentService?.metaDescription,
			},
		};
	} catch (error) {
		return { title: "Error Loading Service" };
	}
}

export default function Page({ params }) {
	return (
		<>
			<ServiceDetails params={params} />
			<LiveDataListener eventName="skills-updated" />
		</>
	);
}
