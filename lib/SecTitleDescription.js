import axios from "axios";

export default async function SecTitleDescription({ name }) {
	try {
		const response = await axios.get(`${process.env.BASE_URL}/section-heading/${name}`);
		return response.data;
	} catch (error) {
		// console.error("Error fetching section title and description:", error);
		return {};
	}
}
