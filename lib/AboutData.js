import axios from "axios";

export default async function AboutData() {
	try {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/seo/about`);
		return response.data || {};
	} catch (error) {
		// console.error("Error fetching about data:", error);
		return {};
	}
}
