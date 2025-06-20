import Link from "next/link";
import { FaExclamationTriangle , FaArrowLeft  } from "react-icons/fa";


export const metadata = {
	title: "404 Not Found",
};



export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-br from-white to-gray-100 px-4">
			<div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600 mb-6 shadow-lg">
				<FaExclamationTriangle size={32} />
			</div>
			<h1 className="text-7xl font-extrabold text-gray-800 mb-4">404</h1>
			<p className="text-lg text-gray-600 mb-6 max-w-md">
				Sorry! You are looking for could not be found.
			</p>
			<Link
				href="/"
				className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded shadow-md hover:bg-teal-700 transition">
				🏠 Go Home Again! <FaArrowLeft />
			</Link>
		</div>
	);
}
