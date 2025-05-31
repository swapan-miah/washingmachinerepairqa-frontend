import axios from "axios";
import EditSEOData from "../../../components/EditSEOData";

export default async function page() {
  const response = await axios.get(`${process.env.BASE_URL}/seo/blogs`, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
  const data = response.data;

  return (
    <div>
      <EditSEOData pageName="blogs" data={data} />
    </div>
  );
}
