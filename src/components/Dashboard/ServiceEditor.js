"use client";
import { FaPlus, FaMinus } from "react-icons/fa6";

export default function ServiceEditor({ serviceItems, setServiceItems }) {
	const handleAddItem = () => {
		if (serviceItems.length >= 6) return;
		setServiceItems([...serviceItems, { title: "", link: "" }]);
	};

	const handleRemoveItem = (index) => {
		const updatedItems = [...serviceItems];
		updatedItems.splice(index, 1);
		setServiceItems(updatedItems);
	};

	const handleItemChange = (index, field, value) => {
		const updatedItems = [...serviceItems];
		updatedItems[index][field] = value;
		setServiceItems(updatedItems);
	};

	return (
		<div className="flex flex-col gap-4">
			{serviceItems.map((item, index) => (
				<div
					key={index}
					className="border p-4 rounded flex flex-col gap-3 bg-white">
					<div className="flex items-center justify-between mb-2">
						<h2 className="font-medium flex items-center gap-3 text-md">
							<button className="bg-[#0d9488] h-[32px] w-[60px] rounded grid place-items-center text-white">
								{String(index + 1).padStart(2, "0")}
							</button>
							Footer Service
						</h2>
						<div>
							{index === serviceItems.length - 1 && serviceItems.length < 6 ? (
								<button
									type="button"
									onClick={handleAddItem}
									className="bg-[#0d9488] h-[32px] w-[32px] rounded grid place-items-center text-white">
									<FaPlus />
								</button>
							) : (
								index !== serviceItems.length - 1 && (
									<button
										type="button"
										onClick={() => handleRemoveItem(index)}
										className="bg-[#e7405c] h-[32px] w-[32px] rounded grid place-items-center text-white">
										<FaMinus />
									</button>
								)
							)}
						</div>
					</div>

					<div className="flex flex-col gap-1">
						<label className="font-medium text-sm text-gray-700">
							Title <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							name={`title_${index}`}
							placeholder="Title"
							value={item.title}
							onChange={(e) => handleItemChange(index, "title", e.target.value)}
							className="border border-gray-200 outline-none focus:border-gray-400 rounded p-2"
							required
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="font-medium text-sm text-gray-700">
							Link <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							name={`link_${index}`}
							placeholder="Link"
							value={item.link}
							onChange={(e) => handleItemChange(index, "link", e.target.value)}
							className="border border-gray-200 outline-none focus:border-gray-400 rounded p-2"
							required
						/>
					</div>
				</div>
			))}
		</div>
	);
}
