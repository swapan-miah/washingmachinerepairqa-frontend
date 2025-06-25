import axios from "axios";
import EditWorks from "@/components/Dashboard/EditWorks";

export default async function page({ params }) {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/skills/${params.id}`);
	return <EditWorks data={data} />;
}
