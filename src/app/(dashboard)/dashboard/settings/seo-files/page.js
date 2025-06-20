"use client";
import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Page() {
	const [loading, setLoading] = useState(true);
	const [seoFile, setSeoFile] = useState(null);
	const [openIndex, setOpenIndex] = useState(null);

	const toggleFAQ = (index) => {
		setOpenIndex((prev) => (prev === index ? null : index));
	};

	const fetchSeoFile = async () => {
		try {
			const res = await axios.get(`${process.env.BASE_URL}/seo-files`);
			setSeoFile(res.data);
		} catch (err) {
			toast.error("Failed to fetch SEO file");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSeoFile();
	}, []);

	const handleDelete = async (id) => {
		try {
			await axios.delete(`${process.env.BASE_URL}/seo-files/${id}`);
			setSeoFile(null);
			toast.success("Successfully Deleted!");
		} catch (err) {
			toast.error("Failed to delete SEO file");
		}
	};

	if (loading) return <Loading />;

	return (
		<div className="p-5">
			<div className="flex items-center justify-between mb-3">
				<h2 className="relative text-lg font-semibold text-gray-800 mb-2 pb-2 after:absolute after:bottom-0 after:left-0 after:w-20 after:h-[2px] after:bg-black before:absolute before:bottom-1 before:left-0 before:w-28 before:h-[2px] before:bg-[#0d9488]">
					SEO Files
				</h2>
				{!(seoFile?.xmlUrl || seoFile?.txtUrl) && (
					<Link
						href="/dashboard/settings/seo-files/create"
						onClick={() => setLoading(true)}>
						<button className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded flex items-center justify-center gap-1">
							<BiSolidEdit />
							Upload
						</button>
					</Link>
				)}
			</div>

			{!seoFile && (
				<div className="p-5 h-full f-full">
					<div className="bg-white text-xl border border-gray-200 rounded text-red-600 p-5 h-full f-full grid place-items-center">
						No data found
					</div>
				</div>
			)}

			{seoFile?.xmlUrl || seoFile?.txtUrl || seoFile?.htmlUrl ? (
				<div className="space-y-4 bg-white border border-gray-200 rounded p-5">
					<div className="flex items-center justify-between">
						<h2 className="font-medium flex items-center gap-3 text-md">
							<button className="bg-[#0d9488] h-[32px] w-[60px] rounded grid place-items-center text-white">
								01
							</button>
							Uploaded SEO Files
						</h2>
						<div className="flex items-center justify-end gap-2">
							<button
								onClick={() => handleDelete(seoFile._id)}
								className="bg-[#e7405c] h-[32px] w-[32px] rounded grid place-items-center text-white">
								<MdDelete className="size-6" />
							</button>
						</div>
					</div>

					{seoFile?.xmlUrl && (
						<div
							className={`p-4 bg-white rounded-lg border cursor-pointer transition-all duration-300 ${
								openIndex === "xml" ? "border-gray-400" : "border-gray-200"
							}`}>
							<h3
								onClick={() => toggleFAQ("xml")}
								className="font-semibold flex justify-between items-center capitalize">
								XML File
								<span className="text-xl">
									{openIndex === "xml" ? "−" : "+"}
								</span>
							</h3>
							<div
								className={`grid transition-all duration-500 ease-in-out px-2 ${
									openIndex === "xml"
										? "grid-rows-[1fr] py-3"
										: "grid-rows-[0fr] py-0"
								}`}>
								<div className="overflow-hidden text-gray-600 text-sm">
									<Link
										href={seoFile.xmlUrl}
										target="_blank"
										className="text-blue-600 underline">
										{seoFile.xmlUrl}
									</Link>
								</div>
							</div>
						</div>
					)}

					{seoFile?.txtUrl && (
						<div
							className={`p-4 bg-white rounded-lg border cursor-pointer transition-all duration-300 ${
								openIndex === "txt" ? "border-gray-400" : "border-gray-200"
							}`}>
							<h3
								onClick={() => toggleFAQ("txt")}
								className="font-semibold flex justify-between items-center capitalize">
								TXT File
								<span className="text-xl">
									{openIndex === "txt" ? "−" : "+"}
								</span>
							</h3>
							<div
								className={`grid transition-all duration-500 ease-in-out px-2 ${
									openIndex === "txt"
										? "grid-rows-[1fr] py-3"
										: "grid-rows-[0fr] py-0"
								}`}>
								<div className="overflow-hidden text-gray-600 text-sm">
									<Link
										href={seoFile.txtUrl}
										target="_blank"
										className="text-blue-600 underline">
										{seoFile.txtUrl}
									</Link>
								</div>
							</div>
						</div>
					)}

					{seoFile?.htmlUrl && (
						<div
							className={`p-4 bg-white rounded-lg border cursor-pointer transition-all duration-300 ${
								openIndex === "txt" ? "border-gray-400" : "border-gray-200"
							}`}>
							<h3
								onClick={() => toggleFAQ("html")}
								className="font-semibold flex justify-between items-center capitalize">
								HTML File
								<span className="text-xl">
									{openIndex === "html" ? "−" : "+"}
								</span>
							</h3>
							<div
								className={`grid transition-all duration-500 ease-in-out px-2 ${
									openIndex === "html"
										? "grid-rows-[1fr] py-3"
										: "grid-rows-[0fr] py-0"
								}`}>
								<div className="overflow-hidden text-gray-600 text-sm">
									<Link
										href={seoFile.htmlUrl}
										target="_blank"
										className="text-blue-600 underline">
										{seoFile.htmlUrl}
									</Link>
								</div>
							</div>
						</div>
					)}
				</div>
			) : null}
		</div>
	);
}
