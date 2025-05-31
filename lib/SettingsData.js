import axios from "axios";

export default async function SettingsData() {
	try {
		const response = await axios.get(`${process.env.BASE_URL}/settings`);
		return response.data || {};
	} catch (error) {
		// console.error("Error fetching settings data:", error);
		return {};
	}
}
