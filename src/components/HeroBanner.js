"use client";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CallNowButton_copy from "./CallNowButton_copy";
import axios from "axios";
import { BiRightArrowAlt } from "react-icons/bi";
import Link from "next/link";
import Loading from "./Loading";

export default function HeroBanner() {
	const [current, setCurrent] = useState(0);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		try {
			const res = await axios.get(`${process.env.BASE_URL}/hero-slider`);
			setData(res.data);
		} catch (err) {
			setError(err.message || "Failed to fetch Data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const nextSlide = () => setCurrent((prev) => (prev + 1) % data.length);
	const prevSlide = () =>
		setCurrent((prev) => (prev - 1 + data.length) % data.length);

	useEffect(() => {
		if (data.length === 0) return;

		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % data.length);
		}, 10000);

		return () => clearInterval(interval);
	}, [data.length]);

	if (loading) return <Loading />;


	return (
		<div className="relative h-screen max-h-[800px] overflow-hidden text-white">
			{data.map((slide, index) => (
				<div
					key={index}
					className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
						index === current ? "opacity-100 z-10" : "opacity-0 z-0"
					}`}>
					<div
						className="h-full w-full bg-cover bg-center flex items-center justify-center"
						style={{
							backgroundImage: `url(${slide.imgUrl})`,
						}}>
						<div className="absolute inset-0 bg-black/30 z-20"></div>
						<div className="container mx-auto relative z-30 flex flex-col items-center justify-center h-full text-center px-4">
							<h1 className="text-xl leading-[1.5rem] md:text-6xl font-bold mb-3 md:mb-4 tracking-wide italic">
								{slide.title}
							</h1>
							<p className="line-clamp-2 md:line-clamp-10 text-lg mb-3  md:mb-6 md:text-xl max-w-3xl bg-opacity-85">
								{slide.description}
							</p>
							<div className="flex items-center gap-5">
								<CallNowButton_copy number={slide.number} />
								{slide?.link && (
									<Link href={slide.link}>
										<button className="hidden md:flex bg-[#0d9488] font-medium text-white py-3 px-4 rounded  items-center justify-center gap-0 hover:gap-1 transition-all duration-300 ease-in-out">
											Read More{" "}
											<BiRightArrowAlt className="size-[21px] rotate-45" />
										</button>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			))}

			<button
				onClick={prevSlide}
				className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-gray-800 p-2 rounded shadow z-20 transition-colors duration-300">
				<FaArrowLeft />
			</button>
			<button
				onClick={nextSlide}
				className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-gray-800 p-2 rounded shadow z-20 transition-colors duration-300">
				<FaArrowRight />
			</button>
		</div>
	);
}
