"use client";
import React, { useEffect, useState } from "react";
import { PiPhoneCallFill } from "react-icons/pi";
import axios from "axios";

export default function WashingMachineRepair() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [secData, setSecData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [secResponse, serviceResponse] = await Promise.all([
					axios.get(`${process.env.BASE_URL}/section-heading/best-service`),
					axios.get(`${process.env.BASE_URL}/our-services`),
				]);

				setSecData(secResponse.data);
				setData(serviceResponse.data);
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
			<div className="py-14 bg-gray-50 border-t border-gray-200 animate-pulse">
				<div className="container mx-auto bg-gray-50 text-center">
					<div className="text-center mb-16">
						<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
							<span className="relative">
								Qatar&apos;s Best Washing Machine Service
							</span>
						</h2>
						<p className="text-gray-600 mt-4 leading-relaxed max-w-4xl mx-auto text-sm sm:text-base">
							We provide the best quality service with highly skilled and
							professional technicians. We offer 24/7 service across Qatar to
							solve all issues with your LG and Samsung washing machines.
						</p>
					</div>

					<div className="mb-10 max-w-4xl mx-auto space-y-2">
						<div className="h-4 w-full bg-gray-300 rounded" />
						<div className="mx-auto h-4 w-5/6 bg-gray-300 rounded" />
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						{Array.from({ length: 2 }).map((_, index) => (
							<div
								key={index}
								className="p-6 bg-white border border-gray-200 rounded-lg">
								<div className="h-5 w-[70%] bg-gray-300 rounded mb-4" />
								<div className="mb-10 h-3 bg-gray-300 rounded w-[85%]" />
								<div className="space-y-4">
									<div className="h-3 bg-gray-300 rounded w-[60%]" />
									<div className="h-3 bg-gray-300 rounded w-[64%]" />
									<div className="h-3 bg-gray-300 rounded w-[55%]" />
									<div className="h-3 bg-gray-300 rounded w-[65%]" />
									<div className="h-3 bg-gray-300 rounded w-[55%]" />
									<div className="h-3 bg-gray-300 rounded w-[55%]" />
								</div>
								<div className="mx-auto h-3 bg-gray-300 rounded w-1/2 mt-10" />
							</div>
						))}
					</div>

					<div className="mt-12 text-center space-y-2">
						<div className="h-5 w-48 bg-gray-300 mx-auto rounded" />
						<div className="h-4 w-64 bg-gray-300 mx-auto rounded" />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="py-14 bg-gray-50 border-t border-gray-200">
			<div className="container mx-auto bg-gray-50 text-center">
				<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
					<span className="relative">{secData?.title}</span>
				</h2>

				<p className="text-center mb-8 max-w-4xl mx-auto">
					{secData?.description}
				</p>

				<div className="grid gap-6 md:grid-cols-2">
					{data.map((sData, index) => (
						<div
							key={sData._id}
							className="p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-500">
							{sData.title && (
								<h2
									className={`text-2xl font-semibold mb-2 text-start ${
										index === 1 ? "text-black" : "text-black"
									}`}>
									{sData.title}
								</h2>
							)}

							{sData.description && (
								<p className="text-start">{sData.description}</p>
							)}

							{sData.features && sData.features.length > 0 && (
								<ul className="mt-5 space-y-2 text-start">
									{sData.features.map((feature, fIndex) => (
										<li key={fIndex}>✅ {feature}</li>
									))}
								</ul>
							)}

							{sData.number && (
								<p className="mt-5 font-semibold text-lg flex items-center justify-center gap-2">
									<PiPhoneCallFill className="size-5" />
									<a href={`tel:${sData.number}`}>
										Let&apos;s Talk :{" "}
										<span className="text-green-600 hover:underline">
											{sData.number}
										</span>
									</a>
								</p>
							)}
						</div>
					))}
				</div>

				<div className="mt-8 text-center">
					<p className="text-lg font-semibold">
						Our service is available 24 Hours
					</p>
					<p className="text-gray-600">
						Our expert team is ready to solve your problems quickly!
					</p>
				</div>
			</div>
		</div>
	);
}
