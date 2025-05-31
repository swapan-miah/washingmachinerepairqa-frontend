import EditSEOData from "../../../components/EditSEOData";

export default async function page() {

	const result = await fetch(`${process.env.BASE_URL}/seo/services`, {
		cache: "no-store",
	});
	const data = await result.json();

    return (
        <div>
            <EditSEOData pageName="services" data={data}/>
        </div>
    );
}