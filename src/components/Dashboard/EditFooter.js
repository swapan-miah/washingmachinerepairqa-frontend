"use client";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-hot-toast";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";
import Loading from "../Loading";
import ServiceEditor from "./ServiceEditor";

export default function EditFooter({ data }) {
	const router = useRouter();
	const [image, setImage] = useState(null);
	const [imageRemoved, setImageRemoved] = useState(false);
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		description: data.description || "",
		address: data.address || "",
		email: data.email || "",
		workingHour: data.workingHour || "",
		facebook: data.facebook || "",
		twitter: data.twitter || "",
		instagram: data.instagram || "",
		youtube: data.youtube || "",
		whatsapp: data.whatsapp || "",
		phone: data.phone || "",
		imgUrl: data.imgUrl || "",
	});

	const [serviceItems, setServiceItems] = useState(
		Array.isArray(data?.services) ? data.services : [],
	);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
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
		let uploadedImageUrl = formData.imgUrl;

		if (image) {
			uploadedImageUrl = await uploadToCloudinary(image);
		} else if (imageRemoved) {
			uploadedImageUrl = "";
		}
		const services = serviceItems;
		const payload = {
			...formData,
			imgUrl: uploadedImageUrl,
			services,
		};

		try {
			await axios.put(
				`${process.env.BASE_URL}/footer-content/edit/${data._id}`,
				payload,
			);
			router.push("/dashboard/footer");
			toast.success("Updated Successfully!");
		} catch (err) {
			toast.error("Failed to Update");
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <Loading />;

	return (
		<div className="p-5">
			<form
				onSubmit={handleSubmit}
				className="p-5 bg-white flex flex-col gap-6 border border-gray-200 rounded">
				<div className="grid grid-cols-2 gap-2">
					{imageRemoved ? (
						<ImageUpload handleImageChange={handleImageChange} />
					) : image ? (
						<ImagePreview
							image={URL.createObjectURL(image)}
							handleRemoveImage={handleRemoveImage}
						/>
					) : formData.imgUrl ? (
						<ImagePreview
							image={formData.imgUrl}
							handleRemoveImage={handleRemoveImage}
						/>
					) : (
						<ImageUpload handleImageChange={handleImageChange} />
					)}
				</div>

				<LabeledTextarea
					name="description"
					value={formData.description}
					handleChange={handleChange}
					label="Description"
				/>
				<LabeledInput
					name="facebook"
					value={formData.facebook}
					handleChange={handleChange}
					label="Facebook Link"
				/>
				<LabeledInput
					name="twitter"
					value={formData.twitter}
					handleChange={handleChange}
					label="Twitter Link"
				/>
				<LabeledInput
					name="instagram"
					value={formData.instagram}
					handleChange={handleChange}
					label="Instagram Link"
				/>
				<LabeledInput
					name="youtube"
					value={formData.youtube}
					handleChange={handleChange}
					label="YouTube Link"
				/>
				<LabeledInput
					name="whatsapp"
					value={formData.whatsapp}
					handleChange={handleChange}
					label="WhatsApp Number"
				/>
				<LabeledInput
					name="phone"
					value={formData?.phone}
					handleChange={handleChange}
					label="Phone Number"
				/>
				<LabeledInput
					name="address"
					value={formData.address}
					handleChange={handleChange}
					label="Address"
				/>
				<LabeledInput
					name="email"
					value={formData.email}
					handleChange={handleChange}
					label="Email"
				/>
				<LabeledInput
					name="workingHour"
					value={formData.workingHour}
					handleChange={handleChange}
					label="Working Hour"
				/>

				<div className="flex flex-col gap-3">
					<label className="font-medium text-sm text-gray-700">
						Services <span className="text-red-500">*</span>
					</label>
					<ServiceEditor
						serviceItems={serviceItems}
						setServiceItems={setServiceItems}
					/>
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

const ImageUpload = ({ handleImageChange }) => (
	<label className="cursor-pointer active:bg-gray-100 border border-dashed border-gray-300 rounded-lg w-full h-48 flex items-center justify-center">
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
);

const ImagePreview = ({ image, handleRemoveImage }) => (
	<div className="relative w-full h-48">
		<Image
			src={image}
			width={100}
			height={100}
			className="w-full h-full object-contain rounded border"
			alt="Preview"
		/>
		<button
			type="button"
			onClick={handleRemoveImage}
			className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100"
			title="Remove">
			<MdClose size={16} className="text-red-500" />
		</button>
	</div>
);

const LabeledInput = ({ name, value, handleChange, label }) => (
	<div className="flex flex-col gap-1">
		<label className="font-medium text-sm text-gray-700">
			{label} <span className="text-red-500">*</span>
		</label>
		<input
			name={name}
			value={value}
			onChange={handleChange}
			placeholder={label}
			className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
		/>
	</div>
);

const LabeledTextarea = ({ name, value, handleChange, label }) => (
	<div className="flex flex-col gap-1">
		<label className="font-medium text-sm text-gray-700">
			{label} <span className="text-red-500">*</span>
		</label>
		<textarea
			name={name}
			rows="6"
			value={value}
			onChange={handleChange}
			placeholder={label}
			className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 resize-none"
		/>
	</div>
);
