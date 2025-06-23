"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import contact from "../../public/headphone.svg";
import { useRouter } from "next/navigation";

export default function Navbar({ data }) {
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeRoute, setActiveRoute] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (typeof window !== "undefined") {
			const handleRouteChangeStart = () => {
				setLoading(true);
			};

			const handleRouteChangeComplete = () => {
				setLoading(false);
			};

			if (router && router.events) {
				router.events.on("routeChangeStart", handleRouteChangeStart);
				router.events.on("routeChangeComplete", handleRouteChangeComplete);

				return () => {
					router.events.off("routeChangeStart", handleRouteChangeStart);
					router.events.off("routeChangeComplete", handleRouteChangeComplete);
				};
			}
		}
	}, [router]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const currentPath = window.location.pathname;

			if (currentPath === "/") {
				setActiveRoute("home");
			} else if (currentPath === "/services") {
				setActiveRoute("service");
			} else if (currentPath === "/about") {
				setActiveRoute("about");
			} else if (currentPath === "/blogs") {
				setActiveRoute("blogs");
			} else if (currentPath === "/contact") {
				setActiveRoute("contact");
			}
		}
	}, [router.pathname]);

	const handleActiveRoute = (route, href) => {
		setActiveRoute(route);
		setMenuOpen(false);
		router.push(href);
	};

	return (
		<>
			{loading && (
				<div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
					<div className="text-white">Loading...</div>
				</div>
			)}

			<nav className="sticky top-0 w-full z-50 bg-white text-gray-900 shadow-sm transition duration-300">
				<div className="min-h-20 md:h-auto container mx-auto py-4 flex justify-between items-center">
					<div className="text-2xl font-bold tracking-wide flex items-center gap-2">
						<Link href="/">
							<div className="rounded-full cursor-pointer">
								{data?.logo && (
									<Image
										src={data?.logo}
										alt="Local Example"
										width={80}
										height={40}
									/>
								)}
							</div>
						</Link>
					</div>

					<button
						className="md:hidden text-3xl focus:outline-none"
						onClick={() => setMenuOpen(!menuOpen)}>
						{menuOpen ? <FiX /> : <FiMenu />}
					</button>

					<ul
						className={`absolute md:static top-20 shadow-[0px_1px_0px_rgba(17,17,26,0.1)] md:shadow-none left-0 w-full bg-white border-t md:border-none py-3 transition-all duration-300 ${
							menuOpen
								? "opacity-100 scale-100 pointer-events-none"
								: "opacity-0 scale-95 md:opacity-100 md:scale-100 pointer-events-auto"
						} md:flex md:items-center md:gap-6 md:ml-auto`}>
						<li className="text-center md:text-left md:ms-auto py-4 md:py-0">
							<Link
								href="/"
								className={`block px-6 md:px-0 text-lg font-medium transition duration-300 ${
									activeRoute === "home"
										? "text-emerald-500"
										: "hover:text-teal-500"
								}`}
								onClick={() => handleActiveRoute("home", "/")}>
								Home
							</Link>
						</li>
						<li className="text-center md:text-left py-4 md:py-0">
							<Link
								href="/services"
								className={`block px-6 md:px-0 text-lg font-medium transition duration-300 ${
									activeRoute === "service"
										? "text-emerald-500"
										: "hover:text-teal-500"
								}`}
								onClick={() => handleActiveRoute("service", "/services")}>
								Services
							</Link>
						</li>
						<li className="text-center md:text-left py-4 md:py-0">
							<Link
								href="/about"
								className={`block px-6 md:px-0 text-lg font-medium transition duration-300 ${
									activeRoute === "about"
										? "text-emerald-500"
										: "hover:text-teal-500"
								}`}
								onClick={() => handleActiveRoute("about", "/about")}>
								About
							</Link>
						</li>
						<li className="text-center md:text-left py-4 md:py-0">
							<Link
								href="/blogs"
								className={`block px-6 md:px-0 text-lg font-medium transition duration-300 ${
									activeRoute === "blogs"
										? "text-emerald-500"
										: "hover:text-teal-500"
								}`}
								onClick={() => handleActiveRoute("blogs", "/blogs")}>
								Blogs
							</Link>
						</li>

						<li className="text-center md:text-left py-4 md:py-0">
							<Link
								href="/contact"
								className={`block px-6 md:px-0 text-lg font-medium transition duration-300 ${
									activeRoute === "contact"
										? "text-emerald-500"
										: "hover:text-teal-500"
								}`}
								onClick={() => handleActiveRoute("contact", "/contact")}>
								Contact
							</Link>
						</li>

						<li className="text-center md:text-left py-4 md:py-0 block md:hidden lg:block ">
							<a
								href={`tel:${data.number}`}
								className="inline-flex gap-2 px-6 py-2 text-lg font-medium text-white bg-teal-600 rounded-md shadow hover:bg-teal-700 transition duration-300"
								onClick={() => setMenuOpen(false)}>
								<Image width={20} height={20} src={contact} alt="Contact" />
								For Support
							</a>
						</li>
					</ul>
				</div>
				<div className="bg-[#0d9488] text-white">
					<h2 className="text-center text-lg md:hidden pb-2 pt-2 mb-[1px]">
						Washing Machine Repair In Qatar.
					</h2>
				</div>
			</nav>
		</>
	);
}
