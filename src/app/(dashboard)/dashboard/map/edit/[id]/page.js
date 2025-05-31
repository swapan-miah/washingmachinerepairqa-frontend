import EditMaps from "@/components/Dashboard/EditMaps";

export default async function page({ params }) {
	const { id } = await params;
	const result = await fetch(`${process.env.BASE_URL}/google-maps/${id}`, {
		cache: "no-store", // ensure fresh data
	});
	const data = await result.json();
	return <EditMaps data={data} />;
}
