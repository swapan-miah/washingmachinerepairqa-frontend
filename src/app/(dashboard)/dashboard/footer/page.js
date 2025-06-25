"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/components/Loading";
import { BiSolidEdit } from "react-icons/bi";
import axios from "axios";

export default function Page() {
	const [openIndex, setOpenIndex] = useState(null);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/footer-content`,
				);
				setData(res.data);
			} catch (err) {
				setError(err.message || "Failed to fetch Data");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index);
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
			{data.map((post, index) => (
				<div
					key={post._id || index}
					className="flex items-center justify-between mb-3">
					<h3 className="text-lg font-medium choose-us">
						<span className="relative">Footer</span>
					</h3>
					<Link
						href={`/dashboard/footer/edit/${post._id}`}
						onClick={() => setLoading(true)}>
						<button className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded flex items-center justify-center gap-1">
							<BiSolidEdit />
							Edit
						</button>
					</Link>
				</div>
			))}

			<div className="space-y-4 bg-white border border-gray-200 rounded p-5">
				{data.map((sData, i) => (
					<div
						key={i}
						className="h-[100px] w-[200px] border rounded cursor-pointer overflow-hidden p-2">
						<Image
							className="w-full h-full object-contain"
							width={100}
							height={100}
							src={sData.imgUrl}
							alt="Logo"
						/>
					</div>
				))}

				{data.map((item, idx) =>
					Object.entries(item).map(([key, value], index) =>
						key !== "_id" && key !== "images" && key !== "imgUrl" ? (
							key === "services" ? (
								<div
									key={`${idx}-${index}`}
									className="p-10 bg-gray-100 rounded-lg space-y-4">
									<h3 className="text-xl font-bold text-teal-700 mb-4">
										Services
									</h3>
									{Array.isArray(value) &&
										value.map((service, sIdx) => (
											<div
												key={sIdx}
												className={`p-4 bg-white rounded-lg border transition-all duration-300 ease-in-out cursor-pointer ${
													openIndex === `services-${sIdx}`
														? "border-gray-400"
														: "border-gray-200"
												}`}>
												<h3
													onClick={() => toggleFAQ(`services-${sIdx}`)}
													className="font-semibold flex justify-between items-center capitalize">
													Service {sIdx + 1}
													<span className="text-xl">
														{openIndex === `services-${sIdx}` ? "−" : "+"}
													</span>
												</h3>

												<div
													className={`transition-all overflow-hidden duration-300 ease-in-out ${
														openIndex === `services-${sIdx}`
															? "max-h-[1000px] mt-4"
															: "max-h-0"
													}`}>
													<div className="mt-4 space-y-4">
														<div className="bg-gray-50 p-3 rounded-lg border">
															<h4 className="font-semibold">Title</h4>
															<p className="text-gray-600 mt-2">
																{service.title}
															</p>
														</div>
														<div className="bg-gray-50 p-3 rounded-lg border">
															<h4 className="font-semibold">Link</h4>
															<a
																href={service.link}
																target="_blank"
																rel="noopener noreferrer"
																className="text-blue-500 underline break-all block mt-2">
																{service.link}
															</a>
														</div>
													</div>
												</div>
											</div>
										))}
								</div>
							) : (
								<div
									key={`${idx}-${index}`}
									className={`p-4 bg-white rounded-lg border cursor-pointer transition-all duration-300 ${
										openIndex === `${idx}-${index}`
											? "border-gray-400"
											: "border-gray-200"
									}`}>
									<h3
										onClick={() => toggleFAQ(`${idx}-${index}`)}
										className="font-semibold flex justify-between items-center capitalize">
										{key}
										<span className="text-xl">
											{openIndex === `${idx}-${index}` ? "−" : "+"}
										</span>
									</h3>

									<div
										className={`grid transition-all duration-500 overflow-hidden ${
											openIndex === `${idx}-${index}`
												? "grid-rows-[1fr] opacity-100 mt-2"
												: "grid-rows-[0fr] opacity-0"
										}`}>
										<div className="overflow-hidden">
											{typeof value === "object" && value !== null ? (
												<ul className="list-disc list-inside space-y-1 text-gray-600">
													{Object.entries(value).map(
														([subKey, subValue], subIndex) => (
															<li key={subIndex}>
																<span className="font-medium capitalize">
																	{subKey} :
																</span>{" "}
																{typeof subValue === "string" &&
																subValue.startsWith("www.") ? (
																	<a
																		href={`https://${subValue}`}
																		target="_blank"
																		rel="noopener noreferrer"
																		className="text-blue-500 underline">
																		{subValue}
																	</a>
																) : (
																	subValue
																)}
															</li>
														),
													)}
												</ul>
											) : (
												<p className="text-gray-600">{value}</p>
											)}
										</div>
									</div>
								</div>
							)
						) : null,
					),
				)}
			</div>
		</div>
	);
}
