import EditFeedBack from "@/components/Dashboard/EditFeedBack";

export default async function page({ params }) {
	const { id } = await params;
	const result = await fetch(`${process.env.BASE_URL}/feedback/${id}`, {
		cache: "no-store", // ensure fresh data
	});
	const data = await result.json();
	return <EditFeedBack data={data} />;
}
