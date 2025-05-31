import axios from "axios";
import EditAbout from "@/components/Dashboard/EditAbout";

export default async function Page({ params }) {
	const { data } = await axios.get(`${process.env.BASE_URL}/about/${params.id}`);
	return <EditAbout data={data} />;
}
