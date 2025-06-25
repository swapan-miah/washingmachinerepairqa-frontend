"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import axios from "axios";
import {
	FaInstagramSquare,
	FaFacebookSquare,
	FaWhatsappSquare,
	FaYoutubeSquare,
	TbClockHour3Filled,
	MdEmail,
	PiPhoneCallFill,
	IoLocationSharp,
	FaSquareXTwitter,
} from "./Icons/Icons";
import { getSocket } from "../../lib/socket";

const FooterBottom = dynamic(() => import("./FooterBottom"), { ssr: false });

const Footer = ({ data }) => {
	const [footerData, setFooterData] = useState([]);
	const [loading, setLoading] = useState(true);

	const socket = getSocket();

	const fetchData = useCallback(async () => {
		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/footer-content`,
			);
			setFooterData(res.data);
		} catch (err) {
			// console.error("Footer fetch failed:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
		if (!socket.connected) socket.connect();
		socket.on("footer-updated", fetchData);
		return () => socket.off("footer-updated", fetchData);
	}, [fetchData]);

	if (loading) {
		return (
			<footer className="bg-black text-white py-10 animate-pulse">
				<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className="space-y-4">
							<div className="h-6 w-1/2 bg-gray-700 rounded" />
							<div className="h-24 w-36 bg-gray-700 rounded" />
							<div className="h-4 w-full bg-gray-700 rounded" />
							<div className="h-4 w-4/5 bg-gray-700 rounded" />
							<div className="flex space-x-4 mt-4">
								{Array.from({ length: 4 }).map((_, j) => (
									<div key={j} className="h-6 w-6 bg-gray-700 rounded" />
								))}
							</div>
						</div>
					))}
				</div>
			</footer>
		);
	}

	return (
		<>
			{footerData.map((sData) => (
				<footer key={sData._id} className="bg-black text-white py-10">
					<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<div className="mb-8">
							<h3 className="text-xl font-bold mb-4">
								Washing Machine Repair in Qatar
							</h3>
							{sData?.imgUrl && (
								<Image
									src={sData.imgUrl}
									alt="Washing Machine Repair Logo"
									width={150}
									height={100}
									className="rounded mb-4"
								/>
							)}
							<p className="text-gray-400">{sData.description}</p>
							<div className="flex mt-4 space-x-4">
								{sData.facebook && (
									<a
										href={`https://${sData.facebook}`}
										target="_blank"
										rel="noopener noreferrer">
										<FaFacebookSquare
											size={28}
											className="text-gray-400 hover:text-white"
										/>
									</a>
								)}
								{sData.instagram && (
									<a
										href={`https://${sData.instagram}`}
										target="_blank"
										rel="noopener noreferrer">
										<FaInstagramSquare
											size={28}
											className="text-gray-400 hover:text-white"
										/>
									</a>
								)}
								{sData.twitter && (
									<a
										href={`https://${sData.twitter}`}
										target="_blank"
										rel="noopener noreferrer">
										<FaSquareXTwitter
											size={28}
											className="text-gray-400 hover:text-white"
										/>
									</a>
								)}
								{sData.whatsapp && (
									<a
										href={`https://wa.me/${sData.whatsapp.replace(/\D/g, "")}`}
										target="_blank"
										rel="noopener noreferrer">
										<FaWhatsappSquare
											size={28}
											className="text-gray-400 hover:text-white"
										/>
									</a>
								)}
								{sData.youtube && (
									<a
										href={`https://${sData.youtube}`}
										target="_blank"
										rel="noopener noreferrer">
										<FaYoutubeSquare
											size={28}
											className="text-gray-400 hover:text-white"
										/>
									</a>
								)}
							</div>
						</div>

						<div className="mb-8 space-y-2">
							<h3 className="text-xl font-bold mb-4">Contact Info</h3>
							{sData?.address && (
								<p className="text-gray-400 flex items-center">
									<IoLocationSharp className="size-5 mr-2" />
									{sData.address}
								</p>
							)}
							{sData?.phone && (
								<p className="text-gray-400 flex items-center">
									<PiPhoneCallFill className="size-5 mr-2" />
									{sData.phone}
								</p>
							)}
							{sData?.email && (
								<p className="text-gray-400 flex items-center">
									<MdEmail className="size-5 mr-2" />
									{sData.email}
								</p>
							)}
							{sData?.workingHour && (
								<p className="text-gray-400 flex items-center">
									<TbClockHour3Filled className="size-5 mr-2" />
									{sData.workingHour}
								</p>
							)}
						</div>

						<div>
							<h3 className="text-xl font-bold mb-4">Our Services</h3>
							<ul className="text-gray-400 list-disc list-inside space-y-2">
								{sData.services
									?.slice()
									.reverse()
									.slice(0, 6)
									.map((service, idx) => (
										<li key={idx}>
											<a href={service.link}>{service.title}</a>
										</li>
									))}
							</ul>
						</div>
					</div>
					<FooterBottom data={data} />
				</footer>
			))}
		</>
	);
};

export default Footer;
