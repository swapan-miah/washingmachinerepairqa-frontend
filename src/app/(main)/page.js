import CustomerTestimonials from "@/components/CustomerTestimonials";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import HeroBanner from "@/components/HeroBanner";
import Map from "@/components/Map";
import ProfessionalServiceSection from "@/components/ProfessionalServiceSection";
import WhatWeDo from "@/components/WhatWeDo";
import WhyChooseUs from "@/components/WhyChooseUs";
import Blogs from "@/components/Blogs";
import WashingMachineRepair from "@/components/WashingMachineRepair";
import Accordion from "@/components/Accordion";
import GoogleTagManager from "@/components/GoogleTagManager";
import HomeData from "../../../lib/HomeData";
import SettingsData from "../../../lib/SettingsData";
import SchemaScript from "@/components/SchemaScript";
import LiveDataListener from "@/components/LiveDataListener";

export async function generateMetadata() {
	const data = await HomeData();

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

export default async function Home() {
	const [sData, data] = await Promise.all([SettingsData(), HomeData()]);

	return (
		<>
			{data?.schema && <SchemaScript schema={data.schema} id="home" />}
			<GoogleAnalytics />
			<GoogleTagManager sData={sData} />
			<main>
				<HeroBanner sData={sData} />
				<WhatWeDo />
				<ProfessionalServiceSection />
				<WhyChooseUs />
				<WashingMachineRepair />
				<CustomerTestimonials />
				<Blogs showAll={false} />
				<Accordion />
				<Map />
			</main>
			<LiveDataListener eventName="seo-updated"/>
		</>
	);
}
