"use client";
import TextEditor from "@/components/Dashboard/TextEditor";
import Loading from "@/components/Loading";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function page() {
	const [title, setTitle] = useState("");
	const [editorContent, setEditorContent] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (!title.trim() || !editorContent.trim()) {
			toast.error("Please fill in both fields.");
			return;
		}

		const payload = {
			title: title,
			description: editorContent,
		};

		try {
			setLoading(true);
			await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/create-feedback`,
				payload,
			);
			toast.success("Submitted Successfully!");
			setTitle("");
			setEditorContent("");
		} catch (error) {
			toast.error("Error posting Data");
		} finally {
			router.push("/dashboard/feedback");
			setLoading(false);
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
				<div className="flex flex-col gap-1">
					<label htmlFor="title" className="font-medium text-sm text-gray-700">
						Title <span className="text-red-500">*</span>
					</label>
					<input
						id="title"
						name="title"
						placeholder="Title"
						className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
						required
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="editor" className="font-medium text-sm text-gray-700">
						Description <span className="text-red-500">*</span>
					</label>
					<TextEditor value={editorContent} onChange={setEditorContent} />
				</div>

				<button
					type="submit"
					className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded transition">
					Submit
				</button>
			</form>
		</div>
	);
}
