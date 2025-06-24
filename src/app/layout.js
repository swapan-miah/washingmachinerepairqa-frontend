import { Poppins, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { DataProvider } from "./context/ContextProvider";
import SettingsData from "../../lib/SettingsData";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata() {
	const data = await SettingsData();

	return {
		icons: {
			icon: data?.favicon,
		},
	};
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
