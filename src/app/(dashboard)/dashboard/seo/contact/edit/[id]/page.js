import axios from "axios";
import EditSEOData from "../../../components/EditSEOData";

export default async function page() {
  const response = await axios.get(`${process.env.BASE_URL}/seo/contact`, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
  const data = response.data;

  return (
    <div>
      <EditSEOData pageName="contact" data={data} />
    </div>
  );
}
