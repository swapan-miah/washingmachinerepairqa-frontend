"use client";
import React, { useEffect, useState } from "react";
import Aos from "./Aos";
import Image from "next/image";
import InlineSVG from "./InlineSVG";
import axios from "axios";
import { getSocket } from "../../lib/socket";

const ProfessionalServiceSection = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [secData, setSecData] = useState([]);
	const socket = getSocket();

	const fetchData = async () => {
		try {
			const [secResponse, solutionResponse] = await Promise.all([
				axios.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/section-heading/expert-solutions`,
				),
				axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/our-solutions`),
			]);

			setSecData(secResponse.data);
			setData(solutionResponse.data);
		} catch (err) {
			setError(err.message || "Failed to fetch data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
        if (!socket.connected) socket.connect();
		socket.on("solution-updated", fetchData);
		socket.on("solution-posted", fetchData);
		socket.on("solution-deleted", fetchData);
		socket.on("sectionheading-updated", fetchData);

		return () => {
			socket.off("solution-updated", fetchData);
			socket.off("solution-posted", fetchData);
			socket.off("solution-deleted", fetchData);
			socket.off("sectionheading-updated", fetchData);
		};
	}, []);

	if (loading) {
		return (
			<section className="py-14 bg-gray-50 overflow-x-hidden border-t border-gray-200">
				<div className="text-center mb-16">
					<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
						<span className="relative">Expert Solutions</span>
					</h2>
					<p className="text-gray-600 mt-4 leading-relaxed max-w-4xl mx-auto text-sm sm:text-base">
						Washing machines are essential household appliances that simplify
						our lives by saving time and effort in doing laundry. However, like
						any other mechanical device, they may sometimes encounter problems.
					</p>
				</div>
				<div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{Array.from({ length: 6 }).map((_, index) => (
						<div
							key={index}
							className="animate-pulse text-center bg-white p-6 rounded-lg border border-gray-200">
							<div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full" />
							<div className="h-5 w-3/4 bg-gray-300 rounded mx-auto mb-2" />
							<div className="h-4 w-[90%] bg-gray-300 rounded mx-auto mb-1" />
							<div className="h-4 w-[80%] bg-gray-300 rounded mx-auto" />
						</div>
					))}
				</div>
			</section>
		);
	}

	return (
		<section className="py-14 bg-gray-50 overflow-x-hidden border-t border-gray-200">
			<Aos></Aos>

			<div data-aos="fade-right" className="text-center mb-16">
				<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
					<span className="relative">{secData?.title}</span>
				</h2>
				<p className="text-gray-600 mt-4 leading-relaxed max-w-4xl mx-auto text-sm sm:text-base">
					{secData?.description}
				</p>
			</div>

			<div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{[...data].reverse().map((item, index) => (
					<div
						key={index}
						data-aos={index % 2 == 0 ? "fade-left" : "fade-right"}
						className="text-center bg-white p-6 rounded-lg border border-gray-200 cursor-pointer">
						<div className="text-blue-600 w-full  mx-auto text-center text-5xl sm:text-4xl lg:text-5xl mb-4 flex justify-center">
							<InlineSVG url={item.svgIcon} />
						</div>
						<h3 className="text-xl  block mx-auto font-semibold text-gray-800">
							{item.title}
						</h3>
						<p className="text-sm s block text-gray-600 mx-auto mt-2">
							{item.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default ProfessionalServiceSection;
