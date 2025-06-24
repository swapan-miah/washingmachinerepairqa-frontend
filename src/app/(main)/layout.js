import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import MobileActions from "@/components/MobileActions";
import ClearLocalStorageOnReload from "@/components/ClearLocalStorageOnReload";
import SettingsData from "../../../lib/SettingsData";
import LiveDataListener from "@/components/LiveDataListener";

export default async function RootLayout({ children }) {
	const data = await SettingsData();

	return (
		<html lang="en">
			<head />
			<body>
				<Navbar data={data} />
				{children}
				<Footer data={data} />
				<WhatsApp data={data} />
				<MobileActions data={data} />
				<ClearLocalStorageOnReload />
				<LiveDataListener eventName="settings-updated" />
			</body>
		</html>
	);
}
