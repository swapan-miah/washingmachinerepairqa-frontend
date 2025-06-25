"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Loading from "@/components/Loading";
import Link from "next/link";
import { BiSolidEdit } from "react-icons/bi";

const labels = {
	gtm_id: "GTM_ID",
	email: "Email",
	copyright_text: "CopyRight Text",
	number: "Phone Number",
	whats_app: "Whats App",
};

export default function DisplaySettings() {
	const [data, setData] = useState(null);
	const [openIndex, setOpenIndex] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchSettings = async () => {
			try {
				const res = await axios.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/settings`,
				);
				setData(res.data);
				setLoading(false);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchSettings();
	}, []);

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	if (loading) {
		return <Loading />;
	}

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
					Settings
				</h2>
				<Link
					href={`/dashboard/settings/general-settings/edit/${data._id}`}
					onClick={() => setLoading(true)}>
					<button className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded flex items-center justify-center gap-1">
						<BiSolidEdit /> Edit
					</button>
				</Link>
			</div>
			<div className="space-y-4 bg-white border border-gray-200 rounded p-5">
				<div className="flex gap-5">
					<div className="flex flex-col gap-1">
						<label className="font-medium text-sm text-gray-700">
							Favicon <span className="text-red-500">*</span>
						</label>
						<div className="w-24 h-24 relative border border-gray-200 rounded overflow-hidden bg-white">
							{data?.favicon && (
								<Image
									src={data.favicon}
									alt="Favicon"
									fill
									className="object-contain"
								/>
							)}
						</div>
					</div>

					<div className="flex flex-col gap-1">
						<label className="font-medium text-sm text-gray-700">
							Logo <span className="text-red-500">*</span>
						</label>
						<div className="w-24 h-24 relative border border-gray-200 rounded overflow-hidden bg-white">
							{data?.logo && (
								<Image
									src={data.logo}
									alt="Logo"
									fill
									className="object-contain"
								/>
							)}
						</div>
					</div>
				</div>
				{Object.entries(data).map(
					([key, value], index) =>
						key !== "_id" &&
						key !== "favicon" &&
						key !== "logo" &&
						key !== "images" &&
						labels[key] && (
							<div
								key={index}
								className={`bg-white rounded-lg border overflow-hidden transition-all duration-300 ${
									openIndex === index ? "border-gray-400" : "border-gray-200"
								}`}>
								<h3
									onClick={() => toggleFAQ(index)}
									className="cursor-pointer p-4 font-semibold flex justify-between items-center">
									{labels[key]}
									<span className="text-xl">
										{openIndex === index ? "−" : "+"}
									</span>
								</h3>

								<div
									className={`grid transition-all duration-500 ease-in-out px-4 ${
										openIndex === index
											? "grid-rows-[1fr] py-3"
											: "grid-rows-[0fr] py-0"
									}`}>
									<div className="overflow-hidden">
										<p className="text-gray-600">
											{Array.isArray(value) ? value.join(", ") : value}
										</p>
									</div>
								</div>
							</div>
						),
				)}
			</div>
		</div>
	);
}
