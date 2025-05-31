import EditAccordion from "@/components/Dashboard/EditAccordion";

export default async function page({ params }) {
	const { id } = await params;
	const result = await fetch(`${process.env.BASE_URL}/accordion/${id}`, {
		cache: "no-store", // ensure fresh data
	});
	const data = await result.json();
	return <EditAccordion data={data} />;
}
