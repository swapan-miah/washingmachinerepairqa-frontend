"use client";
import { useState } from "react";
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
  const [faviconFile, setFaviconFile] = useState(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [faviconRemoved, setFaviconRemoved] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    gtm_id: data.gtm_id || "",
    number: data.number || "",
    email: data.email || "",
    whats_app: data.whats_app || "",
    copyright_text: data.copyright_text || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleFaviconChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "image/x-icon" || file.name.toLowerCase().endsWith(".ico"))
    ) {
      setFaviconFile(file);
      setFaviconRemoved(false);
    } else {
      toast.error("Please upload a valid .ico file.");
    }
  };

  const handleRemoveFavicon = () => {
    setFaviconFile(null);
    setFaviconRemoved(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let uploadedImageUrl = data.logo;
    let uploadedFaviconUrl = data.favicon;

    try {
      if (image) {
        uploadedImageUrl = await uploadToCloudinary(image);
      } else if (imageRemoved) {
        uploadedImageUrl = "";
      }

      if (faviconFile) {
        uploadedFaviconUrl = await uploadToCloudinary(faviconFile);
      } else if (faviconRemoved) {
        uploadedFaviconUrl = "";
      }

      await axios.put(
        `${process.env.BASE_URL}/settings/edit/${data._id}`,
        {
          gtm_id: formData.gtm_id,
          number: formData.number,
          email: formData.email,
          whats_app: formData.whats_app,
          favicon: uploadedFaviconUrl,
          logo: uploadedImageUrl,
          copyright_text: formData.copyright_text,
        }
      );
      toast.success("Updated Successfully!");
      router.push("/dashboard/settings/general-settings");
    } catch (err) {
      toast.error("Failed to Update!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

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
                    alt="Uploaded Logo"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100"
                    title="Remove"
                  >
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
                    alt="Existing Logo"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100"
                    title="Remove"
                  >
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

              {faviconRemoved ? (
                <label className="cursor-pointer active:bg-gray-100 border border-dashed border-gray-300 rounded-lg w-full h-48 flex items-center justify-center">
                  <div>
                    <p className="block text-center text-gray-600">+</p>
                    <p className="block text-xs text-gray-600">Upload Favicon (.ico Only)</p>
                  </div>
                  <input
                    type="file"
                    accept=".ico"
                    className="hidden"
                    onChange={handleFaviconChange}
                  />
                </label>
              ) : faviconFile ? (
                <div className="relative w-full h-48">
                  <Image
                    src={URL.createObjectURL(faviconFile)}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain border rounded"
                    alt="Uploaded Favicon"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveFavicon}
                    className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100"
                    title="Remove"
                  >
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
                    alt="Existing Favicon"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveFavicon}
                    className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100"
                    title="Remove"
                  >
                    <MdClose size={16} className="text-red-500" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer active:bg-gray-100 border border-dashed border-gray-300 rounded-lg w-full h-48 flex items-center justify-center">
                  <div>
                    <p className="block text-center text-gray-600">+</p>
                    <p className="block text-xs text-gray-600">Upload Favicon (.ico only)</p>
                  </div>
                  <input
                    type="file"
                    accept=".ico"
                    className="hidden"
                    onChange={handleFaviconChange}
                  />
                </label>
              )}
            </div>

            <SimpleInput
              label="GTM_ID"
              name="gtm_id"
              value={formData.gtm_id}
              onChange={handleChange}
            />
          </div>

          <div className="bg-white p-5 rounded border border-gray-200 flex flex-col gap-5">
            <SimpleInput
              label="Phone Number"
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
            <SimpleInput
              label="Whats App"
              name="whats_app"
              value={formData.whats_app}
              onChange={handleChange}
            />
            <SimpleInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <SimpleInput
              label="CopyRight Text"
              name="copyright_text"
              value={formData.copyright_text}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 bg-[#0d9488] py-2 px-5 text-white font-medium rounded w-full"
        >
          Update
        </button>
      </form>
    </div>
  );
}

const SimpleInput = ({ label, name, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={name} className="font-medium text-sm text-gray-700">
      {label}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-200 outline-none focus:border-gray-400 rounded p-2 w-full text-sm"
    />
  </div>
);
