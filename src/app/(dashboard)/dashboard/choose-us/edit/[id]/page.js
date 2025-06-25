import axios from "axios";
import EditChooseUs from "@/components/Dashboard/EditChooseUs";

export default async function page() {
	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/why-choose`,
	);
	return <EditChooseUs data={data} />;
}
