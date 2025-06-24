"use client";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io(process.env.BASE_URL, { autoConnect: true });

const SkeletonLoader = () => (
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

export default function Accordion() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [openIndex, setOpenIndex] = useState(null);
	const [secData, setSecData] = useState({});
	const [error, setError] = useState(null);

	const fetchData = useCallback(async () => {
		try {
			const [secResponse, accordionResponse] = await Promise.all([
				axios.get(`${process.env.BASE_URL}/section-heading/faq`),
				axios.get(`${process.env.BASE_URL}/accordion`),
			]);
			setSecData(secResponse.data);
			setData(accordionResponse.data);
			setOpenIndex(accordionResponse.data.length - 1);
		} catch (err) {
			setError(err.message || "Failed to fetch data");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();

		socket.on("accordion-updated", fetchData);
		socket.on("accordion-posted", fetchData);
		socket.on("accordion-deleted", fetchData);
		socket.on("sectionheading-updated", fetchData);

		return () => {
			socket.off("accordion-updated", fetchData);
			socket.off("accordion-posted", fetchData);
			socket.off("accordion-deleted", fetchData);
			socket.off("sectionheading-updated", fetchData);
		};
	}, [fetchData]);

	const toggleFAQ = useCallback((index) => {
		setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
	}, []);

	if (loading) return <SkeletonLoader />;

	return (
		<section className="py-10 relative overflow-x-hidden bg-white border-t border-gray-200">
			<div className="max-w-7xl mx-auto text-center">
				<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
					<span className="relative">
						{secData?.title || "Frequently Asked Questions"}
					</span>
				</h2>
			</div>

			<div className="container mx-auto divide-y divide-gray-300 border-t border-b">
				{data
					.slice()
					.reverse()
					.map((faq, index) => {
						const actualIndex = data.length - 1 - index;
						const isOpen = openIndex === actualIndex;

						return (
							<div
								key={faq._id || index}
								className="border-r border-l overflow-hidden">
								<button
									className={`w-full font-semibold text-left px-4 py-3 flex justify-between items-center transition-all duration-300 ${
										isOpen
											? "border-b bg-teal-600 text-white"
											: "bg-white text-gray-700"
									}`}
									onClick={() => toggleFAQ(actualIndex)}
									aria-expanded={isOpen}>
									{faq.question}
									<span className="text-xl font-bold">
										{isOpen ? "−" : "+"}
									</span>
								</button>

								<div
									className={`transition-all duration-300 px-4 ${
										isOpen ? "h-auto py-3 opacity-100" : "max-h-0 opacity-0"
									} overflow-hidden`}
									aria-hidden={!isOpen}>
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
