import axios from "axios";
import EditFooter from "@/components/Dashboard/EditFooter";

export default async function page({ params }) {
	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/footer-content/${params.id}`,
	);
	return <EditFooter data={data} />;
}
