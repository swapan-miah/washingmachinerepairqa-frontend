"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Aos from "./Aos";
import axios from "axios";
import { getSocket } from "../../lib/socket";

const OurTeam = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
    const socket = getSocket();
	const fetchData = async () => {
		try {
			const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/about`);
			setData(res.data);
		} catch (error) {
			setError(error.message || "Failed to fetch data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
		if (!socket.connected) socket.connect();
		socket.on("about-updated", fetchData);
		return () => socket.off("about-updated", fetchData);
	}, [fetchData]);

	if (loading) {
		return (
			<section className="py-14 bg-gray-50 overflow-x-hidden">
				<div className="container mx-auto text-center">
					<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
						<span className="relative">Founder & CEO</span>
					</h2>
					<div className="text-center mb-16">
						<div className="h-6 mx-auto w-1/2 bg-gray-300 rounded-md mb-6"></div>
						<div className="h-6 mx-auto w-2/3 bg-gray-300 rounded-md mb-6"></div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div className="h-[400px] w-full bg-gray-300 rounded-2xl mb-4"></div>
						<div className="h-[400px] w-full bg-gray-300 rounded-2xl mb-4"></div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-14 bg-gray-50 overflow-x-hidden">
			<Aos />
			<div data-aos="fade-right" className="container mx-auto">
				<div data-aos="fade-left" className="text-center mb-16">
					<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
						<span className="relative">{data.sectionHeading}</span>
					</h2>
					<p
						data-aos="fade-right"
						className="text-lg sm:text-xl font-semibold text-gray-700">
						{data.sectionSubHeading}
					</p>
					<p
						data-aos="fade-left"
						className="mt-4 text-gray-600 leading-relaxed max-w-4xl mx-auto">
						{data.sectionDescription}
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div
						data-aos="fade-left"
						className="bg-white text-gray-800 p-6 md:p-10 rounded-2xl border border-gray-200">
						<h3 className="text-xl font-semibold mb-4 text-[#0d9488]">
							{data.cardHeadline}
						</h3>
						<p className="leading-relaxed text-gray-700 mb-4">
							{data.cardDescription}
						</p>

						<div data-aos="fade-left" className="mt-6">
							<h4 className="text-xl font-semibold text-gray-800">
								{data.ceoName}
							</h4>
							<p className="font-light text-gray-600 mt-2">{data.role}</p>
							<p className="mt-4 leading-relaxed text-gray-700">
								{data.ceoAbout}
							</p>
						</div>
					</div>

					<div
						data-aos="fade-left"
						className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{data.images.map((imgUrl, index) => (
							<div
								key={index}
								className="relative h-[400px] w-full rounded-2xl overflow-hidden">
								{imgUrl && (
									<Image
										src={imgUrl}
										alt={`Team Image ${index + 1}`}
										layout="fill"
										objectFit="cover"
										data-aos="fade-right"
										className="transition-transform duration-500 hover:scale-110"
									/>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default OurTeam;
