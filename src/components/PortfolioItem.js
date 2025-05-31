"use client";

import Image from "next/image";
import Link from "next/link";

export default function PortfolioItem({ item, onDelete }) {
	const handleDelete = async () => {
		const res = await fetch(`/api/portfolio/${item._id}`, { method: "DELETE" });

		if (res.ok) {
			onDelete(item._id);
		} else {
			const errorResponse = await res.json();
			console.error("Failed to delete portfolio:", errorResponse.message);
		}
	};

	return (
		<div className="portfolio_item border-2 shadow-2xl rounded-lg">
			<div className="relative img_hover_item shadow-2xl">
				{item?.imageUrl && (
					<Image
						className="w-full rounded-lg"
						src={item?.imageUrl}
						alt={`Portfolio image for ${item?.title}`}
						width={500}
						height={300}
						priority
					/>
				)}

				<div className="hidden absolute top-0 left-0 bg-sky-50 opacity-50 h-full w-full hover_div justify-center items-center"></div>
				<div className="hidden absolute top-0 left-0 h-full w-full hover_div justify-center items-center">
					<Link href={item?.link} target="_blank" rel="noopener noreferrer">
						<button className="btn bg-slate-300 p-2 rounded-lg border-2">
							Visit Website
						</button>
					</Link>
				</div>
			</div>
			<div className="flex justify-center items-center p-5">
				<h2 className="font-alkatra text-xl tracking-wider">{item?.title}</h2>
			</div>
			<div className="flex justify-center items-center p-5">
				<div>
					<Link
						href="/dashboard/portfolio-update"
						target="_blank"
						rel="noopener noreferrer">
						<button className="btn bg-slate-300 p-2 rounded-lg border-2">
							Update
						</button>
					</Link>
				</div>
				<div>
					<button
						className="btn bg-slate-300 p-2 rounded-lg border-2"
						onClick={handleDelete}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
