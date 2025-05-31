"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiSolidEdit } from "react-icons/bi";
import Loading from "@/components/Loading";
import axios from "axios";

export default function Page() {
	const [openIndex, setOpenIndex] = useState("");
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		try {
			const res = await axios.get(`${process.env.BASE_URL}/why-choose`);
			setData(res.data);
		} catch (err) {
			setError(err.message || "Failed to Fetch Data");
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (data?.expertise?.length > 0) {
			setOpenIndex("expertise-0");
		}
	}, [data]);

	const toggleFAQ = (index) => {
		setOpenIndex((prev) => (prev === index ? null : index));
	};

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
					Choose Us
				</h2>
				<Link
					href={`/dashboard/choose-us/edit/${data._id}`}
					onClick={() => setLoading(true)}>
					<button className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded flex items-center justify-center gap-1">
						<BiSolidEdit />
						Edit
					</button>
				</Link>
			</div>

			<div className="space-y-4 bg-white border border-gray-200 rounded p-5">
				<div className="h-[100px] w-[200px] border rounded cursor-pointer overflow-hidden">
					{data?.cover && (
						<Image
							className="w-full h-full object-cover"
							width={200}
							height={100}
							src={data.cover}
							alt="Logo"
						/>
					)}
				</div>

				{data.expertise.map((expert, idx) => (
					<div
						key={idx}
						className={`p-4 bg-white rounded-lg border transition-all duration-300 ease-in-out cursor-pointer ${
							openIndex === `expertise-${idx}`
								? "border-gray-400"
								: "border-gray-200"
						}`}>
						<h3
							onClick={() => toggleFAQ(`expertise-${idx}`)}
							className="font-semibold flex justify-between items-center capitalize">
							Expertise {idx + 1}
							<span className="text-xl">
								{openIndex === `expertise-${idx}` ? "−" : "+"}
							</span>
						</h3>

						<div
							className={`transition-all overflow-hidden duration-300 ease-in-out ${
								openIndex === `expertise-${idx}`
									? "max-h-[1000px] mt-4"
									: "max-h-0"
							}`}>
							<div className="mt-4 space-y-4">
								<div className="h-[100px] w-[100px] border rounded overflow-hidden p-2 mx-auto">
									{expert?.iconUrl && (
										<Image
											className="w-full h-full object-contain"
											width={100}
											height={100}
											src={expert.iconUrl}
											alt={expert.expertiseTitle}
										/>
									)}
								</div>
								<div className="bg-gray-50 p-3 rounded-lg border">
									<h4 className="font-semibold">Title</h4>
									<p className="text-gray-600 mt-2">{expert.expertiseTitle}</p>
								</div>
								<div className="bg-gray-50 p-3 rounded-lg border">
									<h4 className="font-semibold">Description</h4>
									<p className="text-gray-600 mt-2">
										{expert.expertiseDescription}
									</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
