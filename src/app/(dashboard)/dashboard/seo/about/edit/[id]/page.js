import axios from "axios";
import EditSEOData from "../../../components/EditSEOData";

export default async function page() {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/seo/about`,
		{
			headers: {
				"Cache-Control": "no-store",
			},
		},
	);
	const data = response.data;

	return (
		<div>
			<EditSEOData pageName="about" data={data} />
		</div>
	);
}
