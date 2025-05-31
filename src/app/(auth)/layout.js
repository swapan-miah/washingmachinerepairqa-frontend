import HomeData from "../../../lib/HomeData";

export async function generateMetadata() {
	const data = await HomeData();
	return {
		title: "Login | " + data?.title,
		description: data?.description,
		keywords: data?.keywords || "",
		robots: data?.index !== "index" ? "index, follow" : "noindex, nofollow",
		openGraph: {
			title: data?.title,
			description: data?.description,
		},
	};
}

export default function AuthLayout({ children }) {
	return <div>{children}</div>;
}
