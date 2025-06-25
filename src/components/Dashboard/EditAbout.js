"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import Loading from "@/components/Loading";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";

export default function EditAbout({ data }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		sectionHeading: data.sectionHeading || "",
		sectionSubHeading: data.sectionSubHeading || "",
		sectionDescription: data.sectionDescription || "",
		cardHeadline: data.cardHeadline || "",
		cardDescription: data.cardDescription || "",
		ceoName: data.ceoName || "",
		role: data.role || "",
		ceoAbout: data.ceoAbout || "",
	});

	const [oldImages, setOldImages] = useState(data.images || []);
	const [newImages, setNewImages] = useState([]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file && newImages.length + oldImages.length < 2) {
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
				const url = await uploadToCloudinary(img.file);
				uploadedUrls.push(url);
			}

			const finalImageList = [...oldImages, ...uploadedUrls];

			await axios.put(
				`${process.env.NEXT_PUBLIC_BASE_URL}/about/edit/${data._id}`,
				{
					...formData,
					images: finalImageList,
				},
			);
			toast.success("Updated Successfully!");
			setFormData({
				sectionHeading: "",
				sectionSubHeading: "",
				sectionDescription: "",
				cardHeadline: "",
				cardDescription: "",
				ceoName: "",
				role: "",
				ceoAbout: "",
			});
			setOldImages([]);
			setNewImages([]);
			router.push("/dashboard/about");
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		} catch (error) {
			toast.error("Update failed");
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		}
	};

	if (loading) return <Loading />;

	return (
		<div className="p-5">
			<form
				onSubmit={handleSubmit}
				className="p-5 bg-white flex flex-col gap-5 border border-gray-200 rounded">
				{[
					{ name: "sectionHeading", label: "Section Heading" },
					{ name: "sectionSubHeading", label: "Section Subheading" },
					{
						name: "sectionDescription",
						label: "Section Description",
						isTextarea: true,
					},
					{ name: "cardHeadline", label: "Card Headline" },
					{
						name: "cardDescription",
						label: "Card Description",
						isTextarea: true,
					},
					{ name: "ceoName", label: "CEO Name" },
					{ name: "role", label: "Role" },
					{ name: "ceoAbout", label: "CEO About", isTextarea: true },
				].map(({ name, label, isTextarea }) => (
					<div key={name} className="flex flex-col gap-1">
						<label htmlFor={name} className="font-medium text-sm text-gray-700">
							{label} <span className="text-red-500">*</span>
						</label>
						{isTextarea ? (
							<textarea
								id={name}
								name={name}
								value={formData[name]}
								onChange={handleChange}
								placeholder={label}
								rows="4"
								className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 resize-none"
								required
							/>
						) : (
							<input
								id={name}
								name={name}
								value={formData[name]}
								onChange={handleChange}
								placeholder={label}
								className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
								required
							/>
						)}
					</div>
				))}

				<div className="flex flex-col gap-2">
					<label className="font-medium text-sm text-gray-700">
						Images <span className="text-red-500">*</span>
						<span className="text-gray-400 text-xs ml-1">(max 2)</span>
					</label>
					<div className="flex flex-wrap gap-4">
						{oldImages.map((img, index) => (
							<div key={index} className="relative w-24 h-24">
								<Image
									src={img}
									width={100}
									height={100}
									alt={`old-${index}`}
									className="w-full h-full object-cover rounded shadow"
								/>
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
								<Image
									src={img.preview}
									width={100}
									height={100}
									alt={`new-${index}`}
									className="w-full h-full object-cover rounded shadow"
								/>
								<button
									type="button"
									onClick={() => handleRemoveNewImage(index)}
									className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100">
									<MdClose size={16} className="text-red-500" />
								</button>
							</div>
						))}

						{oldImages.length + newImages.length < 2 && (
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
