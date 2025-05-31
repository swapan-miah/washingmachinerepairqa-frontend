import EditWorks from "@/components/Dashboard/EditWorks";

export default async function page({ params }) {
	const { id } = await params;
	const result = await fetch(`${process.env.BASE_URL}/skills/${id}`, {
		cache: "no-store", // ensure fresh data
	});
	const data = await result.json();
	return <EditWorks data={data} />;
}
