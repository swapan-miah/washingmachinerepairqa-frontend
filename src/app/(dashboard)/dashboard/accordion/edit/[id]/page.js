import axios from "axios";
import EditAccordion from "@/components/Dashboard/EditAccordion";

export default async function page({ params }) {
	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/accordion/${params.id}`,
	);
	return <EditAccordion data={data} />;
}
