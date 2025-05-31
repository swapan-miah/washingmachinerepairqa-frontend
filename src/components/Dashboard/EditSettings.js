"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";
import { MdClose } from "react-icons/md";
import Loading from "../Loading";

export default function SettingsPage({ data }) {
    const router = useRouter();
	const [image, setImage] = useState(null);
	const [svgFile, setSvgFile] = useState(null);
	const [imageRemoved, setImageRemoved] = useState(false);
	const [svgRemoved, setSvgRemoved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
		gtm_id: data.gtm_id || "",
        btn_link: data.btn_link || "",
        number: data.number || "",
        email: data.email || "",
        facebook_url: data.facebook_url || "",
        copyright_text: data.copyright_text || "",
        instagram_link: data.instagram_link || "",
        twitter_link: data.twitter_link || "",
        whats_app: data.whats_app || "",
        youtube_link: data.youtube_link || "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
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

		const gtm_id = formData.gtm_id;
		const btn_link = formData.btn_link;
		const email = formData.email;
        const number = formData.number;
		const copyright_text = formData.copyright_text;
		const facebook_url = formData.facebook_url;
		const instagram_link = formData.instagram_link;
		const twitter_link = formData.twitter_link;
		const whats_app = formData.whats_app;
		const youtube_link = formData.youtube_link;

        let uploadedImageUrl = data.logo;
		let uploadedSvgUrl = data.favicon;

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

			await axios.put(
				`${process.env.BASE_URL}/settings/edit/${data._id}`,
				{
                    gtm_id,
                    btn_link,
                    number,
                    email,
                    facebook_url,
                    copyright_text,
                    instagram_link,
                    twitter_link,
                    whats_app,
                    youtube_link,
                    favicon: uploadedSvgUrl,
					logo: uploadedImageUrl,
                }
			);
			router.push("/dashboard/settings/general-settings");
			toast.success("Updated Successfully!");
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		} catch (err) {
			setLoading(false);
			toast.error("Failed to Update!");
		}
	};

    
	if (loading) {
		return <Loading />;
	}


	return (
		<div className="p-5">
			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
					<div className="bg-white p-5 rounded border border-gray-200 flex flex-col gap-5">
						<div className="grid grid-cols-2 gap-2">
							{imageRemoved ? (
								<label className="cursor-pointer active:bg-gray-100 border border-dashed border-gray-300 rounded-lg w-full h-48 flex items-center justify-center">
									<div>
										<p className="block text-center text-gray-600">+</p>
										<p className="block text-xs text-gray-600">Upload Logo</p>
									</div>
									<input
										type="file"
										accept="image/*"
										className="hidden"
										onChange={handleImageChange}
									/>
								</label>
							) : image ? (
								<div className="relative w-full h-48">
									<Image
										src={URL.createObjectURL(image)}
										width={100}
										height={100}
										className="w-full h-full object-contain rounded border"
										alt="Uploaded"
									/>
									<button
										type="button"
										onClick={handleRemoveImage}
										className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100"
										title="Remove">
										<MdClose size={16} className="text-red-500" />
									</button>
								</div>
							) : data.logo ? (
								<div className="relative w-full h-48">
									<Image
										src={data.logo}
										width={100}
										height={100}
										className="w-full h-full object-contain rounded border"
										alt="Existing"
									/>
									<button
										type="button"
										onClick={handleRemoveImage}
										className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100"
										title="Remove">
										<MdClose size={16} className="text-red-500" />
									</button>
								</div>
							) : (
								<label className="cursor-pointer active:bg-gray-100 border border-dashed border-gray-300 rounded-lg w-full h-48 flex items-center justify-center">
									<div>
										<p className="block text-center text-gray-600">+</p>
										<p className="block text-xs text-gray-600">Upload Logo</p>
									</div>
									<input
										type="file"
										accept="image/*"
										className="hidden"
										onChange={handleImageChange}
									/>
								</label>
							)}

							{svgRemoved ? (
								<label className="cursor-pointer active:bg-gray-100 border border-dashed border-gray-300 rounded-lg w-full h-48 flex items-center justify-center">
									<div>
										<p className="block text-center text-gray-600">+</p>
										<p className="block text-xs text-gray-600">Upload Favicon</p>
									</div>
									<input
										type="file"
										accept=".svg"
										className="hidden"
										onChange={handleSvgChange}
									/>
								</label>
							) : svgFile ? (
								<div className="relative w-full h-48">
									<Image
										src={URL.createObjectURL(svgFile)}
										width={100}
										height={100}
										className="w-full h-full object-contain border rounded"
										alt="Uploaded"
									/>
									<button
										type="button"
										onClick={handleRemoveSvg}
										className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100"
										title="Remove">
										<MdClose size={16} className="text-red-500" />
									</button>
								</div>
							) : data.favicon ? (
								<div className="relative w-full h-48">
									<Image
										src={data.favicon}
										width={100}
										height={100}
										className="w-full h-full object-contain rounded border"
										alt="Existing"
									/>
									<button
										type="button"
										onClick={handleRemoveSvg}
										className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100"
										title="Remove">
										<MdClose size={16} className="text-red-500" />
									</button>
								</div>
							) : (
								<label className="cursor-pointer active:bg-gray-100 border border-dashed border-gray-300 rounded-lg w-full h-48 flex items-center justify-center">
									<div>
										<p className="block text-center text-gray-600">+</p>
										<p className="block text-xs text-gray-600">Upload Favicon</p>
									</div>
									<input
										type="file"
										accept=".svg"
										className="hidden"
										onChange={handleSvgChange}
									/>
								</label>
							)}
						</div>

						<SimpleInput
							label="GTM_ID"
							name="gtm_id"
							defaultValue={data["gtm_id"]}
						/>
						<SimpleInput
							label="Slider Button Link"
							name="btn_link"
							defaultValue={data["btn_link"]}
						/>
						<SimpleInput
							label="Email"
							name="email"
							defaultValue={data["email"]}
						/>
						<SimpleInput
							label="CopyRight Text"
							name="copyright_text"
							defaultValue={data["copyright_text"]}
						/>
					</div>

					<div className="bg-white p-5 rounded border border-gray-200 flex flex-col gap-5">
						<SimpleInput
							label="Phone Number"
							name="number"
							defaultValue={data["number"]}
						/>
						<SimpleInput
							label="Whats App"
							name="whats_app"
							defaultValue={data["whats_app"]}
						/>
						<SimpleInput
							label="Facebook Link"
							name="facebook_url"
							defaultValue={data["facebook_url"]}
						/>
						<SimpleInput
							label="Twitter Link"
							name="twitter_link"
							defaultValue={data["twitter_link"]}
						/>
						<SimpleInput
							label="Instagram Link"
							name="instagram_link"
							defaultValue={data["instagram_link"]}
						/>
						<SimpleInput
							label="YouTube Link"
							name="youtube_link"
							defaultValue={data["youtube_link"]}
						/>
					</div>
				</div>

				<button
					type="submit"
					className="mt-5 bg-[#0d9488] py-2 px-5 text-white font-medium rounded w-full">
					Update
				</button>
			</form>
		</div>
	);
}

const SimpleInput = ({ label, name, defaultValue }) => (
	<div className="flex flex-col gap-1">
		<label htmlFor={name} className="font-medium text-sm text-gray-700">
			{label}
		</label>
		<input
			name={name}
			defaultValue={defaultValue}
			className="border border-gray-200 outline-none focus:border-gray-400 rounded p-2 w-full text-sm"
		/>
	</div>
);
