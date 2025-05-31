import axios from "axios";
import EditSolutions from "@/components/Dashboard/EditSolutions";

export default async function page({ params }) {
	const { data } = await axios.get(`${process.env.BASE_URL}/our-solutions/${params.id}`);
	return <EditSolutions data={data} />;
}

