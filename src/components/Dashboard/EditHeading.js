"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";

export default function EditHeading({ data }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		title: data?.title || "",
		description: data?.description || "",
	});

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await axios.put(
				`${process.env.NEXT_PUBLIC_BASE_URL}/section-heading/edit/${data._id}`,
				{
					title: formData.title,
					description: formData.description,
				},
			);

			toast.success("Updated Successfully!");
			router.push("/dashboard/settings/heading-description");
		} catch (err) {
			toast.error("Failed to update");
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <Loading />;

	return (
		<div className="p-5">
			<form
				onSubmit={handleSubmit}
				className="p-5 bg-white flex flex-col gap-5 border border-gray-200 rounded">
				<div className="flex flex-col gap-1">
					<label className="font-medium text-sm text-gray-700">
						Title <span className="text-red-500">*</span>
					</label>
					<input
						name="title"
						className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
						placeholder="Title"
						value={formData.title}
						onChange={handleInputChange}
						required
					/>
				</div>

				{data?.description && (
					<div className="flex flex-col gap-1">
						<label className="font-medium text-sm text-gray-700">
							Description <span className="text-red-500">*</span>
						</label>
						<textarea
							name="description"
							rows="6"
							value={formData.description}
							onChange={handleInputChange}
							placeholder="Description"
							className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 resize-none"
						/>
					</div>
				)}

				<button
					type="submit"
					className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded">
					Update
				</button>
			</form>
		</div>
	);
}
