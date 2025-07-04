import axios from "axios";

export default async function HomeData() {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/seo/home`,
		);
		return response.data || {};
	} catch (error) {
		// console.error("Error fetching home data:", error);
		return {};
	}
}
