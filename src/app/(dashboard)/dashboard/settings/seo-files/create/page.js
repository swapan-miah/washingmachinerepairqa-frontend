"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { uploadFileToCloudinary } from "../../../../../../../utils/uploadFileToCloudinary";

export default function Page() {
	const [xmlFile, setXmlFile] = useState(null);
	const [txtFile, setTxtFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!xmlFile || !txtFile) {
			toast.error("Please upload both XML and TXT files.");
			return;
		}

		setLoading(true);

		try {
			const [xmlUrl, txtUrl] = await Promise.all([
				uploadFileToCloudinary(xmlFile),
				uploadFileToCloudinary(txtFile),
			]);

			await axios.post(`${process.env.BASE_URL}/create-seo-files`, {
				xmlUrl,
				txtUrl,
			});

			toast.success("Uploaded successfully!");
			router.push("/dashboard/settings/seo-files");
			setXmlFile(null);
			setTxtFile(null);
			e.target.reset();
		} catch (error) {
			console.error("Error uploading files:", error.response?.data || error.message);
			toast.error("Error uploading files.");
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <Loading />;

	return (
		<div className="p-5">
			<form
				onSubmit={handleSubmit}
				className="p-5 bg-white flex flex-col gap-5 border border-gray-200 rounded"
				encType="multipart/form-data">
				
				<div className="flex flex-col gap-1">
					<label htmlFor="xmlFile" className="font-medium text-sm text-gray-700">
						Upload XML File <span className="text-red-500">*</span>
					</label>
					<input
						type="file"
						id="xmlFile"
						name="xmlFile"
						accept=".xml"
						required
						onChange={(e) => setXmlFile(e.target.files[0])}
						className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="txtFile" className="font-medium text-sm text-gray-700">
						Upload TXT File <span className="text-red-500">*</span>
					</label>
					<input
						type="file"
						id="txtFile"
						name="txtFile"
						accept=".txt"
						required
						onChange={(e) => setTxtFile(e.target.files[0])}
						className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
					/>
				</div>

				<button
					type="submit"
					className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded transition">
					Submit
				</button>
			</form>
		</div>
	);
}
