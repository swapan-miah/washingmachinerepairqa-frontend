export default async function SettingsData() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/settings`, {
			cache: "no-store",
		});
		return await response.json();
	} catch (error) {
		return {};
	}
}
