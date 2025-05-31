"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function EditSEOData({ pageName, data }) {
	const [loading, setLoading] = useState(false);
	const [schemaItems, setSchemaItems] = useState(
		pageName === "home" && Array.isArray(data?.schema)
			? data.schema
			: []
	);
	const router = useRouter();

	const handleAddItem = () => {
		setSchemaItems([...schemaItems, { question: "", answer: "" }]);
	};

	const handleRemoveItem = (index) => {
		const updatedItems = [...schemaItems];
		updatedItems.splice(index, 1);
		setSchemaItems(updatedItems);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const form = new FormData(e.target);
		const title = form.get("title");
		const description = form.get("description");
		const keywords = form.get("keywords");
		const robots = form.get("robots");

		const schemaData = schemaItems.map((_, index) => ({
			question: form.get(`question_${index}`),
			answer: form.get(`answer_${index}`),
		}));

		const updateData = {
			name: pageName,
			title,
			description,
			keywords,
			robots,
		};

		if (pageName === "home") {
			updateData.schema = schemaData;
		}

		try {
			await axios.put(`${process.env.BASE_URL}/seo/edit/${pageName}`, updateData);
			toast.success("Updated Successfully!");
		} catch (err) {
			toast.error("Failed to update");
		} finally {
			setLoading(false);
			router.push(`/dashboard/seo/${pageName}`);
		}
	};


	if (loading) return <Loading />;

	return (
		<div className="p-5">
			<form
				onSubmit={handleSubmit}
				className="p-5 bg-white flex flex-col gap-5 border border-gray-200 rounded">
				
				<div className="flex flex-col gap-1">
					<label className="font-medium text-sm text-gray-700">
						Meta Title <span className="text-red-500">*</span>
					</label>
					<input
						name="title"
						defaultValue={data?.title || ""}
						placeholder="Title"
						className="border border-gray-200 p-2 rounded outline-none focus:border-gray-400"
						required
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label className="font-medium text-sm text-gray-700">
						Meta Description <span className="text-red-500">*</span>
					</label>
					<textarea
						name="description"
						rows="6"
						placeholder="Description"
						defaultValue={data?.description || ""}
						className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 resize-none"
						required
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label className="font-medium text-sm text-gray-700">
						Meta Keywords <span className="text-red-500">*</span>
					</label>
					<textarea
						name="keywords"
						rows="6"
						placeholder="keywords"
						defaultValue={data?.keywords || ""}
						className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 resize-none"
						required
					/>
				</div>

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
									name="robots"
									value={option}
									defaultChecked={data?.robots === option}
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

				{pageName === "home" && (
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
												onClick={handleAddItem}
												className="bg-[#0d9488] h-[32px] w-[32px] rounded grid place-items-center text-white">
												<FaPlus />
											</button>
										) : (
											<button
												type="button"
												onClick={() => handleRemoveItem(index)}
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
										name={`question_${index}`}
										placeholder="Question"
										defaultValue={item.question}
										className="border border-gray-200 outline-none focus:border-gray-400 rounded p-2"
										required
									/>
								</div>

								<div className="flex flex-col gap-1 mt-3">
									<label className="font-medium text-sm text-gray-700">
										Answer <span className="text-red-500">*</span>
									</label>
									<textarea
										name={`answer_${index}`}
										rows="4"
										className="resize-none border border-gray-200 outline-none focus:border-gray-400 rounded p-2"
										placeholder="Answer"
										defaultValue={item.answer}
										required
									/>
								</div>
							</div>
						))}
					</div>
				)}

				<button
					type="submit"
					className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded">
					Update
				</button>
			</form>
		</div>
	);
}
