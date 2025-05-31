import EditAbout from "@/components/Dashboard/EditAbout";

export default async function Page({ params }) {
	const { id } = params;
	const result = await fetch(`${process.env.BASE_URL}/about/${id}`, {
		cache: "no-store",
	});
	const data = await result.json();

	return <EditAbout data={data} />;
}
