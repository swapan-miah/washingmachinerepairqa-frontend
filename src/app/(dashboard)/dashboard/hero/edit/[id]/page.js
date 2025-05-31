import axios from "axios";
import EditHero from "@/components/EditHero";

export default async function Page({ params }) {
	const { data } = await axios.get(`${process.env.BASE_URL}/hero-slider/edit/${params.id}`);
	return <EditHero data={data} />;
}
