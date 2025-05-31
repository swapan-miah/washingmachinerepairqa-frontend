import EditChooseUs from "@/components/Dashboard/EditChooseUs";

export default async function page() {
	const result = await fetch(`${process.env.BASE_URL}/why-choose`, {
		cache: "no-store", // ensure fresh data
	});
	const data = await result.json();
	return <EditChooseUs data={data} />;
}
