import EditSEOData from "../../../components/EditSEOData";

export default async function page() {

	const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seo/home`, {
		cache: "no-store",
	});
	const data = await result.json();

    return (
        <div>
            <EditSEOData pageName="home" data={data}/>
        </div>
    );
}