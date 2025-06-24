import { Toaster } from "react-hot-toast";
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import SettingsData from "../../../lib/SettingsData";
import HomeData from "../../../lib/HomeData";
import ProtectedWrapper from "@/components/ProtectedWrapper";
import LiveDataListener from "@/components/LiveDataListener";

export async function generateMetadata() {
	const data = await HomeData();
	return {
		title: "Dashboard || " + data?.title,
		description: data?.description,
		keywords: data?.keywords || "",
		robots: data?.index !== "index" ? "index, follow" : "noindex, nofollow",
		openGraph: {
			title: data?.title,
			description: data?.description,
		},
	};
}

export default async function DashboardLayout({ children }) {
	const data = await SettingsData();

	return (
		<>
			<ProtectedWrapper>
				<Toaster
					position="top-center"
					reverseOrder={false}
					containerStyle={{ top: 80 }}
				/>
				<Header data={data} />
				<main className="ps-3 flex bg-white">
					<Sidebar />
					<div className="flex-1 bg-gray-50">{children}</div>
				</main>
			</ProtectedWrapper>
			<LiveDataListener eventName="settings-updated" />
		</>
	);
}
