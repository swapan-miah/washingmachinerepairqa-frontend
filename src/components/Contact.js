"use client";
import React, { useState, useEffect } from "react";
import {
	FaPhoneAlt,
	FaEnvelope,
	FaMapMarkerAlt,
	FaFacebookF,
	FaInstagram,
	FaTwitter,
	FaWhatsapp,
	FaYoutube,
} from "react-icons/fa";
import { TbClockHour3Filled } from "react-icons/tb";
import axios from "axios";
import emailjs from "emailjs-com";
import Loading from "./Loading";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { io } from "socket.io-client";

function Modal({ show, onClose, title, message, isError }) {
	if (!show) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
			<div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl border border-gray-200 transform transition-all duration-300 scale-100">
				<div className="flex items-center mb-4 gap-3">
					{isError ? (
						<FaTimesCircle className="text-[#e7405c] text-3xl" />
					) : (
						<FaCheckCircle className="text-[#0d9488] text-3xl" />
					)}
					<h3
						className={`text-xl font-bold ${
							isError ? "text-[#e7405c]" : "text-[#0d9488]"
						}`}>
						{title}
					</h3>
				</div>
				<p className="text-gray-700 mb-6">{message}</p>
				<div className="text-right">
					<button
						onClick={onClose}
						className={`px-6 py-2 rounded font-semibold shadow-md ${
							isError ? "bg-[#e7405c]" : "bg-[#0d9488]"
						} text-white transition-all duration-300`}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}

const socket = io(process.env.BASE_URL, { autoConnect: true });

export default function Contact() {
	const [data, setData] = useState([]);
	const [secData, setSecData] = useState([]);
	const [loadingMain, setLoadingMain] = useState(true);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});
	const [loading, setLoading] = useState(false);
	const [modalData, setModalData] = useState({
		show: false,
		title: "",
		message: "",
		isError: false,
	});

	const closeModal = () => {
		setModalData({ show: false, title: "", message: "", isError: false });
	};

	const fetchData = async () => {
		try {
			const [secRes, contactRes] = await Promise.all([
				axios.get(`${process.env.BASE_URL}/section-heading/contact`),
				axios.get(`${process.env.BASE_URL}/footer-content`),
			]);
			setData(contactRes.data);
			setSecData(secRes.data);
		} catch {
		} finally {
			setLoadingMain(false);
		}
	};

	useEffect(() => {
		fetchData();

		socket.on("footer-updated", fetchData);
		socket.on("sectionheading-updated", fetchData);

		return () => {
			socket.off("footer-updated", fetchData);
			socket.off("sectionheading-updated", fetchData);
		};
	}, []);

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const serviceID = process.env.EMAILJS_SERVICE_ID;
		const templateID = process.env.EMAILJS_TEMPLATE_ID;
		const userID = process.env.EMAILJS_USER_ID;
		const templateParams = {
			from_name: formData.name,
			from_email: formData.email,
			phone: formData.phone,
			message: formData.message,
		};
		try {
			await emailjs.send(serviceID, templateID, templateParams, userID);
			setModalData({
				show: true,
				title: "Success",
				message: "Message sent successfully!",
				isError: false,
			});
			setFormData({
				name: "",
				email: "",
				phone: "",
				message: "",
			});
		} catch {
			setModalData({
				show: true,
				title: "Error",
				message: "Failed to send message. Please try again.",
				isError: true,
			});
		} finally {
			setLoading(false);
		}
	};

	if (loadingMain)
		return (
			<div>
				<Loading />
			</div>
		);

	return (
		<div className="py-14 bg-white overflow-x-hidden">
			<Modal
				show={modalData.show}
				onClose={closeModal}
				title={modalData.title}
				message={modalData.message}
				isError={modalData.isError}
			/>
			<div className="text-center mb-16 px-5">
				<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
					<span className="relative">{secData?.title}</span>
				</h2>
				<p className="text-gray-600 mt-4 leading-relaxed max-w-4xl mx-auto text-sm sm:text-base">
					{secData?.description}
				</p>
			</div>
			{data.map((sData) => (
				<div
					key={sData._id}
					className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
					<div className="space-y-6">
						{sData.phone && (
							<div className="flex items-center border rounded p-5">
								<div className="text-white bg-blue-600 p-3 rounded-full">
									<FaPhoneAlt size={20} />
								</div>
								<div className="ml-4">
									<p className="text-sm text-gray-500">Mobile</p>
									<p className="text-lg font-medium text-gray-800">
										{sData.phone}
									</p>
								</div>
							</div>
						)}
						{sData.email && (
							<div className="flex items-center border rounded p-5">
								<div className="text-white bg-green-600 p-3 rounded-full">
									<FaEnvelope size={20} />
								</div>
								<div className="ml-4">
									<p className="text-sm text-gray-500">Email</p>
									<p className="text-lg font-medium text-gray-800">
										{sData.email}
									</p>
								</div>
							</div>
						)}
						{sData.address && (
							<div className="flex items-center border rounded p-5">
								<div className="text-white bg-orange-500 p-3 rounded-full">
									<FaMapMarkerAlt size={20} />
								</div>
								<div className="ml-4">
									<p className="text-sm text-gray-500">Address</p>
									<p className="text-lg font-medium text-gray-800">
										{sData.address}
									</p>
								</div>
							</div>
						)}
						{sData.workingHour && (
							<div className="flex items-center border rounded p-5">
								<div className="text-white bg-purple-600 p-3 rounded-full">
									<TbClockHour3Filled size={20} />
								</div>
								<div className="ml-4">
									<p className="text-sm text-gray-500">Working Hour</p>
									<p className="text-lg font-medium text-gray-800">
										{sData.workingHour}
									</p>
								</div>
							</div>
						)}
						<div className="flex items-center gap-6 flex-wrap pt-4">
							{[
								{
									icon: <FaFacebookF size={30} />,
									bg: "bg-blue-600",
									key: "facebook",
								},
								{
									icon: <FaInstagram size={30} />,
									bg: "bg-pink-500",
									key: "instagram",
								},
								{
									icon: <FaTwitter size={30} />,
									bg: "bg-black",
									key: "twitter",
								},
								{
									icon: <FaWhatsapp size={30} />,
									bg: "bg-green-500",
									key: "whatsapp",
								},
								{
									icon: <FaYoutube size={30} />,
									bg: "bg-red-600",
									key: "youtube",
								},
							]
								.filter((item) => sData?.[item.key])
								.map((item, idx) => {
									const isWhatsApp = item.key === "whatsapp";
									const link = isWhatsApp
										? `https://wa.me/${sData[item.key].replace(/[^\d]/g, "")}`
										: `https://${sData[item.key]}`;
									return (
										<a
											href={link}
											target="_blank"
											rel="noopener noreferrer"
											className="relative group"
											key={idx}>
											<div
												className={`p-4 border rounded cursor-pointer ${item.bg}`}>
												<div className="text-white grid place-items-center">
													{item.icon}
												</div>
											</div>
											<div className="absolute whitespace-nowrap -top-10 left-1/2 -translate-x-1/2 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-2 transition-all duration-300 ease-out bg-gray-800 text-white text-sm font-medium px-3 py-1.5 rounded shadow-lg z-10 pointer-events-none">
												{item.key.charAt(0).toUpperCase() + item.key.slice(1)}
												<div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 z-0"></div>
											</div>
										</a>
									);
								})}
						</div>
					</div>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="text-start">
							<label className="block text-gray-700 font-medium mb-1">
								Full Name
							</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="Shuvo Sarkar"
								className="w-full h-[50px] px-5 border rounded focus:outline-none focus:border-gray-400"
								required
							/>
						</div>
						<div className="text-start">
							<label className="block text-gray-700 font-medium mb-1">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="example@gmail.com"
								className="w-full h-[50px] px-5 border rounded focus:outline-none focus:border-gray-400"
								required
							/>
						</div>
						<div className="text-start">
							<label className="block text-gray-700 font-medium mb-1">
								Number
							</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								placeholder="+1-770-212-6011"
								className="w-full h-[50px] px-5 border rounded focus:outline-none focus:border-gray-400"
								required
							/>
						</div>
						<div className="text-start">
							<label className="block text-gray-700 font-medium mb-1">
								Your Message
							</label>
							<textarea
								name="message"
								value={formData.message}
								onChange={handleChange}
								rows="6"
								placeholder="Write your message here. We’ll get back to you shortly!"
								className="w-full p-3 border rounded focus:outline-none focus:border-gray-400 resize-none"
								required></textarea>
						</div>
						<button
							type="submit"
							disabled={loading}
							className="flex w-full items-center justify-center gap-2 rounded bg-[#0d9488] px-3 py-3 text-sm font-semibold text-white shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d9488]">
							{loading ? (
								<>
									<svg
										className="animate-spin h-5 w-5 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24">
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
										/>
									</svg>
									Sending...
								</>
							) : (
								"Send Message"
							)}
						</button>
					</form>
				</div>
			))}
		</div>
	);
}
