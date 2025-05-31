import axios from "axios";

export default async function ServicesData() {
	try {
		const response = await axios.get(`${process.env.BASE_URL}/seo/services`);
		return response.data || [];
	} catch (error) {
		// console.error("Error fetching services data:", error);
		return [];
	}
}

