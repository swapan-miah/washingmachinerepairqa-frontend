"use client";
import { FaPlus, FaMinus } from "react-icons/fa6";

export default function SchemaEditor({ schemaItems, setSchemaItems }) {
	const handleAddItem = () => {
		setSchemaItems([...schemaItems, { question: "", answer: "" }]);
	};

	const handleRemoveItem = (index) => {
		const updatedItems = [...schemaItems];
		updatedItems.splice(index, 1);
		setSchemaItems(updatedItems);
	};

	const handleItemChange = (index, field, value) => {
		const updatedItems = [...schemaItems];
		updatedItems[index][field] = value;
		setSchemaItems(updatedItems);
	};

	return (
		<div className="flex flex-col gap-4">
			{schemaItems.map((item, index) => (
				<div
					key={index}
					className="border p-4 rounded flex flex-col gap-3 bg-white">
					<div className="flex items-center justify-between mb-2">
						<h2 className="font-medium flex items-center gap-3 text-md">
							<button className="bg-[#0d9488] h-[32px] w-[60px] rounded grid place-items-center text-white">
								{String(index + 1).padStart(2, "0")}
							</button>
							Schema
						</h2>
						<div>
							{index === schemaItems.length - 1 ? (
								<button
									type="button"
									onClick={handleAddItem}
									className="bg-[#0d9488] h-[32px] w-[32px] rounded grid place-items-center text-white">
									<FaPlus />
								</button>
							) : (
								<button
									type="button"
									onClick={() => handleRemoveItem(index)}
									className="bg-[#e7405c] h-[32px] w-[32px] rounded grid place-items-center text-white">
									<FaMinus />
								</button>
							)}
						</div>
					</div>

					<div className="flex flex-col gap-1">
						<label className="font-medium text-sm text-gray-700">
							Question <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							name={`question_${index}`}
							placeholder="Question"
							value={item.question}
							onChange={(e) =>
								handleItemChange(index, "question", e.target.value)
							}
							className="border border-gray-200 outline-none focus:border-gray-400 rounded p-2"
							required
						/>
					</div>

					<div className="flex flex-col gap-1 mt-3">
						<label className="font-medium text-sm text-gray-700">
							Answer <span className="text-red-500">*</span>
						</label>
						<textarea
							name={`answer_${index}`}
							rows="4"
							value={item.answer}
							onChange={(e) =>
								handleItemChange(index, "answer", e.target.value)
							}
							className="resize-none border border-gray-200 outline-none focus:border-gray-400 rounded p-2"
							placeholder="Answer"
							required
						/>
					</div>
				</div>
			))}
		</div>
	);
}
