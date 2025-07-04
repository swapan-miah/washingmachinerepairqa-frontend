import axios from "axios";
import EditBlog from "@/components/Dashboard/EditBlog";

export default async function page({ params }) {
	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${params.id}`,
	);
	return <EditBlog data={data} />;
}
