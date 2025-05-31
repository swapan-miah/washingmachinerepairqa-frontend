"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import Loading from "./Loading";

export default function EditHero({ data }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		title: data.title || "",
		number: data.number || "",
		description: data.description || "",
	});

	const [oldImages, setOldImages] = useState(data.images || []);
	const [newImages, setNewImages] = useState([]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file && newImages.length + oldImages.length < 4) {
			setNewImages((prev) => [
				...prev,
				{ file, preview: URL.createObjectURL(file) },
			]);
		}
	};

	const handleRemoveOldImage = (index) => {
		setOldImages((prev) => prev.filter((_, i) => i !== index));
	};

	const handleRemoveNewImage = (index) => {
		setNewImages((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const uploadedUrls = [];

			for (const img of newImages) {
				const form = new FormData();
				form.append("file", img.file);
				form.append("upload_preset", "washing-machine");

				const res = await axios.post(
					`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
					form,
				);
				uploadedUrls.push(res.data.secure_url);
			}

			const finalImageList = [...oldImages, ...uploadedUrls];

			await axios.put(`${process.env.BASE_URL}/hero-slider/edit/${data._id}`, {
				title: formData.title,
				number: formData.number,
				description: formData.description,
				images: finalImageList,
			});

			setFormData({ title: "", number: "", description: "" });
			setOldImages([]);
			router.push("/dashboard/hero");
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
				<div className="flex flex-col gap-1">
					<label htmlFor="title" className="font-medium text-sm text-gray-700">
						Title <span className="text-red-500">*</span>
					</label>
					<input
						id="title"
						name="title"
						value={formData.title}
						onChange={handleChange}
						placeholder="Title"
						className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
						required
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="number" className="font-medium text-sm text-gray-700">
						Number <span className="text-red-500">*</span>
					</label>
					<input
						id="number"
						name="number"
						value={formData.number}
						onChange={handleChange}
						placeholder="Number"
						className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
						required
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label
						htmlFor="description"
						className="font-medium text-sm text-gray-700">
						Description <span className="text-red-500">*</span>
					</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Description"
						rows="6"
						className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 resize-none"
						required
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label className="font-medium text-sm text-gray-700">
						Images <span className="text-red-500">*</span>
						<span className="text-gray-400 text-xs ml-1">(max 4)</span>
					</label>
					<div className="flex flex-wrap gap-4">
						{oldImages.map((img, index) => (
							<div key={index} className="relative w-24 h-24">
								{img && (
									<Image
										src={img}
										width={100}
										height={100}
										alt={`old-${index}`}
										className="w-full h-full object-cover rounded shadow"
									/>
								)}

								<button
									type="button"
									onClick={() => handleRemoveOldImage(index)}
									className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100">
									<MdClose size={16} className="text-red-500" />
								</button>
							</div>
						))}

						{newImages.map((img, index) => (
							<div key={index} className="relative w-24 h-24">
								{img?.preview && (
									<Image
										src={img.preview}
										width={100}
										height={100}
										alt={`new-${index}`}
										className="w-full h-full object-cover rounded shadow"
									/>
								)}

								<button
									type="button"
									onClick={() => handleRemoveNewImage(index)}
									className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100">
									<MdClose size={16} className="text-red-500" />
								</button>
							</div>
						))}

						{oldImages.length + newImages.length < 4 && (
							<label className="cursor-pointer border-2 border-dashed active:bg-gray-200 rounded-lg w-24 h-24 flex items-center justify-center text-gray-500">
								+
								<input
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleImageChange}
									required={oldImages.length + newImages.length === 0}
								/>
							</label>
						)}
					</div>
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
