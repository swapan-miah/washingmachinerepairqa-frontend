import axios from "axios";
import EditHeading from "@/components/Dashboard/EditHeading";

export default async function page({ params }) {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/section-heading/${params.id}`);
	return <EditHeading data={data} />;
}
