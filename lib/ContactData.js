import axios from "axios";

export default async function ContactData() {
	try {
		const response = await axios.get(`${process.env.BASE_URL}/seo/contact`);
		return response.data || {};
	} catch (error) {
		// console.error("Error fetching contact data:", error);
		return {};
	}
}
