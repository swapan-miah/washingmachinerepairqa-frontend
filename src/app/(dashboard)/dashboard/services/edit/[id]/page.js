import axios from "axios";
import EditService from "@/components/Dashboard/EditService";

export default async function page({ params }) {
	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/our-service/${params.id}`,
	);
	return <EditService data={data} />;
}
