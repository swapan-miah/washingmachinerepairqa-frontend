"use client";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-hot-toast";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";
import Loading from "../Loading";
import TextEditor from "../Dashboard/TextEditor";

export default function EditBlog({ data }) {
	const router = useRouter();
	const [image, setImage] = useState(null);
	const [imageRemoved, setImageRemoved] = useState(false);
	const [loading, setLoading] = useState(false);
	const [editorContent, setEditorContent] = useState("");
	const [isSlugUsed, setIsSlugUsed] = useState(false);

	const [formData, setFormData] = useState({
		metaTitle: "",
		metaDescription: "",
		metaKeywords: "",
		robotMeta: "",
		schema: "",
		slug: "",
		title: "",
		category: "",
	});

	useEffect(() => {
		setFormData({
			metaTitle: data?.metaTitle || "",
			metaDescription: data?.metaDescription || "",
			metaKeywords: data?.metaKeywords || "",
			robotMeta: data?.robotMeta || "",
			schema: data?.schema || "",
			slug: data?.slug || "",
			title: data?.title || "",
			category: data?.category || "",
		});
		setEditorContent(data?.description || "");
		setIsSlugUsed(false);
	}, [data]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (e.target.name === "slug") {
			setIsSlugUsed(false);
		}
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

		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/our-blogs`,
			);
			const allBlogs = res.data;

			const slugUsed = allBlogs.some(
				(blog) => blog.slug === formData.slug && blog._id !== data._id,
			);

			if (slugUsed) {
				setIsSlugUsed(true);
				setLoading(false);
				toast.error("Slug already exists.");
				return;
			}

			let uploadedImageUrl = data.image;

			if (image) {
				uploadedImageUrl = await uploadToCloudinary(image);
			} else if (imageRemoved) {
				uploadedImageUrl = "";
			}

			await axios.put(
				`${process.env.NEXT_PUBLIC_BASE_URL}/our-blogs/edit/${data._id}`,
				{
					...formData,
					schema: cleanSchema,
					description: editorContent,
					image: uploadedImageUrl,
				},
			);

			toast.success("Updated Successfully!");
			router.push("/dashboard/blogs");
		} catch (err) {
			console.error(err);
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
				<div className="grid grid-cols-2 gap-2">
					{imageRemoved ? (
						<UploadPlaceholder onChange={handleImageChange} />
					) : image ? (
						<PreviewImage
							image={URL.createObjectURL(image)}
							onRemove={handleRemoveImage}
						/>
					) : data?.image ? (
						<PreviewImage image={data.image} onRemove={handleRemoveImage} />
					) : (
						<UploadPlaceholder onChange={handleImageChange} />
					)}
				</div>

				{[
					{ name: "metaTitle", label: "Meta Title" },
					{ name: "metaDescription", label: "Meta Description" },
					{ name: "metaKeywords", label: "Meta Keywords" },
				].map(({ name, label }) => (
					<div key={name} className="flex flex-col gap-1">
						<label className="font-medium text-sm text-gray-700">
							{label} <span className="text-red-500">*</span>
						</label>
						{name === "metaDescription" || name === "metaKeywords" ? (
							<textarea
								name={name}
								rows="4"
								value={formData[name]}
								onChange={handleChange}
								placeholder={label}
								required
								className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 resize-none"
							/>
						) : (
							<input
								name={name}
								value={formData[name]}
								onChange={handleChange}
								required
								className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
								placeholder={label}
							/>
						)}
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

				{[
					{ name: "slug", label: "Slug" },
					{ name: "title", label: "Title" },
					{ name: "category", label: "Category" },
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
							className={`border outline-none focus:border-gray-400 rounded p-3 ${
								name === "slug" && isSlugUsed
									? "border-red-400"
									: "border-gray-200"
							}`}
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
