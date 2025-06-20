"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import Loading from "./Loading";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

export default function EditHero({ data }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
	const [imageRemoved, setImageRemoved] = useState(false);


	const [formData, setFormData] = useState({
		title: data.title || "",
		number: data.number || "",
		link: data.link || "",
		description: data.description || "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

    const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			setImageRemoved(false);
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
		setImageRemoved(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			let uploadedImageUrl = data.imgUrl;

			if (image) {
				uploadedImageUrl = await uploadToCloudinary(image);
			} else if (imageRemoved) {
				uploadedImageUrl = "";
			}

			await axios.put(`${process.env.BASE_URL}/hero-slider/edit/${data._id}`, {
				title: formData.title,
				description: formData.description,
				number: formData.number,
				link: formData.link,
				imgUrl: uploadedImageUrl,
			});

			setFormData({ title: "", number: "", description: "" });
			router.push("/dashboard/hero");
			toast.success("Updated Successfully!");
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		} catch (error) {
			setLoading(false);
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

				<div className="grid grid-cols-2 gap-2">
					{imageRemoved ? (
						<UploadPlaceholder onChange={handleImageChange} />
					) : image ? (
						<PreviewImage
							image={URL.createObjectURL(image)}
							onRemove={handleRemoveImage}
						/>
					) : data?.imgUrl ? (
						<PreviewImage image={data.imgUrl} onRemove={handleRemoveImage} />
					) : (
						<UploadPlaceholder onChange={handleImageChange} />
					)}
				</div>

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
					<label htmlFor="link" className="font-medium text-sm text-gray-700">
						Link <span className="text-red-500">*</span>
					</label>
					<input
						id="link"
						name="link"
						value={formData.link}
						onChange={handleChange}
						placeholder="Link"
						className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
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


function PreviewImage({ image, onRemove }) {
	return (
		<div className="relative w-full max-w-44 h-44">
			<Image
				src={image}
				width={100}
				height={100}
				className="w-full h-full object-cover rounded shadow"
				alt="Image Preview"
			/>
			<button
				type="button"
				onClick={onRemove}
				className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100"
				title="Remove">
				<MdClose size={16} className="text-red-500" />
			</button>
		</div>
	);
}

function UploadPlaceholder({ onChange }) {
	return (
		<label className="cursor-pointer active:bg-gray-100 border border-dashed border-gray-300 rounded-lg w-full max-w-44 h-44 flex items-center justify-center">
			<div>
				<p className="block text-center text-gray-600 text-2xl">+</p>
				<p className="block text-xs text-gray-600">Upload Photo</p>
			</div>
			<input
				type="file"
				accept="image/*"
				className="hidden"
				onChange={onChange}
			/>
		</label>
	);
}