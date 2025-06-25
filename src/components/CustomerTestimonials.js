"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { getSocket } from "../../lib/socket";

const CustomerTestimonials = () => {
	const prevRef = useRef(null);
	const nextRef = useRef(null);

	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [secData, setSecData] = useState([]);

	const socket = getSocket();

	const fetchData = async () => {
		try {
			const [secResponse, feedbackResponse] = await Promise.all([
				axios.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/section-heading/feedback`,
				),
				axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/feedback`),
			]);

			setSecData(secResponse.data);
			setReviews(feedbackResponse.data);
		} catch (err) {
			setError(err.message || "Failed to fetch data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
        if (!socket.connected) socket.connect();
		socket.on("feedback-updated", fetchData);
		socket.on("feedback-posted", fetchData);
		socket.on("feedback-deleted", fetchData);
		socket.on("sectionheading-updated", fetchData);

		return () => {
			socket.off("feedback-updated", fetchData);
			socket.off("feedback-posted", fetchData);
			socket.off("feedback-deleted", fetchData);
			socket.off("sectionheading-updated", fetchData);
		};
	}, []);

	if (loading) {
		return (
			<section className="py-14 bg-white overflow-x-hidden border-t border-gray-200">
				<div className="container mx-auto text-center">
					<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
						<span className="relative">Our Customers Speak</span>
					</h2>
					<div className="animate-pulse bg-white rounded border border-gray-200 p-6 md:p-8">
						<div className="h-4 w-1/2 bg-gray-300 rounded mb-8"></div>
						<div className="space-y-2">
							{[...Array(6)].map((_, i) => (
								<div key={i} className="h-3 bg-gray-300 rounded w-11/12"></div>
							))}
						</div>
					</div>
					<div className="flex items-center justify-center gap-3 mt-4">
						<div className="w-10 h-10 rounded bg-gray-200 animate-pulse" />
						<div className="w-10 h-10 rounded bg-gray-200 animate-pulse" />
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-14 bg-white overflow-x-hidden border-t border-gray-200">
			<div className="container mx-auto text-center">
				<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
					<span className="relative">{secData?.title}</span>
				</h2>

				<div className="relative">
					<Swiper
						modules={[Navigation, Autoplay]}
						loop={true}
						autoHeight={true}
						autoplay={{ delay: 10000, disableOnInteraction: false }}
						navigation={{
							prevEl: prevRef.current,
							nextEl: nextRef.current,
						}}
						onBeforeInit={(swiper) => {
							swiper.params.navigation.prevEl = prevRef.current;
							swiper.params.navigation.nextEl = nextRef.current;
						}}
						breakpoints={{
							0: { slidesPerView: 1 },
							768: { slidesPerView: 1 },
						}}
						className="!pb-0">
						{reviews.map((review, index) => (
							<SwiperSlide
								key={index}
								className="transition-opacity duration-300">
								<div className="bg-white rounded border border-gray-200 p-6 md:p-8">
									<h3 className="relative pl-6 text-xl text-start font-semibold text-gray-800">
										<span className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-teal-600 shadow-md" />
										{review.title}
									</h3>
									<p
										className="text-start text-gray-700 leading-relaxed bg-gray-100 rounded-lg p-4 mt-3 relative"
										dangerouslySetInnerHTML={{ __html: review.description }}
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					<div className="flex items-center justify-center gap-3 mt-4">
						<button
							ref={prevRef}
							className="w-10 h-10 bg-black text-white grid place-items-center rounded">
							<FaArrowLeft />
						</button>
						<button
							ref={nextRef}
							className="w-10 h-10 bg-black text-white grid place-items-center rounded">
							<FaArrowRight />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CustomerTestimonials;
