"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Loading from "../Loading";
import { FaPlus } from "react-icons/fa6";
import { MdRemove } from "react-icons/md";

export default function EditFooter({ data }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: data?.title || "",
    description: data?.description || "",
    number: data?.number || "",
  });

  const [features, setFeatures] = useState(data?.features?.length > 0 ? data.features : [""]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleRemoveFeature = (index) => {
    const updated = [...features];
    updated.splice(index, 1);
    setFeatures(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${process.env.BASE_URL}/our-service/edit/${data._id}`, {
        title: formData.title,
        description: formData.description,
        number: formData.number,
        features: features.filter(f => f.trim() !== ""),
      });

      router.push("/dashboard/services");
      toast.success("Updated Successfully!");
    } catch (err) {
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-5">
      <form
        onSubmit={handleSubmit}
        className="p-5 bg-white flex flex-col gap-5 border border-gray-200 rounded"
      >

        <div className="flex flex-col gap-1">
					<label htmlFor="title" className="font-medium text-sm text-gray-700">
						Title <span className="text-red-500">*</span>
					</label>
          <SimpleInput
            name="title"
            value={formData.title}
            handleChange={handleInputChange}
            placeholder="Title"
          />
				</div>

        <div className="flex flex-col gap-1">
					<label htmlFor="number" className="font-medium text-sm text-gray-700">
						Number <span className="text-red-500">*</span>
					</label>
          <SimpleInput
            name="number"
            value={formData.number}
            handleChange={handleInputChange}
            placeholder="Number"
          />
				</div>

        <div className="flex flex-col gap-1">
					<label htmlFor="description" className="font-medium text-sm text-gray-700">
						Description <span className="text-red-500">*</span>
					</label>
          <textarea
            name="description"
            rows="6"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 resize-none"
            required
          />
				</div>

        <div className="flex flex-col gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col gap-1">
                <label
                  htmlFor={`feature-${index}`}
                  className="font-medium text-sm text-gray-700">
                  {`Feature ${index + 1}`} <span className="text-red-500">*</span>
                </label>

                <div className="w-full flex items-center gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="flex-1 border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
                required
              />
              {index === features.length - 1 ? (
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="bg-[#0d9488] text-white p-4 rounded"
                >
                  <FaPlus/>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="bg-[#e7405c] text-white p-4 rounded"
                >
                  <MdRemove />
                </button>
              )}
            </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}

const SimpleInput = ({ name, value, handleChange, placeholder }) => (
  <input
    name={name}
    value={value}
    onChange={handleChange}
    placeholder={placeholder}
    className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
    required
  />
);
