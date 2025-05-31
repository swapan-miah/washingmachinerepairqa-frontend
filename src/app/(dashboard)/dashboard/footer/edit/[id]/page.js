import EditFooter from "@/components/Dashboard/EditFooter";

export default async function page({ params }) {
	const { id } = await params;
	const result = await fetch(`${process.env.BASE_URL}/footer-content/${id}`);
	const data = await result.json();
	return <EditFooter data={data} />;
}
