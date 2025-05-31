"use client";
import Image from "next/image";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";
import Loading from "../Loading";

export default function EditWhyChooseUs({ data }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		cover: data.cover || "",
		expertise: data.expertise || [],
	});

	const [coverImage, setCoverImage] = useState(null);
	const [coverRemoved, setCoverRemoved] = useState(false);

	const [expertiseImages, setExpertiseImages] = useState(
		data.expertise.map(() => ({ file: null, removed: false })),
	);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleCoverChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setCoverImage(file);
			setCoverRemoved(false);
		}
	};

	const handleRemoveCover = () => {
		setCoverImage(null);
		setCoverRemoved(true);
	};

	const handleExpertiseChange = (index, field, value) => {
		const updatedExpertise = [...formData.expertise];
		updatedExpertise[index][field] = value;
		setFormData({ ...formData, expertise: updatedExpertise });
	};

	const handleExpertiseIconChange = (index, e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.type !== "image/svg+xml") {
				toast.error("Only SVG files are allowed!");
				return;
			}
			const updatedImages = [...expertiseImages];
			updatedImages[index] = { file, removed: false };
			setExpertiseImages(updatedImages);
		}
	};

	const handleRemoveExpertiseIcon = (index) => {
		const updatedImages = [...expertiseImages];
		updatedImages[index] = { file: null, removed: true };
		setExpertiseImages(updatedImages);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			let uploadedCover = formData.cover;

			if (coverImage) {
				uploadedCover = await uploadToCloudinary(coverImage);
			} else if (coverRemoved) {
				uploadedCover = "";
			}

			const updatedExpertise = await Promise.all(
				formData.expertise.map(async (item, index) => {
					let updatedIcon = item.iconUrl;

					if (expertiseImages[index]?.file) {
						updatedIcon = await uploadToCloudinary(expertiseImages[index].file);
					} else if (expertiseImages[index]?.removed) {
						updatedIcon = "";
					}

					return {
						...item,
						iconUrl: updatedIcon,
					};
				}),
			);

			await axios.put(`${process.env.BASE_URL}/why-choose/edit/${data._id}`, {
				cover: uploadedCover,
				expertise: updatedExpertise,
			});

			setFormData({
				cover: "",
				expertise: [],
			});
			setCoverImage(null);
			setCoverRemoved(false);
			setExpertiseImages([]);
			router.push("/dashboard/choose-us");
			setTimeout(() => {
				setLoading(false);
				toast.success("Updated Successfully!");
			}, 2000);
		} catch (error) {
			toast.error("Update failed");
		}
	};

	if (loading) return <Loading />;

	return (
		<div className="p-5">
			<form
				onSubmit={handleSubmit}
				className="p-5 bg-white flex flex-col gap-5 border rounded">
				<div className="grid place-items-center">
					{coverRemoved ? (
						<label className="cursor-pointer active:bg-gray-50 border border-dashed rounded-lg w-full md:w-[40%] h-48 flex items-center justify-center">
							<div className="text-center">
								<p className="text-gray-600">+</p>
								<p className="text-xs text-gray-600">Upload Cover</p>
							</div>
							<input
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleCoverChange}
							/>
						</label>
					) : coverImage ? (
						<div className="relative w-full md:w-[40%] h-48">
							<Image
								src={URL.createObjectURL(coverImage)}
								alt="Cover"
								width={100}
								height={100}
								className="w-full h-full object-cover rounded"
							/>
							<button
								type="button"
								onClick={handleRemoveCover}
								className="absolute top-1 right-1 bg-white p-1 rounded-full border">
								<MdClose size={16} className="text-red-500" />
							</button>
						</div>
					) : formData.cover ? (
						<div className="relative w-full md:w-[40%] h-48 border rounded">
							<Image
								src={formData.cover}
								alt="Cover"
								width={100}
								height={100}
								className="w-full h-full object-cover rounded"
							/>
							<button
								type="button"
								onClick={handleRemoveCover}
								className="absolute top-1 right-1 bg-white p-1 rounded-full border">
								<MdClose size={16} className="text-red-500" />
							</button>
						</div>
					) : (
						<label className="cursor-pointer active:bg-gray-50 border border-dashed rounded-lg w-full md:w-[40%] h-48 flex items-center justify-center">
							<div className="text-center">
								<p className="text-gray-600">+</p>
								<p className="text-xs text-gray-600">Upload Cover</p>
							</div>
							<input
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleCoverChange}
							/>
						</label>
					)}
				</div>

				<div className="flex flex-col gap-5">
					{formData.expertise.map((item, index) => (
						<div key={index} className="border p-4 rounded flex flex-col gap-2">
							<label className="font-medium text-sm text-gray-700">
								Expertise 0{index + 1} <span className="text-red-500">*</span>
							</label>
							<div className="grid place-items-center">
								{expertiseImages[index]?.removed ? (
									<label className="cursor-pointer active:bg-gray-50 border border-dashed rounded-lg w-full md:w-[40%] h-32 flex items-center justify-center">
										<div className="text-center">
											<p className="text-gray-600">+</p>
											<p className="text-xs text-gray-600">Upload SVG Icon</p>
										</div>
										<input
											type="file"
											accept=".svg"
											className="hidden"
											onChange={(e) => handleExpertiseIconChange(index, e)}
										/>
									</label>
								) : expertiseImages[index]?.file ? (
									<div className="relative w-full md:w-[40%] h-32 p-2 border rounded grid place-items-center">
										<Image
											src={URL.createObjectURL(expertiseImages[index].file)}
											alt="Icon"
											width={100}
											height={100}
											className="object-contain rounded"
										/>
										<button
											type="button"
											onClick={() => handleRemoveExpertiseIcon(index)}
											className="absolute top-1 right-1 bg-white p-1 rounded-full border">
											<MdClose size={16} className="text-red-500" />
										</button>
									</div>
								) : item.iconUrl ? (
									<div className="relative w-full md:w-[40%] h-32 p-2 border rounded grid place-items-center">
										<Image
											src={item.iconUrl}
											alt="Icon"
											width={100}
											height={100}
											className="object-contain"
										/>
										<button
											type="button"
											onClick={() => handleRemoveExpertiseIcon(index)}
											className="absolute top-1 right-1 bg-white p-1 rounded-full border">
											<MdClose size={16} className="text-red-500" />
										</button>
									</div>
								) : (
									<label className="cursor-pointer border border-dashed rounded-lg w-full md:w-[40%] h-32 flex items-center justify-center">
										<div className="text-center">
											<p className="text-gray-600">+</p>
											<p className="text-xs text-gray-600">Upload SVG Icon</p>
										</div>
										<input
											type="file"
											accept=".svg"
											className="hidden"
											onChange={(e) => handleExpertiseIconChange(index, e)}
										/>
									</label>
								)}
							</div>

							<div className="flex flex-col gap-1">
								<label className="font-medium text-sm text-gray-700">
									Title <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									className="border border-gray-200 outline-none focus:border-gray-400 rounded p-2"
									placeholder="Expertise Title"
									value={item.expertiseTitle}
									onChange={(e) =>
										handleExpertiseChange(
											index,
											"expertiseTitle",
											e.target.value,
										)
									}
									required
								/>
							</div>

							<div className="flex flex-col gap-1 mt-3">
								<label className="font-medium text-sm text-gray-700">
									Description <span className="text-red-500">*</span>
								</label>
								<textarea
									rows="3"
									className="border border-gray-200 outline-none focus:border-gray-400 rounded p-2"
									placeholder="Expertise Description"
									value={item.expertiseDescription}
									onChange={(e) =>
										handleExpertiseChange(
											index,
											"expertiseDescription",
											e.target.value,
										)
									}
									required></textarea>
							</div>
						</div>
					))}
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
