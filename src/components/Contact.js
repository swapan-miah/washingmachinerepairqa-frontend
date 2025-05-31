"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Contact() {
	const [ data, setData ] = useState([]);
	const [loading, setLoading] = useState(true);
	const [openIndex, setOpenIndex] = useState(null);
	const [secData, setSecData] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
		try {
			const [secResponse, accordionResponse] = await Promise.all([
			axios.get(`${process.env.BASE_URL}/section-heading/faq`),
			axios.get(`${process.env.BASE_URL}/accordion`),
			]);

			setSecData(secResponse.data);
			setData(accordionResponse.data);
		} catch (err) {
			setError(err.message || "Failed to fetch data");
		} finally {
			setLoading(false);
		}
		};

		fetchData();
	}, []);

	const toggleFAQ = (index) => {
		setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	if (loading) {
		return (
			<section className="py-10 bg-white border-t border-gray-200">
				<div className="max-w-7xl mx-auto text-center">
					<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
						<span className="relative">Frequently Asked Questions</span>
					</h2>
				</div>

				<div className="container mx-auto divide-y divide-gray-300 border-t border-b">
			{Array.from({ length: 4 }).map((_, i) => (
				<div key={i} className="border-r border-l overflow-hidden">
					<div className="w-full bg-gray-100 px-4 py-3 flex justify-between items-center animate-pulse">
						<div className="h-4 w-3/4 bg-gray-300 rounded" />
						<div className="h-4 w-4 bg-gray-300 rounded-full" />
					</div>

					<div className="px-4 py-3 space-y-2 animate-pulse">
						<div className="h-3 bg-gray-200 rounded w-full"></div>
						<div className="h-3 bg-gray-200 rounded w-11/12"></div>
						<div className="h-3 bg-gray-200 rounded w-10/12"></div>
					</div>
				</div>
			))}
		</div>
			</section>
		);
	}

	return (
		<section className="py-10 relative overflow-x-hidden bg-white border-t border-gray-200">
			<div className="max-w-7xl mx-auto text-center">
				<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
					<span className="relative">{secData?.title}</span>
				</h2>
			</div>

			<div className="container mx-auto divide-y divide-gray-300 border-t border-b">
				{data
					.slice()
					.reverse()
					.map((faq, index) => {
						const actualIndex = data.length - 1 - index;

						return (
							<div key={faq._id || index} className="border-r border-l overflow-hidden">
								<button
									className={`w-full font-semibold text-left px-4 py-3 flex justify-between items-center transition-all duration-300 ${
										openIndex === actualIndex
											? "border-b bg-teal-600 text-white"
											: "bg-white text-gray-700"
									}`}
									onClick={() => toggleFAQ(actualIndex)}>
									{faq.question}
									<span className="text-xl font-bold">
										{openIndex === actualIndex ? "−" : "+"}
									</span>
								</button>

								<div
									className={`transition-all duration-300 px-4 ${
										openIndex === actualIndex
											? "h-auto py-3 opacity-100"
											: "max-h-0 opacity-0"
									} overflow-hidden`}>
									<div
										className="text-gray-600"
										dangerouslySetInnerHTML={{ __html: faq.answer }}
									/>
								</div>
							</div>
						);
					})}
			</div>
		</section>
	);
}
