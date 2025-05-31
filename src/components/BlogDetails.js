"use client";
import { use } from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { TbTag } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import axios from "axios";
import Head from "next/head";

const SkeletonLoader = () => {
	return (
		<div className="bg-white">
			<div className="container mx-auto">
				<div className="bg-white mx-auto w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
					<div className="py-6 px-4 space-y-6 md:col-span-3 lg:col-span-2 xl:col-span-3 border-r border-l border-gray-200">
						<div className="w-full mx-auto rounded-md overflow-hidden bg-gray-300 h-[300px] animate-pulse"></div>

						<div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
							<div className="flex items-center gap-1">
								<div className="bg-[#0d9488] w-5 h-5 rounded-full animate-pulse" />
								<span className="h-4 w-24 bg-gray-300 animate-pulse"></span>
							</div>
							<span className="h-5 w-px bg-gray-400" />
							<div className="flex items-center gap-1">
								<div className="bg-[#0d9488] w-5 h-5 rounded-full animate-pulse" />
								<span className="h-4 w-32 bg-gray-300 animate-pulse"></span>
							</div>
						</div>

						<h2 className="text-xl font-semibold text-gray-900 mb-3">
							<div className="h-6 w-3/4 bg-gray-300 animate-pulse"></div>
						</h2>

						<div>
							<div className="h-12 mt-3 w-full bg-gray-300 rounded-lg animate-pulse"></div>
						</div>

						<div className="h-4 mt-3 w-full bg-gray-300 rounded-lg animate-pulse"></div>
						<div className="h-4 mt-3 w-full bg-gray-300 rounded-lg animate-pulse"></div>
						<div className="h-4 mt-3 w-full bg-gray-300 rounded-lg animate-pulse"></div>
						<div className="h-4 mt-3 w-[90%] bg-gray-300 rounded-lg animate-pulse"></div>
					</div>

					<div className="py-6 flex-col gap-4 hidden lg:flex">
						<h2 className="relative text-lg font-semibold text-gray-800 mb-2 pb-2 after:absolute after:bottom-0 after:left-0 after:w-20 after:h-[2px] after:bg-black before:absolute before:bottom-1 before:left-0 before:w-28 before:h-[2px] before:bg-[#0d9488]">
							Recent Blogs
						</h2>
						{[...Array(5)].map((_, index) => (
							<div
								key={index}
								className="bg-white rounded-lg border p-3 flex gap-3 items-center hover:border-[#0d9488] transition-all duration-300 ease-in-out cursor-pointer animate-pulse">
								<div className="w-24 h-16 bg-gray-300 rounded overflow-hidden animate-pulse" />
								<div className="flex-grow">
									<div className="flex flex-col justify-between h-full w-full">
										<div className="h-3 w-[90%] bg-gray-300 animate-pulse mb-1 rounded-full" />
										<div className="h-3 w-[60%] bg-gray-300 animate-pulse mb-2 rounded-full" />
										<div className="flex items-center gap-2">
											<div className="bg-[#0d9488] w-4 h-4 rounded-full animate-pulse" />
											<div className="h-3 w-16 bg-gray-300 animate-pulse rounded-full"></div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default function BlogDetails({ params }) {
	const { id } = use(params);
	const [blog, setBlog] = useState(null);
	const [recentBlogs, setRecentBlogs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		window.scrollTo(0, 0);
		const fetchData = async () => {
			try {
				const { data: allBlogs } = await axios.get(
					`${process.env.BASE_URL}/our-blogs`,
				);

				const currentBlog = allBlogs.find((item) => item.slug === id);
				const recentBlogs = allBlogs
					.filter((item) => item.slug !== id)
					.slice(-5)
					.reverse();

				setBlog(currentBlog);
				setRecentBlogs(recentBlogs);
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

	if (!blog) {
		return <div className="p-6 text-red-500 text-center py-20">Blog not Found</div>;
	}

	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "Washing Machine Repair in Qatar",
		mainEntity: blog?.schema?.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};

	return (
		<div className="bg-white">
			<Head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
				/>
			</Head>
			<div className="bg-[#133851] py-10">
				<div className="container mx-auto text-white">
					<h2 className="text-lg font-medium flex items-center gap-[6px]">
						<Link href="/"><FaHome /></Link> <FaAngleRight className="text-[14px]" /><Link href="/blogs">Blogs</Link> <FaAngleRight className="text-[14px]" /> {blog.title}
					</h2>

				</div>
			</div>
			<div className="container mx-auto">
				<div className="bg-white mx-auto w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
					<div className="py-6 px-4 space-y-6 md:col-span-3 lg:col-span-2 xl:col-span-3 border-r border-l border-gray-200">
						<div className="w-full mx-auto rounded-md overflow-hidden">
							{blog?.image && (
								<Image
									src={blog.image}
									className="w-full h-[300px] object-cover"
									width={100}
									height={100}
									alt="Blog Img"
								/>
							)}
						</div>

						<div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
							<p className="flex items-center gap-1">
								<MdOutlineDateRange className="size-5 text-[#0d9488]" />
								<span>
									{new Date(blog.date).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>
							</p>
							<span className="h-5 w-px bg-gray-400" />
							<p className="flex items-center gap-1">
								<TbTag className="size-5 text-[#0d9488]" />
								<span className="transition-all duration-300 ease-in-out hover:text-[#0d9488]">
									{blog.category}
								</span>
							</p>
						</div>

						<h2 className="text-xl font-semibold text-gray-900 mb-3">
							{blog.title}
						</h2>

						<div>
							<div
								className="text-start text-gray-700 leading-relaxed bg-gray-100 rounded-lg p-4 mb-4"
								dangerouslySetInnerHTML={{ __html: blog.description }}></div>
						</div>
					</div>

					<div className="py-6 flex-col gap-4 hidden lg:flex">
						<h2 className="relative text-lg font-semibold text-gray-800 mb-2 pb-2 after:absolute after:bottom-0 after:left-0 after:w-20 after:h-[2px] after:bg-black before:absolute before:bottom-1 before:left-0 before:w-28 before:h-[2px] before:bg-[#0d9488]">
							Recent Blogs
						</h2>
						{recentBlogs.map((item) => (
							<Link href={`/blogs/${item.slug}`} key={item._id}>
								<div className="bg-white rounded-lg border p-3 flex gap-3 items-center hover:border-[#0d9488] transition-all duration-300 ease-in-out cursor-pointer">
									<div className="w-24 h-16 flex-shrink-0 rounded overflow-hidden">
										{blog?.image && (
											<Image
												src={item.image}
												width={96}
												height={96}
												alt={item.title}
												className="w-full h-full object-cover"
											/>
										)}
									</div>
									<div className="flex flex-col justify-between h-full">
										<h3 className="text-sm font-semibold text-gray-800 hover:text-teal-600 transition line-clamp-2">
											{item.title}
										</h3>
										<p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
											<MdOutlineDateRange className="size-4 text-[#0d9488]" />{" "}
											{new Date(item.date).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
