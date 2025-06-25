"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";

export default function Page() {
	const [loading, setLoading] = useState(false);
	const [selectedType, setSelectedType] = useState("");
	const [formData, setFormData] = useState({ title: "", description: "" });
	const router = useRouter();

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!selectedType) {
			toast.error("select a section type");
			return;
		}

		if (!formData.title.trim()) {
			toast.error("Title is required");
			return;
		}

		setLoading(true);

		try {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/section-heading`,
			);

			const sectionData = data.filter((item) => item.name === selectedType);

			if (sectionData.length > 0) {
				toast.error("Already exist.");
				setLoading(false);
				return;
			}

			await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/create-heading`, {
				name: selectedType,
				title: formData.title.trim(),
				description: formData.description.trim(),
			});

			toast.success("Created Successfully!");
			setFormData({ title: "", description: "" });
			setSelectedType("");
			router.push("/dashboard/settings/heading-description");
		} catch (err) {
			toast.error("Something went wrong");
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
				<div className="flex flex-col gap-1">
					<label className="font-medium text-sm text-gray-700">
						Select Your Section <span className="text-red-500">*</span>
					</label>
					<div className="relative">
						<select
							value={selectedType}
							onChange={(e) => setSelectedType(e.target.value)}
							className="appearance-none border border-gray-200 outline-none focus:border-gray-400 rounded p-3 w-full pr-10 cursor-pointer"
							required>
							<option value="" disabled>
								Select Section
							</option>
							<option value="services-skills">Services Skills</option>
							<option value="best-service">Best Service</option>
							<option value="feedback">Feedback</option>
							<option value="expert-solutions">Expert Solutions</option>
							<option value="why-choose-us">Why Choose Us</option>
							<option value="blogs">Blogs</option>
							<option value="faq">FAQ</option>
							<option value="contact">Contact</option>
						</select>
						<FiChevronDown
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
							size={20}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-1">
					<label className="font-medium text-sm text-gray-700">
						Title <span className="text-red-500">*</span>
					</label>
					<input
						name="title"
						placeholder="Title"
						value={formData.title}
						onChange={handleInputChange}
						className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
						required
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label className="font-medium text-sm text-gray-700">
						Description <span className="text-red-500">*</span>
					</label>
					<textarea
						name="description"
						placeholder="Description"
						rows="6"
						value={formData.description}
						onChange={handleInputChange}
						className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 resize-none"
					/>
				</div>

				<button
					type="submit"
					className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded">
					Submit
				</button>
			</form>
		</div>
	);
}
