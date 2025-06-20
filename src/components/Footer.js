"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { TbClockHour3Filled } from "react-icons/tb";
import {
	FaInstagramSquare,
	FaFacebookSquare,
	FaWhatsappSquare,
	FaYoutubeSquare,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import FooterBottom from "./FooterBottom";
import axios from "axios";

const Footer = ({ data }) => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await axios.get(`${process.env.BASE_URL}/footer-content`);
				setPosts(res.data);
			} catch (err) {
				setError(err.message || "Failed to fetch posts");
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	if (loading) {
		return (
			<footer className="bg-black text-white py-10">
				<div className="container mx-auto px-4 animate-pulse">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{[1, 2, 3].map((_, i) => (
							<div key={i} className="space-y-4">
								<div className="h-6 w-1/2 bg-gray-700 rounded"></div>
								<div className="h-24 w-36 bg-gray-700 rounded"></div>
								<div className="h-4 w-full bg-gray-700 rounded"></div>
								<div className="h-4 w-4/5 bg-gray-700 rounded"></div>
								<div className="flex space-x-4 mt-4">
									{[...Array(4)].map((_, i) => (
										<div key={i} className="h-6 w-6 bg-gray-700 rounded"></div>
									))}
								</div>
							</div>
						))}
					</div>
					<div className="h-6 w-full bg-gray-700 rounded mt-8"></div>
				</div>
			</footer>
		);
	}

	return (
		<>
			{posts.map((sData) => (
				<footer key={sData._id} className="bg-black text-white py-10">
					<div className="container mx-auto px-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							<div className="w-full mb-8 col-span-1 md:col-span-2 lg:col-span-1">
								<h3 className="text-xl font-bold mb-4">
									Washing Machine Repair in Qatar
								</h3>
								{sData?.imgUrl && (
									<Image
										src={sData?.imgUrl}
										alt="Washing Machine Repair Logo"
										width={150}
										height={100}
										className="rounded mb-4"
									/>
								)}

								<p className="text-gray-400 pe-2">{sData.description}</p>
								<div className="flex mt-4 space-x-4">
									{sData?.facebook && (
										<a
											href={`https://${sData.facebook}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-gray-400 hover:text-white">
											<FaFacebookSquare size={30} />
										</a>
									)}

									{sData?.instagram && (
										<a
											href={`https://${sData.instagram}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-gray-400 hover:text-white">
											<FaInstagramSquare size={30} />
										</a>
									)}
									{sData?.twitter && (
										<a
											href={`https://${sData.twitter}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-gray-400 hover:text-white">
											<FaSquareXTwitter size={30} />
										</a>
									)}
									{sData?.whatsapp && (
										<a
											href={`https://wa.me/${sData.whatsapp.replace(
												/\D/g,
												"",
											)}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-gray-400 hover:text-white">
											<FaWhatsappSquare size={30} />
										</a>
									)}
									{sData?.youtube && (
										<a
											href={`https://${sData.youtube}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-gray-400 hover:text-white">
											<FaYoutubeSquare size={30} />
										</a>
									)}
								</div>
							</div>

							<div className="w-full mb-8">
								<h3 className="text-xl font-bold mb-4">Contact Info</h3>

								{sData?.address && (
									<p className="text-gray-400 flex items-center">
										<strong className="me-1">
											<IoLocationSharp className="size-5" />{" "}
										</strong>
										{sData.address}
									</p>
								)}

								{sData?.phone && (
									<p className="text-gray-400 mt-2 flex items-center">
										<strong className="me-1">
											<PiPhoneCallFill className="size-5" />
										</strong>
										{sData.phone}
									</p>
								)}

								{sData?.email && (
									<>
										<p className="text-gray-400 hidden md:flex mt-2 text-nowrap line-clamp-1 items-center">
											<strong className="me-1">
												<MdEmail className="size-5" />{" "}
											</strong>{" "}
											{sData.email}
										</p>
										<p className="text-gray-400 md:hidden mt-2 line-clamp-1 flex items-center">
											<strong className="me-1">
												<MdEmail className="size-5" />{" "}
											</strong>{" "}
											{sData.email}
										</p>
									</>
								)}

								{sData?.workingHour && (
									<p className="text-gray-400 mt-2  flex items-center">
										<strong className="me-1">
											<TbClockHour3Filled className="size-5" />{" "}
										</strong>
										{sData.workingHour}
									</p>
								)}
							</div>

							<div className="w-full">
								<h3 className="text-xl font-bold mb-4">Our Services</h3>
								<ul className="text-gray-400 list-disc list-inside space-y-2">
									{sData.services?.slice().reverse().slice(0, 6).map((service, idx) => (
										<li key={idx}><a href={service.link}>{service.title}</a></li>
									))}
								</ul>
							</div>
						</div>

						<FooterBottom data={data} />
					</div>
				</footer>
			))}
		</>
	);
};

export default Footer;
