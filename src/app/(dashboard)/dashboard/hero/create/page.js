"use client";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { uploadToCloudinary } from "../../../../../../utils/uploadToCloudinary";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

export default function Page() {
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		number: "",
		link: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) setImage(file);
	};

	const handleRemoveImage = () => setImage(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		let uploadedImageUrl = "";
		if (image) {
			uploadedImageUrl = await uploadToCloudinary(image);
		}
		const { title, description, number, link } = formData;

		try {
			await axios.post(`${process.env.BASE_URL}/post-slider`, {
				title,
				description,
				number,
				link,
				imgUrl: uploadedImageUrl,
			});
			setImage(null);
			setFormData({
				title: "",
				description: "",
				number: "",
				link: "",
			});
			toast.success("Submitted Successfully!");
			router.push("/dashboard/hero");
		} catch (err) {
			toast.error("Failed to upload");
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
				<div className="grid grid-cols-2 gap-2">
					{!image ? (
						<label className="cursor-pointer active:bg-gray-100 border border-dashed border-gray-300 rounded-lg w-full max-w-44 h-44 flex items-center justify-center">
							<div>
								<p className="block text-center text-gray-600">+</p>
								<p className="block text-xs text-gray-600">Upload Photo</p>
							</div>
							<input
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleImageChange}
							/>
						</label>
					) : (
						<div className="relative w-full max-w-44 h-44">
							<Image
								src={URL.createObjectURL(image)}
								width={100}
								height={100}
								className="w-full h-full object-cover rounded shadow"
								alt="Blog Image"
							/>
							<button
								onClick={handleRemoveImage}
								className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100"
								title="Remove"
								type="button">
								<MdClose size={16} className="text-red-500" />
							</button>
						</div>
					)}
				</div>

				{[{ name: "title", label: "Title" }].map(({ name, label }) => (
					<div key={name} className="flex flex-col gap-1">
						<label className="font-medium text-sm text-gray-700">
							{label} <span className="text-red-500">*</span>
						</label>
						<input
							name={name}
							value={formData[name]}
							onChange={handleChange}
							required
							className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
							placeholder={label}
						/>
					</div>
				))}

				{[{ name: "description", label: "Description" }].map(
					({ name, label }) => (
						<div key={name} className="flex flex-col gap-1">
							<label className="font-medium text-sm text-gray-700">
								{label} <span className="text-red-500">*</span>
							</label>
							<textarea
								name={name}
								rows="4"
								placeholder={label}
								value={formData[name]}
								onChange={handleChange}
								className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 resize-none"
								required
							/>
						</div>
					),
				)}

				{[
					{ name: "number", label: "Number" },
					{ name: "link", label: "Link" },
				].map(({ name, label }) => (
					<div key={name} className="flex flex-col gap-1">
						<label className="font-medium text-sm text-gray-700">
							{label} <span className="text-red-500">*</span>
						</label>
						<input
							name={name}
							value={formData[name]}
							onChange={handleChange}
							required
							className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
							placeholder={label}
						/>
					</div>
				))}

				<button
					type="submit"
					className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded disabled:opacity-50">
					Create
				</button>
			</form>
		</div>
	);
}
