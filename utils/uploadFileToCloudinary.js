import axios from "axios";

export const uploadFileToCloudinary = async (file) => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", "washing-machine");

	try {
		const res = await axios.post(
			`https://api.cloudinary.com/v1_1/dqwhlipm4/raw/upload`,
			formData
		);
		return res.data.secure_url;
	} catch (error) {
		throw new Error("Failed to upload to Cloudinary");
	}
};

