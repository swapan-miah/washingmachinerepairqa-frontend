"use client";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { uploadToCloudinary } from "../../../../../../utils/uploadToCloudinary";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import TextEditor from "@/components/Dashboard/TextEditor";
import { useRouter } from "next/navigation";
import { FaPlus, FaMinus } from "react-icons/fa6";

export default function page() {
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [editorContent, setEditorContent] = useState("");
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [slug, setSlug] = useState("");
	const [isSlugUsed, setIsSlugUsed] = useState(false);
	const router = useRouter();

	const [formData, setFormData] = useState({
		metaTitle: "",
		metaDescription: "",
		metaKeywords: "",
		robotMeta: "",
	});

	const [schemaItems, setSchemaItems] = useState([
		{ question: "", answer: "" },
	]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
	};

	const generateSlug = (text) => {
		return text
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^\w-]+/g, "");
	};

	const checkIfSlugExists = async (slug) => {
		try {
			const res = await axios.get(`${process.env.BASE_URL}/our-blogs`);
			const blogs = res.data;
			const found = blogs.some((blog) => blog.slug === slug);
			return found;
		} catch (err) {
			console.error("Slug check failed:", err);
			return false;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const generatedSlug = generateSlug(title);
		setSlug(generatedSlug);

		const slugExists = await checkIfSlugExists(generatedSlug);
		if (slugExists) {
			toast.error("Oops! Title is taken.");
			setIsSlugUsed(true);
			setLoading(false);
			return;
		} else {
			setIsSlugUsed(false);
		}

		let uploadedImageUrl = "";
		if (image) {
			uploadedImageUrl = await uploadToCloudinary(image);
		}
        const schema = schemaItems;
		const currentDate = new Date().toISOString();
		const { metaTitle, metaDescription, metaKeywords, robotMeta } = formData;

		try {
			await axios.post(`${process.env.BASE_URL}/post-blogs`, {
				metaTitle,
				metaDescription,
				metaKeywords,
				robotMeta,
				schema,
				slug: generatedSlug,
				title,
				category,
				description: editorContent,
				image: uploadedImageUrl,
				date: currentDate,
			});
			 setTitle("");
      setCategory("");
      setEditorContent("");
      setImage(null);
      setSlug("");
      setFormData({
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        robotMeta: "",
      });
      setSchemaItems([{ question: "", answer: "" }]);
			toast.success("Submitted Successfully!");
			router.push("/dashboard/blogs");
		} catch (err) {
			console.error(err);
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

				<div className="flex flex-col gap-4">
					{schemaItems.map((item, index) => (
						<div
							key={index}
							className="border p-4 rounded flex flex-col gap-3 bg-white">
							<div className="flex items-center justify-between mb-2">
								<h2 className="font-medium flex items-center gap-3 text-md">
									<button className="bg-[#0d9488] h-[32px] w-[60px] rounded grid place-items-center text-white">
										{String(index + 1).padStart(2, "0")}
									</button>
									Schema
								</h2>
								<div>
									{index === schemaItems.length - 1 ? (
										<button
											type="button"
											onClick={() =>
												setSchemaItems([
													...schemaItems,
													{ question: "", answer: "" },
												])
											}
											className="bg-[#0d9488] h-[32px] w-[32px] rounded grid place-items-center text-white">
											<FaPlus />
										</button>
									) : (
										<button
											type="button"
											onClick={() => {
												const updatedItems = [...schemaItems];
												updatedItems.splice(index, 1);
												setSchemaItems(updatedItems);
											}}
											className="bg-[#e7405c] h-[32px] w-[32px] rounded grid place-items-center text-white">
											<FaMinus />
										</button>
									)}
								</div>
							</div>

							<div className="flex flex-col gap-1">
								<label className="font-medium text-sm text-gray-700">
									Question <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									placeholder="Question"
									value={item.question}
									onChange={(e) => {
										const updatedItems = [...schemaItems];
										updatedItems[index].question = e.target.value;
										setSchemaItems(updatedItems);
									}}
									className="border border-gray-200 outline-none focus:border-gray-400 rounded p-2"
									required
								/>
							</div>

							<div className="flex flex-col gap-1 mt-3">
								<label className="font-medium text-sm text-gray-700">
									Answer <span className="text-red-500">*</span>
								</label>
								<textarea
									rows="4"
									placeholder="Answer"
									value={item.answer}
									onChange={(e) => {
										const updatedItems = [...schemaItems];
										updatedItems[index].answer = e.target.value;
										setSchemaItems(updatedItems);
									}}
									className="resize-none border border-gray-200 outline-none focus:border-gray-400 rounded p-2"
									required
								/>
							</div>
						</div>
					))}
				</div>

				<div className="flex flex-col gap-1">
					<label className="font-medium text-sm text-gray-700">
						Title <span className="text-red-500">*</span>
					</label>
					<input
						name="title"
						value={title}
						onChange={(e) => {
							const value = e.target.value;
							setTitle(value);
							setSlug(generateSlug(value));
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
						Category <span className="text-red-500">*</span>
					</label>
					<input
						name="category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
						placeholder="Category"
						required
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label className="font-medium text-sm text-gray-700">
						Description <span className="text-red-500">*</span>
					</label>
					<TextEditor
						value={editorContent}
						onChange={(value) => setEditorContent(value)}
					/>
				</div>

				<button
					type="submit"
					className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded disabled:opacity-50">
					Create
				</button>
			</form>
		</div>
	);
}
