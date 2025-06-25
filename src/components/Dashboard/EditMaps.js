"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../Loading";

export default function EditMaps({ data }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		mapUrl: data.mapUrl || "",
	});
	const extractSrc = (input) => {
		const match = input.match(/src=["']([^"']+)["']/);
		return match ? match[1] : input;
	};

	const handleChange = (e) => {
		const value = extractSrc(e.target.value);
		setFormData({ ...formData, [e.target.name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/google-maps/edit/${data._id}`, {
				mapUrl: formData.mapUrl,
			});

			setFormData({ mapUrl: "" });
			router.push("/dashboard/map");
			toast.success("Updated Successfully!");
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error("Update failed");
		}
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="p-5">
			<form
				onSubmit={handleSubmit}
				className="p-5 bg-white flex flex-col gap-5 border border-gray-200 rounded">

				<div className="flex flex-col gap-1 mt-3">
					<label className="font-medium text-sm text-gray-700">
						MapUrl <span className="text-red-500">*</span>
					</label>
					<textarea
						name="mapUrl"
						value={formData.mapUrl}
						onChange={handleChange}
						placeholder="Paste Iframe OR embed URL"
						rows="6"
						className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 resize-none"
						required
					/>
				</div>
				
				<button
					type="submit"
					className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded">
					Update
				</button>
			</form>
		</div>
	);
}
