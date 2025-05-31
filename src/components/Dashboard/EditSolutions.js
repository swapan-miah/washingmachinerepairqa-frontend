"use client";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-hot-toast";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";
import Loading from "../Loading";

export default function EditSolutions({ data }) {
	const router = useRouter();

	const [svgFile, setSvgFile] = useState(null);
	const [svgRemoved, setSvgRemoved] = useState(false);
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		title: data.title || "",
		description: data.description || "",
		svgIcon: data.svgIcon || "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSvgChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type === "image/svg+xml") {
			setSvgFile(file);
			setSvgRemoved(false);
		} else {
			toast.error("Please upload a valid SVG file.");
		}
	};

	const handleRemoveSvg = () => {
		setSvgFile(null);
		setSvgRemoved(true);
		setFormData({ ...formData, svgIcon: "" });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		let uploadedSvgUrl = formData.svgIcon;

		if (svgFile) {
			uploadedSvgUrl = await uploadToCloudinary(svgFile);
		} else if (svgRemoved) {
			uploadedSvgUrl = "";
		}

		try {
			await axios.put(
				`${process.env.BASE_URL}/our-solutions/edit/${data._id}`,
				{
					title: formData.title,
					description: formData.description,
					svgIcon: uploadedSvgUrl,
				},
			);

			router.push("/dashboard/solutions");
			toast.success("Updated Successfully!");
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		} catch (err) {
			setLoading(false);
			toast.error("Failed to update");
		}
	};

	if (loading) return <Loading />;

	return (
		<div className="p-5">
			<form
				onSubmit={handleSubmit}
				className="p-5 bg-white flex flex-col gap-5 border border-gray-200 rounded">
				
				<div className="grid grid-cols-2 gap-2">
					{svgFile ? (
						<div className="relative max-w-44 h-44 border grid place-items-center rounded">
							<Image
								src={URL.createObjectURL(svgFile)}
								width={100}
								height={100}
								className="object-contain"
								alt="Uploaded"
							/>
							<button
								type="button"
								onClick={handleRemoveSvg}
								className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100"
								title="Remove">
								<MdClose size={16} className="text-red-500" />
							</button>
						</div>
					) : formData.svgIcon && !svgRemoved ? (
						<div className="relative max-w-44 h-44 border grid place-items-center rounded">
							<Image
								src={formData.svgIcon}
								width={100}
								height={100}
								className="object-contain"
								alt="Existing"
							/>
							<button
								type="button"
								onClick={handleRemoveSvg}
								className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100"
								title="Remove">
								<MdClose size={16} className="text-red-500" />
							</button>
						</div>
					) : (
						<label className="cursor-pointer active:bg-gray-100 border border-dashed border-gray-300 rounded max-w-44 h-44 flex items-center justify-center">
							<div>
								<p className="block text-center text-gray-600">+</p>
								<p className="block text-xs text-gray-600">Upload Icon</p>
							</div>
							<input
								type="file"
								accept=".svg"
								className="hidden"
								onChange={handleSvgChange}
							/>
						</label>
					)}
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="title" className="font-medium text-sm text-gray-700">
						Title <span className="text-red-500">*</span>
					</label>
					<input
						id="title"
						name="title"
						className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
						placeholder="Title"
						value={formData.title}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="description" className="font-medium text-sm text-gray-700">
						Description <span className="text-red-500">*</span>
					</label>
					<textarea
						id="description"
						name="description"
						rows="6"
						placeholder="Description"
						value={formData.description}
						onChange={handleChange}
						className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 resize-none"
						required></textarea>
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
