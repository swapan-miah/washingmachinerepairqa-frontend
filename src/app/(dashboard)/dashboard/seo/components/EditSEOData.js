"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EditSEOData({ pageName, data }) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const form = new FormData(e.target);
		const title = form.get("title");
		const description = form.get("description");
		const keywords = form.get("keywords");
		const robots = form.get("robots");
		const schema = form.get("schema");

		let cleanSchema = schema.trim();
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

		const updateData = {
			name: pageName,
			title,
			description,
			keywords,
			robots,
			schema: cleanSchema,
		};

		try {
			await axios.put(
				`${process.env.NEXT_PUBLIC_BASE_URL}/seo/edit/${pageName}`,
				updateData,
			);
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

				{[{ name: "schema", label: "Schema" }].map(({ name, label }) => (
					<div key={name} className="flex flex-col gap-1">
						<label className="font-medium text-sm text-gray-700">
							{label} <span className="text-red-500">*</span>
						</label>
						<textarea
							name={name}
							rows="6"
							placeholder={label}
							defaultValue={data?.schema || ""}
							className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 resize-none"
							required
						/>
					</div>
				))}

				<button
					type="submit"
					className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded">
					Update
				</button>
			</form>
		</div>
	);
}
