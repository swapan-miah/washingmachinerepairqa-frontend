"use client";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-hot-toast";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";
import Loading from "../Loading";
import TextEditor from "./TextEditor";
import SchemaEditor from "./SchemaEditor";

export default function EditWorks({ data }) {
	const router = useRouter();
	const [image, setImage] = useState(null);
	const [svgFile, setSvgFile] = useState(null);
	const [imageRemoved, setImageRemoved] = useState(false);
	const [svgRemoved, setSvgRemoved] = useState(false);
	const [loading, setLoading] = useState(false);
	const [editorContent, setEditorContent] = useState("");
	const [formData, setFormData] = useState({
		metaTitle: "",
		metaDescription: "",
		metaKeywords: "",
		robotMeta: "",
		slug: "",
		title: "",
	});

	const [schemaItems, setSchemaItems] = useState(
		Array.isArray(data?.schema) ? data.schema : [],
	);

	const [isSlugUsed, setIsSlugUsed] = useState(false);

	useEffect(() => {
		setFormData({
			metaTitle: data?.metaTitle || "",
			metaDescription: data?.metaDescription || "",
			metaKeywords: data?.metaKeywords || "",
			robotMeta: data?.robotMeta || "",
			slug: data?.slug || "",
			title: data?.title || "",
		});
		setEditorContent(data?.description || "");
		setIsSlugUsed(false);
	}, [data]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
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

		const { metaTitle, metaDescription, metaKeywords, robotMeta, slug, title } =
			formData;

		const description = editorContent;
		const schema = schemaItems;

		let uploadedImageUrl = data.image;
		let uploadedSvgUrl = data.svgIcon;

		if (image) {
			uploadedImageUrl = await uploadToCloudinary(image);
		} else if (imageRemoved) {
			uploadedImageUrl = "";
		}

		if (svgFile) {
			uploadedSvgUrl = await uploadToCloudinary(svgFile);
		} else if (svgRemoved) {
			uploadedSvgUrl = "";
		}

		try {
			const res = await axios.get(`${process.env.BASE_URL}/services-skills`);
			const allServices = res.data;

			const slugUsed = allServices.some(
				(service) => service.slug === formData.slug && service._id !== data._id,
			);

			if (slugUsed) {
				setIsSlugUsed(true);
				setLoading(false);
				toast.error("Slug already exists.");
				return;
			}

			await axios.put(
				`${process.env.BASE_URL}/services-skills/edit/${data._id}`,
				{
					metaTitle,
					metaDescription,
					metaKeywords,
					robotMeta,
					schema,
					slug,
					title,
					description,
					svgIcon: uploadedSvgUrl,
					image: uploadedImageUrl,
				},
			);

			router.push("/dashboard/skills");
			toast.success("Updated Successfully!");
		} catch (err) {
			console.error(err);
			toast.error("Failed to update");
		} finally {
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
				<div className="grid grid-cols-2 gap-2">
					{imageRemoved ? (
						<UploadBlock
							label="Photo"
							onChange={handleImageChange}
							accept="image/*"
						/>
					) : image ? (
						<PreviewBlock file={image} onRemove={handleRemoveImage} />
					) : data.image ? (
						<PreviewBlock
							file={data.image}
							onRemove={handleRemoveImage}
							existing
						/>
					) : (
						<UploadBlock
							label="Photo"
							onChange={handleImageChange}
							accept="image/*"
						/>
					)}

					{svgRemoved ? (
						<UploadBlock
							label="Icon"
							onChange={handleSvgChange}
							accept=".svg"
						/>
					) : svgFile ? (
						<PreviewBlock file={svgFile} onRemove={handleRemoveSvg} />
					) : data.svgIcon ? (
						<PreviewBlock
							file={data.svgIcon}
							onRemove={handleRemoveSvg}
							existing
						/>
					) : (
						<UploadBlock
							label="Icon"
							onChange={handleSvgChange}
							accept=".svg"
						/>
					)}
				</div>

				{[{ name: "metaTitle", label: "Meta Title" }].map(({ name, label }) => (
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

				{[
					{ name: "metaDescription", label: "Meta Description" },
					{ name: "metaKeywords", label: "Meta Keywords" },
				].map(({ name, label }) => (
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
				))}

				<div className="flex flex-col gap-2">
					<label className="font-medium text-sm text-gray-700">
						Robots Meta <span className="text-red-500">*</span>
					</label>
					<div className="flex flex-col sm:flex-row gap-3">
						{["index", "noindex"].map((option) => (
							<label
								key={option}
								className="flex items-center gap-3 p-3 border border-gray-300 rounded cursor-pointer">
								<input
									type="radio"
									name="robotMeta"
									value={option}
									checked={formData.robotMeta === option}
									onChange={handleChange}
									className="w-4 h-4 text-red-600 accent-[#0d9488]"
									required
								/>
								<span className="capitalize text-sm">
									{option === "noindex" ? "No Index" : option}
								</span>
							</label>
						))}
					</div>
				</div>

				<SchemaEditor
					schemaItems={schemaItems}
					setSchemaItems={setSchemaItems}
				/>

				<div className="flex flex-col gap-1">
					<label className="font-medium text-sm text-gray-700">
						Slug <span className="text-red-500">*</span>
					</label>
					<input
						name="slug"
						className={`border outline-none focus:border-gray-400 rounded p-3 ${
							isSlugUsed ? "border-red-400" : "border-gray-200"
						}`}
						placeholder="Slug"
						value={formData.slug}
						onChange={handleChange}
						required
					/>
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

				<div className="flex flex-col gap-1">
					<label className="font-medium text-sm text-gray-700">
						Description <span className="text-red-500">*</span>
					</label>
					<TextEditor value={editorContent} onChange={setEditorContent} />
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

const PreviewBlock = ({ file, onRemove, existing = false }) => {
	const src = existing ? file : URL.createObjectURL(file);
	return (
		<div className="relative w-full h-48">
			<Image
				src={src}
				width={100}
				height={100}
				className="w-full h-full object-contain rounded border"
				alt="Preview"
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
};

const UploadBlock = ({ label, onChange, accept }) => (
	<label className="cursor-pointer active:bg-gray-100 border border-dashed border-gray-300 rounded-lg w-full h-48 flex items-center justify-center">
		<div>
			<p className="text-center text-gray-600 text-xl">+</p>
			<p className="text-xs text-gray-600 text-center">Upload {label}</p>
		</div>
		<input type="file" accept={accept} className="hidden" onChange={onChange} />
	</label>
);
