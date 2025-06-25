import axios from "axios";
import EditMaps from "@/components/Dashboard/EditMaps";

export default async function page({ params }) {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/google-maps/${params.id}`);
	return <EditMaps data={data} />;
}

