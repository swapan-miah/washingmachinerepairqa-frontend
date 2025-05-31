import EditService from "@/components/Dashboard/EditService";

export default async function page({ params }) {
	const { id } = await params;
	const result = await fetch(`${process.env.BASE_URL}/our-service/${id}`);
	const data = await result.json();
	return <EditService data={data} />;
}
