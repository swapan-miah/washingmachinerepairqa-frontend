"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const WhyChooseUs = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [secData, setSecData] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [secResponse, chooseResponse] = await Promise.all([
					axios.get(`${process.env.BASE_URL}/section-heading/why-choose-us`),
					axios.get(`${process.env.BASE_URL}/why-choose`),
				]);

				setSecData(secResponse.data);
				setData(chooseResponse.data);
			} catch (err) {
				setError(err.message || "Failed to fetch data");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<section className="py-14 bg-white border-t border-gray-200 overflow-x-hidden">
				<div className="text-center mb-16 px-5">
					<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
						<span className="relative">Trusted by Thousands</span>
					</h2>
					<p className="text-gray-600 mt-4 leading-relaxed max-w-4xl mx-auto text-sm sm:text-base">
						We pride ourselves on providing the best washing machine repair
						services. From experienced technicians to trusted and prompt work,
						here’s why we’re the right choice for you.
					</p>
				</div>
				<div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
					<div className="w-full h-[380px] bg-gray-300 rounded-lg shadow-lg"></div>
					<div className="space-y-5">
						{Array.from({ length: 4 }).map((_, index) => (
							<div key={index} className="flex items-center gap-6">
								<div className="w-[80px] h-[80px] bg-gray-300 rounded"></div>
								<div className="flex-1 space-y-5">
									<div className="h-4 w-1/2 bg-gray-300 rounded"></div>
									<div className="h-3 w-3/4 bg-gray-300 rounded"></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-14 bg-white border-t border-gray-200 overflow-x-hidden">
			<div data-aos="fade-right" className="text-center mb-16">
				<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
					<span className="relative">{secData?.title}</span>
				</h2>
				<p className="text-gray-600 mt-4 leading-relaxed max-w-4xl mx-auto text-sm sm:text-base">
					{secData?.description}
				</p>
			</div>

			<div
				data-aos="fade-left"
				className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
				<div className="w-full">
					{data?.cover && (
						<Image
							src={data?.cover}
							alt="Why Choose Us"
							width={600}
							height={450}
							className="rounded-lg w-full"
							data-aos="fade-right"
						/>
					)}
				</div>

				<div data-aos="fade-left" className="space-y-5">
					{data?.expertise?.map((exp, index) => (
						<div
							key={index}
							className="flex items-center gap-4"
							data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}>
							<div className="w-[80px] h-[80px] border grid place-items-center rounded">
								{exp?.iconUrl && (
									<Image
										className="w-[30px] h-[30px]"
										src={exp.iconUrl}
										width={100}
										height={100}
										alt="Expertise Icon"
									/>
								)}
							</div>

							<div className="flex-1">
								<h3 className="font-semibold text-lg text-gray-800">
									{exp.expertiseTitle}
								</h3>
								<p className="text-gray-600">{exp.expertiseDescription}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default WhyChooseUs;
