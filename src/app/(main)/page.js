import CustomerTestimonials from "@/components/CustomerTestimonials";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import HeroBanner from "@/components/HeroBanner";
import Map from "@/components/Map";
import ProfessionalServiceSection from "@/components/ProfessionalServiceSection";
import WhatWeDo from "@/components/WhatWeDo";
import WhyChooseUs from "@/components/WhyChooseUs";
import Blogs from "@/components/Blogs";
import WashingMachineRepair from "@/components/WashingMachineRepair";
import Contact from "@/components/Contact";
import GoogleTagManager from "@/components/GoogleTagManager";
import HomeData from "../../../lib/HomeData";
import SettingsData from "../../../lib/SettingsData";
import Head from "next/head";

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

	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "Washing Machine Repair in Qatar",
		mainEntity: data?.schema?.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};

	return (
		<>
		    <Head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
				/>
			</Head>
			<GoogleAnalytics />
			<GoogleTagManager sData={sData} />
			<main>
				<HeroBanner sData={sData} />
				<WhatWeDo />
				<ProfessionalServiceSection />
				<WhyChooseUs />
				<WashingMachineRepair />
				<CustomerTestimonials />
				<Blogs showAll={true} />
				<Contact />
				<Map />
			</main>
		</>
	);
}
