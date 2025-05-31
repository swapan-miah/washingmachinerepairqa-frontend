import EditSolutions from "@/components/Dashboard/EditSolutions";

export default async function page({ params }) {
	const { id } = await params;
	const result = await fetch(`${process.env.BASE_URL}/our-solutions/${id}`, {
		cache: "no-store", // ensure fresh data
	});
	const data = await result.json();
	return <EditSolutions data={data} />;
}
