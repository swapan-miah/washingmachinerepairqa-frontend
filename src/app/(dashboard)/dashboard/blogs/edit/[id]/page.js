import EditBlog from "@/components/Dashboard/EditBlog";

export default async function page({ params }) {
	const { id } = await params;
	const result = await fetch(`${process.env.BASE_URL}/blogs/${id}`, {
		cache: "no-store",
	});
	const data = await result.json();
	return <EditBlog data={data} />;
}
