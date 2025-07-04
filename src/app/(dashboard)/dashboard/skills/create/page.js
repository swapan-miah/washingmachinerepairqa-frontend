"use client";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { uploadToCloudinary } from "../../../../../../utils/uploadToCloudinary";
import toast from "react-hot-toast";
import TextEditor from "@/components/Dashboard/TextEditor";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function page() {
	const router = useRouter();
	const [image, setImage] = useState(null);
	const [svgFile, setSvgFile] = useState(null);
	const [editorContent, setEditorContent] = useState("");
	const [loading, setLoading] = useState(false);
	const [isSlugUsed, setIsSlugUsed] = useState(false);
	const [formData, setFormData] = useState({
		metaTitle: "",
		metaDescription: "",
		metaKeywords: "",
		robotMeta: "",
		schema: "",
		title: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSvgChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type === "image/svg+xml") {
			setSvgFile(file);
		} else {
			toast.error("Please upload a valid SVG file.");
		}
	};

	const handleRemoveSvg = () => setSvgFile(null);
	const handleImageChange = (e) => setImage(e.target.files[0]);
	const handleRemoveImage = () => setImage(null);

	const generateSlug = (title) => {
		return title
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, "")
			.replace(/\s+/g, "-");
	};

	const checkIfSlugExists = async (slug) => {
		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/services-skills`,
			);
			const services = res.data;
			return services.some((service) => service.slug === slug);
		} catch (err) {
			console.error("Slug check failed:", err);
			return false;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		let cleanSchema = formData.schema.trim();
		if (cleanSchema.startsWith("<script")) {
			const matched = cleanSchema.match(/<script[^>]*>([\s\S]*?)<\/script>/);
			if (matched && matched[1]) {
				cleanSchema = matched[1].trim();
			}
		}

		try {
			JSON.parse(cleanSchema);
		} catch (err) {
			toast.error("Invalid JSON in Schema field.");
			setLoading(false);
			return;
		}

		const { metaTitle, metaDescription, metaKeywords, robotMeta, title } =
			formData;
		const slug = generateSlug(title);
		const slugExists = await checkIfSlugExists(slug);
		if (slugExists) {
			toast.error("Oops! Title is taken.");
			setIsSlugUsed(true);
			setLoading(false);
			return;
		} else {
			setIsSlugUsed(false);
		}

		const description = editorContent;

		let uploadedImageUrl = "";
		let uploadedSvgUrl = "";

		if (image) uploadedImageUrl = await uploadToCloudinary(image);
		if (svgFile) uploadedSvgUrl = await uploadToCloudinary(svgFile);

		try {
			await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/post-services-skills`,
				{
					metaTitle,
					metaDescription,
					metaKeywords,
					robotMeta,
					schema: cleanSchema,
					slug,
					title,
					description,
					svgIcon: uploadedSvgUrl,
					image: uploadedImageUrl,
				},
			);
			setFormData({
				metaTitle: "",
				metaDescription: "",
				metaKeywords: "",
				robotMeta: "",
				schema: "",
				title: "",
			});
			toast.success("Created Successfully!");
			router.push("/dashboard/skills");
		} catch (error) {
			console.error(error);
			toast.error("Error posting Data");
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
					{image ? (
						<PreviewBlock file={image} onRemove={handleRemoveImage} />
					) : (
						<UploadBlock
							label="Photo"
							onChange={handleImageChange}
							accept="image/*"
						/>
					)}
					{svgFile ? (
						<PreviewBlock file={svgFile} onRemove={handleRemoveSvg} />
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

				{[{ name: "schema", label: "Schema" }].map(({ name, label }) => (
					<div key={name} className="flex flex-col gap-1">
						<label className="font-medium text-sm text-gray-700">
							{label} <span className="text-red-500">*</span>
						</label>
						<textarea
							name={name}
							rows="6"
							placeholder={label}
							value={formData[name]}
							onChange={handleChange}
							className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 resize-none"
							required
						/>
					</div>
				))}

				<div className="flex flex-col gap-1">
					<label className="font-medium text-sm text-gray-700">
						Title <span className="text-red-500">*</span>
					</label>
					<input
						name="title"
						value={formData.title}
						onChange={(e) => {
							const value = e.target.value;
							setFormData((prev) => ({ ...prev, title: value }));
							setIsSlugUsed(false);
						}}
						className={`border outline-none rounded p-3 ${
							isSlugUsed
								? "border-red-500 focus:border-red-500"
								: "border-gray-200 focus:border-gray-400"
						}`}
						placeholder="Title"
						required
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label className="font-medium text-sm text-gray-700">
						Description <span className="text-red-500">*</span>
					</label>
					<TextEditor value={editorContent} onChange={setEditorContent} />
				</div>

				<button
					type="submit"
					className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded">
					Create
				</button>
			</form>
		</div>
	);
}

const PreviewBlock = ({ file, onRemove }) => {
	const src = URL.createObjectURL(file);
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
