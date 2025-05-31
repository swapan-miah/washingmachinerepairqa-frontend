"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	FaTools,
	FaRecycle,
	FaCogs,
	FaBolt,
	FaWrench,
	FaHeartbeat,
} from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { BiRightArrowAlt } from "react-icons/bi";

const WhatWeDo = () => {
	const [data, setData] = useState([]);
	const [secData, setSecData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const getFirstTagText = (htmlString) => {
		if (!htmlString) return "";
		const parser = new DOMParser();
		const doc = parser.parseFromString(htmlString, "text/html");
		const firstElement = doc.body.firstElementChild;
		return firstElement?.textContent?.trim() || "";
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [secResponse, skillsResponse] = await Promise.all([
					axios.get(`${process.env.BASE_URL}/section-heading/services-skills`),
					axios.get(`${process.env.BASE_URL}/services-skills`),
				]);

				setSecData(secResponse.data);
				setData(skillsResponse.data);
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
			<section className="py-14 bg-white relative overflow-x-hidden border-t border-gray-200">
				<div className="container mx-auto text-center">
					<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
						<span className="relative">Services & Skills</span>
					</h2>
					<p className="text-gray-600 text-sm sm:text-base mb-10 max-w-3xl mx-auto">
						Looking for reliable washing machine repair services in Qatar?
						Contact us for expert repairs, quality service, and a seamless
						experience!
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{Array.from({ length: 6 }).map((_, idx) => (
							<div
								key={idx}
								className="animate-pulse flex flex-col items-center border rounded-md">
								<div className="w-full h-[200px] bg-gray-300 rounded-tl-md rounded-tr-md" />

								<div className="px-5 py-6 w-full">
									<div className="flex items-center space-x-3 mb-4">
										<div className="w-[45px] h-[45px] bg-gray-300 rounded" />
										<div className="w-2/3 h-5 bg-gray-300 rounded" />
									</div>

									<div className="space-y-2 mb-4">
										<div className="w-full h-4 bg-gray-300 rounded" />
										<div className="w-full h-4 bg-gray-300 rounded" />
										<div className="w-3/4 h-4 bg-gray-300 rounded" />
									</div>

									<div className="w-full h-10 bg-[#0d9488] rounded" />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-14 bg-white relative overflow-x-hidden border-t border-gray-200">
			<div className="container mx-auto text-center">
				<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
					<span className="relative">{secData?.title}</span>
				</h2>
				<p className="text-gray-600 text-sm sm:text-base mb-10 max-w-3xl mx-auto">
					{secData?.description}
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{[...data].reverse().map((service, index) => (
						<div
							key={index}
							className="relative group flex flex-col items-center text-left border rounded-md hover:border-[#0d9488] cursor-pointer">
							<div className="relative w-full h-[220px] border overflow-hidden rounded-tl-md rounded-tr-md">
								{service?.image && (
									<Image
										src={service.image}
										alt={service.title}
										width={100}
										height={100}
										className="object-cover h-full w-full cursor-pointer transform transition-all duration-500 group-hover:brightness-50"
									/>
								)}
							</div>

							<div className="px-5 py-6">
								<div className="flex items-center justify-center space-x-2">
									<div className="w-[45px] h-[45px] grid place-items-center border rounded">
										{service?.svgIcon && (
											<Image
												className="w-[30px] h-[30px] object-cover rounded"
												width={100}
												height={100}
												src={service.svgIcon}
												alt="Services & Skills"
											/>
										)}
									</div>
									<h3 className="text-xl font-semibold text-gray-800">
										{service.title}
									</h3>
								</div>

								<p className="cursor-text text-gray-600 text-sm sm:text-base mt-2 mb-4 line-clamp-5 break-all">
									{getFirstTagText(service.description)}
								</p>
								<Link href={`/services/${service.slug}`}>
									<button className="w-full bg-[#0d9488] font-medium text-white py-2 px-4 rounded flex items-center justify-center gap-0 hover:gap-1  transition-all duration-300 ease-in-out">
										Read More <BiRightArrowAlt className="size-[21px]" />
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default WhatWeDo;
