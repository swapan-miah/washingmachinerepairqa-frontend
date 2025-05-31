import EditSettings from "@/components/Dashboard/EditSettings";

export default async function page({ params }) {
	const { id } = await params;
	const result = await fetch(`${process.env.BASE_URL}/settings`);
	const data = await result.json();
	return <EditSettings data={data} />;
}