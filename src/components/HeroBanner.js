"use client";
import { useEffect, useState } from "react";
import CallNowButton_copy from "./CallNowButton_copy";
import Loading from "./Loading";
import { BiRightArrowAlt } from "react-icons/bi";
import Link from "next/link";
import axios from "axios";

export default function HeroBanner({ sData }) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [allImages, setAllImages] = useState([]);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const res = await axios.get(`${process.env.BASE_URL}/hero-slider`);
				setData(res.data);
				setAllImages(res.data.images || []);
			} catch (err) {
				console.error("Fetch failed:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, []);

	useEffect(() => {
		if (allImages.length === 0) return;

		const interval = setInterval(() => {
			setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [allImages]);

	if (loading)
		return (
			<div className="pe-5">
				<Loading />
			</div>
		);

	return (
		<section className="relative h-screen max-h-[800px] overflow-hidden text-white">
			<div
				key={currentImageIndex}
				className="absolute inset-0 bg-cover bg-center animate-fade-zoom transition-all duration-1000"
				style={{
					backgroundImage: `url(${allImages[currentImageIndex]})`,
				}}></div>
			<div className="absolute inset-0 bg-black/30 z-20"></div>
			<div className="container mx-auto relative z-30 flex flex-col items-center justify-center h-full text-center px-4">
				<>
					<h1 className="text-xl leading-[1.5rem] md:text-6xl font-bold mb-3 md:mb-4 tracking-wide italic">
						{data?.title}
					</h1>
					<p className="line-clamp-2 md:line-clamp-10 text-lg mb-3  md:mb-6 md:text-xl max-w-3xl bg-opacity-85">
						{data?.description}
					</p>
					<div className="flex items-center gap-5">
						<CallNowButton_copy number={data?.number} />
						{sData?.btn_link && (
							<Link href={sData.btn_link}>
								<button className="hidden md:flex bg-[#0d9488] font-medium text-white py-3 px-4 rounded  items-center justify-center gap-0 hover:gap-1 transition-all duration-300 ease-in-out">
									Read More{" "}
									<BiRightArrowAlt className="size-[21px] rotate-45" />
								</button>
							</Link>
						)}
					</div>
				</>
			</div>

			<style jsx>{`
				@keyframes fadeZoom {
					from {
						opacity: 0;
						transform: scale(1.1);
					}
					to {
						opacity: 1;
						transform: scale(1);
					}
				}
				.animate-fade-zoom {
					animation: fadeZoom 1s ease-in-out;
				}
			`}</style>
		</section>
	);
}
