"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/components/Loading";
import { BiSolidEdit } from "react-icons/bi";
import axios from "axios";

export default function Page() {
	const [openIndex, setOpenIndex] = useState(null);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`${process.env.BASE_URL}/about`);
				setData(res.data);
			} catch (err) {
				setError(err.message || "Failed to Fetch");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
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
					Founder
				</h2>
				<Link
					href={`/dashboard/about/edit/${data._id}`}
					onClick={() => setLoading(true)}>
					<button className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded flex items-center justify-center gap-1">
						<BiSolidEdit />
						Edit
					</button>
				</Link>
			</div>

			<div className="space-y-4 bg-white border border-gray-200 rounded p-5">
				{Object.entries(data).map(
					([key, value], index) =>
						key !== "_id" &&
						key !== "images" && (
							<div
								key={index}
								className={`bg-white rounded-lg border overflow-hidden transition-all duration-300 ${
									openIndex === index ? "border-gray-400" : "border-gray-200"
								}`}>
								<h3
									onClick={() => toggleFAQ(index)}
									className="cursor-pointer p-4 font-semibold flex justify-between items-center capitalize">
									{key}
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

				{data.images && data.images.length > 0 && (
					<div className="flex gap-5 flex-wrap pt-3">
						{data.images.map((img, i) => (
							<div
								key={i}
								className="w-[200px] h-[100px] cursor-pointer rounded overflow-hidden">
								{img && (
									<Image
										className="w-full h-full object-cover"
										width={200}
										height={100}
										src={img}
										alt={`image-${i}`}
									/>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
