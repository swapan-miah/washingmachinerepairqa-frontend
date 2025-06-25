import axios from "axios";

export default async function BlogsData() {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/seo/blogs`,
		);
		return response.data || [];
	} catch (error) {
		// console.error("Error fetching blogs data:", error);
		return [];
	}
}
