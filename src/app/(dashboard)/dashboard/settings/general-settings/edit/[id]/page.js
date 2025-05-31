import axios from "axios";
import EditSettings from "@/components/Dashboard/EditSettings";

export default async function page({ params }) {
	const { data } = await axios.get(`${process.env.BASE_URL}/settings`);
	return <EditSettings data={data} />;
}
