import axios from "axios";

export default async function UserData() {
	try {
		const response = await axios.get(`${process.env.BASE_URL}/users`);
		return response.data;
	} catch (error) {
		console.error("Error fetching user data:", error);
	}
}
