"use client";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import axios from "axios";


export default function Page() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
			const res = await axios.get(`${process.env.BASE_URL}/google-maps`);
			setData(res.data);
			} catch (err) {
			setError(err.message || "Failed to fetch Data");
			} finally {
			setLoading(false);
			}
		};

		fetchData();
	}, []);
	

	if (loading) return <Loading />;
	if (error || !data) {
		return (
			<div className="p-5 h-full f-full">
				<div className="bg-white text-xl border border-gray-200 rounded text-red-600 p-5 h-full f-full grid place-items-center">
					{error || "No data found"}
				</div>
			</div>
		);
	}

	return (
		<div className="p-5">
			<div className="flex items-center justify-between mb-3">
				<h2 className="relative text-lg font-semibold text-gray-800 mb-2 pb-2 after:absolute after:bottom-0 after:left-0 after:w-20 after:h-[2px] after:bg-black before:absolute before:bottom-1 before:left-0 before:w-28 before:h-[2px] before:bg-[#0d9488]">
					Google Map
				</h2>
				<Link
					href={`/dashboard/map/edit/${data._id}`}
					onClick={() => setLoading(true)}
				>
					<button className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded flex items-center justify-center gap-1">
						<BiSolidEdit />
						Edit
					</button>
				</Link>
			</div>

			<div className="border-2 border-gray-200 rounded">
				<iframe
					className="w-full h-[360px] rounded border-none"
					src={data.mapUrl}
					referrerPolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</div>
	);
}
