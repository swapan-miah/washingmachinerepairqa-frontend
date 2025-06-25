"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { BiSolidEdit } from "react-icons/bi";

export default function page() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/services-skills`,
			);
			setData(res.data);
		} catch (err) {
			setError(err.message || "Failed to fetch Data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const getFirstTagText = (htmlString) => {
		if (!htmlString) return "";
		const parser = new DOMParser();
		const doc = parser.parseFromString(htmlString, "text/html");
		const firstElement = doc.body.firstElementChild;
		return firstElement?.textContent?.trim() || "";
	};

	const handleDelete = async (id) => {
		setLoading(true);
		try {
			const res = await axios.delete(
				`${process.env.NEXT_PUBLIC_BASE_URL}/services-skills/${id}`,
			);
			if (res.data.deletedCount > 0) {
				await fetchData();
				toast.success("Successfully Deleted!");
			}
		} catch (error) {
			console.error("Delete failed:", error);
		} finally {
			setLoading(false);
		}
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
					Skills
				</h2>
				<Link href="/dashboard/skills/create">
					<button className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded flex items-center justify-center gap-1">
						<BiSolidEdit /> Create
					</button>
				</Link>
			</div>

			<div className="overflow-x-auto">
				<table className="hidden min-w-full lg:table border border-gray-200">
					<thead className="bg-[#0d9488] text-white">
						<tr>
							<th className="px-4 py-2 text-left text-sm font-semibold uppercase w-[150px]">
								Photo
							</th>
							<th className="px-4 py-2 text-left text-sm font-semibold uppercase">
								Icon
							</th>
							<th className="px-4 py-2 text-left text-sm font-semibold uppercase w-[200px]">
								Title
							</th>
							<th className="px-4 py-2 text-left text-sm font-semibold uppercase">
								Description
							</th>
							<th className="px-4 py-2 text-right text-sm font-semibold uppercase">
								Action
							</th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{[...data].reverse().map((sData) => (
							<tr
								key={sData._id}
								className="hover:bg-gray-50 border-b border-gray-200 py-2">
								<td className="px-4 py-3 text-sm">
									<div className="flex items-center">
										{sData?.image && (
											<Image
												className="w-[100px] max-w-[200px] h-16 object-cover rounded"
												width={100}
												height={100}
												src={sData.image}
												alt="Services & Skills"
											/>
										)}
									</div>
								</td>
								<td className="px-4 py-3 text-sm">
									<div className="w-20 h-16 border rounded grid place-items-center">
										<div className="flex-shrink-0 w-10 h-10">
											{sData?.svgIcon && (
												<Image
													className="w-full h-full object-cover rounded"
													width={100}
													height={100}
													src={sData.svgIcon}
													alt="Services & Skills"
												/>
											)}
										</div>
									</div>
								</td>
								<td className="px-4 py-3 text-sm w-[150px] max-w-[250px]">
									<span className="line-clamp-1 break-all">{sData.title}</span>
								</td>
								<td className="px-4 py-3 text-sm">
									<span className="line-clamp-2 break-all">
										{getFirstTagText(sData.description)}
									</span>
								</td>
								<td className="px-4 py-3 text-sm text-right">
									<span className="relative inline-block py-1 font-semibold text-green-900 leading-tight">
										<div className="w-full flex items-center justify-end gap-2">
											<Link
												href={`/dashboard/skills/edit/${sData.slug}`}
												onClick={() => setLoading(true)}>
												<button className="bg-[#0d9488] h-[32px] w-[32px] rounded grid place-items-center text-white">
													<MdModeEditOutline className="size-6" />
												</button>
											</Link>
											<button
												onClick={() => handleDelete(sData._id)}
												className="bg-[#e7405c] h-[32px] w-[32px] rounded grid place-items-center text-white">
												<MdDelete className="size-6" />
											</button>
										</div>
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="lg:hidden space-y-4 mt-4">
					{[...data].reverse().map((sData) => (
						<div
							key={sData._id}
							className="divide-y divide-gray-100 bg-white border border-gray-200 rounded-lg">
							<div className="flex justify-between gap-3 px-3 py-4">
								<div className="flex justify-start items-center gap-3 px-3 py-4">
									<div className="flex items-center">
										{sData?.image && (
											<Image
												className="w-20 h-14 object-cover rounded"
												width={100}
												height={100}
												src={sData.image}
												alt="Services & Skills"
											/>
										)}
									</div>
									<div className="w-20 h-14 rounded grid place-items-center border">
										<div className="w-10 h-10">
											{sData?.svgIcon && (
												<Image
													className="w-full h-full object-cover rounded"
													width={100}
													height={100}
													src={sData.svgIcon}
													alt="Services & Skills"
												/>
											)}
										</div>
									</div>
								</div>
								<div className="flex items-center justify-end gap-3 px-3 py-4">
									<Link
										href={`/dashboard/skills/edit/${sData._id}`}
										onClick={() => setLoading(true)}>
										<button className="bg-[#0d9488] h-[32px] w-[32px] rounded grid place-items-center text-white">
											<MdModeEditOutline className="size-5" />
										</button>
									</Link>
									<button
										onClick={() => handleDelete(sData._id)}
										className="bg-[#e7405c] h-[32px] w-[32px] rounded grid place-items-center text-white">
										<MdDelete className="size-5" />
									</button>
								</div>
							</div>
							<div className="flex justify-between gap-3 px-3 py-4">
								<span className="text-md font-semibold text-gray-700">
									Title:
								</span>
								<span className="text-md text-gray-900 line-clamp-1">
									{sData.title}
								</span>
							</div>

							<div className="flex justify-between gap-3 px-3 py-4">
								<span className="text-md font-semibold text-gray-700">
									Description:
								</span>
								<span className="text-md text-gray-900 line-clamp-2">
									{getFirstTagText(sData.description)}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
