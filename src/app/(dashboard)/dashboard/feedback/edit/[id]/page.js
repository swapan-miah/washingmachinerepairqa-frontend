import axios from "axios";
import EditFeedBack from "@/components/Dashboard/EditFeedBack";

export default async function page({ params }) {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/feedback/${params.id}`);
	return <EditFeedBack data={data} />;
}
