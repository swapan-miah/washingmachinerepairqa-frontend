"use client";
import TextEditor from "@/components/Dashboard/TextEditor";
import Loading from "@/components/Loading";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EditAccordion({ data }) {
	const [question, setQuestion] = useState(data?.question || "");
	const [editorContent, setEditorContent] = useState(data?.answer || "");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (!question.trim() || !editorContent.trim()) {
			toast.error("Please fill in both fields.");
			return;
		}

		const payload = {
			question: question,
			answer: editorContent,
		};

		try {
			setLoading(true);
			await axios.put(
				`${process.env.NEXT_PUBLIC_BASE_URL}/accordion/edit/${data._id}`,
				payload,
			);
			router.push("/dashboard/accordion");
			toast.success("Updated Successfully!");
			setQuestion("");
			setEditorContent("");
		} catch (error) {
			toast.error("Error updating Data");
		} finally {
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
					<label
						htmlFor="question"
						className="font-medium text-sm text-gray-700">
						Question <span className="text-red-500">*</span>
					</label>
					<input
						id="question"
						name="question"
						placeholder="Question"
						className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
						required
						value={question}
						onChange={(e) => setQuestion(e.target.value)}
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="editor" className="font-medium text-sm text-gray-700">
						Answer <span className="text-red-500">*</span>
					</label>
					<TextEditor value={editorContent} onChange={setEditorContent} />
				</div>

				<button
					type="submit"
					className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded transition">
					Update
				</button>
			</form>
		</div>
	);
}
