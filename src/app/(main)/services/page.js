import WashingMachineRepair from "@/components/WashingMachineRepair";
import WhatWeDo from "@/components/WhatWeDo";
import WhyChooseUs from "@/components/WhyChooseUs";
import React from "react";
import ServicesData from "../../../../lib/ServicesData";
import SchemaScript from "@/components/SchemaScript";


export async function generateMetadata() {
	const data = await ServicesData();

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


const page = async () => {
	const data = await ServicesData();

	return (
		<>
			{data?.schema && <SchemaScript schema={data.schema} id="services" />}
			<WhatWeDo></WhatWeDo>
			<WashingMachineRepair></WashingMachineRepair>
			<WhyChooseUs></WhyChooseUs>
		</>
	);
};

export default page;
