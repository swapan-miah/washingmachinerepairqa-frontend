import axios from "axios";

export default async function HomeData() {
	try {
		const response = await axios.get(`${process.env.BASE_URL}/seo/home`);
		return response.data || {};
	} catch (error) {
		// console.error("Error fetching home data:", error);
		return {};
	}
}
