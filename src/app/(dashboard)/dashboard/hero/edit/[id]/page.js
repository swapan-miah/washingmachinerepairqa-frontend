import EditHero from "@/components/EditHero";

export default async function Page({ params }) {
	const { id } = params;
	const result = await fetch(`${process.env.BASE_URL}/hero-slider/edit/${id}`, {
		cache: "no-store", // ensure fresh data
	});
	const data = await result.json();

	return <EditHero data={data} />;
}
