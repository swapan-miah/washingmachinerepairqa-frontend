"use client";
import { use } from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineDateRange } from "react-icons/md";
import { TbTag } from "react-icons/tb";
import axios from "axios";
import { FaAngleRight } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import SchemaScript from "@/components/SchemaScript";

const SkeletonLoader = () => {
	return (
		<div className="bg-white">
			<div className="container mx-auto">
				<div className="bg-white mx-auto w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
					<div className="py-6 flex-col gap-4 hidden lg:flex">
						<h2 className="relative text-lg font-semibold text-gray-800 mb-2 pb-2 after:absolute after:bottom-0 after:left-0 after:w-20 after:h-[2px] after:bg-black before:absolute before:bottom-1 before:left-0 before:w-28 before:h-[2px] before:bg-[#0d9488]">
							More Services
						</h2>
						{[...Array(5)].map((_, index) => (
							<div
								key={index}
								className="bg-white rounded-lg border p-3 flex gap-3 items-center hover:border-[#0d9488] transition-all duration-300 ease-in-out cursor-pointer animate-pulse">
								<div className="w-24 h-16 bg-gray-300 rounded overflow-hidden animate-pulse" />
								<div className="flex-grow">
									<div className="flex flex-col justify-between h-full w-full">
										<div className="h-3 w-[90%] bg-gray-300 animate-pulse mb-2 rounded-full" />
										<div className="h-3 w-[60%] bg-gray-300 animate-pulse rounded-full" />
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="py-6 px-4 space-y-6 md:col-span-3 lg:col-span-2 xl:col-span-3 border-r border-l border-gray-200">
						<div className="w-full mx-auto rounded-md overflow-hidden bg-gray-300 h-[300px] animate-pulse"></div>

						<h2 className="text-xl font-semibold text-gray-900 mb-3">
							<div className="h-5 w-1/4 bg-gray-300 animate-pulse rounded-full"></div>
						</h2>

						<div>
							<div className="h-12 mt-3 w-full bg-gray-300 rounded-lg animate-pulse"></div>
						</div>

						<div className="h-4 mt-3 w-full bg-gray-300 rounded-lg animate-pulse"></div>
						<div className="h-4 mt-3 w-full bg-gray-300 rounded-lg animate-pulse"></div>
						<div className="h-4 mt-3 w-full bg-gray-300 rounded-lg animate-pulse"></div>
						<div className="h-4 mt-3 w-[90%] bg-gray-300 rounded-lg animate-pulse"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default function ServiceDetails({ params }) {
	const { id } = use(params);
	const [service, setService] = useState(null);
	const [recentServices, setRecentServices] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		window.scrollTo(0, 0);
		const fetchData = async () => {
			try {
				const { data: allServices } = await axios.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/services-skills`,
				);

				const currentService = allServices.find((item) => item.slug === id);
				const recentServices = allServices
					.filter((item) => item.slug !== id)
					.slice(-5)
					.reverse();

				setService(currentService);
				setRecentServices(recentServices);
			} catch (error) {
				console.error("Failed to fetch blogs:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [id]);

	if (isLoading) {
		return <SkeletonLoader />;
	}

	if (!service) {
		return (
			<div className="p-6 text-red-500 text-center py-20">
				Service not Found
			</div>
		);
	}

	return (
		<>
			{service?.schema && (
				<SchemaScript schema={service.schema} id="service-details" />
			)}
			<div className="bg-white">
				{/* <div className="bg-[#133851] py-10">
				<div className="container mx-auto text-white">
					<h2 className="text-lg font-medium flex items-center gap-[6px]">
						<Link href="/"><FaHome /></Link> <FaAngleRight className="text-[14px]" /><Link href="/services">Service</Link> <FaAngleRight className="text-[14px]" /> {service.title}
					</h2>

				</div>
			</div> */}
				<div className="container mx-auto">
					<div className="bg-white mx-auto w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
						<div className="py-6 flex-col gap-4 hidden lg:flex">
							<h2 className="relative text-lg font-semibold text-gray-800 mb-2 pb-2 after:absolute after:bottom-0 after:left-0 after:w-20 after:h-[2px] after:bg-black before:absolute before:bottom-1 before:left-0 before:w-28 before:h-[2px] before:bg-[#0d9488]">
								More Services
							</h2>
							{recentServices.map((item) => (
								<Link href={`/services/${item.slug}`} key={item._id}>
									<div className="bg-white rounded-lg border p-3 flex gap-3 items-center hover:border-[#0d9488] transition-all duration-300 ease-in-out cursor-pointer">
										<div className="w-24 h-16 flex-shrink-0 rounded overflow-hidden">
											<Image
												src={item.image}
												width={96}
												height={96}
												alt={item.title}
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="flex flex-col justify-between h-full">
											<h3 className="text-sm font-semibold text-gray-800 hover:text-teal-600 transition line-clamp-1">
												{item.title}
											</h3>
											<p
												className="text-xs text-gray-500 mt-1 line-clamp-2"
												dangerouslySetInnerHTML={{
													__html: service.description,
												}}></p>
										</div>
									</div>
								</Link>
							))}
						</div>

						<div className="py-6 px-4 space-y-6 md:col-span-3 lg:col-span-2 xl:col-span-3 border-r border-l border-gray-200">
							<div className="w-full mx-auto rounded-md overflow-hidden">
								<Image
									src={service.image}
									className="w-full h-[300px] object-cover"
									width={100}
									height={100}
									alt="Service Img"
								/>
							</div>

							<div className="flex items-center gap-3 mb-3">
								<div className="flex-shrink-0 w-12 h-12 grid place-items-center border border-gray-200 rounded">
									{service?.svgIcon && (
										<Image
											className="w-10 h-10 object-cover rounded"
											width={100}
											height={100}
											src={service.svgIcon}
											alt="Services & Skills"
										/>
									)}
								</div>
								<h2 className="text-xl font-semibold text-gray-900">
									{service.title}
								</h2>
							</div>

							<div>
								<p
									className="text-start text-gray-700 leading-relaxed bg-gray-100 rounded-lg p-4 mb-4"
									dangerouslySetInnerHTML={{
										__html: service.description,
									}}></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
