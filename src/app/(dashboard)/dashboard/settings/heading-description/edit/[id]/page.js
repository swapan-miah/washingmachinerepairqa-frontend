import EditHeading from "@/components/Dashboard/EditHeading";

export default async function page({ params }) {
	const { id } = await params;
	const result = await fetch(`${process.env.BASE_URL}/section-heading/${id}`);
	const data = await result.json();
	return <EditHeading data={data} />;
}